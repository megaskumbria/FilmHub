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
        color: "rgba(139, 134, 128, 1)",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Предсказуемая обыденность",
        color: "rgba(242, 230, 216, 1)",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Удовлетворительная структура",
        color: "rgba(169, 220, 227, 1)",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Захватывающие повествование",
        color: "rgba(255, 147, 126, 1)",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Литературyный шедевр",
        color: "rgba(0, 138, 115, 1)",
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
        color: "rgba(139, 134, 128, 1)",
        bg: "rgba(139, 134, 128, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Ниже среднего",
        color: "rgba(242, 230, 216, 1)",
        bg: "rgba(242, 230, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Средняя",
        color: "rgba(169, 220, 227, 1)",
        bg: "rgba(169, 220, 227, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Жуткая",
        color: "rgba(255, 147, 126, 1)",
        bg: "rgba(255, 147, 126, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Кошмарная",
        color: "rgba(0, 138, 115, 1)",
        bg: "rgba(0, 138, 115, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 6,
        flagName: "Бессонница",
        color: "rgba(0, 138, 115, 1)",
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
        color: "rgba(125, 211, 192, 1)",
        bg: "rgba(125, 211, 192, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Кинематографичная",
        color: "rgba(255, 209, 102, 1)",
        bg: "rgba(255, 209, 102, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Реалистичная",
        color: "rgba(244, 162, 97, 1)",
        bg: "rgba(244, 162, 97, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Натуралистичная",
        color: "rgba(230, 57, 70, 1)",
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
        color: "rgba(168, 218, 220, 1)",
        bg: "rgba(168, 218, 220, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Театральное",
        color: "rgba(249, 168, 38, 1)",
        bg: "rgba(249, 168, 38, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Обильное",
        color: "rgba(239, 71, 111, 1)",
        bg: "rgba(239, 71, 111, 0.38)",
        isUsed: true,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Беспощадное",
        color: "rgba(193, 18, 31, 1)",
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
        color: "rgba(156, 163, 175, 1)",
        bg: "rgba(156, 163, 175, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Фоновый шум",
        color: "rgba(129, 140, 248, 1)",
        bg: "rgba(129, 140, 248, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Напряжённый саунд",
        color: "rgba(167, 139, 250, 1)",
        bg: "rgba(167, 139, 250, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Погружающий",
        color: "rgba(124, 58, 237, 1)",
        bg: "rgba(124, 58, 237, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Гнетущая атмосфера",
        color: "rgba(91, 33, 182, 1)",
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
        color: "rgba(120, 113, 108, 1)",
        bg: "rgba(120, 113, 108, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Ироничный",
        color: "rgba(252, 211, 77, 1)",
        bg: "rgba(252, 211, 77, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },

      {
        id: 5,
        flagName: "Гротеск",
        color: "rgba(234, 88, 12, 1)",
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
        color: "rgba(148, 163, 184, 1)",
        bg: "rgba(148, 163, 184, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Лёгкое ожидание",
        color: "rgba(100, 116, 139, 1)",
        bg: "rgba(100, 116, 139, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Нарастающая",
        color: "rgba(59, 130, 246, 1)",
        bg: "rgba(59, 130, 246, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Интенсивная",
        color: "rgba(29, 78, 216, 1)",
        bg: "rgba(29, 78, 216, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Невыносимая",
        color: "rgba(30, 58, 138, 1)",
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
        color: "rgba(110, 231, 183, 1)",
        bg: "rgba(110, 231, 183, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 2,
        flagName: "Стилизованный",
        color: "rgba(52, 211, 153, 1)",
        bg: "rgba(52, 211, 153, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 3,
        flagName: "Сюрреалистичный",
        color: "rgba(16, 185, 129, 1)",
        bg: "rgba(16, 185, 129, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 4,
        flagName: "Галлюциногенный",
        color: "rgba(5, 150, 105, 1)",
        bg: "rgba(5, 150, 105, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
      {
        id: 5,
        flagName: "Трип-визуал",
        color: "rgba(4, 120, 87, 1)",
        bg: "rgba(4, 120, 87, 0.38)",
        isUsed: false,
        fontFamily: "Manrope",
      },
    ],
  },
];
// градиент эмоции — от безопасного/нейтрального → тревожного → опасного → ужасающего.
// каждая категория должна иметь свой “характер” цвета, но при этом внутри категории сохраняется градиент интенсивности.
