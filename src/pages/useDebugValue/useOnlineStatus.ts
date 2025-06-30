import { useDebugValue, useSyncExternalStore } from "react";

export function useOnlineStatus(): boolean {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );

  const date = new Date();

  useDebugValue(isOnline ? "on" : "Offline");
  useDebugValue(date, (date) => date.toISOString());
  return isOnline;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);

  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}
