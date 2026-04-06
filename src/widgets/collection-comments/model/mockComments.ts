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
    author: { name: "Alex Morozov", handle: "@alex_films", initials: "AM", color: "#2563eb" },
    text: "Great picks! I especially liked the 80s classics. You rarely see a list where films from different eras mesh this well — you can tell the curator knows their stuff.",
    timestamp: "2 hours ago",
    likes: 14,
    dislikes: 1,
    replies: [
      {
        id: 11,
        author: PAVEL,
        text: "Thanks! I tried to choose titles that still feel relevant today.",
        timestamp: "1 hour ago",
        likes: 5,
        dislikes: 0,
      },
      {
        id: 12,
        author: { name: "Marina Kovaleva", handle: "@marina_k", initials: "MK", color: "#db2777" },
        text: "Same as Alex — the director choices really stand out; you can feel the expertise.",
        timestamp: "45 minutes ago",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    author: { name: "Dmitry Volkov", handle: "@dmitry_v", initials: "DV", color: "#059669" },
    text: 'Solid list, but a few genre staples are missing. Carpenter\'s "The Thing" and Argento\'s "Suspiria" come to mind — no serious horror roundup feels complete without them. Planning to add?',
    timestamp: "5 hours ago",
    likes: 8,
    dislikes: 2,
    replies: [
      {
        id: 21,
        author: PAVEL,
        text: 'On the roadmap! "The Thing" will definitely be in the next update.',
        timestamp: "4 hours ago",
        likes: 6,
        dislikes: 0,
      },
    ],
  },
  {
    id: 3,
    author: { name: "Julia Belova", handle: "@yulia_cinema", initials: "JB", color: "#d97706" },
    text: "Saved this for later — I have been looking for something exactly like it.",
    timestamp: "yesterday",
    likes: 22,
    dislikes: 0,
    replies: [
      {
        id: 31,
        author: PAVEL,
        text: "Glad it helped — I will keep adding to the collection.",
        timestamp: "yesterday",
        likes: 7,
        dislikes: 0,
      },
    ],
  },
  {
    id: 4,
    author: { name: "Igor Stepanov", handle: "@igor_s", initials: "IS", color: "#dc2626" },
    text: "I do not quite follow the selection logic. A few entries do not match the theme.",
    timestamp: "2 days ago",
    likes: 2,
    dislikes: 9,
    replies: [],
  },
  {
    id: 5,
    author: { name: "Svetlana Novak", handle: "@sveta_films", initials: "SN", color: "#0d9488" },
    text: "Followed your profile — lists this thoughtful are rare. You can tell you really love film. Keep it up; I am looking forward to the next updates!",
    timestamp: "3 days ago",
    likes: 31,
    dislikes: 0,
    replies: [],
  },
];
