import mockSliderOne from "../../../../public/images/mock-slider-1.jpg";
import mockSliderTwo from "../../../../public/images/mock-slider-2.jpg";
import mockSliderThree from "../../../../public/images/mock-slider-3.jpg";
import mockSliderFour from "../../../../public/images/mock-slider-4.jpg";
// import mockSliderFive from "../../../../public/images/mock-slider-5.jpg";
import mockSliderSix from "../../../../public/images/mock-slider-6.jpg";

export interface MovieCardData {
  id: number;
  imgUrl: string;
  title: string;
  genres: string[];
  description: string;
  yearOfRelease: number;
  rating: number;
  durationMinutes: number;
  posters?: string[];
}

export const mockMovies: MovieCardData[] = [
  {
    id: 1,
    imgUrl: "/images/mock-movie-6.jpg",
    title: "The Last House on the Left",
    genres: ["horror", "thriller"],
    description: `A couple and their daughter head to a lake house for a quiet weekend. Their getaway turns into a nightmare when the daughter meets a boy whose criminal family breaks in—and violence triggers the parents’ brutal revenge.`,
    yearOfRelease: 2009,
    rating: 6.5,
    durationMinutes: 110,
  },
  {
    id: 2,
    imgUrl: "/images/mock-movie-5.webp",
    title: "A Minecraft Movie",
    genres: ["fantasy", "adventure"],
    description: `A group of misfits slips through a portal into the blocky world of Minecraft. They team up with experts—including Steve—for an epic quest to save the world from destruction.`,
    yearOfRelease: 2025,
    rating: 7.0,
    durationMinutes: 108,
  },
  {
    id: 3,
    imgUrl: "/images/mock-movie-1.jpg",
    title: "Insidious",
    genres: ["horror", "thriller"],
    description: `After moving into a new home, a family’s son suddenly falls into a coma. Paranormal events escalate, threatening their lives and sanity.`,
    yearOfRelease: 2010,
    rating: 6.8,
    durationMinutes: 103,
  },
  {
    id: 4,
    imgUrl: "/images/mock-movie-9.webp",
    title: "Incendies",
    genres: ["drama", "mystery", "war"],
    description:
      "When twins Jeanne and Simon read their mother’s will, they learn her last wish is to find a father they thought dead and a brother they never knew existed—uncovering a past she had kept hidden.",
    yearOfRelease: 2010,
    rating: 8.1,
    durationMinutes: 131,
  },
  {
    id: 5,
    imgUrl: "/images/mock-movie-4.jpg",
    title: "The Lord of the Rings: The Two Towers",
    genres: ["fantasy", "adventure"],
    description: `The peoples of Middle-earth fight on while Frodo and Sam brave the dangers of Mordor and the fellowship battles across forests and fortresses for the fate of the world.`,
    yearOfRelease: 2002,
    rating: 8.7,
    durationMinutes: 179,
  },
  {
    id: 6,
    imgUrl: "/images/mock-movie-7.webp",
    title: "Titanic",
    genres: ["melodrama", "drama", "disaster", "disaster"],
    description: `A romance between a young aristocrat and a struggling artist aboard the “unsinkable” liner ends in one fateful night.`,
    yearOfRelease: 1997,
    rating: 7.8,
    durationMinutes: 194,
  },
  {
    id: 7,
    imgUrl: "/images/mock-slider-5.jpg",
    title: "Avengers: Endgame",
    genres: ["sci-fi", "adventure", "action"],
    description: `The Avengers and their allies must devise a new plan to stop a universe-ending threat.`,
    yearOfRelease: 2019,
    rating: 8.4,
    durationMinutes: 181,
    posters: [
      mockSliderOne.src,
      mockSliderTwo.src,
      mockSliderThree.src,
      mockSliderFour.src,
      mockSliderSix.src,
    ],
  },
  {
    id: 8,
    imgUrl: "/images/mock-movie-2.webp",
    title: "The Platform",
    genres: ["sci-fi", "thriller", "horror"],
    description: `In a vertical prison, a food platform descends floor by floor. The lower you are, the fiercer the fight for survival.`,
    yearOfRelease: 2019,
    rating: 7.9,
    durationMinutes: 94,
  },
];
