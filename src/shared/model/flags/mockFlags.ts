export interface IFlagItem {
  id: number;
  flagName: string;
  color: string;
  bg: string;
  isUsed?: boolean;
  fontFamily?: string;
  icon?: string;
}

interface IFlagData {
  category: string;
  flagItems: IFlagItem[];
}

export const flagsData: IFlagData[] = [
  {
    category: "Cюжет",
    flagItems: [
      {
        id: 1,
        flagName: "Нарративный хаос",
        color: "#8b8680",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Предсказуемая обыденность",
        color: "#f2e6d8",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Удовлетворительная структура",
        color: "#a9dce3",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Захватывающие повествование",
        color: "#ff937e",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Литературyный шедевр",
        color: "#008a73",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Страшность",
    flagItems: [
      {
        id: 1,
        flagName: "Лёгкая",
        color: "#8b8680",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Ниже среднего",
        color: "#f2e6d8",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Средняя",
        color: "#a9dce3",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Жуткая",
        color: "#ff937e",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Кошмарная",
        color: "#008a73",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 6,
        flagName: "Бессонница",
        color: "#008a73",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Жестокость",
    flagItems: [
      {
        id: 1,
        flagName: "Символическая",
        color: "#7dd3c0",
        bg: "rgba(125, 211, 192, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Кинематографичная",
        color: "#ffd166",
        bg: "rgba(255, 209, 102, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Реалистичная",
        color: "#f4a261",
        bg: "rgba(244, 162, 97, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Натуралистичная",
        color: "#e63946",
        bg: "rgba(230, 57, 70, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Кровопролитие",
    flagItems: [
      {
        id: 1,
        flagName: "Стерильное",
        color: "#a8dadc",
        bg: "rgba(168, 218, 220, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Театральное",
        color: "#f9a826",
        bg: "rgba(249, 168, 38, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Обильное",
        color: "#ef476f",
        bg: "rgba(239, 71, 111, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Беспощадное",
        color: "#c1121f",
        bg: "rgba(193, 18, 31, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Звук и атмосфера",
    flagItems: [
      {
        id: 1,
        flagName: "Тишина",
        color: "#9ca3af",
        bg: "rgba(156, 163, 175, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Фоновый шум",
        color: "#818cf8",
        bg: "rgba(129, 140, 248, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Напряжённый саунд",
        color: "#a78bfa",
        bg: "rgba(167, 139, 250, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Погружающий",
        color: "#7c3aed",
        bg: "rgba(124, 58, 237, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Гнетущая атмосфера",
        color: "#5b21b6",
        bg: "rgba(91, 33, 182, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Юмор",
    flagItems: [
      {
        id: 1,
        flagName: "Серьёзный",
        color: "#78716c",
        bg: "rgba(120, 113, 108, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Ироничный",
        color: "#fcd34d",
        bg: "rgba(252, 211, 77, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },

      {
        id: 5,
        flagName: "Гротеск",
        color: "#ea580c",
        bg: "rgba(234, 88, 12, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Напряжённость",
    flagItems: [
      {
        id: 1,
        flagName: "Расслабленная",
        color: "#94a3b8",
        bg: "rgba(148, 163, 184, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Лёгкое ожидание",
        color: "#64748b",
        bg: "rgba(100, 116, 139, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Нарастающая",
        color: "#3b82f6",
        bg: "rgba(59, 130, 246, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Интенсивная",
        color: "#1d4ed8",
        bg: "rgba(29, 78, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Невыносимая",
        color: "#1e3a8a",
        bg: "rgba(30, 58, 138, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },

  {
    category: "Визуальный стиль",
    flagItems: [
      {
        id: 1,
        flagName: "Реалистичный",
        color: "#6ee7b7",
        bg: "rgba(110, 231, 183, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Стилизованный",
        color: "#34d399",
        bg: "rgba(52, 211, 153, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Сюрреалистичный",
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Галлюциногенный",
        color: "#059669",
        bg: "rgba(5, 150, 105, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Трип-визуал",
        color: "#047857",
        bg: "rgba(4, 120, 87, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },
];
// градиент эмоции — от безопасного/нейтрального → тревожного → опасного → ужасающего.
// каждая категория должна иметь свой “характер” цвета, но при этом внутри категории сохраняется градиент интенсивности.
