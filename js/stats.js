let draftStats = {
    statistics: [],
    matchups: [],
    enemies: [],
    synergies: []
};

const statsIndex = {
    winRate: new Map(),
    matchup: new Map(),
    enemy: new Map(),
    synergy: new Map()
};

function convertRole(role) {
    return {
        TOP: "TOP",
        JGL: "JUNGLE",
        MID: "MIDDLE",
        ADC: "BOTTOM",
        SUP: "UTILITY"
    }[role] || role;
}

function buildStatsIndexes() {
    statsIndex.winRate.clear();
    statsIndex.matchup.clear();
    statsIndex.enemy.clear();
    statsIndex.synergy.clear();

    for (const item of draftStats.statistics) {
        statsIndex.winRate.set(`${item.champion}|${item.role}`, item);
    }

    for (const item of draftStats.matchups) {
        statsIndex.matchup.set(
            `${item.champion}|${item.role}|${item.opponent}`,
            item
        );
    }

    for (const item of draftStats.enemies) {
        statsIndex.enemy.set(
            `${item.champion}|${item.championRole}|${item.opponent}|${item.opponentRole}`,
            item
        );
    }

    for (const item of draftStats.synergies) {
        statsIndex.synergy.set(
            `${item.champion}|${item.championRole}|${item.ally}|${item.allyRole}`,
            item
        );
    }

    console.log("Índices creados:", {
        winRate: statsIndex.winRate.size,
        matchups: statsIndex.matchup.size,
        enemies: statsIndex.enemy.size,
        synergies: statsIndex.synergy.size
    });
}

async function loadStats() {
    try {
        const response = await fetch("data/stats.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar stats.json");
        }

        draftStats = await response.json();

        if (!Array.isArray(draftStats.statistics)) {
            draftStats.statistics = [];
        }

        if (!Array.isArray(draftStats.matchups)) {
            draftStats.matchups = [];
        }

        if (!Array.isArray(draftStats.enemies)) {
            draftStats.enemies = [];
        }

        if (!Array.isArray(draftStats.synergies)) {
            draftStats.synergies = [];
        }

        buildStatsIndexes();

        console.log(
            "Stats cargadas:",
            draftStats.matchesProcessed,
            "partidas"
        );
    } catch (error) {
        console.error("Error cargando estadísticas:", error);
    }
}

function neutralData() {
    return {
        found: false,
        games: 0,
        wins: 0,
        losses: 0,
        winRate: 50,
        adjustedWinRate: 50
    };
}

/* CONFIANZA */

function getSampleConfidence(games, scale = 12) {
    if (!games || games <= 0) {
        return 0;
    }

    return games / (games + scale);
}

function confidenceAdjustedScore(winRate, games, scale = 12) {
    if (!games || games <= 0) {
        return 50;
    }

    const confidence = getSampleConfidence(games, scale);
    const normalized = normalizeWinRate(winRate);

    return 50 + (normalized - 50) * confidence;
}

function getConfidenceLabel(games) {
    if (!games || games <= 0) {
        return "Sin datos";
    }

    if (games < 5) {
        return "Muy baja";
    }

    if (games < 15) {
        return "Baja";
    }

    if (games < 35) {
        return "Media";
    }

    if (games < 75) {
        return "Alta";
    }

    return "Muy alta";
}

/* WIN RATE */

function getWinRateData(championId, role) {
    const riotRole = convertRole(role);
    const key = `${championId}|${riotRole}`;
    const stat = statsIndex.winRate.get(key);

    if (!stat) {
        return neutralData();
    }

    return {
        found: true,
        games: stat.games,
        wins: stat.wins,
        losses: stat.losses,
        winRate: stat.winRate,
        adjustedWinRate: stat.adjustedWinRate
    };
}

function getWinRate(championId, role) {
    return getWinRateData(championId, role).adjustedWinRate;
}

/* MATCHUP DE LÍNEA */

function getMatchupData(championId, enemyId, role) {
    const riotRole = convertRole(role);
    const key = `${championId}|${riotRole}|${enemyId}`;
    const matchup = statsIndex.matchup.get(key);

    if (!matchup) {
        return neutralData();
    }

    return {
        found: true,
        games: matchup.games,
        wins: matchup.wins,
        losses: matchup.losses,
        winRate: matchup.winRate,
        adjustedWinRate: matchup.adjustedWinRate
    };
}

function getMatchupWinRate(championId, enemyId, role) {
    return getMatchupData(
        championId,
        enemyId,
        role
    ).adjustedWinRate;
}

/* RELACIÓN CONTRA ENEMIGO */

