export interface NewsData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export interface AnnouncementData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export interface AchievementData {
  id: number;
  title: string;
  content: string;
  image?: string;
  created_at: string;
}

export interface AgendaData {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}
