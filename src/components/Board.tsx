import { useState } from "react";
import Column from "./Column";

import mockData from "../data.json";
import { Card } from "@/types";
import Trash from "./Trash";

export default function Board() {
  const MULTIPLIER = 100000;
  const multipliedData = Array.from(
    { length: MULTIPLIER },
    (_, i) => mockData,
  ).flat();
  const [cards, setCards] = useState<Card[]>(multipliedData);

  return (
    <div className="flex h-full max-h-dvh w-full gap-3 overflow-x-auto p-12">
      <Column
        title="To Do"
        headingColor="text-red-200"
        column="todo"
        cards={cards}
        setCards={setCards}
      />

      <Column
        title="In Progress"
        headingColor="text-yellow-200"
        column="inprogress"
        cards={cards}
        setCards={setCards}
      />

      <Column
        title="Done"
        headingColor="text-green-200"
        column="done"
        cards={cards}
        setCards={setCards}
      />

      <Column
        title="Blocked"
        headingColor="text-blue-200"
        column="blocked"
        cards={cards}
        setCards={setCards}
      />

      <Column
        title="Review"
        headingColor="text-purple-200"
        column="review"
        cards={cards}
        setCards={setCards}
      />

      <Trash setCards={setCards} />
    </div>
  );
}
