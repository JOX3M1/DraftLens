/*
    LOL DRAFT ASSISTANT
    PERFILES DE COMPOSICIÓN

    Valores entre 0 y 1.

    ad         = daño físico
    ap         = daño mágico
    frontline  = capacidad de jugar delante
    engage     = capacidad de iniciar
    cc         = control de masas
    peel       = protección para carries
    poke       = presión a distancia
    sustain    = curación / aguante prolongado
    scaling    = rendimiento tardío

    IMPORTANTE:
    Son valores heurísticos para analizar composición.
    No sustituyen los datos reales de stats.json.

    La composición representa únicamente el 15%
    del Draft Score total.
*/

const CHAMPION_PROFILES = {

    /* =========================
       A
       ========================= */

    Aatrox: {
        ad: 0.95, ap: 0.00, frontline: 0.65,
        engage: 0.45, cc: 0.40, peel: 0.15,
        poke: 0.20, sustain: 1.00, scaling: 0.65
    },

    Ahri: {
        ad: 0.05, ap: 0.95, frontline: 0.05,
        engage: 0.60, cc: 0.65, peel: 0.25,
        poke: 0.60, sustain: 0.20, scaling: 0.75
    },

    Akali: {
        ad: 0.10, ap: 1.00, frontline: 0.10,
        engage: 0.60, cc: 0.05, peel: 0.05,
        poke: 0.35, sustain: 0.25, scaling: 0.80
    },

    Akshan: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.30, cc: 0.05, peel: 0.10,
        poke: 0.65, sustain: 0.05, scaling: 0.75
    },

    Alistar: {
        ad: 0.05, ap: 0.25, frontline: 1.00,
        engage: 1.00, cc: 1.00, peel: 0.95,
        poke: 0.05, sustain: 0.25, scaling: 0.70
    },

    Ambessa: {
        ad: 1.00, ap: 0.00, frontline: 0.50,
        engage: 0.70, cc: 0.45, peel: 0.10,
        poke: 0.10, sustain: 0.60, scaling: 0.75
    },

    Amumu: {
        ad: 0.05, ap: 0.70, frontline: 0.90,
        engage: 1.00, cc: 1.00, peel: 0.65,
        poke: 0.10, sustain: 0.15, scaling: 0.75
    },

    Anivia: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.20, cc: 0.90, peel: 0.80,
        poke: 0.80, sustain: 0.05, scaling: 0.95
    },

    Annie: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.80, cc: 0.85, peel: 0.40,
        poke: 0.55, sustain: 0.05, scaling: 0.70
    },

    Aphelios: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.05, cc: 0.25, peel: 0.10,
        poke: 0.45, sustain: 0.20, scaling: 1.00
    },

    Ashe: {
        ad: 0.95, ap: 0.10, frontline: 0.05,
        engage: 0.80, cc: 0.90, peel: 0.65,
        poke: 0.80, sustain: 0.05, scaling: 0.80
    },

    AurelionSol: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.40, cc: 0.75, peel: 0.45,
        poke: 0.75, sustain: 0.05, scaling: 1.00
    },

    Aurora: {
        ad: 0.00, ap: 1.00, frontline: 0.10,
        engage: 0.65, cc: 0.60, peel: 0.30,
        poke: 0.65, sustain: 0.10, scaling: 0.85
    },

    Azir: {
        ad: 0.05, ap: 1.00, frontline: 0.05,
        engage: 0.55, cc: 0.60, peel: 0.60,
        poke: 0.85, sustain: 0.05, scaling: 1.00
    },

    /* =========================
       B
       ========================= */

    Bard: {
        ad: 0.10, ap: 0.45, frontline: 0.15,
        engage: 0.65, cc: 0.85, peel: 0.80,
        poke: 0.55, sustain: 0.35, scaling: 0.85
    },

    Belveth: {
        ad: 1.00, ap: 0.10, frontline: 0.35,
        engage: 0.45, cc: 0.30, peel: 0.10,
        poke: 0.05, sustain: 0.50, scaling: 1.00
    },

    Blitzcrank: {
        ad: 0.10, ap: 0.35, frontline: 0.75,
        engage: 1.00, cc: 1.00, peel: 0.65,
        poke: 0.15, sustain: 0.05, scaling: 0.55
    },

    Brand: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.20, cc: 0.50, peel: 0.20,
        poke: 0.90, sustain: 0.05, scaling: 0.85
    },

    Braum: {
        ad: 0.10, ap: 0.10, frontline: 1.00,
        engage: 0.50, cc: 0.90, peel: 1.00,
        poke: 0.20, sustain: 0.10, scaling: 0.75
    },

    Briar: {
        ad: 1.00, ap: 0.05, frontline: 0.60,
        engage: 0.85, cc: 0.55, peel: 0.10,
        poke: 0.05, sustain: 1.00, scaling: 0.75
    },

    /* =========================
       C
       ========================= */

    Caitlyn: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.05, cc: 0.30, peel: 0.20,
        poke: 0.90, sustain: 0.05, scaling: 0.85
    },

    Camille: {
        ad: 0.95, ap: 0.05, frontline: 0.40,
        engage: 0.80, cc: 0.60, peel: 0.15,
        poke: 0.10, sustain: 0.35, scaling: 0.90
    },

    Cassiopeia: {
        ad: 0.00, ap: 1.00, frontline: 0.10,
        engage: 0.35, cc: 0.70, peel: 0.60,
        poke: 0.55, sustain: 0.45, scaling: 1.00
    },

    Chogath: {
        ad: 0.10, ap: 0.70, frontline: 1.00,
        engage: 0.55, cc: 0.90, peel: 0.70,
        poke: 0.40, sustain: 0.55, scaling: 0.90
    },

    Corki: {
        ad: 0.85, ap: 0.30, frontline: 0.05,
        engage: 0.10, cc: 0.15, peel: 0.10,
        poke: 0.90, sustain: 0.05, scaling: 0.85
    },

    /* =========================
       D
       ========================= */

    Darius: {
        ad: 1.00, ap: 0.00, frontline: 0.70,
        engage: 0.25, cc: 0.45, peel: 0.20,
        poke: 0.05, sustain: 0.65, scaling: 0.55
    },

    Diana: {
        ad: 0.05, ap: 1.00, frontline: 0.40,
        engage: 0.90, cc: 0.65, peel: 0.15,
        poke: 0.20, sustain: 0.20, scaling: 0.80
    },

    Draven: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.05, cc: 0.20, peel: 0.10,
        poke: 0.50, sustain: 0.05, scaling: 0.65
    },

    DrMundo: {
        ad: 0.55, ap: 0.15, frontline: 1.00,
        engage: 0.15, cc: 0.10, peel: 0.10,
        poke: 0.35, sustain: 1.00, scaling: 0.90
    },

    /* =========================
       E
       ========================= */

    Ekko: {
        ad: 0.05, ap: 1.00, frontline: 0.15,
        engage: 0.65, cc: 0.35, peel: 0.15,
        poke: 0.30, sustain: 0.35, scaling: 0.90
    },

    Elise: {
        ad: 0.05, ap: 1.00, frontline: 0.15,
        engage: 0.65, cc: 0.65, peel: 0.25,
        poke: 0.55, sustain: 0.20, scaling: 0.45
    },

    Evelynn: {
        ad: 0.05, ap: 1.00, frontline: 0.05,
        engage: 0.40, cc: 0.25, peel: 0.05,
        poke: 0.15, sustain: 0.20, scaling: 0.80
    },

    Ezreal: {
        ad: 0.90, ap: 0.25, frontline: 0.05,
        engage: 0.05, cc: 0.05, peel: 0.10,
        poke: 1.00, sustain: 0.05, scaling: 0.85
    },

    /* =========================
       F
       ========================= */

    Fiddlesticks: {
        ad: 0.00, ap: 1.00, frontline: 0.10,
        engage: 0.95, cc: 0.85, peel: 0.35,
        poke: 0.20, sustain: 0.75, scaling: 0.85
    },

    Fiora: {
        ad: 1.00, ap: 0.00, frontline: 0.25,
        engage: 0.20, cc: 0.05, peel: 0.10,
        poke: 0.05, sustain: 0.65, scaling: 1.00
    },

    Fizz: {
        ad: 0.05, ap: 1.00, frontline: 0.05,
        engage: 0.70, cc: 0.45, peel: 0.10,
        poke: 0.20, sustain: 0.05, scaling: 0.75
    },

    /* =========================
       G
       ========================= */

    Galio: {
        ad: 0.05, ap: 0.75, frontline: 0.90,
        engage: 0.90, cc: 1.00, peel: 0.90,
        poke: 0.30, sustain: 0.10, scaling: 0.70
    },

    Gangplank: {
        ad: 0.95, ap: 0.10, frontline: 0.15,
        engage: 0.15, cc: 0.35, peel: 0.25,
        poke: 0.95, sustain: 0.25, scaling: 1.00
    },

    Garen: {
        ad: 0.95, ap: 0.00, frontline: 0.75,
        engage: 0.30, cc: 0.20, peel: 0.10,
        poke: 0.05, sustain: 0.75, scaling: 0.65
    },

    Gnar: {
        ad: 0.85, ap: 0.10, frontline: 0.65,
        engage: 0.75, cc: 0.80, peel: 0.45,
        poke: 0.65, sustain: 0.15, scaling: 0.75
    },

    Gragas: {
        ad: 0.05, ap: 0.85, frontline: 0.75,
        engage: 0.85, cc: 0.90, peel: 0.85,
        poke: 0.50, sustain: 0.55, scaling: 0.75
    },

    Graves: {
        ad: 1.00, ap: 0.00, frontline: 0.35,
        engage: 0.15, cc: 0.20, peel: 0.15,
        poke: 0.55, sustain: 0.20, scaling: 0.90
    },

    Gwen: {
        ad: 0.05, ap: 1.00, frontline: 0.40,
        engage: 0.20, cc: 0.10, peel: 0.05,
        poke: 0.15, sustain: 0.70, scaling: 1.00
    },

    /* =========================
       H
       ========================= */

    Hecarim: {
        ad: 0.95, ap: 0.05, frontline: 0.60,
        engage: 0.95, cc: 0.70, peel: 0.20,
        poke: 0.05, sustain: 0.55, scaling: 0.80
    },

    Heimerdinger: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.10, cc: 0.40, peel: 0.55,
        poke: 0.95, sustain: 0.05, scaling: 0.80
    },

    Hwei: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.35, cc: 0.80, peel: 0.65,
        poke: 1.00, sustain: 0.05, scaling: 0.90
    },

    /* =========================
       I
       ========================= */

    Illaoi: {
        ad: 1.00, ap: 0.00, frontline: 0.70,
        engage: 0.10, cc: 0.15, peel: 0.10,
        poke: 0.30, sustain: 0.90, scaling: 0.70
    },

    Irelia: {
        ad: 0.95, ap: 0.05, frontline: 0.40,
        engage: 0.65, cc: 0.35, peel: 0.10,
        poke: 0.10, sustain: 0.65, scaling: 0.85
    },

    Ivern: {
        ad: 0.00, ap: 0.45, frontline: 0.15,
        engage: 0.25, cc: 0.65, peel: 1.00,
        poke: 0.35, sustain: 0.75, scaling: 0.85
    },

    /* =========================
       J
       ========================= */

    Janna: {
        ad: 0.05, ap: 0.45, frontline: 0.05,
        engage: 0.20, cc: 0.80, peel: 1.00,
        poke: 0.50, sustain: 0.65, scaling: 0.90
    },

    JarvanIV: {
        ad: 0.90, ap: 0.05, frontline: 0.70,
        engage: 1.00, cc: 0.80, peel: 0.40,
        poke: 0.25, sustain: 0.10, scaling: 0.60
    },

    Jax: {
        ad: 0.90, ap: 0.15, frontline: 0.55,
        engage: 0.65, cc: 0.55, peel: 0.25,
        poke: 0.05, sustain: 0.35, scaling: 1.00
    },

    Jayce: {
        ad: 1.00, ap: 0.00, frontline: 0.10,
        engage: 0.10, cc: 0.25, peel: 0.20,
        poke: 1.00, sustain: 0.05, scaling: 0.80
    },

    Jhin: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.20, cc: 0.55, peel: 0.25,
        poke: 0.80, sustain: 0.05, scaling: 0.80
    },

    Jinx: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.05, cc: 0.30, peel: 0.15,
        poke: 0.60, sustain: 0.05, scaling: 1.00
    },

    /* =========================
       K
       ========================= */

    KSante: {
        ad: 0.45, ap: 0.05, frontline: 1.00,
        engage: 0.80, cc: 0.90, peel: 0.75,
        poke: 0.10, sustain: 0.40, scaling: 0.80
    },

    Kaisa: {
        ad: 0.85, ap: 0.35, frontline: 0.05,
        engage: 0.25, cc: 0.00, peel: 0.05,
        poke: 0.65, sustain: 0.05, scaling: 1.00
    },

    Kalista: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.35, cc: 0.35, peel: 0.35,
        poke: 0.35, sustain: 0.05, scaling: 0.70
    },

    Karma: {
        ad: 0.00, ap: 0.70, frontline: 0.10,
        engage: 0.20, cc: 0.55, peel: 0.95,
        poke: 0.85, sustain: 0.60, scaling: 0.75
    },

    Karthus: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.05, cc: 0.25, peel: 0.15,
        poke: 0.75, sustain: 0.05, scaling: 1.00
    },

    Kassadin: {
        ad: 0.05, ap: 1.00, frontline: 0.15,
        engage: 0.45, cc: 0.15, peel: 0.10,
        poke: 0.25, sustain: 0.15, scaling: 1.00
    },

    Katarina: {
        ad: 0.20, ap: 0.95, frontline: 0.05,
        engage: 0.55, cc: 0.00, peel: 0.00,
        poke: 0.20, sustain: 0.10, scaling: 0.80
    },

    Kayle: {
        ad: 0.35, ap: 0.85, frontline: 0.10,
        engage: 0.05, cc: 0.15, peel: 0.65,
        poke: 0.65, sustain: 0.45, scaling: 1.00
    },

    Kayn: {
        ad: 1.00, ap: 0.00, frontline: 0.45,
        engage: 0.65, cc: 0.30, peel: 0.10,
        poke: 0.25, sustain: 0.70, scaling: 0.85
    },

    Kennen: {
        ad: 0.10, ap: 0.95, frontline: 0.15,
        engage: 0.90, cc: 0.90, peel: 0.35,
        poke: 0.65, sustain: 0.10, scaling: 0.70
    },

    Khazix: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.40, cc: 0.15, peel: 0.05,
        poke: 0.45, sustain: 0.10, scaling: 0.80
    },

    Kindred: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.10, cc: 0.25, peel: 0.70,
        poke: 0.55, sustain: 0.25, scaling: 1.00
    },

    Kled: {
        ad: 1.00, ap: 0.00, frontline: 0.65,
        engage: 0.90, cc: 0.55, peel: 0.10,
        poke: 0.10, sustain: 0.30, scaling: 0.50
    },

    KogMaw: {
        ad: 0.75, ap: 0.55, frontline: 0.05,
        engage: 0.05, cc: 0.20, peel: 0.05,
        poke: 0.80, sustain: 0.05, scaling: 1.00
    },

    /* =========================
       L
       ========================= */

    Leblanc: {
        ad: 0.05, ap: 1.00, frontline: 0.05,
        engage: 0.45, cc: 0.40, peel: 0.15,
        poke: 0.70, sustain: 0.05, scaling: 0.70
    },

    LeeSin: {
        ad: 0.95, ap: 0.00, frontline: 0.45,
        engage: 0.75, cc: 0.65, peel: 0.60,
        poke: 0.20, sustain: 0.35, scaling: 0.45
    },

    Leona: {
        ad: 0.05, ap: 0.20, frontline: 1.00,
        engage: 1.00, cc: 1.00, peel: 0.75,
        poke: 0.05, sustain: 0.05, scaling: 0.65
    },

    Lillia: {
        ad: 0.00, ap: 1.00, frontline: 0.25,
        engage: 0.70, cc: 0.75, peel: 0.30,
        poke: 0.55, sustain: 0.35, scaling: 0.90
    },

    Lissandra: {
        ad: 0.00, ap: 0.95, frontline: 0.25,
        engage: 0.95, cc: 1.00, peel: 0.80,
        poke: 0.55, sustain: 0.20, scaling: 0.80
    },

    Lucian: {
        ad: 1.00, ap: 0.10, frontline: 0.05,
        engage: 0.10, cc: 0.00, peel: 0.05,
        poke: 0.65, sustain: 0.05, scaling: 0.75
    },

    Lulu: {
        ad: 0.00, ap: 0.45, frontline: 0.05,
        engage: 0.15, cc: 0.80, peel: 1.00,
        poke: 0.45, sustain: 0.55, scaling: 0.90
    },

    Lux: {
        ad: 0.00, ap: 0.95, frontline: 0.05,
        engage: 0.30, cc: 0.65, peel: 0.50,
        poke: 1.00, sustain: 0.05, scaling: 0.80
    },

    /* =========================
       M
       ========================= */

    Malphite: {
        ad: 0.05, ap: 0.60, frontline: 1.00,
        engage: 1.00, cc: 0.90, peel: 0.55,
        poke: 0.40, sustain: 0.10, scaling: 0.65
    },

    Malzahar: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.50, cc: 0.85, peel: 0.60,
        poke: 0.75, sustain: 0.05, scaling: 0.85
    },

    Maokai: {
        ad: 0.05, ap: 0.45, frontline: 1.00,
        engage: 1.00, cc: 1.00, peel: 0.90,
        poke: 0.50, sustain: 0.45, scaling: 0.80
    },

    MasterYi: {
        ad: 1.00, ap: 0.05, frontline: 0.10,
        engage: 0.20, cc: 0.00, peel: 0.00,
        poke: 0.05, sustain: 0.40, scaling: 1.00
    },

    Mel: {
        ad: 0.00, ap: 0.95, frontline: 0.05,
        engage: 0.25, cc: 0.55, peel: 0.75,
        poke: 0.90, sustain: 0.05, scaling: 0.85
    },

    Milio: {
        ad: 0.00, ap: 0.35, frontline: 0.05,
        engage: 0.05, cc: 0.40, peel: 1.00,
        poke: 0.30, sustain: 0.85, scaling: 0.90
    },

    MissFortune: {
        ad: 1.00, ap: 0.10, frontline: 0.05,
        engage: 0.10, cc: 0.25, peel: 0.10,
        poke: 0.75, sustain: 0.05, scaling: 0.80
    },

    Mordekaiser: {
        ad: 0.05, ap: 1.00, frontline: 0.80,
        engage: 0.30, cc: 0.35, peel: 0.25,
        poke: 0.15, sustain: 0.70, scaling: 0.80
    },

    Morgana: {
        ad: 0.00, ap: 0.85, frontline: 0.05,
        engage: 0.35, cc: 0.85, peel: 0.90,
        poke: 0.75, sustain: 0.35, scaling: 0.80
    },

    /* =========================
       N
       ========================= */

    Nami: {
        ad: 0.00, ap: 0.50, frontline: 0.05,
        engage: 0.55, cc: 0.80, peel: 0.90,
        poke: 0.45, sustain: 0.80, scaling: 0.85
    },

    Nasus: {
        ad: 0.95, ap: 0.10, frontline: 0.80,
        engage: 0.15, cc: 0.45, peel: 0.35,
        poke: 0.15, sustain: 0.75, scaling: 0.95
    },

    Nautilus: {
        ad: 0.10, ap: 0.30, frontline: 0.95,
        engage: 1.00, cc: 1.00, peel: 0.80,
        poke: 0.10, sustain: 0.05, scaling: 0.65
    },

    Naafiri: {
        ad: 1.00, ap: 0.00, frontline: 0.10,
        engage: 0.55, cc: 0.15, peel: 0.05,
        poke: 0.45, sustain: 0.15, scaling: 0.75
    },

    Neeko: {
        ad: 0.00, ap: 0.95, frontline: 0.10,
        engage: 0.90, cc: 0.95, peel: 0.60,
        poke: 0.70, sustain: 0.05, scaling: 0.75
    },

    Nidalee: {
        ad: 0.10, ap: 0.95, frontline: 0.05,
        engage: 0.05, cc: 0.00, peel: 0.15,
        poke: 1.00, sustain: 0.55, scaling: 0.65
    },

    Nilah: {
        ad: 1.00, ap: 0.05, frontline: 0.25,
        engage: 0.65, cc: 0.55, peel: 0.35,
        poke: 0.05, sustain: 0.55, scaling: 0.95
    },

    Nocturne: {
        ad: 1.00, ap: 0.00, frontline: 0.40,
        engage: 0.95, cc: 0.45, peel: 0.10,
        poke: 0.10, sustain: 0.35, scaling: 0.75
    },

    Nunu: {
        ad: 0.05, ap: 0.55, frontline: 0.90,
        engage: 0.90, cc: 0.90, peel: 0.65,
        poke: 0.10, sustain: 0.65, scaling: 0.65
    },

    /* =========================
       O
       ========================= */

    Olaf: {
        ad: 1.00, ap: 0.00, frontline: 0.65,
        engage: 0.45, cc: 0.05, peel: 0.05,
        poke: 0.25, sustain: 0.85, scaling: 0.55
    },

    Orianna: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.70, cc: 0.75, peel: 0.80,
        poke: 0.85, sustain: 0.05, scaling: 1.00
    },

    Ornn: {
        ad: 0.15, ap: 0.40, frontline: 1.00,
        engage: 0.95, cc: 1.00, peel: 0.80,
        poke: 0.35, sustain: 0.20, scaling: 1.00
    },

    /* =========================
       P
       ========================= */

    Pantheon: {
        ad: 1.00, ap: 0.05, frontline: 0.45,
        engage: 0.70, cc: 0.60, peel: 0.25,
        poke: 0.45, sustain: 0.10, scaling: 0.50
    },

    Poppy: {
        ad: 0.45, ap: 0.10, frontline: 1.00,
        engage: 0.80, cc: 1.00, peel: 1.00,
        poke: 0.20, sustain: 0.10, scaling: 0.75
    },

    Pyke: {
        ad: 0.85, ap: 0.00, frontline: 0.15,
        engage: 0.90, cc: 0.85, peel: 0.35,
        poke: 0.30, sustain: 0.65, scaling: 0.55
    },

    /* =========================
       Q
       ========================= */

    Qiyana: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.80, cc: 0.70, peel: 0.20,
        poke: 0.40, sustain: 0.05, scaling: 0.75
    },

    Quinn: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.25, cc: 0.35, peel: 0.30,
        poke: 0.70, sustain: 0.05, scaling: 0.75
    },

    /* =========================
       R
       ========================= */

    Rakan: {
        ad: 0.05, ap: 0.45, frontline: 0.45,
        engage: 1.00, cc: 0.95, peel: 0.95,
        poke: 0.15, sustain: 0.45, scaling: 0.85
    },

    Rammus: {
        ad: 0.05, ap: 0.35, frontline: 1.00,
        engage: 0.95, cc: 0.95, peel: 0.75,
        poke: 0.05, sustain: 0.10, scaling: 0.75
    },

    RekSai: {
        ad: 0.95, ap: 0.00, frontline: 0.55,
        engage: 0.80, cc: 0.55, peel: 0.20,
        poke: 0.10, sustain: 0.35, scaling: 0.45
    },

    Rell: {
        ad: 0.05, ap: 0.20, frontline: 1.00,
        engage: 1.00, cc: 1.00, peel: 0.90,
        poke: 0.05, sustain: 0.05, scaling: 0.75
    },

    Renata: {
        ad: 0.00, ap: 0.40, frontline: 0.10,
        engage: 0.60, cc: 0.85, peel: 1.00,
        poke: 0.55, sustain: 0.30, scaling: 0.90
    },

    Renekton: {
        ad: 0.95, ap: 0.00, frontline: 0.65,
        engage: 0.60, cc: 0.55, peel: 0.20,
        poke: 0.10, sustain: 0.65, scaling: 0.40
    },

    Rengar: {
        ad: 1.00, ap: 0.00, frontline: 0.20,
        engage: 0.70, cc: 0.20, peel: 0.05,
        poke: 0.05, sustain: 0.45, scaling: 0.75
    },

    Riven: {
        ad: 1.00, ap: 0.00, frontline: 0.45,
        engage: 0.70, cc: 0.55, peel: 0.25,
        poke: 0.05, sustain: 0.25, scaling: 0.85
    },

    Rumble: {
        ad: 0.00, ap: 1.00, frontline: 0.35,
        engage: 0.30, cc: 0.40, peel: 0.20,
        poke: 0.80, sustain: 0.05, scaling: 0.80
    },

    Ryze: {
        ad: 0.00, ap: 1.00, frontline: 0.15,
        engage: 0.15, cc: 0.45, peel: 0.45,
        poke: 0.60, sustain: 0.10, scaling: 1.00
    },

    /* =========================
       S
       ========================= */

    Samira: {
        ad: 1.00, ap: 0.05, frontline: 0.15,
        engage: 0.50, cc: 0.10, peel: 0.10,
        poke: 0.20, sustain: 0.35, scaling: 0.85
    },

    Sejuani: {
        ad: 0.10, ap: 0.35, frontline: 1.00,
        engage: 1.00, cc: 1.00, peel: 0.85,
        poke: 0.25, sustain: 0.10, scaling: 0.75
    },

    Senna: {
        ad: 0.95, ap: 0.10, frontline: 0.05,
        engage: 0.20, cc: 0.50, peel: 0.75,
        poke: 1.00, sustain: 0.65, scaling: 1.00
    },

    Seraphine: {
        ad: 0.00, ap: 0.75, frontline: 0.05,
        engage: 0.65, cc: 0.85, peel: 0.95,
        poke: 0.90, sustain: 0.70, scaling: 0.90
    },

    Sett: {
        ad: 0.95, ap: 0.00, frontline: 0.85,
        engage: 0.75, cc: 0.70, peel: 0.55,
        poke: 0.10, sustain: 0.65, scaling: 0.65
    },

    Shaco: {
        ad: 0.75, ap: 0.55, frontline: 0.05,
        engage: 0.35, cc: 0.45, peel: 0.30,
        poke: 0.50, sustain: 0.05, scaling: 0.70
    },

    Shen: {
        ad: 0.35, ap: 0.25, frontline: 1.00,
        engage: 0.75, cc: 0.75, peel: 1.00,
        poke: 0.10, sustain: 0.35, scaling: 0.75
    },

    Shyvana: {
        ad: 0.70, ap: 0.55, frontline: 0.60,
        engage: 0.45, cc: 0.10, peel: 0.05,
        poke: 0.45, sustain: 0.20, scaling: 0.85
    },

    Singed: {
        ad: 0.00, ap: 0.95, frontline: 0.80,
        engage: 0.55, cc: 0.60, peel: 0.35,
        poke: 0.15, sustain: 0.55, scaling: 0.80
    },

    Sion: {
        ad: 0.45, ap: 0.15, frontline: 1.00,
        engage: 0.90, cc: 0.95, peel: 0.65,
        poke: 0.30, sustain: 0.15, scaling: 0.90
    },

    Sivir: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.30, cc: 0.00, peel: 0.20,
        poke: 0.70, sustain: 0.05, scaling: 0.95
    },

    Skarner: {
        ad: 0.40, ap: 0.25, frontline: 1.00,
        engage: 0.95, cc: 1.00, peel: 0.75,
        poke: 0.15, sustain: 0.20, scaling: 0.75
    },

    Smolder: {
        ad: 0.85, ap: 0.20, frontline: 0.05,
        engage: 0.05, cc: 0.15, peel: 0.10,
        poke: 0.80, sustain: 0.05, scaling: 1.00
    },

    Sona: {
        ad: 0.00, ap: 0.50, frontline: 0.05,
        engage: 0.45, cc: 0.60, peel: 1.00,
        poke: 0.55, sustain: 0.90, scaling: 1.00
    },

    Soraka: {
        ad: 0.00, ap: 0.45, frontline: 0.05,
        engage: 0.05, cc: 0.45, peel: 0.95,
        poke: 0.45, sustain: 1.00, scaling: 0.90
    },

    Swain: {
        ad: 0.00, ap: 1.00, frontline: 0.65,
        engage: 0.45, cc: 0.65, peel: 0.45,
        poke: 0.65, sustain: 0.95, scaling: 0.90
    },

    Sylas: {
        ad: 0.05, ap: 1.00, frontline: 0.35,
        engage: 0.65, cc: 0.50, peel: 0.20,
        poke: 0.20, sustain: 0.70, scaling: 0.85
    },

    Syndra: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.25, cc: 0.65, peel: 0.35,
        poke: 0.80, sustain: 0.05, scaling: 0.90
    },

    /* =========================
       T
       ========================= */

    TahmKench: {
        ad: 0.15, ap: 0.45, frontline: 1.00,
        engage: 0.45, cc: 0.70, peel: 0.95,
        poke: 0.30, sustain: 0.80, scaling: 0.75
    },

    Taliyah: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.45, cc: 0.80, peel: 0.65,
        poke: 0.85, sustain: 0.05, scaling: 0.90
    },

    Talon: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.50, cc: 0.15, peel: 0.05,
        poke: 0.45, sustain: 0.05, scaling: 0.70
    },

    Taric: {
        ad: 0.05, ap: 0.30, frontline: 0.80,
        engage: 0.35, cc: 0.65, peel: 1.00,
        poke: 0.05, sustain: 0.80, scaling: 0.90
    },

    Teemo: {
        ad: 0.25, ap: 0.90, frontline: 0.05,
        engage: 0.05, cc: 0.25, peel: 0.15,
        poke: 0.90, sustain: 0.10, scaling: 0.75
    },

    Thresh: {
        ad: 0.10, ap: 0.30, frontline: 0.65,
        engage: 0.95, cc: 1.00, peel: 1.00,
        poke: 0.30, sustain: 0.05, scaling: 0.90
    },

    Tristana: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.30, cc: 0.20, peel: 0.30,
        poke: 0.55, sustain: 0.05, scaling: 0.95
    },

    Trundle: {
        ad: 0.95, ap: 0.05, frontline: 0.75,
        engage: 0.30, cc: 0.45, peel: 0.45,
        poke: 0.05, sustain: 0.75, scaling: 0.75
    },

    Tryndamere: {
        ad: 1.00, ap: 0.05, frontline: 0.35,
        engage: 0.40, cc: 0.10, peel: 0.05,
        poke: 0.05, sustain: 0.70, scaling: 0.85
    },

    TwistedFate: {
        ad: 0.20, ap: 0.90, frontline: 0.05,
        engage: 0.45, cc: 0.65, peel: 0.35,
        poke: 0.65, sustain: 0.05, scaling: 0.80
    },

    Twitch: {
        ad: 0.95, ap: 0.20, frontline: 0.05,
        engage: 0.25, cc: 0.10, peel: 0.05,
        poke: 0.55, sustain: 0.05, scaling: 1.00
    },

    /* =========================
       U
       ========================= */

    Udyr: {
        ad: 0.60, ap: 0.55, frontline: 0.90,
        engage: 0.55, cc: 0.55, peel: 0.45,
        poke: 0.10, sustain: 0.80, scaling: 0.75
    },

    Urgot: {
        ad: 0.90, ap: 0.00, frontline: 0.75,
        engage: 0.40, cc: 0.55, peel: 0.30,
        poke: 0.45, sustain: 0.25, scaling: 0.75
    },

    /* =========================
       V
       ========================= */

    Varus: {
        ad: 0.75, ap: 0.65, frontline: 0.05,
        engage: 0.25, cc: 0.60, peel: 0.30,
        poke: 1.00, sustain: 0.05, scaling: 0.85
    },

    Vayne: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.05, cc: 0.25, peel: 0.20,
        poke: 0.20, sustain: 0.10, scaling: 1.00
    },

    Veigar: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.25, cc: 0.85, peel: 0.75,
        poke: 0.75, sustain: 0.05, scaling: 1.00
    },

    Velkoz: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.20, cc: 0.55, peel: 0.40,
        poke: 1.00, sustain: 0.05, scaling: 0.85
    },

    Vex: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.80, cc: 0.80, peel: 0.55,
        poke: 0.70, sustain: 0.05, scaling: 0.80
    },

    Vi: {
        ad: 0.95, ap: 0.00, frontline: 0.65,
        engage: 1.00, cc: 0.80, peel: 0.35,
        poke: 0.20, sustain: 0.20, scaling: 0.65
    },

    Viego: {
        ad: 1.00, ap: 0.05, frontline: 0.30,
        engage: 0.50, cc: 0.35, peel: 0.10,
        poke: 0.10, sustain: 0.55, scaling: 0.90
    },

    Viktor: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.20, cc: 0.55, peel: 0.55,
        poke: 0.90, sustain: 0.05, scaling: 1.00
    },

    Vladimir: {
        ad: 0.00, ap: 1.00, frontline: 0.25,
        engage: 0.20, cc: 0.05, peel: 0.05,
        poke: 0.30, sustain: 1.00, scaling: 1.00
    },

    Volibear: {
        ad: 0.55, ap: 0.55, frontline: 0.85,
        engage: 0.70, cc: 0.60, peel: 0.30,
        poke: 0.15, sustain: 0.75, scaling: 0.65
    },

    /* =========================
       W
       ========================= */

    Warwick: {
        ad: 0.75, ap: 0.25, frontline: 0.75,
        engage: 0.70, cc: 0.60, peel: 0.25,
        poke: 0.05, sustain: 1.00, scaling: 0.60
    },

    MonkeyKing: {
        ad: 0.95, ap: 0.00, frontline: 0.60,
        engage: 0.95, cc: 0.85, peel: 0.30,
        poke: 0.10, sustain: 0.25, scaling: 0.75
    },

    /* =========================
       X
       ========================= */

    Xayah: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.05, cc: 0.45, peel: 0.50,
        poke: 0.45, sustain: 0.05, scaling: 0.90
    },

    Xerath: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.10, cc: 0.45, peel: 0.30,
        poke: 1.00, sustain: 0.05, scaling: 0.90
    },

    XinZhao: {
        ad: 0.95, ap: 0.05, frontline: 0.70,
        engage: 0.80, cc: 0.55, peel: 0.50,
        poke: 0.10, sustain: 0.55, scaling: 0.65
    },

    /* =========================
       Y
       ========================= */

    Yasuo: {
        ad: 1.00, ap: 0.00, frontline: 0.30,
        engage: 0.75, cc: 0.55, peel: 0.45,
        poke: 0.20, sustain: 0.30, scaling: 1.00
    },

    Yone: {
        ad: 0.90, ap: 0.15, frontline: 0.30,
        engage: 0.80, cc: 0.70, peel: 0.20,
        poke: 0.25, sustain: 0.30, scaling: 1.00
    },

    Yorick: {
        ad: 0.95, ap: 0.05, frontline: 0.60,
        engage: 0.10, cc: 0.25, peel: 0.15,
        poke: 0.35, sustain: 0.50, scaling: 0.90
    },

    Yunara: {
        ad: 1.00, ap: 0.05, frontline: 0.05,
        engage: 0.10, cc: 0.20, peel: 0.15,
        poke: 0.60, sustain: 0.05, scaling: 0.95
    },

    Yuumi: {
        ad: 0.00, ap: 0.45, frontline: 0.00,
        engage: 0.05, cc: 0.40, peel: 0.80,
        poke: 0.45, sustain: 0.80, scaling: 0.85
    },

    /* =========================
       Z
       ========================= */

    Zac: {
        ad: 0.05, ap: 0.50, frontline: 1.00,
        engage: 1.00, cc: 1.00, peel: 0.75,
        poke: 0.10, sustain: 0.85, scaling: 0.80
    },

    Zed: {
        ad: 1.00, ap: 0.00, frontline: 0.05,
        engage: 0.50, cc: 0.10, peel: 0.05,
        poke: 0.55, sustain: 0.05, scaling: 0.70
    },

    Zeri: {
        ad: 1.00, ap: 0.10, frontline: 0.05,
        engage: 0.15, cc: 0.15, peel: 0.15,
        poke: 0.55, sustain: 0.05, scaling: 1.00
    },

    Ziggs: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.05, cc: 0.30, peel: 0.30,
        poke: 1.00, sustain: 0.05, scaling: 0.90
    },

    Zilean: {
        ad: 0.00, ap: 0.55, frontline: 0.05,
        engage: 0.20, cc: 0.65, peel: 1.00,
        poke: 0.55, sustain: 0.25, scaling: 0.95
    },

    Zoe: {
        ad: 0.00, ap: 1.00, frontline: 0.05,
        engage: 0.10, cc: 0.55, peel: 0.25,
        poke: 1.00, sustain: 0.05, scaling: 0.80
    },

    Zyra: {
        ad: 0.00, ap: 0.90, frontline: 0.05,
        engage: 0.35, cc: 0.80, peel: 0.65,
        poke: 0.95, sustain: 0.05, scaling: 0.80
    },
    Locke: {
        ad: 0.85, ap: 0.20, frontline: 0.65,
        engage: 0.75, cc: 0.65, peel: 0.30,
        poke: 0.15, sustain: 0.55, scaling: 0.75
    },

    Zaahen: {
        ad: 0.95, ap: 0.05, frontline: 0.65,
        engage: 0.70, cc: 0.55, peel: 0.20,
        poke: 0.15, sustain: 0.70, scaling: 0.80
    }
};


/*
    Devuelve el perfil manual de un campeón.

    Si devuelve null, app.js utilizará el fallback
    de Data Dragon. Esto permite que la web siga
    funcionando si Riot añade un campeón nuevo.
*/
function getCustomChampionProfile(championId) {
    return CHAMPION_PROFILES[championId] || null;
}


/*
    Función auxiliar para comprobar desde consola
    qué campeones todavía están usando fallback.

    Ejemplo:
        getChampionsWithoutProfile()
*/
function getChampionsWithoutProfile() {
    if (typeof champions === "undefined") {
        console.warn("La lista de campeones todavía no está cargada.");
        return [];
    }

    const missing = champions
        .filter(champion => !CHAMPION_PROFILES[champion.id])
        .map(champion => champion.id);

    console.log(
        `Perfiles: ${champions.length - missing.length}/${champions.length}`
    );

    if (missing.length) {
        console.warn(
            "Campeones sin perfil manual:",
            missing
        );
    } else {
        console.log(
            "Todos los campeones cargados tienen perfil manual."
        );
    }

    return missing;
}