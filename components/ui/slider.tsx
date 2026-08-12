"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { useGlassBounce } from "../GlassElement/bubleeffect";
import { cn } from "@/lib/utils"
import { GlassElement } from "../GlassElement/GlassElement"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 999,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )
  var a = 20
  const { values, onMouseEnter, onMouseLeave } = useGlassBounce(a *2, a , a/2, 0.40, 2, 150);
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col *:transition-none!",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className=" *:transition-none! relative grow overflow-hidden rounded-full bg-input/90 data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className=" *:transition-none! absolute bg-zinc-400 dark:bg-card-foreground/70 select-none data-horizontal:h-full data-vertical:w-full "
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (

        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className=" *:transition-none block h-fit w-fit shrink-0 rounded-full "
          onMouseDown={onMouseEnter}// mude para onMouseEnter ser chamado quando o mouse usa o elemento , e o onMouseLeave para quando o mouse parar de user o elemento
          onMouseUp={onMouseLeave}
        >
          <GlassElement
            depth={values.deph}
            strength={330}
            chromaticAberration={0}

            shaders={true}

            blur={1}//0.8

            radius={values.radius}

            height={values.height}
            width={values.width}
            // debug
            className="bg-card! active:size-100 active:bg-card/0! transition-colors duration-300 ease-in-out"
          />
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
