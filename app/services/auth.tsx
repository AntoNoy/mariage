import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { axiosInstance } from "./axios";
import { jwtDecode } from "jwt-decode";

export const logout = async () => {
  // await LoginService.logout().catch()

  destroyCookie(null, "token");
  destroyCookie(null, "refreshToken");

  // router.push("/login");
};

function setAccessToken(accessToken: string) {
  console.log(" setAccessToken", accessToken);

  setCookie(null, "token", accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  const userDatas = jwtDecode(accessToken);
  sessionStorage.set('userDatas', userDatas)
}

export const login = async (
  data: { username: string; password: string } | { uuid: string }
) => {
  return axiosInstance
    .post(`/auth/login`, data)
    .then((res) => res.data)
    .then((res) => {
      if (res.accessToken) {
        setAccessToken(res.accessToken);
      }
      return res;
    });
};

export const registerByUuid = async (uuid: string) => {
  return axiosInstance
    .get(`/auth/init/${uuid}`)
    .then((res) => res.data)
    .then((res) => {
      if (res.accessToken) {
        setAccessToken(res.accessToken);
        Router.push("/home");
      }
      return res;
    });
};

export const getGuestsDetails = (accessToken?: string) => {
  return axiosInstance
    .get(
      `guests`,
      accessToken
        ? {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        : {}
    )
    .then((res) => {
      console.log("-----", JSON.stringify(res.data));
      return res.data;
    })
    .catch((e) => console.error(e));
};

// export const registerUser = async (data: any): Promise<any> => {
//   return axiosInstance
//     .post(`/auth/register`, data)
//     .then((res) => res.data)
//     .then((res) => {
//       if (res.accessToken) {
//         setAccessToken(res.accessToken);
//         Router.push("/home");
//       }
//       return res;
//     });
// };
