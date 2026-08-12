"use client"
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { GlassConfigProvider } from "@/contexts/glass-config-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <GlassConfigProvider>
          {children}
        </GlassConfigProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}