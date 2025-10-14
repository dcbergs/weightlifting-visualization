import type { Metric, TrainingHistory, TrainingWeek } from "./model";

const metrics: Metric[] = [
  {
    name: "classic reps",
    description:
      "Number of working weight classic lifts (snatch, clean, jerk) and their variations. Typically includes every lift at or above 70%. The 2019 cycles sometimes only recorded top sets, for which warmups were conservatively estimated (i.e. assumed few warmup sets).",
  },
  {
    name: "squat sets",
    description: "Sets of back or front squat performed in the week.",
  },
  {
    name: "pull/DL sets",
    description:
      "Sets of snatch or clean pull or deadlift variations performed in the week.",
  },
  {
    name: "WL acc sets",
    description:
      "Sets of barbell movements directly related to classic lifts, with loading relative to classic lift numbers. This category includes things like push press, snatch balance, jerk dips, and so on. It does not include lighter classic-lift-adjacent things like strict press, sots press, tall snatch, etc., which are considered non-WL accessories.",
  },
  {
    name: "non-WL acc sets",
    description:
      "Sets of supplementary exercises not covered by other categories in the week.",
  },
  {
    name: "max sn %",
    description:
      "Highest percentage of maximum (as of prior to the start of this cycle) successfully lifted in the snatch or variation in this week.",
  },
  {
    name: "max jk %",
    description:
      "Highest percentage of maximum (as of prior to the start of this cycle) successfully lifted in the jerk or variation in this week.",
  },
  {
    name: "typical classic %",
    description:
      "A rough estimation of the median or most common intensity of the week for classic lifts, excluding easy days/light warmups/max out days.",
  },
  {
    name: "max squat %",
    description:
      "Highest percentage of maximum (as of prior to the start of this cycle) successfully lifted in the squat in this week.",
  },
  {
    name: "max pull %",
    description:
      "Highest percentage of maximum (relative to max snatch or C&J, as of prior to the start of this cycle) successfully lifted in a pull or sn/cn deadlift variation in this week.",
  },
  {
    name: "avg fresh",
    description:
      "A rough subjective metric for physical readiness to train this week. Note that earlier cycles use a 5-point scale, and later cycles use a 10-point scale, but they are not directly comparable (i.e. doubling the 5 point scale will not make that data represent exactly the same readiness as data from a 10 point scale).",
  },
  {
    name: "failed classic",
    description:
      'The number of failed classic lift reps in the week. Does not include pressouts ("training makes").',
  },
  {
    name: "failed sq or pull",
    description: "The number of failed squat/pull/deadlift reps in the week.",
  },
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
    description:
      "some squatly training or whatever, let's make a long description and see. Well now it's really gonna ruin the layout. Love that for us. Where else to put long-ass descriptions to make them readable but not ruin the entire page? Hard to say. Will my descriptions be this long? I can be wordy, especially about dumb weightlifting training things.",
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
  {
    name: "another cool cycle",
    bestSn: 93,
    bestCj: 99,
    bestTotal: 94,
    rating: 74,
    description: "whatever",
    weeks: generateTrainingWeeks(10, new Date(2021, 1, 5)),
  },
  {
    name: "do this thing",
    bestSn: 102,
    bestCj: 107,
    bestTotal: 105,
    rating: 99,
    description: "goodest trainings",
    weeks: generateTrainingWeeks(10, new Date(2022, 1, 5)),
  },
  {
    name: "big meet time",
    bestSn: 105,
    bestCj: 102,
    bestTotal: 102,
    rating: 96,
    description: "here's another cycle",
    weeks: generateTrainingWeeks(10, new Date(2023, 1, 5)),
  },
  {
    name: "bad meet time",
    bestSn: 97,
    bestCj: 100,
    bestTotal: 91,
    rating: 77,
    description: "some more training",
    weeks: generateTrainingWeeks(10, new Date(2024, 1, 5)),
  },
  {
    name: "meh",
    bestSn: 97,
    bestCj: 97,
    bestTotal: 97,
    rating: 69,
    description: "woohoo training",
    weeks: generateTrainingWeeks(10, new Date(2025, 1, 5)),
  },
];

function generateTrainingWeeks(weekCount: number, startDate: Date) {
  const allMetricValues: Map<string, number[]> = new Map([
    ["classic reps", generateCoherentMetricOverXWeeks(weekCount, "down", 70)],
    ["squat sets", generateCoherentMetricOverXWeeks(weekCount, "down", 25)],
    ["pull/DL sets", generateCoherentMetricOverXWeeks(weekCount, "down", 19)],
    ["WL acc sets", generateCoherentMetricOverXWeeks(weekCount, "down", 10)],
    [
      "non-WL acc sets",
      generateCoherentMetricOverXWeeks(weekCount, "down", 55),
    ],
    ["max sn %", generateCoherentMetricOverXWeeks(weekCount, "up", 80)],
    ["max jk %", generateCoherentMetricOverXWeeks(weekCount, "up", 80)],
    [
      "typical classic %",
      generateCoherentMetricOverXWeeks(weekCount, "up", 70),
    ],
    ["max squat %", generateCoherentMetricOverXWeeks(weekCount, "up", 80)],
    ["max pull %", generateCoherentMetricOverXWeeks(weekCount, "up", 90)],
    ["avg fresh", generateCoherentMetricOverXWeeks(weekCount, "up", 2)],
    ["failed classic", generateCoherentMetricOverXWeeks(weekCount, "up", 2)],
    ["failed sq or pull", generateCoherentMetricOverXWeeks(weekCount, "up", 2)],
  ]);
  const weeks: TrainingWeek[] = [];
  for (let i = 0; i < weekCount; i++) {
    var weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + i * 7);
    weeks.push({
      dateWeekStart: weekStart,
      weeksOut: weekCount - i,
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
  const initial = Math.abs(seed + Math.round(Math.random() * 20) - 10);
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
