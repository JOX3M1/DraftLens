let champions = [];
let currentSlot = null;
let ddragonVersion = null;
let selectedRole = null;

const modal = document.getElementById("champion-modal");
const championList = document.getElementById("champion-list");
const searchInput = document.getElementById("champion-search");
const closeModal = document.getElementById("close-modal");
const roleButtons = document.querySelectorAll(".role-button");
const recommendationsContainer = document.getElementById("recommendations");
const recommendationInfo = document.getElementById("recommendation-info");
const clearDraftButton = document.getElementById("clear-draft");
const datasetStatus = document.getElementById("dataset-status");

const ROLE_POOLS = {
    TOP: [
        "Aatrox", "Ambessa", "Camille", "ChoGath", "Darius", "DrMundo",
        "Fiora", "Gangplank", "Garen", "Gnar", "Gwen", "Illaoi", "Irelia",
        "Jax", "KSante", "Kayle", "Kennen", "Kled", "Malphite", "Mordekaiser",
        "Nasus", "Olaf", "Ornn", "Pantheon", "Poppy", "Renekton", "Riven",
        "Sett", "Shen", "Singed", "Sion", "TahmKench", "Teemo", "Trundle",
        "Tryndamere", "Urgot", "Vayne", "Volibear", "Warwick", "Yone", "Yorick"
    ],
    JGL: [
        "Amumu", "Belveth", "Briar", "Diana", "Ekko", "Elise", "Evelynn",
        "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "JarvanIV",
        "Karthus", "Kayn", "Khazix", "Kindred", "LeeSin", "Lillia", "MasterYi",
        "MonkeyKing", "Nidalee", "Nocturne", "Nunu", "Poppy", "Rammus",
        "RekSai", "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner",
        "Taliyah", "Talon", "Udyr", "Vi", "Viego", "Volibear", "Warwick",
        "XinZhao", "Zac"
    ],
    MID: [
        "Ahri", "Akali", "Akshan", "Anivia", "Annie", "AurelionSol", "Azir",
        "Cassiopeia", "Diana", "Ekko", "Fizz", "Galio", "Hwei", "Kassadin",
        "Katarina", "Leblanc", "Lissandra", "Lux", "Malzahar", "Naafiri",
        "Neeko", "Orianna", "Qiyana", "Ryze", "Swain", "Syndra", "Taliyah",
        "Talon", "TwistedFate", "Veigar", "Velkoz", "Vex", "Viktor",
        "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Zoe"
    ],
    ADC: [
        "Aphelios", "Ashe", "Caitlyn", "Corki", "Draven", "Ezreal", "Jhin",
        "Jinx", "Kaisa", "Kalista", "KogMaw", "Lucian", "MissFortune",
        "Nilah", "Samira", "Senna", "Sivir", "Smolder", "Tristana", "Twitch",
        "Varus", "Vayne", "Xayah", "Zeri"
    ],
    SUP: [
        "Alistar", "Bard", "Blitzcrank", "Brand", "Braum", "Janna", "Karma",
        "Leona", "Lulu", "Lux", "Maokai", "Milio", "Morgana", "Nami",
        "Nautilus", "Neeko", "Pyke", "Rakan", "Rell", "Renata", "Senna",
        "Seraphine", "Sona", "Soraka", "Swain", "TahmKench", "Taric",
        "Thresh", "Velkoz", "Xerath", "Yuumi", "Zilean", "Zyra"
    ]
};

