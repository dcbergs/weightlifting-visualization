import type { Cycle, Metric } from "./model";
import { realDataRaw } from "./realDataRaw";

export const realCycles: Cycle[] = realDataRaw.map((rawCycle) => ({
  ...rawCycle,
  weeks: rawCycle.weeks.map((rawWeek) => ({
    ...rawWeek,
    dateWeekStart: new Date(rawWeek.dateWeekStart),
    metricValues: new Map(Object.entries(rawWeek.metricValues)),
  })),
}));

export const realMetrics: Metric[] = [
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
