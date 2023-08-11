export interface User {
  username?: string;
  email: string;
  password: string;
}

export interface UserInfo extends Omit<User, 'password'> {
  token: string;
  bio: string;
  image: string;
}
