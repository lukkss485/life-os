"use client";
import { Card } from "../ui/card";

export function FinancePreview() {
  return (
    <section className="space-y-2 min-h-full">
      <h2 className="text-2xl font-semibold">
        Finanças
      </h2>

      <Card className="p-5 min-h-full">
        <div className="space-y-2">
          <p>Saldo: R$ 0,00</p>
          <p>Receitas: R$ 0,00</p>
          <p>Despesas: R$ 0,00</p>
          <p>Economia: 0%</p>
        </div>
        <FinanceChart></FinanceChart>
      </Card>
    </section>
  )
}
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { name: '10:00', ganho: 4000, perda: 0 },
  { name: '11:00', ganho: 0, perda: 3000 },
  { name: '12:00', ganho: 5000, perda: 0 },
];

export function FinanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          barCategoryGap="10%" // Espaço entre grupos de barras
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {/* Linha da Meta */}
          <ReferenceLine y={2500} label="Meta" strokeDasharray="10 5" className="opacity-ful" />
          {/* Ganhos (Verde) e Perdas (Vermelho) com StackId */}
          <Bar dataKey="ganho" fill="#22c55e" radius={10} stackId="a" barSize={75} /> 
          <Bar dataKey="perda" fill="#ef4444" radius={10} stackId="a" barSize={75} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-xl">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-green-600">Ganho: R$ {payload[0].value}</p>
        <p className="text-red-500">Perda: R$ {payload[1]?.value || 0}</p>
      </div>
    );
  }
  return null;
};