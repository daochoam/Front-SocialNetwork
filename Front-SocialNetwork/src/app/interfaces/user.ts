export interface IUser {
  _id?: string;
  fullName: string,
  age: number;
  email: string;
  password: string;
  posts?: Array<string>;

}
