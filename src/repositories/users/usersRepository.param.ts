export interface postLoginParam {
  email: string;
  password: string;
}

export interface postRegisterParam {
  username: string;
  email: string;
  password: string;
}

export interface putUserParam {
  username: string;
  email: string;
  image: string;
  bio: string;
  password: string;
}
