export interface Article {
  url: string;
  content: string;
  images?: string[];
  videos?: string[];
  profile?: Profile;
}

export interface Profile {
  userName?: string;
  password?: string;
}
