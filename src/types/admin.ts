export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'em_andamento' | 'concluido' | 'pausado';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  createdAt: string;
}

export interface Activity {
  id: number;
  type: 'project' | 'team' | 'event' | 'report';
  action: 'create' | 'update' | 'delete';
  details: string;
  createdAt: string;
} 