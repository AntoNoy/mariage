import { Guests, translateGuestType } from "@/services/api/guests";
import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface GuestFormProps {
  control: Control<FieldValues, any>;
  guests: Guests[];
  formState: any;
}

export default function GuestForm(props: GuestFormProps) {
  const [modif, setModif] = useState(new Date());

  function handleChangeNotification() {
    setModif(new Date());
  }
  useEffect(() => {
    console.log(props.formState);
  }, [modif]);
  return props.guests.map((guest, index) => {
    return (
      <Paper
        elevation={3}
        key={"Guest_" + guest.id}
        sx={{
          p: 2,
          my: 1,
        }}
      >
        <Typography variant="h6" color={'primary'} fontWeight={'bold'}>
          {translateGuestType(guest.type)}
        </Typography>
        <Box
          alignContent={"space-around"}
          flexDirection={"row"}
          alignItems={"center"}
          display={"flex"}
        >
          <Controller
            name={`guests.${index}.reception`}
            rules={{ required: false }}
            control={props.control}
            render={({ field }) => (
              <>
                <Typography>Présent : Non</Typography>
                <Switch
                  {...field}
                  key={`Guest_${index}_switch_reception`}
                  checked={field.value || false}
                  onClick={() => handleChangeNotification()}
                />
                <Typography>Oui :</Typography>
              </>
            )}
          />
        </Box>

        <Controller
          name={`guests.${index}.firstname`}
          rules={{
            required: guest.reception ?? "Obligatoire",
            validate: (value, formValues) => {
              if (!formValues.guests[index].reception) return true;
              if (!value) return "Veuillez entrer votre prénom";
            },
          }}
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              disabled={!props.control._getWatch(`guests[${index}].reception`)}
              key={`guest_${index}_firstname`}
              name="firstname"
              error={error !== undefined}
              label="Prénom"
              required={props.control._getWatch(`guests[${index}].reception`)}
              helperText={error?.message}
              sx={{
                my: 1,
                width: "100%",
              }}
            />
          )}
        />

        <Controller
          name={`guests.${index}.lastname`}
          rules={{
            required: guest.reception ?? "Obligatoire",
            validate: (value, formValues) => {
              if (!formValues.guests[index].reception) return true;
              if (!value) return "Veuillez entrer votre nom";
            },
          }}
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              key={`guest_${index}_lastname`}
              name="lastname"
              disabled={!props.control._getWatch(`guests[${index}].reception`)}
              required={props.control._getWatch(`guests[${index}].reception`)}
              helperText={error?.message}
              error={error !== undefined}
              label="Nom de famille"
              sx={{
                my: 1,
                width: "100%",
              }}
            />
          )}
        />

        {guest.type === "child" && (
          <Controller
            name={`guests.${index}.age`}
            control={props.control}
            rules={{
              validate: (value, formValues) => {
                const intValue = parseInt(value);
                if (
                  guest.type !== "child" ||
                  !formValues.guests[index].reception
                ) {
                  return true;
                }
                if (isNaN(intValue)) {
                  return "Obligatoire";
                }
                if (intValue > 25 || intValue < 0)
                  return "L'age doit être raisonable";
              },
            }}
            render={({ field: newField, fieldState: { error } }) => (
              <TextField
                {...newField}
                type="number"
                key={`guest_${index}_age`}
                disabled={
                  !props.control._getWatch(`guests[${index}].reception`)
                }
                required={props.control._getWatch(`guests[${index}].reception`)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{`an${
                      props.control._getWatch(`guests[${index}].age`) > 1
                        ? "s"
                        : ""
                    }`}</InputAdornment>
                  ),
                }}
                error={error !== undefined}
                helperText={error?.message}
                label="Age au 17 mai 2025"
                sx={{
                  my: 1,
                  width: "100%",
                }}
              />
            )}
          />
        )}
      </Paper>
    );
  });
}
