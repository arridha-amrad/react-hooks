// Menambahkan label ke custom-hook

// check react-dev-tools -> Component -> UsageOne
// lihat pada bagian hooks

import { useState, useEffect } from "react";
import { useOnlineStatus } from "./useOnlineStatus";

export default function UsageOne() {
  const isOnline = useOnlineStatus();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}
