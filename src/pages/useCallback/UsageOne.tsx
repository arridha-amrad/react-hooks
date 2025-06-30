// Skipping re-rendering of components

import React, { memo, useCallback, useState } from "react";

type Item = {
  name: string;
  id: number;
};

const items = [
  { id: 1, name: "banana" },
  { id: 2, name: "apple" },
  { id: 3, name: "orange" },
];

const Item = memo(
  ({ item, onClick }: { item: Item; onClick: (v: Item) => void }) => {
    console.log("Rendering : ", item);
    return <li onClick={() => onClick(item)}>{item.name}</li>;
  }
);

export default function UsageOne() {
  console.log("rendering list component");
  const [selected, setSelected] = useState<Item | null>(null);
  const handleClick = useCallback((item: Item) => {
    setSelected(item);
  }, []);
  return (
    <div className="border rounded-xl p-8">
      <h1>Use One : Skipping re-rendering of components</h1>
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} onClick={handleClick} />
        ))}
      </ul>
      <p>Selected: {selected?.name}</p>
    </div>
  );
}
