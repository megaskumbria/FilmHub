export interface IFlagItem {
  id: number;
  flagName: string;
  color: string;
  bg: string;
  bgOpacity?: number;
  isUsed?: boolean;
  fontFamily?: string;
  icon?: string | null;
}

interface IFlagData {
  category: string;
  flagItems: IFlagItem[];
}

export const flagsData: IFlagData[] = [
  {
    category: "Plot",
    flagItems: [
      {
        id: 1,
        flagName: "Narrative chaos",
        color: "rgba(139, 134, 128, 1)",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Predictable mundanity",
        color: "rgba(242, 230, 216, 1)",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Satisfying structure",
        color: "rgba(169, 220, 227, 1)",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Captivating storytelling",
        color: "rgba(255, 147, 126, 1)",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Literary masterpiece",
        color: "rgba(0, 138, 115, 1)",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Scariness",
    flagItems: [
      {
        id: 1,
        flagName: "Mild",
        color: "rgba(139, 134, 128, 1)",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Below average",
        color: "rgba(242, 230, 216, 1)",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Medium",
        color: "rgba(169, 220, 227, 1)",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Creepy",
        color: "rgba(255, 147, 126, 1)",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Nightmarish",
        color: "rgba(0, 138, 115, 1)",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 6,
        flagName: "Sleepless",
        color: "rgba(0, 138, 115, 1)",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Brutality",
    flagItems: [
      {
        id: 1,
        flagName: "Symbolic",
        color: "rgba(125, 211, 192, 1)",
        bg: "rgba(125, 211, 192, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Cinematic",
        color: "rgba(255, 209, 102, 1)",
        bg: "rgba(255, 209, 102, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Realistic",
        color: "rgba(244, 162, 97, 1)",
        bg: "rgba(244, 162, 97, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Naturalistic",
        color: "rgba(230, 57, 70, 1)",
        bg: "rgba(230, 57, 70, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Bloodiness",
    flagItems: [
      {
        id: 1,
        flagName: "Sterile",
        color: "rgba(168, 218, 220, 1)",
        bg: "rgba(168, 218, 220, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Theatrical",
        color: "rgba(249, 168, 38, 1)",
        bg: "rgba(249, 168, 38, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Heavy",
        color: "rgba(239, 71, 111, 1)",
        bg: "rgba(239, 71, 111, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Relentless",
        color: "rgba(193, 18, 31, 1)",
        bg: "rgba(193, 18, 31, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Sound and atmosphere",
    flagItems: [
      {
        id: 1,
        flagName: "Silence",
        color: "rgba(156, 163, 175, 1)",
        bg: "rgba(156, 163, 175, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Background noise",
        color: "rgba(129, 140, 248, 1)",
        bg: "rgba(129, 140, 248, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Tense sound design",
        color: "rgba(167, 139, 250, 1)",
        bg: "rgba(167, 139, 250, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Immersive",
        color: "rgba(124, 58, 237, 1)",
        bg: "rgba(124, 58, 237, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Oppressive atmosphere",
        color: "rgba(91, 33, 182, 1)",
        bg: "rgba(91, 33, 182, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Humor",
    flagItems: [
      {
        id: 1,
        flagName: "Serious",
        color: "rgba(120, 113, 108, 1)",
        bg: "rgba(120, 113, 108, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Ironic",
        color: "rgba(252, 211, 77, 1)",
        bg: "rgba(252, 211, 77, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },

      {
        id: 5,
        flagName: "Grotesque",
        color: "rgba(234, 88, 12, 1)",
        bg: "rgba(234, 88, 12, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Tension",
    flagItems: [
      {
        id: 1,
        flagName: "Relaxed",
        color: "rgba(148, 163, 184, 1)",
        bg: "rgba(148, 163, 184, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Light anticipation",
        color: "rgba(100, 116, 139, 1)",
        bg: "rgba(100, 116, 139, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Building",
        color: "rgba(59, 130, 246, 1)",
        bg: "rgba(59, 130, 246, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Intense",
        color: "rgba(29, 78, 216, 1)",
        bg: "rgba(29, 78, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Unbearable",
        color: "rgba(30, 58, 138, 1)",
        bg: "rgba(30, 58, 138, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Visual style",
    flagItems: [
      {
        id: 1,
        flagName: "Grounded realism",
        color: "rgba(110, 231, 183, 1)",
        bg: "rgba(110, 231, 183, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Stylized",
        color: "rgba(52, 211, 153, 1)",
        bg: "rgba(52, 211, 153, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Surreal",
        color: "rgba(16, 185, 129, 1)",
        bg: "rgba(16, 185, 129, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Hallucinatory",
        color: "rgba(5, 150, 105, 1)",
        bg: "rgba(5, 150, 105, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Trip visuals",
        color: "rgba(4, 120, 87, 1)",
        bg: "rgba(4, 120, 87, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },
];
// Emotion gradient — from safe/neutral → anxious → dangerous → horrifying.
// Each category should have its own color “character”, but within a category the intensity gradient stays consistent.
