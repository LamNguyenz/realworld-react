import apiClient from "../apiClient";
import { postLoginParam, postRegisterParam } from "./usersRepository.param";

export const postLogin = async ({ email, password }: postLoginParam) => {
  return await apiClient({
    method: "post",
    url: `/users/login`,
    data: {
      user: {
        email,
        password,
      },
    },
  });
};

export const postRegister = async ({ username, email, password }: postRegisterParam) => {
  return await apiClient({
    method: "post",
    url: `/users`,
    data: {
      user: {
        username,
        email,
        password,
      },
    },
  });
};
