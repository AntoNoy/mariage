import {
  Guests,
  TypeGuest,
  getGestsApi,
  translateGuestType,
} from "@/services/api/guests";
import { Padding } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function GuestsPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [guests, setGuests] = useState<Guests[]>([]);

  function setValue(id: number, key: string, value: any) {
    const newGuests = guests.map((guest) => {
      if (guest.id === id) {
        return {
          ...guest,
          [key]: value,
        };
      }
      return guest;
    });
    setGuests(newGuests);
  }

  const steps = [
    {
      label: "Informations générales",
      description: `Rentré les informations de votre tribue`,
      form: (guests: Guests[]) =>
        guests.map((guest, index) => (
          <>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mt: 2 }}
            >
              Invité {index + 1} : {translateGuestType(guest.type)}{" "}
              {guest.birthyear}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Prénom"
              value={guest.firstname}
              variant="outlined"
              size="small"
              sx={{ my: 1 }}
              onChange={(e) => setValue(guest.id, "firstname", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Nom de famille"
              value={guest.lastname}
              variant="outlined"
              size="small"
              sx={{ my: 1 }}
              onChange={(e) => setValue(guest.id, "lastname", e.target.value)}
            />

            {guest.type !== TypeGuest.ADULT && (
              <TextField
                id="outlined-basic"
                label="Année de naissance"
                value={guest.birthyear}
                variant="outlined"
                type="number"
                size="small"
                sx={{ my: 1 }}
                onChange={(e) =>
                  setValue(guest.id, "birthyear", e.target.value)
                }
              />
            )}
            <Divider></Divider>
          </>
        )),
    },
    {
      label: "Présence au vin d'honneur",
      description: "Qui sera présent au vin d'honneur ?",
      form: (guests: Guests[]) =>
        guests.map((guest, index) => (
          <>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mt: 2 }}
            >
              {guest.firstname} {guest.lastname}
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={
                  guest.wineReception === null
                    ? ""
                    : guest.wineReception
                    ? "1"
                    : "0"
                }
                onChange={(e) =>
                  setValue(
                    guest.id,
                    "wineReception",
                    e.target.value === "1" ? true : false
                  )
                }
                autoWidth
                label="Participe"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"0"}>Oui</MenuItem>
                <MenuItem value={"1"}>Non</MenuItem>
              </Select>
            </FormControl>

            <Divider></Divider>
          </>
        )),
    },
    {
      label: "Présence au repas",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  useEffect(() => {
    getGestsApi().then((data) => {
      setGuests(data);
    });
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ top: 0, bottom: 0, left: 0, right: 0 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={() => setActiveStep(index)}
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2, overflow: "auto" }}>
                <Typography>{step.description}</Typography>

                {step.form && step.form(guests)}

                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
