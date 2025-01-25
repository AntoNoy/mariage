import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { AppBar, Modal, Toolbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { getGuestsDetails, registerByUuid } from "@/services/auth";
import { useForm, useFormState } from "react-hook-form";
import GuestForm from "@/components/register/guest-form";
import UserForm from "@/components/register/user-form";
import Resume from "@/components/register/resume";
import GuestConfirmForm from "@/components/register/guest_confirm-form";
import { Guests, updateGestsApi } from "@/services/api/guests";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function RegisterPage({ userPayload }: any) {
  const theme = useTheme();
  const [openModalReception, setOpenModalReception] =
    React.useState<boolean>(false);
  const [openModalDinner, setOpenModalDinner] = React.useState<boolean>(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid grey",
    boxShadow: 24,
    p: 4,
  };
  const route = useRouter();

  const canModify = new Date() < new Date(process.env.NEXT_PUBLIC_DATE_FIN || '2025/02/18')

  const { control, handleSubmit, getValues, trigger, formState, setValue } =
    useForm({
      defaultValues: userPayload,
      delayError: 1000,
      mode: "all",
      criteriaMode: "firstError",
    });
  const { errors } = useFormState({
    control,
  });

  const [disableButtons, setDisableButtons] = React.useState(false)

  const steps = [
    ...(userPayload.repliedAt
      ? [
        {
          label: `Récapitulatif du ${format(
            userPayload.repliedAt,
            "dd/MM/yyyy à HH:mm"
          )}`,
          description: (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                px: 3,
              }}
            >
              <Resume user={getValues()} />
            </Box>
          ),
          validation: () => true,
        },
      ]
      : []),
    // {
    //   label: "Invitation",
    //   description: (
    //     <img
    //       max-width={"100%"}
    //       max-height={"100%"}
    //       height={"100%"}
    //       src="https://loverings.be/wp-content/uploads/2022/02/alliance-mariage-offerte.jpg"
    //     />
    //   ),
    //   validation: () => true,
    // },
    ...(canModify ? [{
      label: "Informations personnelles",
      description: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "space-evenly",
            px: 3,
          }}
        >
          <UserForm control={control} setValue={setValue} user={userPayload} />
        </Box>
      ),
      validation: async () => {
        if (!getValues().password || !getValues().password.length) {
          return trigger(["phone", "email"]);
        }
        return trigger(["phone", "email", "password", "password-verif"]);
      },
    },
    {
      label: `Invitations (${userPayload.guests.filter((g: any) => g.type === 'adult').length} adultes ${userPayload.guests.filter((g: any) => g.type !== 'adult').length ? `et ${userPayload.guests.filter((g: any) => g.type !== 'adult').length} enfants)` : ''}`,
      description: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            px: 3,
          }}
        >
          <GuestForm
            control={control}
            guests={userPayload.guests}
            formState={formState}
          />
        </Box>
      ),
      validation: async () => {
        if (getValues().guests.every((g: Guests) => !g.reception)) {
          setOpenModalReception(true);
        } else {
          return await trigger(["guests"]);
        }
      },
    },
    // {
    //   label: "Présence au vin d'honneur",
    //   description: (
    //     <Box
    //       key={"receptionBox"}
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "space-evenly",
    //         // height: "100%",
    //         px: 3,
    //       }}
    //     >
    //       <GuestConfirmForm
    //         control={control}
    //         guests={userPayload.guests}
    //         type={"reception"}
    //       />
    //     </Box>
    //   ),
    //   validation: () => true,
    // },
    ...(userPayload.withDinner
      ? [
        {
          label: "Choix du menu",
          description: (
            <Box
              key={"dinnerBox"}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                // height: "100%",
                px: 3,
              }}
            >
              <GuestConfirmForm
                control={control}
                guests={userPayload.guests}
              />
            </Box>
          ),
          validation: async () => {
            if (getValues().guests.every((g: Guests) => !g.dinner)) {
              setOpenModalDinner(true);
            } else {
              return await trigger(["guests"]);
            }
          },
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
          <Resume user={getValues()} />
        </Box>
      ),
      validation: () => true,
    },] : [
      {
        label: "Délais dépassé",
        description: (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: '100%',
              px: 3,
              textAlign:'center',
            }}
          >
            <h1 style={{fontSize: '30px'}}>Vous ne pouvez plus modifier après le 17 février 2025</h1>
            <p style={{fontSize: '200px'}}>⌛</p>
            <p>Vous pouvez toujours contacter les mariés pour <b>ESSAYER</b> de vous arranger</p>
          </Box>
        ),
        validation: () => true,
      }
    ])
  ];

  async function validForm() {

    if (!canModify) {
      route.push("/");
      return
    }


    setDisableButtons(true);
    await updateGestsApi(getValues()).then((res: any) => {
      console.log(res.data);
      route.push("/");
      return;
    }).catch(() => {
      setDisableButtons(false)
    });
  }

  function scrollToTop() {
    const element = document.getElementById("mainBox");
    if (element) {
      element.scrollTo(0, 0);
    }
    const element2 = document.getElementById("mainBox2");
    if (element2) {
      element2.scrollTo(0, 0);
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    const isValid = await steps[activeStep].validation();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      scrollToTop();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop();
  };

  const goToResume = () => {
    setActiveStep(() => maxSteps - 1);
  };

  const maxSteps = steps.length;

  return (
    <>
      <Paper
        sx={{
          display: "flex",
          zIndex: 0,
          flexDirection: "column",
          alignContent: "stretch",
          height: "100%",
        }}
      >
        <AppBar position="sticky" sx={{ backgroundColor: "white", height: 30 }}>
          <Toolbar sx={{ height: 5, display: 'block' }}>
            <Typography
              variant="body1"
              fontWeight={'bold'}
              fontSize={18}
              color={'primary'}
              height={'5'}
              component="div"
              sx={{ flexGrow: 1, }}
            >
              {steps[activeStep].label}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          id="mainBox2"
          component="main"
          key="main_register"
          sx={{
            flexGrow: 1,
            bgcolor: "background.primary",
            overflow: "auto",
            pb: 1,
            pt: 3,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            // height:"100%"
          }}
        >
          {steps[activeStep].description}
        </Box>
        <Paper
          sx={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 100 }}
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
                  type="button"
                  size="small"
                  variant="contained"
                  disabled={disableButtons}
                  onClick={handleSubmit(async () => {
                    console.log("formState final", getValues());
                    await validForm();
                  })}
                >
                  Valider <CheckIcon fontSize="small" />
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={() => {
                    console.log(control.getFieldState("guests"));
                    console.log(formState.isValid);
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
                Précédent
              </Button>
            }
          />
        </Paper>
        {/* </form> */}
      </Paper>

      <Modal
        open={openModalReception}
        onClose={() => setOpenModalReception(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={"primary"}
            fontWeight={"bold"}
          >
            Vous ne serez pas présent ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Vous n'avez sélectionné aucun invité présent.`}
          </Typography>
          <Typography id="modal-modal-description">
            Est ce volotaire ?
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit(() => {
                setOpenModalReception(false);
                goToResume();
              })}
            >
              Oui
            </Button>
            <Button onClick={() => setOpenModalReception(false)}>Annuler</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openModalDinner}
        onClose={() => setOpenModalDinner(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={"primary"}
            fontWeight={"bold"}
          >
            Vous ne mangerez pas avec nous ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Aucun invité n'a été ajouté pour le repas.`}
          </Typography>
          <Typography id="modal-modal-description">
            Est ce volotaire ?
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit(() => {
                console.log("formState final", getValues());
                setOpenModalDinner(false);
                goToResume();
              })}
            >
              Oui
            </Button>
            <Button onClick={() => setOpenModalDinner(false)}>Annuler</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export async function getServerSideProps({ query, req }: any) {
  // Fetch data from external API
  const uuid = query.uuid as string | undefined;

  const accessToken = req.cookies?.token || null;

  try {
    if (accessToken) {
      const userPayload = await getGuestsDetails(accessToken);
      return { props: { userPayload } };
    }
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Pass data to the page via props
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
