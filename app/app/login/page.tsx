"use client";
import { Box, Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

const LoginComponennt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    console.log("cookieStore", token);
    if (token) {
      router.push("/home");
    }
  }, []);

  const onSubmit = (form: any) => {
    setIsLoading(true);

    console.log(username, password);
    setCookie(null, "token", `token-${username}`, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    router.push("/home");
    // fetch("url")
    //   .then((response) => {
    //     console.log(response.body);
    //   })
    //   .catch((error) => {
    //     onLoginError(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    setIsLoading(false);
  };

  const onLoginSuccess = ({
    token,
    refreshToken,
  }: {
    token: string;
    refreshToken: string;
    email: string;
  }) => {
    setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
    setCookie(null, "refreshToken", refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    // localStorage.setItem(
    //   "lastLoginDateOrLastLocationUpdate",
    //   new Date().toLocaleDateString()
    // );
    // const userRoles = jwt_decode<{ roles: string[] }>(token).roles;
    // localStorage.setItem("userRoles", userRoles.join(","));
    // openNotification({
    //   type: "success",
    //   message: "Connecté !",
    // });
    // router.push("/");
  };

  const onLoginError = (error: any) => {
    console.log(error);
    // openNotification({
    //   type: "error",
    //   message: getErrorMessageIfExplicit(
    //     error?.response?.data,
    //     `Connexion impossible, déso: ${error?.response?.data?.message}`
    //   ),
    // });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
          // InputLabelProps={{ shrink: true }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          type="password"
          defaultValue=""
          // InputLabelProps={{ shrink: true }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={onSubmit}>
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginComponennt;
