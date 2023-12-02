"use client";

import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();
  console.log('rootPage')
  
  useEffect(() => {
    
    router.replace('/home')
  }, [])
  
  return (<Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"center"}
 
    flexDirection={"column"}
    alignContent={"center"}
  ><CircularProgress /></Box>);
}
