export type TrainingHistory = {
  cycles: Cycle[];
  metrics: Metric[];
};

export type Cycle = {
  // must be unique
  name: string;
  bestSn: number;
  bestCj: number;
  bestTotal: number;
  rating: number;
  description: string;
  weeks: TrainingWeek[];
};

export type TrainingWeek = {
  dateWeekStart: Date;
  weekNumber: number;
  // map metric name to value
  metricValues: Map<string, number>;
};

export type Metric = {
  // must be unique
  name: string;
  abbreviation?: string;
};
