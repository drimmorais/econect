export interface INewUser {
  username: string;
  email: string;
  name: string;
  password: string;
  typeuser: 'citizen' | 'collect point' | 'admin';
  image?: File | string;
}

export interface IUpdateUser {
  email: string;
  username: string;
  name: string;
  image: string;
}

export interface IUpdatePasswordResetToken {
  passwordResetToken: string;
  passwordResetExpires?: Date;
}

// export interface IResponse extends Response {
//   level: string; // or any other type
// }
