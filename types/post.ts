export interface IPost {
  id: number;
  title: string;
  text: string;
  user_id: number;
  date: Date;
  likes: number;
  dislikes: number;
}
