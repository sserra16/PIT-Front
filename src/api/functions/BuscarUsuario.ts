import { User } from "../../types/user.ts";
import { api } from "../api.ts";

export const buscarUsuario = async (token: {
  type: string;
  token: string;
}): Promise<User> => {
  let user: User = {};

  await api
    .get("authenticate", {
      headers: {
        Authorization: `${token.type} ${token.token}`,
      },
    })
    .then((res) => {
      user = res.data.user;
    })
    .catch((error) => {
      console.error(error);
    })

  await api
    .get(`/getimage/${user.id}`, { responseType: 'blob' })
    .then(async (res) => {
        if (res.data.type == 'application/json') {
          return res.data;
        }

        const blob = res.data;

        user.imageUrl = URL.createObjectURL(blob);
    })
    .catch((error) => console.error(error));
  return user;
};
