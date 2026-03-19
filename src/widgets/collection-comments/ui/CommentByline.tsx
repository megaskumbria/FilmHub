interface CommentBylineProps {
  author: string;
  handle: string;
  timestamp: string;
}

export const CommentByline = ({ author, handle, timestamp }: CommentBylineProps) => {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-sm font-semibold text-foreground leading-none">{author}</span>

      <span className="text-xs text-zinc-muted leading-none">{handle}</span>

      <span className="text-zinc-muted text-xs opacity-40">·</span>

      <span className="text-xs text-zinc-muted leading-none">{timestamp}</span>
    </div>
  );
};
