import { FormEvent, startTransition, useOptimistic, useState } from "react";

type Todo = {
  id: number;
  title: string;
};

const action = async (title: string) => {
  await new Promise((res) => setTimeout(res, 2000));
  return {
    id: new Date().getTime(),
    title,
  };
};

export default function ExampleTwo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const [op, addOp] = useOptimistic(
    todos.map((t) => ({ ...t, sending: false })),
    (state, newTodo: string) => [
      {
        id: todos.length + 1,
        title: newTodo,
        sending: true,
      },
      ...state,
    ]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      addOp(title);
      const result = await action(title);
      startTransition(() => {
        setTodos((curr) => [result, ...curr]);
      });
    });
  };

  console.log(todos);

  return (
    <div className="border p-4 rounded-xl border-slate-500/50">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <textarea
          className="outline-0 p-3 border border-rose-500/50"
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
      {op.map((todo) => (
        <div key={todo.id}>
          <p>
            {todo.id} {todo.title}{" "}
            <span>{todo.sending ? "sending..." : ""}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
