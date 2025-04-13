"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ActionType = "select" | "add" | "remove";

interface ActionContextType {
  action: ActionType;
  setAction: (action: ActionType) => void;
}

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export function ActionProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<ActionType>("select");

  return (
    <ActionContext.Provider value={{ action, setAction }}>
      {children}
    </ActionContext.Provider>
  );
}

export function useAction() {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error("useAction deve ser usado dentro de um ActionProvider");
  }
  return context;
}
