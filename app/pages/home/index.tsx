"use client";
import * as React from "react";
import { Box, Button } from "@mui/material";
import WeddingCardComponent from "@/components/WeddingHall";
import { useRouter } from "next/router";

export default function HomePage() {

  const router = useRouter();

  return (
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
      <WeddingCardComponent
        initiales="M"
        title="Mairie"
        subTitle="14h"
        image="https://cdn.paris.fr/paris/2021/07/13/huge-4305c2575faada8a4508a780274124c7.jpg"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus nemo est
        soluta enim esse incidunt quaerat eveniet praesentium qui assumenda odit
        atque eos omnis dolores, adipisci aut dolorem itaque mollitia.
      </WeddingCardComponent>

      <WeddingCardComponent
        initiales="CL"
        title="Cérémonie Laïque"
        subTitle="16h"
        image="https://www.ceremonie-laique.fr/wp-content/uploads/2015/09/Ceremonie-laique-sud.jpg"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod aut
        laboriosam atque nihil possimus vitae? Laborum fuga possimus beatae
        rerum, amet, similique mollitia aut quisquam optio quam tempore, tempora
        soluta?
      </WeddingCardComponent>

      <WeddingCardComponent
        initiales="VH"
        title="Vin d'honneur"
        subTitle="18h"
        image="https://montrouge-traiteur.fr/wp-content/uploads/2018/01/vin-honneur-mariage.jpg"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab
        temporibus minus labore cupiditate nobis sed quae, quia nisi, impedit
        beatae placeat corporis repellendus totam. Ipsam odit maxime
        necessitatibus veniam.
      </WeddingCardComponent>

      <WeddingCardComponent
        initiales="FD"
        title="Festivités dinatoires"
        subTitle="A partir de 19h"
        image="https://fredeville-traiteur.fr/wp-content/uploads/2023/01/8-fredeville-traiteur-tours-repas-mariage-diner-haut-de-gamme.jpg"
        bottomAction={
          <Button
            variant="contained"
            color="primary"
            onClick={()=>router.push("/home/festive-meal")}
          >
            En savoir plus
          </Button>
        }
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ab
        temporibus minus labore cupiditate nobis sed quae, quia nisi, impedit
        beatae placeat corporis repellendus totam. Ipsam odit maxime
        necessitatibus veniam.
      </WeddingCardComponent>
    </Box>
  );
}
