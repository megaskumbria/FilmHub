import { useTranslations } from "next-intl";

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
  name: "Pavel",
  handle: "@pavel_films",
  initials: "PI",
  color: "#9b56f0",
};

export const useMockComments = (): Comment[] => {
  const t = useTranslations("collections.comments.mock");

  return [
    {
      id: 1,
      author: { name: "Alex Morozov", handle: "@alex_films", initials: "AM", color: "#2563eb" },
      text: t("c1"),
      timestamp: t("h2"),
      likes: 14,
      dislikes: 1,
      replies: [
        {
          id: 11,
          author: PAVEL,
          text: t("c1r1"),
          timestamp: t("h1"),
          likes: 5,
          dislikes: 0,
        },
        {
          id: 12,
          author: {
            name: "Marina Kovaleva",
            handle: "@marina_k",
            initials: "MK",
            color: "#db2777",
          },
          text: t("c1r2"),
          timestamp: t("m45"),
          likes: 3,
          dislikes: 0,
        },
      ],
    },
    {
      id: 2,
      author: { name: "Dmitry Volkov", handle: "@dmitry_v", initials: "DV", color: "#059669" },
      text: t("c2"),
      timestamp: t("h5"),
      likes: 8,
      dislikes: 2,
      replies: [
        {
          id: 21,
          author: PAVEL,
          text: t("c2r1"),
          timestamp: t("h4"),
          likes: 6,
          dislikes: 0,
        },
      ],
    },
    {
      id: 3,
      author: { name: "Julia Belova", handle: "@yulia_cinema", initials: "JB", color: "#d97706" },
      text: t("c3"),
      timestamp: t("yesterday"),
      likes: 22,
      dislikes: 0,
      replies: [
        {
          id: 31,
          author: PAVEL,
          text: t("c3r1"),
          timestamp: t("yesterday"),
          likes: 7,
          dislikes: 0,
        },
      ],
    },
    {
      id: 4,
      author: { name: "Igor Stepanov", handle: "@igor_s", initials: "IS", color: "#dc2626" },
      text: t("c4"),
      timestamp: t("d2"),
      likes: 2,
      dislikes: 9,
      replies: [],
    },
    {
      id: 5,
      author: { name: "Svetlana Novak", handle: "@sveta_films", initials: "SN", color: "#0d9488" },
      text: t("c5"),
      timestamp: t("d3"),
      likes: 31,
      dislikes: 0,
      replies: [],
    },
  ];
};
