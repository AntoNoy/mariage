import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { AppBar, Switch, TextField, Toolbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { registerUser, registerByUuid } from "@/services/auth";
import { Guests, translateGuestType } from "@/services/api/guests";


export default function RegisterPage({ userPayload }: any) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const [user, setUser] = React.useState(userPayload);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    console.log("--user--", user);
  }, [user]);

  async function handleSubmit() {
    console.log(user);
    await registerUser(user);
  }

  const steps = [
    {
      label: "Invitation",
      description: (
        <img
          max-width={"100%"}
          max-height={"100%"}
          height={"100%"}
          src="https://loverings.be/wp-content/uploads/2022/02/alliance-mariage-offerte.jpg"
        />
      ),
    },
    {
      label: "Informations de connexion",
      description: user ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "space-evenly",
            px: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              my: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Informations personnels
            </Typography>

            <TextField
              sx={{
                my: 1,
              }}
              required
              fullWidth
              key={"user-username"}
              label="Nom d'utilisateur"
              defaultValue={user.username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser((user: any) => ({
                  ...user,
                  username: event.target.value,
                }));
              }}
            />
            <TextField
              sx={{
                my: 1,
              }}
              required
              fullWidth
              key={"user-email"}
              label="E-mail"
              defaultValue={user.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser((user: any) => ({
                  ...user,
                  email: event.target.value,
                }));
              }}
            />
            <TextField
              sx={{
                my: 1,
              }}
              required
              fullWidth
              key={"user-phone"}
              label="Téléphone"
              defaultValue={user.phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser((user: any) => ({
                  ...user,
                  phone: event.target.value,
                }));
              }}
            />
            <TextField
              sx={{
                my: 1,
              }}
              required
              fullWidth
              key={"user-password"}
              label="Mot de passe"
              defaultValue={user.password}
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUser((user: any) => ({
                  ...user,
                  password: event.target.value,
                }));
              }}
            />
          </Paper>
        </Box>
      ) : null,
    },
    {
      label: "Information sur les invités",
      description: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            // height: "100%",
            px: 3,
          }}
        >
          {user.guests.map((guest: Guests, index: number) => (
            <Paper
              elevation={3}
              sx={{
                p: 2,
                my: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {index + 1}/{user.guests.length}{" "}
                {translateGuestType(guest.type)}
              </Typography>
              <TextField
                sx={{
                  my: 1,
                }}
                fullWidth
                key={guest.id + "firstname"}
                label="Prénom"
                defaultValue={guest.firstname}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUser((user: any) => {
                    user.guests = user.guests.map((userGuest: Guests) => {
                      if (userGuest.id === guest.id) {
                        return {
                          ...userGuest,
                          firstname: event.target.value,
                        };
                      }
                      return userGuest;
                    });
                    return user;
                  });
                }}
              />
              <TextField
                sx={{
                  my: 1,
                }}
                fullWidth
                label="Nom de famille"
                key={guest.id + "lastname"}
                defaultValue={guest.lastname}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUser((user: any) => {
                    user.guests = user.guests.map((userGuest: Guests) => {
                      if (userGuest.id === guest.id) {
                        return {
                          ...userGuest,
                          lastname: event.target.value,
                        };
                      }
                      return userGuest;
                    });
                    return user;
                  });
                }}
              />
              {guest.type === "child" && (
                <TextField
                  sx={{
                    my: 2,
                  }}
                  fullWidth
                  key={guest.id + "birthyear"}
                  label="Année de naissance"
                  type="number"
                  defaultValue={guest.birthyear}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUser((user: any) => {
                      user.guests = user.guests.map((userGuest: Guests) => {
                        if (userGuest.id === guest.id) {
                          return {
                            ...userGuest,
                            birthyear: parseInt(event.target.value),
                          };
                        }
                        return userGuest;
                      });
                      return user;
                    });
                  }}
                />
              )}
            </Paper>
          ))}
        </Box>
      ),
    },
    {
      label: "Présence au vin d'honneur",
      description: (
        <Box
          key={"receptionBox"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            // height: "100%",
            px: 3,
          }}
        >
          {user.guests.map((guest: any) => (
            <>
              <Paper
                elevation={3}
                sx={{
                  my: 1,
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                }}
                key={`${guest.id}_reception_box`}
              >
                <Typography key={guest.id + "bla"}>
                  {guest.firstname} {guest.lastname}
                </Typography>
                <Switch
                  key={guest.id + "_reception_switch"}
                  defaultChecked={guest.reception}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUser((user: any) => {
                      user.guests = user.guests.map((userGuest: any) => {
                        if (userGuest.id === guest.id) {
                          return {
                            ...userGuest,
                            reception: event.target.checked,
                          };
                        }
                        return userGuest;
                      });
                      return user;
                    });
                  }}
                />
              </Paper>
            </>
          ))}
        </Box>
      ),
    },
    ...(user.withDinner
      ? [
          {
            label: "Présence au repas",
            description: (
              <Box
                key={"receptionBox"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  // height: "100%",
                  px: 3,
                }}
              >
                {user.guests.map((guest: any) => (
                  <Paper
                    elevation={3}
                    sx={{
                      my: 1,
                      p: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                    key={`${guest.id}_dinner_box`}
                  >
                    <Typography key={guest.id + "hdqskjdh"}>
                      {guest.firstname} {guest.lastname}
                    </Typography>
                    <Switch
                      key={guest.id + "_dinner_switch"}
                      defaultChecked={guest.dinner}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUser((user: any) => {
                          user.guests = user.guests.map((userGuest: any) => {
                            if (userGuest.id === guest.id) {
                              return {
                                ...userGuest,
                                dinner: event.target.checked,
                              };
                            }
                            return userGuest;
                          });
                          return user;
                        });
                      }}
                    />
                  </Paper>
                ))}
              </Box>
            ),
          },
        ]
      : []),
    {
      label: "Récapitulatif",
      description: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            px: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              my: 1,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Informations personnels
            </Typography>
            <Typography variant="body1" gutterBottom>
              Nom d'utilisateur: {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              E-mail: {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Téléphone: {user.phone}
            </Typography>
          </Paper>
          {user.guests.map((guest: Guests, index: number) => (
            <Paper
              elevation={3}
              sx={{
                p: 2,
                my: 1,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {index + 1}/{user.guests.length}{" "}
                {translateGuestType(guest.type)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Prénom: {guest.firstname}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Nom de famille: {guest.lastname}
              </Typography>
              {guest.type === "child" && (
                <Typography variant="body1" gutterBottom>
                  Année de naissance: {guest.birthyear}
                </Typography>
              )}
              <Typography variant="body1" gutterBottom>
                Vin d'honneur: {guest.reception ? "Oui" : "Non"}
              </Typography>
              {user.withDinner && (
                <Typography variant="body1" gutterBottom>
                  Repas: {guest.dinner ? "Oui" : "Non"}
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      ),
    },
  ];

  const maxSteps = steps.length;

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {steps[activeStep].label}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <form noValidate autoComplete="off" onSubmit={handleSubmit}> */}
      <Box
        component="main"
        key="main_register"
        sx={{
          flexGrow: 1,
          bgcolor: "background.primary",
          overflow: "auto",
          // p: 3,
          pb: 7,
          pt: 8,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          position: "absolute",
        }}
      >
        {steps[activeStep].description}
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100 }}
        elevation={3}
      >
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep === maxSteps - 1 ? (
              <Button
                type="submit"
                size="small"
                variant="contained"
                onClick={() => {
                  console.log(user);
                  handleSubmit();
                }}
                // disabled={activeStep === maxSteps - 1}
              >
                Valider <CheckIcon fontSize="small" />
              </Button>
            ) : (
              <Button
                size="small"
                onClick={() => {
                  handleNext();
                }}
              >
                Suivant
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Paper>
      {/* </form> */}
    </>
  );
}

export async function getServerSideProps({ query }: any) {
  // Fetch data from external API
  const uuid = query.uuid as string | undefined;

  try {
    if (uuid) {
      const user = await registerByUuid(uuid);
      let userPayload = user;
      for (let key in userPayload) {
        if (user[key] === null) {
          user[key] = "";
        }
      }
      userPayload.guests = userPayload.guests.map((guest: any) => {
        for (let key in guest) {
          if (guest[key] === null) {
            guest[key] = "";
          }
        }
        return guest;
      });
      return { props: { userPayload: userPayload } };
    }
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
