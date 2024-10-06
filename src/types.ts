export interface User {
  id: number;
  name: string;
  age: number;
  bio?: string;
}

export interface Track {
  id: string;
  name: string;
  artist: string;
}