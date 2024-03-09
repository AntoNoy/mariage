import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { NextPageContext } from "next";
import { login } from "@/services/auth";

export default function Root() {
  const router = useRouter();
  console.log("rootPage");

  useEffect(() => {
    router.replace("/home");
  }, []);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignContent={"center"}
    >
      <CircularProgress />
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  } else {
    if (context?.query?.uuid) {
      const { accessToken } = await login({
        uuid: context.query.uuid as string,
      });

      setCookie(context, "token", accessToken)
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: "/login" + context.query.uuid,
        permanent: false,
      },
    };
  }
}
