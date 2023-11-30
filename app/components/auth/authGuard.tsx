"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { usePathname } from "next/navigation";

export default function AuthGuard({ children }: any) {
  const [isLogout, setIsLogout] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage?.getItem("token");
    console.log("guard", token);
    console.log("pathname", pathname);

    setIsLogout(token ? false : true);
    if (pathname === "/login") {
      if(token){
        router.push("/home");
      } else {
        setIsLogout(false)
      }
    } else if (!token  && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname]);

  return (
    <>
      {isLogout ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </>
  );
}
