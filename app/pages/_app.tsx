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
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import { use, useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pathname, setPathname] = useState(router.pathname);

  useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);

  if (!pathname.startsWith("/home")) {
    return (
      <ThemeRegistry>
          <Component {...pageProps} />
      </ThemeRegistry>
    );
  }

  return (
    <>
      <ThemeRegistry>
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => router.push("/home")}
            >
              Mariage Morel ❤️ Noyelle
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
            p: 3,
            pb: 7,
          }}
        >
          <Component {...pageProps} />
        </Box>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
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
      </ThemeRegistry>
    </>
  );
}
