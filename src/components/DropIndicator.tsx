interface DropIndicatorProps {
  beforeId: string;
  column: string;
}

export default function DropIndicator({
  beforeId,
  column,
}: DropIndicatorProps) {
  return (
    <div
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
      data-before={beforeId}
      data-column={column}
    ></div>
  );
}
