export type Coords = [number, number];
export type Color = [number, number, number];

export interface State {
  phi: number;
  theta: number;
}

export interface Marker {
  location: Coords;
  size: number;
  flickering?: boolean;
  color?: Color;
}
