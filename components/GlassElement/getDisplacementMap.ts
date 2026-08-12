import { DisplacementOptions } from "./getDisplacementFilter";

/**
 * Creating the displacement map that is used by feDisplacementMap filter.
 * Gradients take into account the radius of the element.
 * This is why they start and end in the middle of the angle curve.
 */


export const getDisplacementMap = ({
  height,
  width,
  radius = 0,
  depth,
}: Omit<DisplacementOptions, "chromaticAberration" | "strength">) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg height="${height}" width="${width}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
        .mix { mix-blend-mode: screen; }
    </style>
    <defs>
        este é o gradiente que compõe muita parte do filtro e as cores que vai ver na imagem
        <linearGradient 
          id="Y" 
          x1="0" 
          x2="0" 
          y1="${Math.ceil((radius / height) * -50)}%"
          y2="${Math.floor(100 - (radius / height) * -50)}%"
        >
            <stop offset="0%" stop-color="#0f0" />
            <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <linearGradient 
          id="X" 
          x1="${Math.ceil((radius / width) * -50)}%" 
          x2="${Math.floor(100 - (radius / width) * -50)}%"
          y1="0" 
          y2="0">
            <stop offset="0%" stop-color="#f00" />
            <stop offset="100%" stop-color="#000" />
        </linearGradient>
    </defs>
    essse rect eu não sei praque serve
    <rect x="0" y="0" height="${height}" width="${width}" fill="#808000" />
    <g filter="blur(1px)">
      essse rect eu não sei praque serve também
      <rect x="0" y="0" height="${height}" width="${width}"  fill="#000080" />
      aqui é aplicado nesses rects o gradiente
      <rect
          x="0"
          y="0"
          height="${height}"
          width="${width}"
          fill="url(#Y)"
          class="mix"
      />
      <rect
          x="0"
          y="0"
          height="${height}"
          width="${width}"
          fill="url(#X)"
          class="mix"
      />sss
      essse rect é o fundo 
      <rect
          x="${depth * 1.5}"
          y="${depth * 1.5}"
          height="${height - 2 * depth * 1.5}"
          width="${width - 2 * depth * 1.5}"
          fill="#808000"
          rx="${radius}"
          ry="${radius}"
          filter="blur(${depth / 1.5}px)"
      />
    </g>
</svg>`);
