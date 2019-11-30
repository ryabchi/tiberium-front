import DateTimeFormat = Intl.DateTimeFormat;
import {User} from './user';

export interface PostPage {
  count: number;
  next: number;
  previous: number;
  results: Post[];
}

export interface Post {
  id: string;
  post_type: string;
  text: string;
  youtube_link: string;
  image: string;
  like_count: number;
  liked_by_user: boolean;
  creator: string;
  creator_info: User;
  created_at: DateTimeFormat;
}
