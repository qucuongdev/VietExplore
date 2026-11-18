export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface ProfileRow {
  id: string;
  display_name: string;
  role: 'admin' | 'reader';
}

export interface PostRow {
  id: string;
  author_id: string;
  locale: 'vi' | 'en';
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  tags: string[];
  content: Json;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  version: number;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { [Key in keyof ProfileRow]: ProfileRow[Key] };
        Insert: { [Key in keyof ProfileRow]: ProfileRow[Key] };
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
      blog_posts: {
        Row: { [Key in keyof PostRow]: PostRow[Key] };
        Insert: Pick<PostRow, 'author_id' | 'locale' | 'title' | 'slug' | 'content'> & Partial<Omit<PostRow, 'author_id' | 'locale' | 'title' | 'slug' | 'content'>>;
        Update: Partial<PostRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
}
