'use client';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


export default function Rounded() {
  return (
    <div className="flex flex-col gap-20">
      <Button >kaloooo!!!!</Button>
      <Slider></Slider>
      <DialogPreset />
      <Switch />
    </div>
  )
}


export function DialogPreset() {

  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shrink-0">Open Dialog</Button>
      </DialogTrigger>
      <DialogPortal>

        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/*content*/}
          </div>

          <DialogFooter>
            <Button onClick={() => { }}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}