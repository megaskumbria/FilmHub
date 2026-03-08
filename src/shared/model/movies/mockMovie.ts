import mockSliderOne from "../../../../public/images/mock-slider-1.jpg";
import mockSliderTwo from "../../../../public/images/mock-slider-2.jpg";
import mockSliderThree from "../../../../public/images/mock-slider-3.jpg";
import mockSliderFour from "../../../../public/images/mock-slider-4.jpg";
// import mockSliderFive from "../../../../public/images/mock-slider-5.jpg";
import mockSliderSix from "../../../../public/images/mock-slider-6.jpg";

export interface IMovieCardData {
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

export const mockMovies: IMovieCardData[] = [
  {
    id: 1,
    imgUrl: "/images/mock-movie-6.jpg",
    title: "Последний дом слева",
    genres: ["ужасы", "триллер"],
    description: `Семейная пара с дочерью отправляется отдохнуть в загородный дом. Их спокойные выходные превращаются в кошмар, когда дочь знакомится с парнем, члены его криминальной семьи проникают в дом, и насилие приводит к кровавой мести родителей.`,
    yearOfRelease: 2009,
    rating: 6.5,
    durationMinutes: 110,
  },
  {
    id: 2,
    imgUrl: "/images/mock-movie-5.webp",
    title: "Майнкрафт фильм",
    genres: ["фэнтези", "приключения"],
    description: `Группа неудачников попадает через портал в кубический мир Minecraft. Им предстоит объединиться с экпертами, включая Стива, и отправиться в эпическое приключение, чтобы спасти мир от погибели.`,
    yearOfRelease: 2025,
    rating: 7.0,
    durationMinutes: 108,
  },
  {
    id: 3,
    imgUrl: "/images/mock-movie-1.jpg",
    title: "Астрал",
    genres: ["ужасы", "триллер"],
    description: `Семья переезжает в новый дом, где их старший сын внезапно впадает в кому. Вскоре родители сталкиваются с паранормальными явлениями, и начинаются события, угрожающие их жизни и психике.`,
    yearOfRelease: 2010,
    rating: 6.8,
    durationMinutes: 103,
  },
  {
    id: 4,
    imgUrl: "/images/mock-movie-9.webp",
    title: "Пожары",
    genres: ["драма", "детектив", "военный"],
    description:
      "Когда брат и сестра Марван ознакомились с завещанием матери, их удивлению не было предела. Её последней волей было разыскать отца, которого близнецы считали умершим, и брата, о существовании которого они даже не подозревали. Жанна и Симон узнают, что мать тщательно скрывала от них многие обстоятельства своей трагической судьбы.",
    yearOfRelease: 2010,
    rating: 8.1,
    durationMinutes: 131,
  },
  {
    id: 5,
    imgUrl: "/images/mock-movie-4.jpg",
    title: "Властелин конец: Две крепости",
    genres: ["фэнтези", "приключения"],
    description: `Эпическая битва народов Средиземья продолжается. Фродо и Сэм преодолевают опасности Мордора, а остальные герои сражаются в густых лесах и в крепостях за судьбу мира.`,
    yearOfRelease: 2002,
    rating: 8.7,
    durationMinutes: 179,
  },
  {
    id: 6,
    imgUrl: "/images/mock-movie-7.webp",
    title: "Титаник",
    genres: ["мелодрама", "драма", "катастрофа", "катастрофа"],
    description: `История любви между аристократкой и бедным художником на борту "непотопляемого" лайнера, чьи мечты разбиваются в ночь судьбоносной катастрофы.`,
    yearOfRelease: 1997,
    rating: 7.8,
    durationMinutes: 194,
  },
  {
    id: 7,
    imgUrl: "/images/mock-slider-5.jpg",
    title: "Мстители: Финал",
    genres: ["фантастика", "приключения", "боевик"],
    description: `Мстители и их союзники должны разработать новый план, чтобы спасти мир от разрушительного молниеносного удара, который представляет собой угрозу всей человеческой расе.`,
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
    title: "Платформа",
    genres: ["фантастика", "триллер", "ужасы"],
    description: `Антиутопический фильм: заключённые живут в многоэтажной башне, где платформа с едой опускается этаж за этажом. Чем ниже уровень, тем страшнее конкуренция за пищу и выживание.`,
    yearOfRelease: 2019,
    rating: 7.9,
    durationMinutes: 94,
  },
];
