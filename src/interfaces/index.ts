export interface Machine {
  id: string;
  img: { src: string; alt: string };
  Model: string;
  Year: number;
  highlight: {
    Company: string;
    Capacity: string;
    Leaser: string;
  };
  Purpose: string[];
  Rent: number;
}

export interface Market_Option {
  id: string;
  Category: string;
  Options: string[];
}

export interface Estimations {
  [key: string]: { value: string | number; suffix: string };
}
