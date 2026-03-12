export interface CommentAuthor {
  name: string;
  handle: string;
  initials: string;
  color: string;
}

export interface Reply {
  id: number;
  author: CommentAuthor;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
}

export interface Comment {
  id: number;
  author: CommentAuthor;
  text: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Reply[];
}

const PAVEL: CommentAuthor = {
  name: "Pavel Ivanov",
  handle: "@pavel_films",
  initials: "PI",
  color: "#9b56f0",
};

export const mockComments: Comment[] = [
  {
    id: 1,
    author: { name: "Алексей Морозов", handle: "@alex_films", initials: "АМ", color: "#2563eb" },
    text: "Отличная подборка! Особенно порадовал выбор классики 80-х. Редко встретишь коллекцию, где так гармонично сочетаются фильмы разных эпох — видно, что автор действительно понимает, о чём говорит.",
    timestamp: "2 часа назад",
    likes: 14,
    dislikes: 1,
    replies: [
      {
        id: 11,
        author: PAVEL,
        text: "Спасибо! Старался подобрать именно те фильмы, которые не теряют актуальности со временем.",
        timestamp: "1 час назад",
        likes: 5,
        dislikes: 0,
      },
      {
        id: 12,
        author: { name: "Марина Ковалёва", handle: "@marina_k", initials: "МК", color: "#db2777" },
        text: "Согласна с Алексеем, особенно понравился выбор режиссёров — чувствуется знание темы.",
        timestamp: "45 минут назад",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    author: { name: "Дмитрий Волков", handle: "@dmitry_v", initials: "ДВ", color: "#059669" },
    text: "Хорошая коллекция, но не хватает нескольких ключевых представителей жанра. Например, «Нечто» Карпентера и «Суспирия» Ардженто — без них ни одна уважающая себя подборка по ужасам не обходится. Может, планируешь добавить?",
    timestamp: "5 часов назад",
    likes: 8,
    dislikes: 2,
    replies: [
      {
        id: 21,
        author: PAVEL,
        text: "Уже в планах! «Нечто» точно войдёт в следующем обновлении.",
        timestamp: "4 часа назад",
        likes: 6,
        dislikes: 0,
      },
    ],
  },
  {
    id: 3,
    author: { name: "Юлия Белова", handle: "@yulia_cinema", initials: "ЮБ", color: "#d97706" },
    text: "Сохранила себе! Давно искала что-то подобное.",
    timestamp: "вчера",
    likes: 22,
    dislikes: 0,
    replies: [
      {
        id: 31,
        author: PAVEL,
        text: "Рад, что пригодилось! Буду пополнять коллекцию.",
        timestamp: "вчера",
        likes: 7,
        dislikes: 0,
      },
    ],
  },
  {
    id: 4,
    author: { name: "Игорь Степанов", handle: "@igor_s", initials: "ИС", color: "#dc2626" },
    text: "Не совсем понял логику отбора. Некоторые фильмы явно не вписываются в тематику коллекции.",
    timestamp: "2 дня назад",
    likes: 2,
    dislikes: 9,
    replies: [],
  },
  {
    id: 5,
    author: { name: "Светлана Новак", handle: "@sveta_films", initials: "СН", color: "#0d9488" },
    text: "Подписалась на твой профиль! Такого качества коллекции редко встретишь. Видно, что человек действительно любит кино и понимает в нём толк. Продолжай в том же духе — очень жду следующих обновлений!",
    timestamp: "3 дня назад",
    likes: 31,
    dislikes: 0,
    replies: [],
  },
];
