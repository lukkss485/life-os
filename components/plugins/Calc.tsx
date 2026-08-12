"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Calculadora() {
  const [display, setDisplay] = useState("0");

  const handlePress = (val: string) => {
    setDisplay((prev) => (prev === "0" ? val : prev + val));
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      <div className="col-span-4 p-4 bg-muted text-right text-2xl rounded-lg">
        {display}
      </div>
      {['7','8','9','/', '4','5','6','*', '1','2','3','-', '0','C','=','+'].map((btn) => (
        <Button 
          key={btn} 
          onClick={() => btn === 'C' ? setDisplay('0') : handlePress(btn)}
          variant="outline"
        >
          {btn}
        </Button>
      ))}
    </div>
  );
}