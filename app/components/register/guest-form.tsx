import { Guests, translateGuestType } from "@/services/api/guests";
import { Box, Paper, Switch, TextField, Typography } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface GuestFormProps {
  control: Control<FieldValues, any>;
  guests: Guests[];
}

export default function GuestForm(props: GuestFormProps) {
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
        <Box
          alignContent={"space-around"}
          flexDirection={"row"}
          display={"flex"}
        >
          <Typography variant="h6" gutterBottom>
            {index + 1}/{props.guests.length} {translateGuestType(guest.type)}
          </Typography>

          <Controller
            name={`guests.${index}.reception`}
            rules={{ required: false }}
            control={props.control}
            render={({ field }) => (
              <Switch
                {...field}
                key={`Guest_${index}_switch_reception`}
                defaultChecked={field.value || false}
              />
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
            name={`guests.${index}.birthyear`}
            control={props.control}
            rules={{
              validate: (value, formValues) => {
                const intValue = parseInt(value);
                console.log(formValues.guests[index].type, intValue);
                console.log(formValues.guests[index].reception);
                if (
                  guest.type !== "child" ||
                  !formValues.guests[index].reception
                ) {
                  console.log(formValues.guests[index].reception);
                  return true;
                }
                if (isNaN(intValue)) {
                  return "Obligatoire";
                }
                if (intValue > 2025 || intValue < 1980)
                  return "L'année de naissance doit être raisonable";
              },
            }}
            render={({ field: newField, fieldState: { error } }) => (
              <TextField
                {...newField}
                type="number"
                key={`guest_${index}_birthyear`}
                required={props.control._getWatch(`guests[${index}].reception`)}
                error={error !== undefined}
                helperText={error?.message}
                label="Année de naissance"
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
