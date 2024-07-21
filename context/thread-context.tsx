import { Thread } from "@/types/threads";
import { generateThreads } from "@/utils/generate-dommy-data";
import React, { createContext, useState } from "react";


export const ThreadContext = createContext<Thread[]>([]);

export const ThreadProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [threads, setThreads] = useState<Thread[]>([]);

  React.useEffect(() => {
    setThreads(generateThreads());
  }, []);

  return <ThreadContext.Provider value={threads}>{children}</ThreadContext.Provider>;
};