import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { AppBar, Toolbar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { getGuestsDetails, registerByUuid } from "@/services/auth";
import { useForm, useFormState } from "react-hook-form";
import GuestForm from "@/components/register/guest-form";
import UserForm from "@/components/register/user-form";
import Resume from "@/components/register/resume";
import GuestConfirmForm from "@/components/register/guest_confirm-form";
import { updateGestsApi } from "@/services/api/guests";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function RegisterPage({ userPayload }: any) {
  const theme = useTheme();

  const route = useRouter();

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

  React.useEffect(() => {
    console.log("useEffect errors", errors);
  }, [errors]);

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
    {
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
          <UserForm control={control} setValue={setValue} />
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
      label: "Information sur les invités",
      description: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            px: 3,
          }}
        >
          <GuestForm control={control} guests={userPayload.guests} />
        </Box>
      ),
      validation: async () => await trigger(["guests"]),
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
              console.log(formState.errors);
              return await trigger(["guests"]);
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
    },
  ];

function scrollToTop(){
  const element = document.getElementById('mainBox');
  if (element) {
    element.scrollTo(0,0);
  }
}

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async () => {
    const isValid = await steps[activeStep].validation();
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      scrollToTop()
      
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    scrollToTop()
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
          height:"100%"
        }}
      >
        <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: theme.palette.primary.main }}
            >
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
                  onClick={handleSubmit(() => {
                    console.log("formState final", getValues());
                    updateGestsApi(getValues()).then((res: any) => {
                      console.log(res.data);
                      route.push("/");
                    });
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
