import { Card as CardType } from "@/types";
import DropIndicator from "./DropIndicator";

interface CardProps {
  data: CardType;
  setActive: (active: boolean) => void;
  active: boolean;
  handleDragStart: (e: React.DragEvent, cardId: string) => void;
}

export default function Card({ data: card, active, setActive }: CardProps) {
  return (
    <>
      <DropIndicator beforeId={card.id} column={card.column} />
      <div
        key={card.id}
        className="mb-3 h-28 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 transition-colors active:cursor-grabbing"
        draggable
        onClick={() => setActive(!active)}
        onDragStart={(e: any) => {
          // Typescript doesn't like setting dataTransfer in onDragStart
          // so we need to use any as the event type
          e.dataTransfer.setData("cardId", card.id);
          setActive(true);
        }}
      >
        <h4 className="line-clamp-2 font-medium text-neutral-200">
          {card.title}
        </h4>
        <p className="line-clamp-2 text-sm text-neutral-300">
          {card.description}
        </p>
      </div>
    </>
  );
}
