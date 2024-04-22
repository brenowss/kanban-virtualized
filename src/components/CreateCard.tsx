import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Card as CardType } from "@/types";

interface CreateCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export default function CreateCard(props: CreateCardProps) {
  const [text, setText] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);

  function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();

    if (!text.trim().length) return;

    const card: CardType = {
      title: text.trim(),
      id: Math.random().toString(36),
      column: props.column,
      description: "",
    };

    props.setCards((cards) => [...cards, card]);

    setText("");
    setCreating(false);
  }

  return (
    <>
      {creating ? (
        <form onSubmit={handleCreateCard}>
          <textarea
            name="text"
            id="text"
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-200 focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add new card..."
            autoFocus
          />

          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setCreating(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-violet-400 transition-colors hover:text-violet-50"
            >
              Create
              <FiPlus />
            </button>
          </div>
        </form>
      ) : (
        <button
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
          onClick={() => setCreating(true)}
        >
          Create
          <FiPlus />
        </button>
      )}
    </>
  );
}
