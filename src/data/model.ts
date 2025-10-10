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
  metricValues: Map<string, number>;
  // weeks out from competition
  weeksOut: number;
};

export type Metric = {
  // must be unique
  name: string;
  description: string;
};
