'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: ChartData<'doughnut'>;
  title: string;
  height?: number;
}

export function DoughnutChart({ data, title, height = 300 }: DoughnutChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div style={{ height }}>
      <Doughnut options={options} data={data} />
    </div>
  );
}
