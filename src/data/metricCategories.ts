export type MetricCategory = "classics" | "strength" | "accessory" | "other";

// This could become something which allows the user to sort metrics into different categories
// However, for my data, I know the metric categories which actually make sense, so this
// will be hard-coded for simplicity.
export const metricCategorization: Map<MetricCategory, Set<string>> = new Map([
  [
    "classics",
    new Set(["max sn %", "max jk %", "typical classic %", "classic reps"]),
  ],
  [
    "strength",
    new Set(["squat sets", "pull/DL sets", "max squat %", "max pull %"]),
  ],
  ["accessory", new Set(["WL acc sets", "non-WL acc sets"])],
  ["other", new Set(["avg fresh", "failed classic", "failed sq or pull"])],
]);
