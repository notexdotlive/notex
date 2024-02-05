export interface TNote {
  id: string;
  status: string;
  tags: string[];
  title: string;
  author_id: number;
  content: string;
  description?: string;
  metadata: {
    created_at: Date;
    updated_at: Date;
  };
}
