import { getUserCampingCount, patchUserCampingCount } from "@/services/api/guests";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function InformationPage() {
  const [campingCount, setCampingCount] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function saveCampingCount(){
    patchUserCampingCount(campingCount).then(handleClose)
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getUserCampingCount().then((res) => {
      setCampingCount(res);
    });
  }, []);

  return (
    <>
      <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
        {/* <Typography variant="h3">
        Comment venir ?
      </Typography>
      <Box alignItems={"center"} flexDirection={"row"} display={"flex"} flexWrap={"wrap"}>

        <Card sx={{
          flex: "1 0 21%",
          margin: "5px",
          minWidth: "300px"
          // height: "100px",
        }}>
          <CardHeader
            // avatar={
            // initiales ? (
            //   <Avatar
            //     sx={{ bgcolor: theme.palette.primary.main }}
            //     aria-label="recipe"
            //   >
            //     {initiales}
            //   </Avatar>
            // ) : null
            // }
            // action={headerAction}
            title={"la Mairie"}
          subheader={"Rendez vous à 14h"}
          />

          <CardContent>
            <Typography variant="body2" color="text.primary" fontSize={14} pb={"15px"}>
              <p>
                Addresse:
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae cupiditate ullam optio possimus totam culpa fuga eaque quisquam ad illum veritatis odio fugit?
              </p>

            </Typography>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824573244!2d2.2646349063797047!3d48.85893843461574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1710270774597!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: "0" }}
            ></iframe>
          </CardContent>
        </Card>

        <Card sx={{
          flex: "1 0 21%",
          margin: "5px",
          minWidth: "300px"
          
        }}>
          <CardHeader
            // avatar={
            // initiales ? (
            //   <Avatar
            //     sx={{ bgcolor: theme.palette.primary.main }}
            //     aria-label="recipe"
            //   >
            //     {initiales}
            //   </Avatar>
            // ) : null
            // }
            // action={headerAction}
            title={"la Reception"}
           subheader={"Après la Mairie (à partir de 15h15 environ)"}
          />
          <CardContent>
          <Typography variant="body2" color="text.primary" fontSize={14} pb={"15px"}>
              <p>
                Addresse:
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae cupiditate ullam optio possimus totam culpa fuga eaque quisquam ad illum veritatis odio fugit?
              </p>

            </Typography>


            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82240.01966279316!2d2.2022812066413673!3d49.89879178352961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e78413d78b760b%3A0x40af13e816220e0!2sAmiens!5e0!3m2!1sfr!2sfr!4v1710271283615!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
            ></iframe>
          </CardContent>
        </Card>
      </Box> */}
        <Typography variant="h3" mt={"15px"}>
          Sur place
        </Typography>
        <Box
          alignItems={"center"}
          flexDirection={"row"}
          display={"flex"}
          flexWrap={"wrap"}
        >
          <Card
            sx={{
              flex: "1 0 21%",
              margin: "5px",
              minWidth: "300px",
            }}
          >
            <CardHeader
              title={"Camping LVP"}
            />
            <CardContent
            sx={{textAlign:"center"}}
            >
              <Typography
                variant="body2"
                color="text.primary"
                fontSize={14}
                textAlign="justify"
              >
                {"Le domaine dispose d'un camping (emplacement de VOS tentes limitée) avec sanitaires et serviettes de bains fournis pour 8€/personne."}
              </Typography>

              <Button  sx={{my:2}} onClick={handleOpen} variant="contained" >Reserver le camping</Button>

              <Typography
                variant="body2"
                color="text.primary"
                fontSize={14}
                textAlign="justify"
              >
                Vous avez réservé {campingCount} places de camping ({campingCount*8}€).
                <br/>
                Paiement en espèces sur place.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Typography variant="h3" mt={"15px"}>
          Aux alentours
        </Typography>
        <Box
          alignItems={"center"}
          flexDirection={"row"}
          display={"flex"}
          flexWrap={"wrap"}
        >
          <Card
            sx={{
              flex: "1 0 21%",
              margin: "5px",
              minWidth: "300px",
            }}
          >
            <CardHeader
              // avatar={
              // initiales ? (
              //   <Avatar
              //     sx={{ bgcolor: theme.palette.primary.main }}
              //     aria-label="recipe"
              //   >
              //     {initiales}
              //   </Avatar>
              // ) : null
              // }
              // action={headerAction}
              title={"Les logements"}
              // subheader={""}
            />
            <CardContent>
              <Typography variant="body2" color="text.primary" fontSize={14}>
                Addresse:
              </Typography>
              <Typography variant="body2" color="text.primary" fontSize={14}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae
                cupiditate ullam optio possimus totam culpa fuga eaque quisquam
                ad illum veritatis odio fugit?
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Réservez vos places de camping
          </Typography>

          <Box
          component={"form"}
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
            sx={{width: 100}}
              id="outlined-basic"
              fullWidth={false}
              label="Nombre de places"
              variant="outlined"
              type="number"
              onChange={(value)=>setCampingCount(parseInt(value.target.value))}
              defaultValue={campingCount}
              InputProps={{
                endAdornment: <InputAdornment position="end">  {'places => '} {campingCount*8}€</InputAdornment>,
              }}
            /> 
           
           <Button  sx={{my:2}} onClick={saveCampingCount} variant="contained" >Enregister</Button>

          </Box>
        </Box>
      </Modal>
    </>
  );
}
