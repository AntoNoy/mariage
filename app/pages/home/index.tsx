"use client";
import * as React from "react";
import { Box, Button, Typography } from "@mui/material";
import WeddingCardComponent from "@/components/WeddingHall";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

export default function HomePage() {
  const [user, setUser] = React.useState<any>(undefined);

  React.useEffect(() => {
    let { token } = parseCookies();
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  return (
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
      <Image
        src={`/logo.png`}
        alt={"alt"}
        width="300"
        height="334"
        style={{ paddingBottom: "3vh" }}
      />
      <WeddingCardComponent
        initiales="M"
        title="Mairie"
        subTitle="14h"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOBX57zE-vybB7jcGf2tFgC0mohInNDWb9Q&s"
        bottomAction={
          <Box marginX={1} width={"100%"}>
            <hr />
            <Typography
              variant="body2"
              align="justify"
              marginBottom={2}
              fontSize={14}
              width={"100%"}
            >
              Adresse: <br /> 2 rue des Écoles, 80110 Démuin
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              target="_blank"
              href="https://www.google.com/maps/place/Mairie/@49.8194012,2.5340554,17z/data=!4m6!3m5!1s0x47e792ac2caf991f:0xd21a095e4fdab951!8m2!3d49.8195854!4d2.536096!16s%2Fg%2F11b6dd94_q?entry=ttu"
            >
              Ouvrir dans MAP
            </Button>
          </Box>
        }
      >
        <Typography align="justify" fontSize={18}>
          {
            "C'est avec une grande joie et beaucoup d'émotions que nous vous invitons à célébrer notre union à la mairie de Démuin à 14h."
          }
        </Typography>
      </WeddingCardComponent>

      <WeddingCardComponent
        initiales="LVP"
        title="Les Voûtes du Plessier"
        subTitle="à partir de 15h30"
        image="https://cdn0.mariages.net/vendor/5506/3_2/960/jpeg/img-5830_3_165506-171396915619339.jpeg"
        bottomAction={
          <Box marginX={1} width={"100%"}>
            <hr />
            <Typography
              variant="body2"
              align="justify"
              marginBottom={2}
              width={"100%"}
              fontSize={14}
            >
              Adresse: <br /> 30 Le Plessier Hameau, 80250 Grivesnes
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              target="_blank"
              href="https://www.google.com/maps/place/LES+VOUTES+DU+PLESSIER/@49.6765902,2.4607357,18z/data=!3m1!4b1!4m6!3m5!1s0x47e79592ecdb7c73:0xde8022fc90c41260!8m2!3d49.676589!4d2.461644!16s%2Fg%2F11dzw417hg?entry=ttu"
            >
              Ouvrir dans MAP
            </Button>
          </Box>
        }
      >
        <Typography align="justify" marginBottom={2} fontSize={18}>
          {
            "Cette merveilleuse journée se prolongera aux Voûtes du Plessier par une cérémonie laïque à 15h30."
          }
        </Typography>
        <Typography align="justify" fontSize={18}>
          {
            "Plaisir et amitiés seront aussi de la partie, puisque nous nous retrouverons autour d'un apéritif champêtre au sein du domaine."
          }
        </Typography>
        {user?.withDinner ? (
          <Typography align="justify" marginTop={2} fontSize={18}>
            {"Suivi, à 19h30, d'un repas festif jusqu'au bout de la nuit."}
          </Typography>
        ) : (
          <Typography align="justify" marginTop={2} fontSize={18}>
            {
              "Suivi, à 18h30, d'une séance photo pour immortaliser cette journée."
            }
          </Typography>
        )}
      </WeddingCardComponent>
    </Box>
  );
}
