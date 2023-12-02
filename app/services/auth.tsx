import { useRouter } from "next/router";
import { destroyCookie } from "nookies";

const router = useRouter();


export const logout = async () => {
  // await LoginService.logout().catch()

  destroyCookie(null, "token");
  destroyCookie(null, "refreshToken");

  router.push("/login");
};
