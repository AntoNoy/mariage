"use client";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import AppMenu from "@/components/appMenu";
import { useRouter } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <html lang="fr">
      <body>
        <ThemeRegistry>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>router.push('/home')}>
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
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
