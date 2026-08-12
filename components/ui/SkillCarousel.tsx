'use client'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

export function SkillCarousel({ skills, className }: { skills: any[]; className?: string }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,           // Essencial
      dragFree: true,       // Permite movimento suave
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
        speed: 0.5,
      })
    ]
  )

  return (
    <div className={`overflow-x-hidden rounded-2xl p-2 cursor-grab ${className}`} ref={emblaRef}>
      <div className="flex gap-1.5 p-0">
        {[...skills, ...skills, ...skills].map((skill, idx) => (
          <div key={idx} className="flex-none flex items-center gap-3 px-2.5 py-1 rounded-xl border bg-neutral-200/50 dark:bg-neutral-800/50 shadow-md">
            <skill.icon size={16} className={`text-${skill.color}-400`} />
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}

      </div>

    </div>
  )
}