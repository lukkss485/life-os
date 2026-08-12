import { Moon, Zap, Activity } from "lucide-react";
import { Card } from "../ui/card";

export function HealthPreview() {
  const metrics = [
    { label: "Sono", icon: Moon, value: "sem registros", color: "blue" },
    { label: "Energia", icon: Zap, value: "sem registros", color: "yellow" },
    { label: "Exercícios", icon: Activity, value: "sem registros", color: "emerald" },
  ];

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        Saúde
      </h2>

      <Card className="p-6">
        {metrics.map((item, idx) => (
          <Card
            key={idx}
            className="flex flex-row items-center justify-between p-3 rounded-2xl shadow-md bg-neutral-200/30 border border-neutral-300/30 hover:bg-neutral-200/50 dark:bg-neutral-800/30 dark:border-neutral-700/30 dark:hover:bg-neutral-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/50 text-${item.color}-400`}>
                <item.icon size={18} />
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.label}</span>
            </div>
            
            <span className="text-xs text-neutral-500 font-mono italic">
              {item.value}
            </span>
          </Card>
        ))}
      </Card>
    </section>
  );
}