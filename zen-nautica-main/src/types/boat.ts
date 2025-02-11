export interface BoatType {
  name: string;
  type: string;
  length: string;
  width: string;
  capacity: string;
  engine: string;
  price: string;
  image: string;
  images?: string[];
  fuelTank: string;
  hasNavigation: boolean; // Add this line
  hasRadio: boolean;
  hasShower: boolean;
  petsAllowed: boolean;
  description: {
    en: string;
    de: string;
    it: string;
    hr: string;
    hu: string;
    sl: string;
  };
}