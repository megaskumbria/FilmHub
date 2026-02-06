"use client";

import { useRef } from "react";
import { mockMovies } from "@/shared/model/movies";

export const MovieCard = () => {
  const genresRef = useRef<HTMLDivElement>(null);

  return mockMovies.map((card, index) => (
    <article className="max-h-fit h-auto max-w-[290px]" key={index}>
      <div className="relative aspect-[2/3]">
        <img
          className="block w-full h-full object-cover rounded-t-[12px] rounded-b-[0] border-[1px] border-[#FFFFFF19] border-b-0"
          src={card.imgUrl}
          alt="movieCard"
        />
        <span className="absolute top-[10px] right-[10px] bg-[#f59e0b] rounded-[4px] text-amber-50 text-[12px] font-semibold py-0.5 px-1.5">
          {card.rating}
        </span>
      </div>

      <div className="border-[1px] border-[#FFFFFF19] rounded-t-[0] rounded-b-[12px] p-3">
        <div className="flex justify-between mb-2">
          <h3 className="max-w-[200px] overflow-ellipsis whitespace-nowrap overflow-hidden font-semibold text-[#fafafa]">
            {card.title}
          </h3>
          <span>{card.yearOfRelease}</span>
        </div>

        <div className="flex gap-[5px] mb-3 overflow-ellipsis overflow-hidden" ref={genresRef}>
          {card.genres.map((genre, index) => (
            <span
              className="leading-1 whitespace-nowrap text-[12px] text-[#fafafa] bg-[#1f2937] rounded-full py-[9px] px-[3px]"
              key={index}
            >
              {genre}
            </span>
          ))}
        </div>

        <p className=" relative text-ellipsis overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] max-h-[60px] mb-3">
          {card.description}
        </p>
      </div>
    </article>
  ));
};
