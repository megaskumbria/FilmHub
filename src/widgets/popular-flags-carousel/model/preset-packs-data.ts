export interface PresetFlagItem {
  id: string;
  flagName: string;
  color: string;
  bgOpacity: number;
  fontFamily: string;
  iconName?: string;
}

export interface PresetPack {
  id: string;
  title: string;
  description: string;
  scaleName: string;
  usageCount: number;
  flags: PresetFlagItem[];
}

export const PRESET_PACKS: PresetPack[] = [
  {
    id: "1",
    title: "Pacing",
    description: "How fast the story moves — from glacial to breakneck",
    scaleName: "Pacing",
    usageCount: 2140,
    flags: [
      {
        id: "301",
        flagName: "Sleepy",
        color: "rgba(148, 163, 184, 1)",
        fontFamily: "Roboto",
        bgOpacity: 0.38,
        iconName: "zzz",
      },
      {
        id: "302",
        flagName: "Leisurely",
        color: "rgba(100, 116, 139, 1)",
        fontFamily: "Roboto",
        bgOpacity: 0.38,
        iconName: "walk",
      },
      {
        id: "303",
        flagName: "Steady",
        color: "rgba(99, 102, 241, 1)",
        fontFamily: "Roboto",
        bgOpacity: 0.38,
        iconName: "player-play",
      },
      {
        id: "304",
        flagName: "Dynamic",
        color: "rgba(139, 92, 246, 1)",
        fontFamily: "Roboto",
        bgOpacity: 0.38,
        iconName: "bolt",
      },
      {
        id: "305",
        flagName: "Breakneck",
        color: "rgba(217, 70, 239, 1)",
        fontFamily: "Roboto",
        bgOpacity: 0.38,
        iconName: "rocket",
      },
    ],
  },
  {
    id: "2",
    title: "Emotional weight",
    description: "How hard the film hits — from featherlight to crushing",
    scaleName: "Emotional weight",
    usageCount: 1876,
    flags: [
      {
        id: "306",
        flagName: "Weightless",
        color: "rgba(251, 207, 232, 1)",
        fontFamily: "Playfair Display",
        bgOpacity: 0.38,
      },
      {
        id: "307",
        flagName: "Mellow ache",
        color: "rgba(244, 114, 182, 1)",
        fontFamily: "Playfair Display",
        bgOpacity: 0.38,
      },
      {
        id: "308",
        flagName: "Heart-clenching",
        color: "rgba(236, 72, 153, 1)",
        fontFamily: "Playfair Display",
        bgOpacity: 0.38,
      },
      {
        id: "309",
        flagName: "Hollowing",
        color: "rgba(190, 24, 93, 1)",
        fontFamily: "Playfair Display",
        bgOpacity: 0.38,
      },
      {
        id: "310",
        flagName: "Soul-scouring",
        color: "rgba(244, 63, 94, 1)",
        fontFamily: "Playfair Display",
        bgOpacity: 0.38,
      },
    ],
  },
  {
    id: "3",
    title: "Predictability",
    description: "How easy the ending is to guess — from obvious to incomprehensible",
    scaleName: "Predictability",
    usageCount: 1654,
    flags: [
      {
        id: "311",
        flagName: "Telegraphed",
        color: "rgba(253, 230, 138, 1)",
        fontFamily: "Rubik",
        bgOpacity: 0.38,
      },
      {
        id: "312",
        flagName: "Readable",
        color: "rgba(251, 191, 36, 1)",
        fontFamily: "Rubik",
        bgOpacity: 0.38,
      },
      {
        id: "313",
        flagName: "Has a twist",
        color: "rgba(245, 158, 11, 1)",
        fontFamily: "Rubik",
        bgOpacity: 0.38,
      },
      {
        id: "314",
        flagName: "Unpredictable",
        color: "rgba(217, 119, 6, 1)",
        fontFamily: "Rubik",
        bgOpacity: 0.38,
      },
      {
        id: "315",
        flagName: "Mind-blowing",
        color: "rgba(180, 83, 9, 1)",
        fontFamily: "Rubik",
        bgOpacity: 0.38,
      },
    ],
  },
  {
    id: "4",
    title: "Gloom",
    description: "Overall tone — from sunny to pitch-black",
    scaleName: "Gloom",
    usageCount: 2033,
    flags: [
      {
        id: "316",
        flagName: "Bright",
        color: "rgba(209, 213, 219, 1)",
        fontFamily: "Spectral",
        bgOpacity: 0.38,
        iconName: "sun",
      },
      {
        id: "317",
        flagName: "Shadowed",
        color: "rgba(156, 163, 175, 1)",
        fontFamily: "Spectral",
        bgOpacity: 0.38,
        iconName: "cloud",
      },
      {
        id: "318",
        flagName: "Somber",
        color: "rgba(107, 114, 128, 1)",
        fontFamily: "Spectral",
        bgOpacity: 0.38,
        iconName: "cloud-rain",
      },
      {
        id: "319",
        flagName: "Oppressive",
        color: "rgba(75, 85, 99, 1)",
        fontFamily: "Spectral",
        bgOpacity: 0.38,
        iconName: "storm",
      },
      {
        id: "320",
        flagName: "Lightless",
        color: "rgba(100, 116, 139, 1)",
        fontFamily: "Spectral",
        bgOpacity: 0.38,
        iconName: "moon-stars",
      },
    ],
  },
  {
    id: "5",
    title: "Absurdity",
    description: "How far the film drifts from reality — from mundane to unhinged",
    scaleName: "Absurdity",
    usageCount: 987,
    flags: [
      {
        id: "321",
        flagName: "Grounded",
        color: "rgba(209, 213, 219, 1)",
        fontFamily: "Fredoka",
        bgOpacity: 0.38,
        iconName: "home",
      },
      {
        id: "322",
        flagName: "Quirky",
        color: "rgba(253, 186, 116, 1)",
        fontFamily: "Fredoka",
        bgOpacity: 0.38,
        iconName: "star-half",
      },
      {
        id: "323",
        flagName: "Grotesque",
        color: "rgba(249, 115, 22, 1)",
        fontFamily: "Fredoka",
        bgOpacity: 0.38,
        iconName: "skull",
      },
      {
        id: "324",
        flagName: "Absurdist",
        color: "rgba(234, 88, 12, 1)",
        fontFamily: "Fredoka",
        bgOpacity: 0.38,
        iconName: "alien",
      },
      {
        id: "325",
        flagName: "Pure chaos",
        color: "rgba(194, 65, 12, 1)",
        fontFamily: "Fredoka",
        bgOpacity: 0.38,
        iconName: "confetti",
      },
    ],
  },
  {
    id: "6",
    title: "Character believability",
    description: "How alive and convincing the characters feel",
    scaleName: "Character believability",
    usageCount: 1321,
    flags: [
      {
        id: "326",
        flagName: "Cardboard",
        color: "rgba(148, 163, 184, 1)",
        fontFamily: "Lora",
        bgOpacity: 0.38,
      },
      {
        id: "327",
        flagName: "Functional",
        color: "rgba(94, 234, 212, 1)",
        fontFamily: "Lora",
        bgOpacity: 0.38,
      },
      {
        id: "328",
        flagName: "Layered",
        color: "rgba(45, 212, 191, 1)",
        fontFamily: "Lora",
        bgOpacity: 0.38,
      },
      {
        id: "329",
        flagName: "Alive",
        color: "rgba(20, 184, 166, 1)",
        fontFamily: "Lora",
        bgOpacity: 0.38,
      },
      {
        id: "330",
        flagName: "Unforgettable",
        color: "rgba(13, 148, 136, 1)",
        fontFamily: "Lora",
        bgOpacity: 0.38,
      },
    ],
  },
  {
    id: "7",
    title: "Viewing comfort",
    description: "How easy it is to watch — from background noise to endurance test",
    scaleName: "Viewing comfort",
    usageCount: 1789,
    flags: [
      {
        id: "331",
        flagName: "Background",
        color: "rgba(196, 181, 253, 1)",
        fontFamily: "Quicksand",
        bgOpacity: 0.38,
      },
      {
        id: "332",
        flagName: "Relaxing",
        color: "rgba(167, 139, 250, 1)",
        fontFamily: "Quicksand",
        bgOpacity: 0.38,
      },
      {
        id: "333",
        flagName: "Demands attention",
        color: "rgba(139, 92, 246, 1)",
        fontFamily: "Quicksand",
        bgOpacity: 0.38,
      },
      {
        id: "334",
        flagName: "Grueling",
        color: "rgba(121, 87, 237, 1)",
        fontFamily: "Quicksand",
        bgOpacity: 0.38,
      },
      {
        id: "335",
        flagName: "Survival mode",
        color: "rgba(142, 105, 245, 1)",
        fontFamily: "Quicksand",
        bgOpacity: 0.38,
      },
    ],
  },
];
