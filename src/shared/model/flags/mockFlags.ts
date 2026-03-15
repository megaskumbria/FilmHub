export interface IFlagItem {
  id: number;
  flagName: string;
  color: string;
  bg: string;
  isUsed: boolean;
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
      },
      {
        id: 2,
        flagName: "Предсказуемая обыденность",
        color: "#f2e6d8",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
      },
      {
        id: 3,
        flagName: "Удовлетворительная структура",
        color: "#a9dce3",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
      },
      {
        id: 4,
        flagName: "Захватывающие повествование",
        color: "#ff937e",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: false,
      },
      {
        id: 5,
        flagName: "Литературyный шедевр",
        color: "#008a73",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: true,
      },
    ],
  },

  {
    category: "Страшность",
    flagItems: [
      {
        id: 1,
        flagName: "Лёгкий",
        color: "#8b8680",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
      },
      {
        id: 2,
        flagName: "Ниже среднего",
        color: "#f2e6d8",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
      },
      {
        id: 3,
        flagName: "Средний",
        color: "#a9dce3",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
      },
      {
        id: 4,
        flagName: "Жуткий",
        color: "#ff937e",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: true,
      },
      {
        id: 5,
        flagName: "Кошмарный",
        color: "#008a73",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
      },
      {
        id: 6,
        flagName: "Бессонница",
        color: "#008a73",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
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
      },
      {
        id: 2,
        flagName: "Кинематографичная",
        color: "#ffd166",
        bg: "rgba(255, 209, 102, 0.38)",
        isUsed: false,
      },
      {
        id: 3,
        flagName: "Реалистичная",
        color: "#f4a261",
        bg: "rgba(244, 162, 97, 0.38)",
        isUsed: true,
      },
      {
        id: 4,
        flagName: "Натуралистичная",
        color: "#e63946",
        bg: "rgba(230, 57, 70, 0.38)",
        isUsed: false,
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
      },
      {
        id: 2,
        flagName: "Театральное",
        color: "#f9a826",
        bg: "rgba(249, 168, 38, 0.38)",
        isUsed: false,
      },
      {
        id: 3,
        flagName: "Обильное",
        color: "#ef476f",
        bg: "rgba(239, 71, 111, 0.38)",
        isUsed: true,
      },
      {
        id: 4,
        flagName: "Беспощадное",
        color: "#c1121f",
        bg: "rgba(193, 18, 31, 0.38)",
        isUsed: false,
      },
    ],
  },
];
// градиент эмоции — от безопасного/нейтрального → тревожного → опасного → ужасающего.
// каждая категория должна иметь свой “характер” цвета, но при этом внутри категории сохраняется градиент интенсивности.
