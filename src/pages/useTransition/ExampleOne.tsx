import { ChangeEvent, useState, useTransition } from "react";
import { startTransition } from "react";

export default function ExampleOne() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async (newQuantity: number) => {
    // To access the pending state of a transition,
    // call startTransition again.
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div className="p-4 my-10 border border-amber-500/50 rounded-xl w-max">
      <h1>Checkout</h1>
      <Item action={updateQuantityAction} />
      <hr />
      <Total quantity={quantity} isPending={isPending} />
    </div>
  );
}

export function Item({ action }: { action: (v: number) => Promise<void> }) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      await action(Number(event.target.value));
    });
  }
  return (
    <div className="p-4 space-x-8 space-y-4 border rounded-xl border-slate-500/50 w-max">
      <p>Eras Tour Tickets: $10/each</p>
      <div>
        <label htmlFor="name">Quantity: </label>
        <input type="number" onChange={handleChange} defaultValue={1} min={1} />
      </div>
    </div>
  );
}

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function Total({
  quantity,
  isPending,
}: {
  quantity: number;
  isPending: boolean;
}) {
  return (
    <div className="total">
      <span>Total:</span>
      <span>
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 10)}`}
      </span>
    </div>
  );
}

export async function updateQuantity(newQuantity: number) {
  await new Promise((res) => setTimeout(res, 2000));
  return newQuantity;
}