function getEnemyData(
    championId,
    championRole,
    enemyId,
    enemyRole
) {
    const riotChampionRole = convertRole(championRole);
    const riotEnemyRole = convertRole(enemyRole);

    const key =
        `${championId}|${riotChampionRole}|${enemyId}|${riotEnemyRole}`;

    const relation = statsIndex.enemy.get(key);

    if (!relation) {
        return neutralData();
    }

    return {
        found: true,
        games: relation.games,
        wins: relation.wins,
        losses: relation.losses,
        winRate: relation.winRate,
        adjustedWinRate: relation.adjustedWinRate
    };
}

/* SCORE CONTRA EQUIPO ENEMIGO */

function getEnemyTeamData(
    championId,
    championRole,
    enemies
) {
    const roles = [
        "TOP",
        "JGL",
        "MID",
        "ADC",
        "SUP"
    ];

    const details = [];

    let score = 0;
    let totalGames = 0;
    let foundRelationships = 0;

    for (const role of roles) {
        const enemy = enemies.find(
            item => item.role === role
        );

        const direct = role === championRole;

        const weight = direct
            ? 0.55
            : 0.1125;

        if (!enemy) {
            score += 50 * weight;

            details.push({
                role,
                direct,
                weight,
                found: false,
                champion: null,
                games: 0,
                adjustedWinRate: 50,
                score: 50
            });

            continue;
        }

        const data = getEnemyData(
            championId,
            championRole,
            enemy.champion,
            enemy.role
        );

        if (!data.found) {
            score += 50 * weight;

            details.push({
                role,
                direct,
                weight,
                found: false,
                champion: enemy.champion,
                games: 0,
                adjustedWinRate: 50,
                score: 50
            });

            continue;
        }

        const relationScore =
            confidenceAdjustedScore(
                data.adjustedWinRate,
                data.games,
                direct ? 8 : 12
            );

        score += relationScore * weight;
        totalGames += data.games;
        foundRelationships++;

        details.push({
            role,
            direct,
            weight,
            found: true,
            champion: enemy.champion,
            games: data.games,
            wins: data.wins,
            losses: data.losses,
            winRate: data.winRate,
            adjustedWinRate: data.adjustedWinRate,
            score: relationScore
        });
    }

    const foundDetails =
        details.filter(item => item.found);

    const direct =
        foundDetails.find(item => item.direct) || null;

    const best =
        foundDetails.length
            ? [...foundDetails].sort(
                (a, b) => b.score - a.score
            )[0]
            : null;

    const worst =
        foundDetails.length
            ? [...foundDetails].sort(
                (a, b) => a.score - b.score
            )[0]
            : null;

    let weightedWinRate = 50;

    if (totalGames > 0) {
        weightedWinRate =
            foundDetails.reduce(
                (sum, item) =>
                    sum +
                    item.adjustedWinRate *
                    item.games,
                0
            ) / totalGames;
    }

    return {
        found: foundRelationships > 0,
        relationships: foundRelationships,
        games: totalGames,
        winRate: Number(weightedWinRate.toFixed(2)),
        score: Number(score.toFixed(2)),
        confidence: getConfidenceLabel(totalGames),
        direct,
        best,
        worst,
        details
    };
}

/* CANDIDATOS NORMALES */

function getRoleCandidates(
    role,
    minGames = 10
) {
    const riotRole = convertRole(role);

    return new Set(
        draftStats.statistics
            .filter(
                item =>
                    item.role === riotRole &&
                    item.games >= minGames
            )
            .map(item => item.champion)
    );
}

function getSpecificMatchupCandidates(
    role,
    enemyId,
    minGames = 3
) {
    if (!enemyId) {
        return new Set();
    }

    const riotRole = convertRole(role);

    return new Set(
        draftStats.matchups
            .filter(
                item =>
                    item.role === riotRole &&
                    item.opponent === enemyId &&
                    item.games >= minGames
            )
            .map(item => item.champion)
    );
}

/* TRICKY PICK: DATOS DE POPULARIDAD */

/*
    Devuelve TODOS los campeones que hayan aparecido realmente
    en una posición.

    A diferencia de getRoleCandidates(), aquí podemos permitir
    muestras pequeñas porque posteriormente el sistema Tricky
    aplicará sus propios filtros de evidencia.
*/
function getAllRoleCandidateData(role, minGames = 1) {
    const riotRole = convertRole(role);

    return draftStats.statistics
        .filter(
            item =>
                item.role === riotRole &&
                item.games >= minGames
        )
        .map(item => ({
            champion: item.champion,
            role: item.role,
            games: item.games,
            wins: item.wins,
            losses: item.losses,
            winRate: item.winRate,
            adjustedWinRate: item.adjustedWinRate
        }))
        .sort((a, b) => b.games - a.games);
}

