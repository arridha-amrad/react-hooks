import { useOptimistic, useState, useRef, startTransition } from "react";

export async function deliverMessage(message: string) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

function Thread({
  messages,
  sendMessageAction,
}: {
  messages: TMessage[];
  sendMessageAction: (f: FormData) => Promise<void>;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string);
    formRef?.current?.reset();
    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      {
        text: newMessage,
        sending: true,
        key: new Date().getTime(),
      },
      ...state,
    ]
  );

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input
          type="text"
          name="message"
          className="max-w-lg w-full"
          placeholder="Hello!"
        />
        <button type="submit">Send</button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          <span
            className={
              message.sending ? "text-foreground/50" : "text-foreground"
            }
          >
            {message.text}
          </span>
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
    </>
  );
}

export type TMessage = {
  key: number;
  sending: boolean;
  text: string;
};

export default function ExampleOne() {
  const [messages, setMessages] = useState<TMessage[]>([
    { text: "Hello there!", sending: false, key: 1 },
  ]);

  async function sendMessageAction(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get("message") as string);
    startTransition(() => {
      setMessages((messages) => [
        { text: sentMessage, key: messages.length + 1, sending: false },
        ...messages,
      ]);
    });
  }
  return (
    <div className="my-8 border border-slate-500/50 p-4 rounded-xl">
      <Thread messages={messages} sendMessageAction={sendMessageAction} />
    </div>
  );
}
