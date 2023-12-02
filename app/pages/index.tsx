import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { Context, useEffect } from "react";
import { parseCookies } from "nookies";
import { NextPageContext } from "next";

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
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
