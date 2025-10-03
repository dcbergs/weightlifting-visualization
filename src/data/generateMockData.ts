import type { Metric, TrainingHistory, TrainingWeek } from "./model";

const metrics: Metric[] = [
  { name: "classic reps" },
  { name: "squat sets" },
  { name: "max sn %" },
  { name: "max jk %" },
  { name: "typical classic %" },
];

const cycles = [
  {
    name: "2021",
    bestSn: 101,
    bestCj: 100,
    bestTotal: 100,
    rating: 90,
    description: "did some training here \n and some other cool stuff",
    weeks: generateTrainingWeeks(10, new Date(2021, 6, 5)),
  },
  {
    name: "2022 squats",
    bestSn: 95,
    bestCj: 96,
    bestTotal: 94,
    rating: 67,
    description: "some squatly training or whatever",
    weeks: generateTrainingWeeks(10, new Date(2022, 6, 5)),
  },
  {
    name: "2023 cycle",
    bestSn: 100,
    bestCj: 105,
    bestTotal: 102,
    rating: 95,
    description: "here's another cycle",
    weeks: generateTrainingWeeks(10, new Date(2023, 6, 5)),
  },
  {
    name: "2024",
    bestSn: 99,
    bestCj: 104,
    bestTotal: 101,
    rating: 87,
    description: "some more training",
    weeks: generateTrainingWeeks(10, new Date(2024, 6, 5)),
  },
  {
    name: "2025",
    bestSn: 98,
    bestCj: 97,
    bestTotal: 97,
    rating: 67,
    description: "woohoo training",
    weeks: generateTrainingWeeks(10, new Date(2025, 6, 5)),
  },
];

function generateTrainingWeeks(weekCount: number, startDate: Date) {
  const allMetricValues: Map<string, number[]> = new Map([
    ["classic reps", generateCoherentMetricOverXWeeks(weekCount, "down", 70)],
    ["squat sets", generateCoherentMetricOverXWeeks(weekCount, "down", 25)],
    ["max sn %", generateCoherentMetricOverXWeeks(weekCount, "up", 80)],
    ["max jk %", generateCoherentMetricOverXWeeks(weekCount, "up", 80)],
    [
      "typical classic %",
      generateCoherentMetricOverXWeeks(weekCount, "up", 70),
    ],
  ]);
  const weeks: TrainingWeek[] = [];
  for (let i = 0; i < weekCount; i++) {
    weeks.push({
      dateWeekStart: new Date(startDate.getDate() + i * 7),
      weekNumber: i + 1,
      metricValues: new Map(
        metrics.map((m) => [m.name, allMetricValues.get(m.name)?.[i] ?? 0]),
      ),
    });
  }
  return weeks;
}

function generateCoherentMetricOverXWeeks(
  weeks: number,
  trend: "up" | "down",
  seed: number,
) {
  const numbers: number[] = [];
  // initial number should be seed +/- roughly 10
  const initial = seed + Math.round(Math.random() * 20) - 10;
  numbers.push(initial);
  // push another (weeks - 1) numbers with small changes week to week to round it out
  for (let i = 0; i < weeks - 1; i++) {
    const previous = numbers.slice(-1)[0];
    // should move around -5% to +15% for up, and -15% to +5% for down
    const reductionFactor =
      trend === "up" ? Math.round(seed * 0.05) : Math.round(seed * 0.15);
    const next =
      previous + Math.round(Math.random() * (seed * 0.2)) - reductionFactor;
    numbers.push(next > 0 ? next : 0);
  }
  return numbers;
}

export const fakeTrainingHistory: TrainingHistory = {
  cycles: cycles,
  metrics: metrics,
};