async function loadChampions() {
    const versionsResponse = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
    const versions = await versionsResponse.json();
    ddragonVersion = versions[0];
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/es_ES/champion.json`);
    const data = await response.json();
    champions = Object.values(data.data).sort((a, b) => a.name.localeCompare(b.name));
}

function getChampion(id) {
    return champions.find(champion => champion.id === id) || null;
}

function championImage(champion) {
    return `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${champion.image.full}`;
}

function getChampionsForRole(role) {
    const MIN_AUTO_ROLE_GAMES = 50;
    const pool = new Set(ROLE_POOLS[role] || []);

    getRoleCandidates(role, MIN_AUTO_ROLE_GAMES)
        .forEach(championId => pool.add(championId));

    getSpecificMatchupCandidates(role, getEnemyForRole(role), 3)
        .forEach(championId => {
            const roleData = getWinRateData(championId, role);

            if (roleData?.games >= MIN_AUTO_ROLE_GAMES) {
                pool.add(championId);
            }
        });

    return pool;
}

function showChampions(list) {
    championList.innerHTML = "";
    list.forEach(champion => {
        const button = document.createElement("button");
        button.className = "champion-option";
        button.innerHTML = `
            <img src="${championImage(champion)}" alt="${champion.name}">
            <span>${champion.name}</span>
        `;
        button.addEventListener("click", () => selectChampion(champion));
        championList.appendChild(button);
    });
}

function openChampionModal(slot) {
    currentSlot = slot;
    searchInput.value = "";
    modal.classList.remove("hidden");
    showChampions(champions);
    searchInput.focus();
}

function selectChampion(champion) {
    if (!currentSlot) return;
    const oldChampion = currentSlot.dataset.champion;
    const duplicate = Array.from(document.querySelectorAll(".player-slot"))
        .find(slot => slot !== currentSlot && slot.dataset.champion === champion.id);
    if (duplicate) clearSlot(duplicate);

    currentSlot.dataset.champion = champion.id;
    currentSlot.querySelector(".champion-name").textContent = champion.name;
    currentSlot.querySelector(".champion-button").innerHTML =
        `<img src="${championImage(champion)}" alt="${champion.name}">`;
    currentSlot.classList.add("selected");
    modal.classList.add("hidden");

    if (oldChampion !== champion.id && selectedRole) generateRecommendations();
}

function clearSlot(slot) {
    delete slot.dataset.champion;
    slot.querySelector(".champion-name").textContent = "Sin seleccionar";
    slot.querySelector(".champion-button").innerHTML = "+";
    slot.classList.remove("selected");
    if (selectedRole) generateRecommendations();
}

function clearDraft() {
    document.querySelectorAll(".player-slot").forEach(slot => {
        delete slot.dataset.champion;
        slot.querySelector(".champion-name").textContent = "Sin seleccionar";
        slot.querySelector(".champion-button").innerHTML = "+";
        slot.classList.remove("selected");
    });

    selectedRole = null;
    roleButtons.forEach(button => button.classList.remove("active"));
    recommendationInfo.textContent = "Selecciona una posición.";
    recommendationsContainer.className = "recommendations-empty";
    recommendationsContainer.innerHTML =
        "<p>Completa el draft y elige el rol que quieres recomendar.</p>";
}

document.querySelectorAll(".champion-button").forEach(button => {
    button.addEventListener("click", () =>
        openChampionModal(button.closest(".player-slot"))
    );
});

document.querySelectorAll(".remove-pick").forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();
        clearSlot(button.closest(".player-slot"));
    });
});

clearDraftButton.addEventListener("click", clearDraft);
closeModal.addEventListener("click", () => modal.classList.add("hidden"));

modal.addEventListener("click", event => {
    if (event.target === modal) modal.classList.add("hidden");
});

searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase().trim();
    showChampions(
        champions.filter(champion =>
            champion.name.toLowerCase().includes(search)
        )
    );
});

roleButtons.forEach(button => {
    button.addEventListener("click", () => {
        roleButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        selectedRole = button.dataset.role;
        recommendationInfo.textContent =
            `Mejores opciones para ${selectedRole} con el draft actual`;
        generateRecommendations();
    });
});

function getSelectedAllies() {
    return Array.from(
        document.querySelectorAll('.player-slot[data-team="ally"]')
    )
        .filter(slot => slot.dataset.champion)
        .map(slot => ({
            champion: slot.dataset.champion,
            role: slot.dataset.role
        }));
}

function getSelectedEnemies() {
    return Array.from(
        document.querySelectorAll('.player-slot[data-team="enemy"]')
    )
        .filter(slot => slot.dataset.champion)
        .map(slot => ({
            champion: slot.dataset.champion,
            role: slot.dataset.role
        }));
}

function getSelectedChampions() {
    return Array.from(document.querySelectorAll(".player-slot"))
        .map(slot => slot.dataset.champion)
        .filter(Boolean);
}

function getEnemyForRole(role) {
    const slot = document.querySelector(
        `.player-slot[data-team="enemy"][data-role="${role}"]`
    );
    return slot?.dataset.champion || null;
}

/* SCORING */

function normalizeWinRate(winRate) {
    return Math.max(0, Math.min(100, 50 + (winRate - 50) * 3));
}

function applyConfidence(score, games, targetGames = 10) {
    if (!games || games <= 0) return 50;
    const confidence = Math.min(1, games / targetGames);
    return 50 + (score - 50) * confidence;
}

/* COMPOSICIÓN */

function getCompositionProfile(champion) {
    const customProfile = getCustomChampionProfile(champion.id);
    if (customProfile) return customProfile;

    const tags = champion.tags || [];
    const has = tag => tags.includes(tag);

    return {
        ad: has("Marksman") ? 1 : has("Assassin") ? 0.9 : has("Fighter") ? 0.75 : 0.15,
        ap: has("Mage") ? 1 : has("Support") ? 0.45 : 0.15,
        frontline: has("Tank") ? 1 : has("Fighter") ? 0.55 : 0.05,
        engage: has("Tank") ? 0.85 : has("Fighter") ? 0.4 : has("Support") ? 0.35 : 0.1,
        cc: has("Tank") ? 0.9 : has("Support") ? 0.65 : has("Mage") ? 0.45 : has("Fighter") ? 0.3 : 0.1,
        peel: has("Support") ? 0.75 : has("Tank") ? 0.55 : has("Mage") ? 0.25 : 0.1,
        poke: has("Mage") ? 0.65 : has("Marksman") ? 0.55 : has("Support") ? 0.4 : 0.15,
        sustain: has("Support") ? 0.45 : has("Fighter") ? 0.35 : has("Tank") ? 0.25 : 0.1,
        scaling: has("Marksman") ? 0.85 : has("Mage") ? 0.75 : has("Tank") ? 0.7 : has("Fighter") ? 0.65 : 0.6
    };
}
function calculateCompositionScore(candidate) {
    const allies = getSelectedAllies()
        .filter(item => item.champion !== candidate.id)
        .map(item => getChampion(item.champion))
        .filter(Boolean);

    if (!allies.length) {
        return { score: 50, strengths: [], needs: [] };
    }

    const keys = [
        "ad", "ap", "frontline", "engage", "cc",
        "peel", "poke", "sustain", "scaling"
    ];

    const labels = {
        ad: "daño físico",
        ap: "daño mágico",
        frontline: "frontline",
        engage: "engage",
        cc: "CC",
        peel: "peel",
        poke: "poke",
        sustain: "sustain",
        scaling: "scaling"
    };

    /*
        Objetivo aproximado de una composición completa.
        No significa que el equipo necesite llegar exactamente
        a todos estos valores: sirven para medir carencias.
    */
    const targets = {
        ad: 1.55,
        ap: 1.25,
        frontline: 1.15,
        engage: 0.95,
        cc: 1.30,
        peel: 0.75,
        poke: 0.70,
        sustain: 0.55,
        scaling: 1.30
    };

    /*
        Importancia de cada carencia.

        Frontline, engage y CC pesan bastante,
        pero no queremos que un tanque gane automáticamente
        por cubrir las tres cosas a la vez.
    */
    const importance = {
        ad: 1.05,
        ap: 1.05,
        frontline: 1.20,
        engage: 1.05,
        cc: 1.10,
        peel: 0.80,
        poke: 0.50,
        sustain: 0.45,
        scaling: 0.60
    };

    const totals = Object.fromEntries(keys.map(key => [key, 0]));

    allies.forEach(ally => {
        const profile = getCompositionProfile(ally);
        keys.forEach(key => {
            totals[key] += profile[key] || 0;
        });
    });

    const candidateProfile = getCompositionProfile(candidate);
    const deficits = {};

    keys.forEach(key => {
        deficits[key] = Math.max(
            0,
            Math.min(1, (targets[key] - totals[key]) / targets[key])
        );
    });

    /*
        COBERTURA DE NECESIDADES

        Cuanto mayor sea una carencia, más importa que
        el candidato sea bueno precisamente en ese atributo.
    */
    let totalNeed = 0;
let coveredNeed = 0;
let structuralNeed = 0;

const structuralKeys = ["ad", "ap", "frontline", "engage", "cc"];
const secondaryKeys = ["poke", "sustain", "scaling"];

keys.forEach(key => {
    let need = deficits[key] * importance[key];

    // Las carencias secundarias no pueden dominar el score
    if (secondaryKeys.includes(key)) need *= 0.45;

    totalNeed += need;
    coveredNeed += need * (candidateProfile[key] || 0);

    if (structuralKeys.includes(key)) {
        structuralNeed += need;
    }
});

const coverage = totalNeed > 0.05
    ? coveredNeed / totalNeed
    : 0.5;
    /*
        Reducimos la redundancia.

        Si el equipo ya tiene mucho de un atributo,
        añadir todavía más aporta poco.
    */
    let redundancy = 0;
    let redundancyWeight = 0;

    keys.forEach(key => {
        const profileValue = candidateProfile[key] || 0;
        const excess = Math.max(0, totals[key] - targets[key]);
        const saturation = Math.min(1, excess / targets[key]);

        redundancy += profileValue * saturation * importance[key];
        redundancyWeight += importance[key];
    });

    const redundancyRatio = redundancyWeight
        ? redundancy / redundancyWeight
        : 0;

    /*
        EQUILIBRIO DE DAÑO

        Comparamos el reparto AD/AP antes y después
        de añadir al candidato.
    */
    const beforeDamage = totals.ad + totals.ap;
    const beforeBalance = beforeDamage > 0
        ? Math.min(totals.ad, totals.ap) / Math.max(totals.ad, totals.ap, 0.01)
        : 0;

    const afterAD = totals.ad + (candidateProfile.ad || 0);
    const afterAP = totals.ap + (candidateProfile.ap || 0);
    const afterBalance = Math.min(afterAD, afterAP) / Math.max(afterAD, afterAP, 0.01);

    const balanceImprovement = afterBalance - beforeBalance;

    /*
        Sinergia estructural.

        Algunos atributos funcionan especialmente bien
        cuando el equipo tiene la pieza complementaria.
    */
    let structureBonus = 0;

    if (totals.frontline < 0.8 && candidateProfile.frontline >= 0.7) {
        structureBonus += 3;
    }

    if (totals.engage < 0.65 && candidateProfile.engage >= 0.7) {
        structureBonus += 2;
    }

    if (totals.cc < 0.9 && candidateProfile.cc >= 0.7) {
        structureBonus += 2;
    }

    if (totals.peel < 0.5 && candidateProfile.peel >= 0.65) {
        structureBonus += 1.5;
    }

    /*
        Si ya tenemos mucha frontline + engage + CC,
        evitamos premiar demasiado otro campeón que
        simplemente repita las mismas características.
    */
    const tankCoreAlreadyCovered =
        totals.frontline >= 1.3 &&
        totals.engage >= 1.1 &&
        totals.cc >= 1.4;

    if (
        tankCoreAlreadyCovered &&
        candidateProfile.frontline >= 0.7 &&
        candidateProfile.engage >= 0.6 &&
        candidateProfile.cc >= 0.6
    ) {
        structureBonus -= 3;
    }

    /*
        SCORE BASE

        50 = neutral.
        La cobertura de carencias es la parte principal.
    */
    let score = 42 + coverage * 48;

// Si las necesidades estructurales ya están cubiertas,
// las carencias secundarias no pueden generar un 80-90.
if (structuralNeed < 0.55) {
    const structuralFactor = Math.max(0, structuralNeed / 0.55);
    const maxScore = 62 + structuralFactor * 18;
    score = Math.min(score, maxScore);
}

    /*
        Mejorar el reparto AD/AP suma.
        Empeorarlo ligeramente puede restar.
    */
    score += balanceImprovement * 12;

    /*
        Penalización moderada por redundancia.
    */
    score -= redundancyRatio * 10;

    score += structureBonus;

    /*
        Evitamos extremos artificiales porque composición
        sigue siendo un heurístico y representa solo el 15%
        del Draft Score.
    */
    score = Math.max(30, Math.min(92, score));

    /*
        Fortalezas mostradas en la interfaz.

        Ordenamos por impacto real sobre las necesidades
        actuales, no simplemente por valor del perfil.
    */
    const strengths = keys
    .map(key => {
        const value = candidateProfile[key] || 0;
        const need = deficits[key];
        const weightedNeed = need * importance[key];

        // Aporte útil = cuánto aporta el campeón × cuánto lo necesita el equipo
        let impact = value * weightedNeed;

        // Las necesidades estructurales importantes reciben un pequeño bonus
        if (
            ["ad", "ap", "frontline", "engage", "cc"].includes(key) &&
            need >= 0.35
        ) {
            impact *= 1.15;
        }

        // Peel importa especialmente si realmente falta
        if (key === "peel" && need >= 0.45) {
            impact *= 1.10;
        }

        // Sustain, poke y scaling no deben dominar la explicación
        // salvo que la necesidad sea clara
        if (
            ["sustain", "poke", "scaling"].includes(key) &&
            need < 0.45
        ) {
            impact *= 0.55;
        }

        return {
            key,
            value,
            need,
            impact
        };
    })
    .filter(item =>
        item.value >= 0.40 &&
        item.need >= 0.20 &&
        item.impact >= 0.05
    )
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3)
    .map(item => labels[item.key]);
    const needs = keys
        .filter(key => deficits[key] >= 0.35)
        .sort(
            (a, b) =>
                deficits[b] * importance[b] -
                deficits[a] * importance[a]
        )
        .slice(0, 3)
        .map(key => labels[key]);

    return {
        score: Math.round(score),
        strengths,
        needs
    };
}

/* CONFIANZA GENERAL */

function calculateOverallConfidence(winRateData, enemyTeamData, synergyData) {
    const wrConfidence = getSampleConfidence(winRateData.games, 15);
    const enemyConfidence = getSampleConfidence(enemyTeamData.games, 20);
    const synergyConfidence = getSampleConfidence(synergyData.games, 20);

    /*
        Composición no entra en la confianza porque
        es un heurístico, no una estadística del dataset.
    */
    const confidence = (
        wrConfidence * 0.20 +
        enemyConfidence * 0.35 +
        synergyConfidence * 0.30
    ) / 0.85;

    return Math.max(0, Math.min(1, confidence));
}

function getOverallConfidenceLabel(value) {
    if (value < 0.20) return "Muy baja";
    if (value < 0.40) return "Baja";
    if (value < 0.65) return "Media";
    if (value < 0.82) return "Alta";
    return "Muy alta";
}

/* DRAFT SCORE */

function calculateDraftScore(champion) {
    const winRateData = getWinRateData(champion.id, selectedRole);
    const enemyChampion = getEnemyForRole(selectedRole);

    const matchupData = enemyChampion
        ? getMatchupData(champion.id, enemyChampion, selectedRole)
        : {
            found: false,
            games: 0,
            wins: 0,
            losses: 0,
            winRate: 50,
            adjustedWinRate: 50
        };

    const enemyTeamData = getEnemyTeamData(
        champion.id,
        selectedRole,
        getSelectedEnemies()
    );

    const synergyData = getAverageSynergy(
        champion.id,
        selectedRole,
        getSelectedAllies()
    );

    const compositionData = calculateCompositionScore(champion);

    /*
        WR general: stats.json ya tiene el WR ajustado.
        Aquí regulamos su influencia según la muestra.
    */
    const winRateScore = confidenceAdjustedScore(
        winRateData.adjustedWinRate,
        winRateData.games,
        15
    );

    /*
        Enemigos y sinergias ya gestionan su confianza
        relación por relación desde stats.js.
    */
    const enemyScore = enemyTeamData.score;
    const synergyScore = synergyData.score;
    const compositionScore = compositionData.score;

    /*
        PESOS DEL DRAFT SCORE

        35% enemigos
        30% sinergia
        20% WR
        15% composición
    */
    const impacts = {
        matchup: (enemyScore - 50) * 0.35,
        synergy: (synergyScore - 50) * 0.30,
        winRate: (winRateScore - 50) * 0.20,
        composition: (compositionScore - 50) * 0.15
    };

    const finalScore =
        50 +
        impacts.matchup +
        impacts.synergy +
        impacts.winRate +
        impacts.composition;

    const confidenceValue = calculateOverallConfidence(
        winRateData,
        enemyTeamData,
        synergyData
    );

    return {
        finalScore: Number(finalScore.toFixed(2)),
        winRateData,
        matchupData,
        enemyTeamData,
        synergyData,
        compositionData,
        enemyChampion,

        confidence: {
            value: Number(confidenceValue.toFixed(3)),
            percentage: Math.round(confidenceValue * 100),
            label: getOverallConfidenceLabel(confidenceValue)
        },

        scores: {
            winRateScore: Number(winRateScore.toFixed(2)),
            matchupScore: Number(enemyScore.toFixed(2)),
            synergyScore: Number(synergyScore.toFixed(2)),
            compositionScore: Number(compositionScore.toFixed(2))
        },

        impacts
    };
}

/* RECOMENDACIONES */

/* RECOMENDACIONES */

function generateRecommendations() {
    recommendationsContainer.innerHTML = "";
    recommendationsContainer.className = "";

    if (!selectedRole) return;

    const rolePool = getChampionsForRole(selectedRole);
    const selected = getSelectedChampions();

    /* TOP 5 NORMAL: MISMA LÓGICA QUE ANTES */
    const candidates = champions.filter(
        champion =>
            rolePool.has(champion.id) &&
            !selected.includes(champion.id)
    );

    const allNormalScores = candidates
        .map(champion => ({
            champion,
            ...calculateDraftScore(champion)
        }))
        .sort((a, b) => b.finalScore - a.finalScore);

    const recommendations = allNormalScores.slice(0, 5);

    if (!recommendations.length) {
        recommendationsContainer.className = "recommendations-empty";
        recommendationsContainer.innerHTML =
            `<p>No hay suficientes datos para recomendar campeones en ${selectedRole}.</p>`;
        return;
    }

    recommendations.forEach(
        (item, index) => createRecommendation(item, index)
    );

    /* TRICKY PICK */
    const trickyPick = calculateTrickyPick(
        selected,
        recommendations
    );

    if (trickyPick) {
        createTrickyPick(trickyPick);
    }
}

/* =========================================================
   TRICKY PICK
   ========================================================= */

/*
    El Tricky Pick NO es simplemente el sexto campeón.

    Buscamos un campeón:
    - realmente jugado en esta posición;
    - con mínimo 5 partidas;
    - fuera del pool estándar del rol;
    - que no esté ya seleccionado;
    - que no aparezca en el Top 5;
    - con alguna señal útil para el draft actual.

    La rareza ayuda, pero nunca sustituye a la evidencia.
*/
function calculateTrickyPick(selected, recommendations) {
    const MIN_TRICKY_GAMES = 5;
    const roleData = getAllRoleCandidateData(selectedRole, MIN_TRICKY_GAMES);

    if (!roleData.length) return null;

    const standardPool = new Set(ROLE_POOLS[selectedRole] || []);
    const topFiveIds = new Set(
        recommendations.map(item => item.champion.id)
    );

    const candidates = roleData
        .filter(data =>
            !selected.includes(data.champion) &&
            !topFiveIds.has(data.champion)
        )
        .map(data => {
            const champion = getChampion(data.champion);
            if (!champion) return null;

            const draftData = calculateDraftScore(champion);
            const popularity = getRolePopularityData(
                champion.id,
                selectedRole
            );

            const isStandardRole = standardPool.has(champion.id);

            const trickyData = calculateTrickyScore(
                champion,
                draftData,
                popularity,
                isStandardRole
            );

            return {
                champion,
                ...draftData,
                popularity,
                tricky: trickyData
            };
        })
        .filter(Boolean)
        .filter(item => item.tricky.eligible)
        .sort((a, b) => b.tricky.score - a.tricky.score);

    /*
        Diagnóstico:
        mostramos los 5 candidatos Tricky más fuertes.
        Esto luego lo podremos quitar.
    */
    console.table(
        candidates.slice(0, 5).map((item, index) => ({
            posicion: index + 1,
            champion: item.champion.name,
            role: selectedRole,
            type: item.tricky.type,
            games: item.winRateData.games,
            rarity: `${Math.round(item.tricky.rarity * 100)}%`,
            draftScore: item.finalScore,
            trickyScore: item.tricky.score,
            enemy: item.scores.matchupScore,
            synergy: item.scores.synergyScore,
            composition: item.scores.compositionScore
        }))
    );

    return candidates[0] || null;
}

function calculateTrickyScore(
    champion,
    draftData,
    popularity,
    isStandardRole
) {
    const games = draftData.winRateData.games;

    if (!games || games < 5) {
        return {
            eligible: false,
            score: 0,
            rarity: 0,
            evidence: "Insuficiente",
            type: "Experimental",
            reasons: []
        };
    }

    const rarity = Math.max(
        0,
        Math.min(1, popularity.percentile || 0)
    );

    /*
        CLASIFICACIÓN

        Standard + poco frecuente:
        campeón legítimo del rol pero no muy jugado.

        Fuera del pool:
        off-meta.

        Con muy pocas partidas:
        experimental.
    */
    let type;

    if (games < 10) {
        type = "Experimental";
    } else if (!isStandardRole) {
        type = "Off-meta";
    } else {
        type = "Poco frecuente";
    }

    /*
        RAREZA

        Antes dábamos hasta +8, demasiado para un factor
        descriptivo.

        Ahora aporta como máximo +5.
    */
    const rarityBonus = rarity * 5;

    /*
        EVIDENCIA

        Premia tener una muestra aprovechable, pero con
        un máximo pequeño para que los campeones populares
        no ganen simplemente por volumen.
    */
    const evidenceConfidence =
        getSampleConfidence(games, 18);

    const evidenceBonus =
        evidenceConfidence * 3;

    /*
        SEÑAL CONTEXTUAL

        Esto es lo más importante del Tricky Score:
        queremos que el campeón sea interesante para ESTE draft.
    */
    let contextualBonus = 0;
    let contextualSignals = 0;

    const enemyScore =
        draftData.scores.matchupScore;

    const synergyScore =
        draftData.scores.synergyScore;

    const compositionScore =
        draftData.scores.compositionScore;

    if (enemyScore >= 54) {
        contextualBonus += Math.min(
            6,
            (enemyScore - 50) * 0.30
        );
        contextualSignals++;
    }

    if (synergyScore >= 54) {
        contextualBonus += Math.min(
            5,
            (synergyScore - 50) * 0.25
        );
        contextualSignals++;
    }

    if (compositionScore >= 60) {
        contextualBonus += Math.min(
            4,
            (compositionScore - 50) * 0.12
        );
        contextualSignals++;
    }

    /*
        Un pick muy raro necesita una razón contextual.

        Así evitamos:
        5 partidas + rareza enorme = Tricky automático.
    */
    if (games < 10 && contextualSignals === 0) {
        return {
            eligible: false,
            score: 0,
            rarity,
            evidence: getTrickyEvidenceLabel(games),
            type,
            reasons: []
        };
    }

    /*
        EVITAMOS PICKS DEMASIADO HABITUALES

        Si está fuera de nuestro pool pero los propios datos
        dicen que es muy habitual (caso Sylas MID), no basta
        con que nuestra lista manual estuviera incompleta.

        Sin embargo, NO usamos un corte rígido general:
        un pick estándar como Rumble TOP puede seguir siendo
        Tricky si es relativamente poco frecuente.
    */
    if (!isStandardRole && rarity < 0.20 && games >= 35) {
        return {
            eligible: false,
            score: 0,
            rarity,
            evidence: getTrickyEvidenceLabel(games),
            type,
            reasons: []
        };
    }

    /*
        Para campeones estándar necesitamos al menos algo
        de rareza. No queremos convertir un pick muy común
        en "Tricky".
    */
    if (isStandardRole && rarity < 0.18) {
        return {
            eligible: false,
            score: 0,
            rarity,
            evidence: getTrickyEvidenceLabel(games),
            type,
            reasons: []
        };
    }

    /*
        El Draft Score real sigue siendo la base.

        Un campeón raro no debe salir si el modelo considera
        que el draft es claramente malo para él.
    */
    if (draftData.finalScore < 48) {
        return {
            eligible: false,
            score: 0,
            rarity,
            evidence: getTrickyEvidenceLabel(games),
            type,
            reasons: []
        };
    }

    let smallSamplePenalty = 0;

    if (games < 8) {
        smallSamplePenalty = 4;
    } else if (games < 15) {
        smallSamplePenalty = 2;
    }

    /*
        Para campeones extremadamente habituales queremos
        que haga falta una señal contextual especialmente buena.
    */
    let commonPickPenalty = 0;

    if (rarity < 0.30) {
        commonPickPenalty =
            (0.30 - rarity) * 10;
    }

    const trickyScore =
        draftData.finalScore +
        rarityBonus +
        evidenceBonus +
        contextualBonus -
        smallSamplePenalty -
        commonPickPenalty;

    const reasons = getTrickyReasons(
        champion,
        draftData,
        games
    );

    return {
        eligible: true,
        score: Number(trickyScore.toFixed(2)),
        rarity,
        evidence: getTrickyEvidenceLabel(games),
        type,
        contextualSignals,
        reasons
    };
}

function getTrickyReasons(
    champion,
    draftData,
    games
) {
    const reasons = [];
    const direct = draftData.enemyTeamData?.direct;

    if (
        direct?.found &&
        direct.score >= 54
    ) {
        const enemy = getChampion(direct.champion);

        reasons.push(
            `Buen dato directo contra ${enemy?.name || direct.champion} (${direct.games} muestras)`
        );
    }

    if (
        draftData.enemyTeamData?.relationships >= 3 &&
        draftData.scores.matchupScore >= 54
    ) {
        reasons.push(
            `Señal positiva frente a ${draftData.enemyTeamData.relationships} rivales del draft`
        );
    }

    if (
        draftData.synergyData?.relationships >= 2 &&
        draftData.scores.synergyScore >= 54
    ) {
        reasons.push(
            "Buena sinergia con la composición aliada"
        );
    }

    if (
        draftData.compositionData?.score >= 60 &&
        draftData.compositionData.strengths.length
    ) {
        reasons.push(
            `Aporta ${
                draftData.compositionData.strengths
                    .slice(0, 2)
                    .join(" y ")
            }`
        );
    }

    if (
        draftData.winRateData.adjustedWinRate >= 52
    ) {
        reasons.push(
            `WR ajustado positivo en ${selectedRole}`
        );
    }

    if (!reasons.length) {
        reasons.push(
            `Tiene ${games} partidas reales registradas en ${selectedRole}`
        );
    }

    return reasons.slice(0, 3);
}

function createTrickyPick(item) {
    const div = document.createElement("article");

    div.className =
        "recommendation tricky-pick";

    /*
        Estilo provisional aquí mismo para no obligarnos
        todavía a modificar style.css.
    */
    div.style.marginTop = "18px";
    div.style.border =
        "1px solid rgba(200,155,60,.65)";
    div.style.background =
        "linear-gradient(135deg, rgba(200,155,60,.08), rgba(15,20,28,.96))";
    div.style.boxShadow =
        "0 0 20px rgba(200,155,60,.08)";

    const games =
        item.winRateData.games;

    const evidence = item.tricky.evidence;
    const trickyType = item.tricky.type;

    const rarityPercent =
        Math.round(
            item.tricky.rarity * 100
        );

    const matchupImpact =
        formatImpact(item.impacts.matchup);

    const synergyImpact =
        formatImpact(item.impacts.synergy);

    const winRateImpact =
        formatImpact(item.impacts.winRate);

    const compositionImpact =
        formatImpact(item.impacts.composition);

    const reasonsHTML =
        item.tricky.reasons
            .map(
                reason =>
                    `<div style="margin-top:5px;">✓ ${reason}</div>`
            )
            .join("");

    div.innerHTML = `
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:12px;
        ">
            <div>
                <strong style="
                    font-size:13px;
                    letter-spacing:1.4px;
                    color:#c89b3c;
                ">
                    ⚡ TRICKY PICK
                </strong>

                <div style="
                    font-size:11px;
                    opacity:.65;
                    margin-top:3px;
                ">
                    Pick poco convencional detectado por los datos
                </div>
            </div>

            <div style="
                font-size:11px;
                padding:4px 8px;
                border:1px solid rgba(200,155,60,.35);
                border-radius:20px;
            ">
                ${trickyType} · ${evidence}
            </div>
        </div>

        <div class="recommendation-top">
            <div class="recommendation-left">

                <img
                    src="${championImage(item.champion)}"
                    alt="${item.champion.name}"
                >

                <div class="recommendation-name">
                    <strong>
                        ${item.champion.name}
                    </strong>

                    <small>
                        ${selectedRole}
                        · ${games} partidas
                        · rareza ${rarityPercent}%
                    </small>
                </div>
            </div>

            <div class="recommendation-score">
                <strong>
                    ${item.finalScore.toFixed(1)}
                </strong>

                <small>
                    Draft Score
                </small>
            </div>
        </div>

        <div class="metrics">

            ${metric(
                percentData(item.winRateData),
                "WR ajustado",
                `${games} partidas · ${getConfidenceLabel(games)}`
            )}

            ${metric(
                `${item.scores.matchupScore.toFixed(1)}/100`,
                "Vs enemigos",
                item.enemyTeamData.found
                    ? `${item.enemyTeamData.relationships}/5 relaciones · ${item.enemyTeamData.games} muestras`
                    : "sin datos · neutral"
            )}

            ${metric(
                `${item.scores.synergyScore.toFixed(1)}/100`,
                "Sinergia",
                item.synergyData.found
                    ? `${item.synergyData.relationships} relaciones · ${item.synergyData.games} muestras`
                    : "sin datos · neutral"
            )}

            ${metric(
                `${item.compositionData.score}/100`,
                "Composición",
                item.compositionData.strengths.join(" · ") ||
                    "neutral"
            )}

        </div>

        <div style="
            margin-top:12px;
            padding:11px 12px;
            border-radius:8px;
            background:rgba(0,0,0,.16);
            font-size:12px;
        ">
            <strong>
                ¿Por qué puede funcionar?
            </strong>

            ${reasonsHTML}
        </div>

        <div style="
            margin-top:10px;
            padding:10px 12px;
            border:1px solid rgba(255,255,255,.07);
            border-radius:8px;
            font-size:12px;
        ">
            <div style="
                margin-bottom:7px;
                opacity:.7;
            ">
                Impacto sobre el Draft Score
            </div>

            <div style="
                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:8px;
                text-align:center;
            ">
                <div>
                    <span style="opacity:.65;">
                        Vs enemigos
                    </span><br>
                    <strong>
                        ${matchupImpact}
                    </strong>
                </div>

                <div>
                    <span style="opacity:.65;">
                        Sinergia
                    </span><br>
                    <strong>
                        ${synergyImpact}
                    </strong>
                </div>

                <div>
                    <span style="opacity:.65;">
                        WR
                    </span><br>
                    <strong>
                        ${winRateImpact}
                    </strong>
                </div>

                <div>
                    <span style="opacity:.65;">
                        Composición
                    </span><br>
                    <strong>
                        ${compositionImpact}
                    </strong>
                </div>
            </div>
        </div>

        <small
            class="neutral-note"
            style="display:block;margin-top:10px;"
        >
            ⚠ Pick poco convencional.
            Tiene menos evidencia que las recomendaciones
            principales y debe interpretarse como una opción
            situacional, no como una recomendación estándar.
        </small>
    `;

    /*
        También podemos elegir el Tricky Pick haciendo click,
        exactamente igual que con una recomendación normal.
    */
    div.style.cursor = "pointer";
    div.title =
        `Elegir ${item.champion.name} para ${selectedRole}`;

    div.setAttribute(
        "role",
        "button"
    );

    div.setAttribute(
        "tabindex",
        "0"
    );

    function pickTricky() {
        const targetSlot =
            document.querySelector(
                `.player-slot[data-team="ally"][data-role="${selectedRole}"]`
            );

        if (!targetSlot) {
            console.error(
                `No se encontró el slot aliado para ${selectedRole}`
            );
            return;
        }

        currentSlot = targetSlot;
        selectChampion(item.champion);
        currentSlot = null;
    }

    div.addEventListener(
        "click",
        pickTricky
    );

    div.addEventListener(
        "keydown",
        event => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                pickTricky();
            }
        }
    );

    recommendationsContainer.appendChild(div);

    console.log(
        "Tricky Pick:",
        {
            champion: item.champion.name,
            role: selectedRole,
            games,
            draftScore: item.finalScore,
            trickyScore: item.tricky.score,
            rarity:
                `${rarityPercent}%`,
            evidence:
                item.tricky.evidence
        }
    );
}

function metric(value, label, sample = "") {
    return `
        <div class="metric">
            <span>${label}</span>
            <strong>${value}</strong>
            <small>${sample}</small>
        </div>
    `;
}

function percentData(data) {
    return data?.found
        ? `${data.adjustedWinRate.toFixed(1)}%`
        : "50.0%*";
}

function explainRecommendation(item) {
    const parts = [];

    if (item.enemyTeamData?.direct?.found) {
        const enemy = item.enemyTeamData.direct.champion;
        parts.push(
            `tiene datos directos contra ${getChampion(enemy)?.name || enemy}`
        );
    }

    if (item.enemyTeamData?.relationships > 1) {
        parts.push(
            `hay datos frente a ${item.enemyTeamData.relationships} rivales del draft`
        );
    }

    if (item.synergyData?.bestAlly) {
        const ally = item.synergyData.bestAlly.champion;
        parts.push(
            `su mejor sinergia registrada es con ${getChampion(ally)?.name || ally}`
        );
    }

    if (item.compositionData.strengths.length) {
        parts.push(
            `aporta ${item.compositionData.strengths.join(" y ")}`
        );
    }

    if (!parts.length) {
        parts.push(
            "la recomendación se apoya principalmente en sus estadísticas generales"
        );
    }

    return `${item.champion.name}: ${parts.join(", ")}.`;
}

function formatImpact(value) {
    if (Math.abs(value) < 0.05) return "±0.0";
    return value > 0
        ? `+${value.toFixed(1)}`
        : value.toFixed(1);
}function createRecommendation(item, index) {
    const div = document.createElement("article");
    div.className = `recommendation ${index === 0 ? "best-pick" : ""}`;

    const enemyLabel = `${item.scores.matchupScore.toFixed(1)}/100`;
    const synergyLabel = `${item.scores.synergyScore.toFixed(1)}/100`;

    const matchupImpact = formatImpact(item.impacts.matchup);
    const synergyImpact = formatImpact(item.impacts.synergy);
    const winRateImpact = formatImpact(item.impacts.winRate);
    const compositionImpact = formatImpact(item.impacts.composition);

    div.innerHTML = `
        <div class="recommendation-top">
            <div class="recommendation-left">
                <span class="rank">${index + 1}</span>
                <img src="${championImage(item.champion)}" alt="${item.champion.name}">
                <div class="recommendation-name">
                    <strong>${item.champion.name}</strong>
                    <small>
                        Confianza ${item.confidence.label}
                        · ${item.confidence.percentage}%
                    </small>
                </div>
            </div>

            <div class="recommendation-score">
                <strong>${item.finalScore.toFixed(1)}</strong>
                <small>Draft Score</small>
            </div>
        </div>

        <div class="metrics">
            ${metric(
                percentData(item.winRateData),
                "WR ajustado",
                item.winRateData.found
                    ? `${item.winRateData.games} partidas · ${getConfidenceLabel(item.winRateData.games)}`
                    : "sin datos"
            )}

            ${metric(
                enemyLabel,
                "Vs enemigos",
                item.enemyTeamData.found
                    ? `${item.enemyTeamData.relationships}/5 relaciones · ${item.enemyTeamData.games} muestras · ${item.enemyTeamData.confidence}`
                    : "sin datos · neutral"
            )}

            ${metric(
                synergyLabel,
                "Sinergia",
                item.synergyData.found
                    ? `${item.synergyData.relationships} relaciones · ${item.synergyData.games} muestras · ${item.synergyData.confidence}`
                    : "sin datos · neutral"
            )}

            ${metric(
                `${item.compositionData.score}/100`,
                "Composición",
                item.compositionData.strengths.join(" · ") || "neutral"
            )}
        </div>

        <div style="
            margin-top:10px;
            padding:10px 12px;
            border:1px solid rgba(255,255,255,.08);
            border-radius:8px;
            font-size:12px;
        ">
            <div style="margin-bottom:7px;opacity:.7;">
                Impacto sobre el Draft Score
            </div>

            <div style="
                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:8px;
                text-align:center;
            ">
                <div>
                    <span style="opacity:.65;">Vs enemigos</span><br>
                    <strong>${matchupImpact}</strong>
                </div>

                <div>
                    <span style="opacity:.65;">Sinergia</span><br>
                    <strong>${synergyImpact}</strong>
                </div>

                <div>
                    <span style="opacity:.65;">WR</span><br>
                    <strong>${winRateImpact}</strong>
                </div>

                <div>
                    <span style="opacity:.65;">Composición</span><br>
                    <strong>${compositionImpact}</strong>
                </div>
            </div>
        </div>

        <p class="recommendation-explanation">
            ${explainRecommendation(item)}
        </p>

        <small class="neutral-note">
            * Draft Score parte de 50.
            Los datos con pocas partidas se acercan a neutral
            y ganan influencia al aumentar la muestra.
        </small>
    `;

    div.style.cursor = "pointer";
    div.title = `Elegir ${item.champion.name} para ${selectedRole}`;
    div.setAttribute("role", "button");
    div.setAttribute("tabindex", "0");

    function pickRecommendation() {
        const targetSlot = document.querySelector(
            `.player-slot[data-team="ally"][data-role="${selectedRole}"]`
        );

        if (!targetSlot) {
            console.error(
                `No se encontró el slot aliado para ${selectedRole}`
            );
            return;
        }

        currentSlot = targetSlot;
        selectChampion(item.champion);
        currentSlot = null;
    }

    div.addEventListener("click", pickRecommendation);

    div.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            pickRecommendation();
        }
    });

    recommendationsContainer.appendChild(div);
}

/* DATASET */

function updateDatasetStatus() {
    const patch = draftStats.filters?.patch || "?";
    const matches = draftStats.matchesProcessed || 0;

    datasetStatus.textContent =
        `${matches} Ranked · parche ${patch}`;
}

async function startApp() {
    try {
        await Promise.all([
            loadChampions(),
            loadStats()
        ]);

        updateDatasetStatus();

        console.log(
            "Draft Assistant preparado",
            {
                champions: champions.length,
                matches: draftStats.matchesProcessed,
                enemyRelations: draftStats.enemies?.length,
                synergies: draftStats.synergies?.length
            }
        );
    } catch (error) {
        console.error(error);
        datasetStatus.textContent = "Error cargando datos";
    }
}

startApp();