export interface INewPost {
  title: string;
  author: string;
  contents: string;
  photoDirectory: string;
  image?: File | string;
}
