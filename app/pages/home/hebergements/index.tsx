import {
  getUserCampingCount,
  patchUserCampingCount,
} from "@/services/api/guests";
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
import Link from "next/link";
import { useEffect, useState } from "react";

const locationList = [
  "https://www.airbnb.fr/rooms/48767734?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/22876551?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/944202007972521574?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/42369007?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/29623283?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/18901533?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/13254973?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/617067996614982865?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/917426225602630342?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/29958169?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/631774154686805689?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/19777772?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/1149281449016657928?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/924416374115152552?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/51813412?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/702763488225319628?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/639082726038811104?viralityEntryPoint=1&s=76",
  "https://www.airbnb.fr/rooms/21160051?viralityEntryPoint=1&s=76",
];

export default function InformationPage() {
  const [campingCount, setCampingCount] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function saveCampingCount() {
    patchUserCampingCount(campingCount).then(handleClose);
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
            <CardHeader title={"Camping"} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                color="text.primary"
                fontSize={18}
                textAlign="justify"
              >
                {`Les Voûtes du Plessier dispose d'un camping où vous pouvez planter vos tentes
                (emplacement limité) avec sanitaires et serviettes de bains fournis pour 8€/personne.`}
              </Typography>

              <Button sx={{ my: 2 }} onClick={handleOpen} variant="contained">
                Reserver le camping
              </Button>

              <Typography
                variant="body2"
                color="text.primary"
                fontSize={18}
                textAlign="justify"
              >
                Vous avez réservé {campingCount} places de camping (
                {campingCount * 8}€).
                <br />
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
          width="100%"
        >
          <Card
            sx={{
              flex: "1 0 21%",
              margin: "5px",
              minWidth: "300px",
            }}
          >
            <CardHeader title={"Hébergements proches du domaine :"} />
            <CardContent>
              <Box
                alignItems={"center"}
                flexDirection={"column"}
                display={"flex"}
                flexWrap={"wrap"}
                width="100%"
              >
                {locationList.map((item: string, index) => {
                  return (
                    <>
                      <Link href={item} target="_blank">
                        Lien {index + 1}
                      </Link>{" "}
                      <br />
                    </>
                  );
                })}
              </Box>
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
              sx={{ width: 100 }}
              id="outlined-basic"
              fullWidth={false}
              label="Nombre de places"
              variant="outlined"
              type="number"
              onChange={(value) =>
                setCampingCount(parseInt(value.target.value))
              }
              defaultValue={campingCount}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    {"places => "} {campingCount * 8}€
                  </InputAdornment>
                ),
              }}
            />

            <Button
              sx={{ my: 2 }}
              onClick={saveCampingCount}
              variant="contained"
            >
              Enregister
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
