import { Media } from "@/shared/stores/movie-catalog";
import { BlockKey } from "@/shared/types/movie-card-block-key";
import { BlockPlacement } from "../model/cardBlocksMap";
import { cardBlocksMap } from "../model/cardBlocksMap";
import { Fragment } from "react";
import { BlockOptions } from "@/shared/stores/movie-card-layout";

interface Props {
  keys: BlockKey[];
  media: Media;
  hoverHeight?: number;
  hasHover?: boolean;
  placement?: BlockPlacement;
  blockOptions?: BlockOptions;
}

export const renderBlocks = ({
  keys,
  media,
  hoverHeight,
  hasHover,
  placement,
  blockOptions,
}: Props) => {
  return keys.map((key) => {
    const block = cardBlocksMap[key];

    const options = placement ? blockOptions?.[placement]?.[key] : undefined;

    return (
      <Fragment key={key}>
        {block({
          media,
          hoverHeight,
          hasHover,
          placement,
          options,
        })}
      </Fragment>
    );
  });
};
