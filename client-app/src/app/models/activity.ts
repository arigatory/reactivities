import { Profile } from './profile';

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  IsCancelled?: boolean;
  isGoing?: boolean;
  isHots?: boolean;
  host?: Profile;
  attendees?: Profile[];
}