/*
    Información concreta de popularidad de un campeón
    dentro de una posición.
*/
function getRolePopularityData(championId, role) {
    const riotRole = convertRole(role);

    const roleStats = draftStats.statistics.filter(
        item => item.role === riotRole
    );

    const championStats = roleStats.find(
        item => item.champion === championId
    );

    if (!championStats) {
        return {
            found: false,
            games: 0,
            roleGames: 0,
            share: 0,
            percentile: 1
        };
    }

    const roleGames = roleStats.reduce(
        (sum, item) => sum + item.games,
        0
    );

    const sorted = [...roleStats]
        .sort((a, b) => b.games - a.games);

    const index = sorted.findIndex(
        item => item.champion === championId
    );

    const percentile =
        sorted.length > 1
            ? index / (sorted.length - 1)
            : 0;

    return {
        found: true,
        games: championStats.games,
        roleGames,
        share:
            roleGames > 0
                ? championStats.games / roleGames
                : 0,
        percentile,
        rank: index + 1,
        championsInRole: sorted.length
    };
}

/*
    Clasificación sencilla de la cantidad de evidencia
    disponible para un pick raro.

    Esto NO decide si el campeón es bueno.
    Solo describe cuánto respaldo estadístico tenemos.
*/
function getTrickyEvidenceLabel(games) {
    if (games < 5) {
        return "Insuficiente";
    }

    if (games < 15) {
        return "Evidencia emergente";
    }

    if (games < 35) {
        return "Prometedor";
    }

    return "Sólido";
}

/* SINERGIA */

function getSynergyData(
    championId,
    championRole,
    allyId,
    allyRole
) {
    const riotChampionRole =
        convertRole(championRole);

    const riotAllyRole =
        convertRole(allyRole);

    const key =
        `${championId}|${riotChampionRole}|${allyId}|${riotAllyRole}`;

    const synergy =
        statsIndex.synergy.get(key);

    if (!synergy) {
        return neutralData();
    }

    return {
        found: true,
        games: synergy.games,
        wins: synergy.wins,
        losses: synergy.losses,
        winRate: synergy.winRate,
        adjustedWinRate: synergy.adjustedWinRate
    };
}

function getAverageSynergy(
    championId,
    championRole,
    allies
) {
    const relevantAllies =
        allies.filter(
            ally =>
                ally.champion !== championId
        );

    if (!relevantAllies.length) {
        return {
            found: false,
            relationships: 0,
            games: 0,
            winRate: 50,
            score: 50,
            confidence: "Sin datos",
            bestAlly: null,
            worstAlly: null,
            details: []
        };
    }

    const details =
        relevantAllies.map(
            ally => {
                const data =
                    getSynergyData(
                        championId,
                        championRole,
                        ally.champion,
                        ally.role
                    );

                if (!data.found) {
                    return {
                        ally,
                        found: false,
                        games: 0,
                        winRate: 50,
                        adjustedWinRate: 50,
                        score: 50
                    };
                }

                const score =
                    confidenceAdjustedScore(
                        data.adjustedWinRate,
                        data.games,
                        10
                    );

                return {
                    ally,
                    found: true,
                    games: data.games,
                    wins: data.wins,
                    losses: data.losses,
                    winRate: data.winRate,
                    adjustedWinRate:
                        data.adjustedWinRate,
                    score
                };
            }
        );

    const found =
        details.filter(
            item => item.found
        );

    const totalGames =
        found.reduce(
            (sum, item) =>
                sum + item.games,
            0
        );

    const score =
        details.reduce(
            (sum, item) =>
                sum + item.score,
            0
        ) /
        details.length;

    let weightedWinRate = 50;

    if (totalGames > 0) {
        weightedWinRate =
            found.reduce(
                (sum, item) =>
                    sum +
                    item.adjustedWinRate *
                    item.games,
                0
            ) /
            totalGames;
    }

    const sorted =
        [...found].sort(
            (a, b) =>
                b.score - a.score
        );

    const best =
        sorted[0] || null;

    const worst =
        sorted.length
            ? sorted[sorted.length - 1]
            : null;

    return {
        found:
            found.length > 0,

        relationships:
            found.length,

        games:
            totalGames,

        winRate:
            Number(
                weightedWinRate.toFixed(2)
            ),

        score:
            Number(
                score.toFixed(2)
            ),

        confidence:
            getConfidenceLabel(
                totalGames
            ),

        bestAlly:
            best
                ? {
                    champion:
                        best.ally.champion,
                    role:
                        best.ally.role,
                    winRate:
                        best.adjustedWinRate,
                    score:
                        Number(
                            best.score.toFixed(2)
                        ),
                    games:
                        best.games
                }
                : null,

        worstAlly:
            worst
                ? {
                    champion:
                        worst.ally.champion,
                    role:
                        worst.ally.role,
                    winRate:
                        worst.adjustedWinRate,
                    score:
                        Number(
                            worst.score.toFixed(2)
                        ),
                    games:
                        worst.games
                }
                : null,

        details
    };
}