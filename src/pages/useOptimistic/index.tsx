import ExampleOne from "./ExampleOne";
import ExampleTwo from "./ExampleTwo";

export default function UseOptimisticPage() {
  return (
    <main className="container mx-auto space-y-10">
      <ExampleOne />
      <ExampleTwo />
    </main>
  );
}
