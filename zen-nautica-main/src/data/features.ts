import { FeatureType } from '../types/feature';
import { Clock, ThumbsUp, Map, Star } from 'lucide-react';

export const features: FeatureType[] = [
  {
    icon: Clock,
    title: "fast.title",
    description: "fast.description"
  },
  {
    icon: ThumbsUp,
    title: "flexible.title",
    description: "flexible.description"
  },
  {
    icon: Map,
    title: "locations.title",
    description: "locations.description"
  },
  {
    icon: Star,
    title: "experience.title",
    description: "experience.description"
  }
];