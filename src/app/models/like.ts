export interface Like {
  userId: string;
  post: string;
}

export interface LikeInfo {
  liked_by_user: boolean;
  count: number;
}
