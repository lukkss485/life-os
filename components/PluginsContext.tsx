"use client"; // IMPORTANTE: Precisa disso no topo

import { createContext, useContext, useState } from "react";
import { Search } from "lucide-react";

const PluginsContext = createContext<any>(null);

export function PluginsProvider({ children }: { children: React.ReactNode }) {
  const [plugins, setPlugins] = useState([
    { name: "zoom", icon: Search, code: () => {}, miniplugin: [] }
  ]);

  const addPlugin = (newPlugin: any) => {
    setPlugins((prev) => [...prev, newPlugin]);
  };

  return (
    <PluginsContext.Provider value={{ plugins, addPlugin }}>
      {children}
    </PluginsContext.Provider>
  );
}

export const usePlugins = () => useContext(PluginsContext);