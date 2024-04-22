import { Card as CardType } from "@/types";
import { useState } from "react";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import CreateCard from "./CreateCard";
import { AutoSizer, List } from "react-virtualized";

interface ColumnProps {
  title: string;
  headingColor: string;
  column: string;
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
}

export default function Column(props: ColumnProps) {
  const [active, setActive] = useState<boolean>(false);
  const [query, setQuery] = useState("");

  const filteredCards = props.cards.filter(
    (card) => card.column === props.column,
  );

  const filteredCardsWithQuery = filteredCards.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase()),
  );

  function getIndicators() {
    return Array.from(
      document.querySelectorAll(`[data-column="${props.column}"]`),
    );
  }

  function getNearestIndicator(e: React.DragEvent, indicators: Element[]) {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }

        return closest;
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  }

  function clearHighlights(indicators: Element[]) {
    const indicatorsArray = indicators || getIndicators();
    indicatorsArray.forEach((indicator) => {
      indicator.setAttribute("style", "opacity: 0");
    });
  }

  function highlightIndicator(e: React.DragEvent) {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.setAttribute("style", "opacity: 1");
  }

  function handleDragStart(e: React.DragEvent, cardId: string) {
    e.dataTransfer.setData("cardId", cardId);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setActive(true);
    highlightIndicator(e);
  }

  function handleDragLeave() {
    setActive(false);
    clearHighlights(getIndicators());
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setActive(false);
    clearHighlights(getIndicators());

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.getAttribute("data-before") || "-1";

    if (before !== cardId) {
      let copy = [...props.cards];
      let cardToTransfer = copy.find((card) => card.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column: props.column };

      copy = copy.filter((card) => card.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((card) => card.id === before);

        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      props.setCards(copy);
    }
  }

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${props.headingColor}`}>{props.title}</h3>

        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>

      <div className="mb-3 flex items-center">
        <input
          type="text"
          name="query"
          className="w-full rounded border border-neutral-700 bg-neutral-800 p-2 text-sm text-neutral-200 placeholder-neutral-300 focus:outline-none"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <AutoSizer>
        {({ width, height }) => (
          <div
            style={{ width, height }}
            className={`h-full w-full transition-all ${
              active ? "bg-neutral-800/50" : "bg-neutral-800/0"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <List
              className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
              width={width}
              height={height}
              rowCount={filteredCardsWithQuery.length}
              rowHeight={120}
              rowRenderer={({ index, key, style }) => (
                <div key={key} style={style}>
                  <Card
                    data={filteredCardsWithQuery[index]}
                    setActive={setActive}
                    active={active}
                    handleDragStart={handleDragStart}
                  />
                </div>
              )}
            />
            <DropIndicator beforeId="-1" column={props.column} />
            <CreateCard column={props.column} setCards={props.setCards} />
          </div>
        )}
      </AutoSizer>
    </div>
  );
}
