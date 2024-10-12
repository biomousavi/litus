export interface TODO {
  _id: string;
  title: string;
  estimated_time: number;
  creation_time: string;
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
