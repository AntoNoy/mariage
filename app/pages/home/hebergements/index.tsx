import {
  getUserCampingCount,
  patchUserCampingCount,
} from "@/services/api/guests";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import lvpImage from "../../../public/camping.jpg";
import PreviewLink from "@/components/previewLink";
import theme from "@/ThemeRegistry/theme";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";

const locationList = [
  "https://www.airbnb.fr/rooms/48767734",
  "https://www.airbnb.fr/rooms/22876551",
  "https://www.airbnb.fr/rooms/944202007972521574",
  "https://www.airbnb.fr/rooms/42369007",
  "https://www.airbnb.fr/rooms/29623283",
  "https://www.airbnb.fr/rooms/18901533",
  "https://www.airbnb.fr/rooms/13254973",
  "https://www.airbnb.fr/rooms/617067996614982865",
  "https://www.airbnb.fr/rooms/917426225602630342",
  "https://www.airbnb.fr/rooms/29958169",
  "https://www.airbnb.fr/rooms/631774154686805689",
  "https://www.airbnb.fr/rooms/19777772",
  "https://www.airbnb.fr/rooms/1149281449016657928",
  "https://www.airbnb.fr/rooms/924416374115152552",
  "https://www.airbnb.fr/rooms/51813412",
  "https://www.airbnb.fr/rooms/702763488225319628",
  "https://www.airbnb.fr/rooms/639082726038811104",
  "https://www.airbnb.fr/rooms/21160051",
  "https://www.montdidier-hotel.fr/",
  "https://www.airbnb.fr/rooms/1031298172741193152",
  "https://www.airbnb.fr/rooms/1085445490749583924",
  "https://www.airbnb.fr/rooms/770300048309179160",
];

export default function InformationPage() {
  const [campingCount, setCampingCount] = useState(0);
  const [user, setUser] = useState<any>(false);

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
    let { token } = parseCookies();
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  return (
    <>
      <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
        {user.withDinner && (
          <>
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
                  title={"Camping"}
                  avatar={
                    <Avatar
                      sx={{ bgcolor: theme.palette.primary.main }}
                      aria-label="recipe"
                    >
                      {"LVP"}
                    </Avatar>
                  }
                />
                <CardMedia
                  component="img"
                  // height="194"
                  src={lvpImage.src}
                  alt="Paella dish"
                />
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

                  <Button
                    sx={{ my: 2 }}
                    onClick={handleOpen}
                    variant="contained"
                  >
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
          </>
        )}
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
            <CardHeader
              title={"Hébergements proches du domaine :"}
              avatar={
                <Avatar
                  sx={{ bgcolor: theme.palette.primary.main }}
                  aria-label="recipe"
                >
                  {"BnB"}
                </Avatar>
              }
            />
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {locationList.map((item: string, index) => {
                  return (
                    <>
                      <PreviewLink
                        href={item}
                        datas={(data) => (
                          <Link href={item} target="_blank">
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                <Avatar
                                  sx={{ width: 75, height: 75, mr: 1, ml: -2 }}
                                  alt="Remy Sharp"
                                  src={data?.image || data?.screenshot}
                                  variant="rounded"
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={data?.description}
                                secondary={
                                  <Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {data?.title}
                                    </Typography>
                                    {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                  </Fragment>
                                }
                              />
                            </ListItem>
                          </Link>
                        )}
                      />
                    </>
                  );
                })}

                {/* <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Summer BBQ"
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          to Scott, Alex, Jennifer
                        </Typography>
                        {" — Wish I could come, but I'm out of town this…"}
                      </Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </Fragment>
                    }
                  />
                </ListItem> */}
              </List>

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
                      <PreviewLink
                        href={item}
                        datas={(data) => {
                          <Typography>{data?.image}</Typography>;
                        }}
                      />
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
