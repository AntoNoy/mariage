import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { axiosInstance } from "./axios";


export const logout = async () => {
  // await LoginService.logout().catch()

  destroyCookie(null, "token");
  destroyCookie(null, "refreshToken");

  // router.push("/login");
};


export const registerByUuid= async (uuid: string) => {
    return axiosInstance.get(`/auth/init/${uuid}`).then(res => res.data).then(res => {
      if(res.accessToken){
        setCookie(null, 'token', res.accessToken,{
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        Router.push('/home');
      }
      return res;
    })
}

export const registerUser = async (data: any):Promise<any> => {
    return axiosInstance.post(`/auth/register`, data).then(res => res.data).then(res => {
      if(res.accessToken){
        setCookie(null, 'token', res.accessToken,{
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        Router.push('/home');
      }
      return res;
    })
}