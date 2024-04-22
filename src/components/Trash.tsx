import { Card as CardType } from "@/types";
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

interface Trash {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export default function Trash({ setCards }: Trash) {
  const [active, setActive] = useState<boolean>(false);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setActive(true);
  }

  function handleDragLeave() {
    setActive(false);
  }

  function handleDrop(e: React.DragEvent) {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((cards) => cards.filter((card) => card.id !== cardId));
    setActive(false);
  }

  return (
    <div
      className={`mt-10 grid size-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {active ? (
        <FaFire className="animate-bounce" onClick={() => setCards([])} />
      ) : (
        <FiTrash />
      )}
    </div>
  );
}
