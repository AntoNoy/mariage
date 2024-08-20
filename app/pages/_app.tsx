import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeRegistry from "@/ThemeRegistry/ThemeRegistry";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import AppMenu from "@/components/appMenu";
import { useRouter } from "next/router";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import CameraIcon from "@mui/icons-material/Camera";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect, useState } from "react";
import { getUserRepliedAt } from "@/services/api/guests";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);
  const [alreadyReplied, setAlreadyReplied] = useState<any>(false);
  const [user, setUser] = useState<any>(false);

  useEffect(() => {
    setPathname(router.pathname);

    if(router.pathname.startsWith('/home')){

      getUserRepliedAt().then((res) => {
        setAlreadyReplied(res);
      });
      let { token } = parseCookies();
      if (token) {
        setUser(jwtDecode(token));
      }
    }
  }, [router.pathname]);

  if (pathname.startsWith("/home")||pathname.startsWith("/admin")) {
    return (
      <>
        <ThemeRegistry>
          <Box
            alignItems={"center"}
            flexDirection={"column"}
            display={"flex"}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              overflow: "none",
              width: "100%",
            }}
          >
            <AppBar
              // position="sticky"
              position="relative"
              sx={{ flexGrow: 1 }}
            >
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  onClick={() => router.push("/home")}
                >
                  Antony & Mélanie ❤️ 17/05/2025
                </Typography>
                <AppMenu />
              </Toolbar>
            </AppBar>

            <Box
              component="main"
              id="mainBox"
              sx={{
                flexGrow: 1,
                bgcolor: "background.primary",
                overflow: "auto",
                p: pathname.includes("guests") ? 0 : 2,
                width: "100%",
                height: "100%",
                // pt:7,
                // pb: 7,
              }}
            >
              <Component {...pageProps} />
            </Box>

            <Paper
              sx={{
                position: "relative",
                width: "100%",
              }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={pathname}
                onChange={(event, newValue) => {
                  setPathname(newValue);
                  router.push(newValue);
                }}
              >
                <BottomNavigationAction
                  label="Accueil"
                  value={"/home"}
                  icon={<HomeIcon />}
                />
                <BottomNavigationAction
                  label="Réponse"
                  sx={{
                    ...(!alreadyReplied
                      ? { backgroundColor: "red", color: "white !important" }
                      : {}),
                  }}
                  value={"/home/guests"}
                  icon={<PeopleIcon />}
                />
                {user.withDinner && (
                  <BottomNavigationAction
                    label="Hébergements"
                    value={"/home/hebergements"}
                    icon={<NightShelterIcon />}
                  />
                )}
                <BottomNavigationAction
                  label="Photos"
                  value={"/home/galerie"}
                  icon={<CameraIcon />}
                />
              </BottomNavigation>
            </Paper>
          </Box>
        </ThemeRegistry>
      </>
    );
  } else if (pathname.startsWith("/admin")) {
    return (
      <>
        <ThemeRegistry>
          <Box
            alignItems={"center"}
            flexDirection={"column"}
            display={"flex"}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              overflow: "none",
              width: "100%",
            }}
          >
            <AppBar position="relative" sx={{ flexGrow: 1 }}>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  onClick={() => router.push("/home")}
                >
                  ADMIN - Mariage Morel ❤️ Noyelle
                </Typography>
                <AppMenu />
              </Toolbar>
            </AppBar>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.primary",
                overflow: "auto",
                p: 2,
                width: "100%",
                // pt:7,
                // pb: 7,
              }}
            >
              <Component {...pageProps} />
            </Box>

            <Paper
              sx={{
                position: "relative",
                width: "100%",
              }}
              elevation={3}
            >
              <BottomNavigation
                showLabels
                value={pathname}
                onChange={(event, newValue) => {
                  setPathname(newValue);
                  router.push(newValue);
                }}
              >
                <BottomNavigationAction
                  label="Accueil"
                  value={"/home"}
                  icon={<HomeIcon />}
                />
                <BottomNavigationAction
                  label="Informations"
                  value={"/home/informations"}
                  icon={<InfoIcon />}
                />
                <BottomNavigationAction
                  label="Repas"
                  value={"/home/festive-meal"}
                  icon={<RestaurantIcon />}
                />
                <BottomNavigationAction
                  label="Invités"
                  value={"/home/guests"}
                  icon={<PeopleIcon />}
                />
              </BottomNavigation>
            </Paper>
          </Box>
        </ThemeRegistry>
      </>
    );
  } else {
    return (
      <ThemeRegistry>
        <Component {...pageProps} />
      </ThemeRegistry>
    );
  }
}
