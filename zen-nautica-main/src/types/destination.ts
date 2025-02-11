export interface Waypoint {
  id: string;
  name: string;
  description: string;
  distance: string;
  duration: string;
  image: string | null;
}

export interface Route {
  id: string;
  name: string;
  waypoints: Waypoint[];
}

export interface DestinationType {
  id: string;
  name: string;
  description: string;
  image: string;
  gallery?: string[];
  waypoints?: Waypoint[];
  activities?: string[];
  routes?: Route[];
}