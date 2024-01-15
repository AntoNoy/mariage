import { Guests, translateGuestType } from "@/services/api/guests";
import { Paper, TextField, Typography } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
} from "react-hook-form";

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
        <Typography variant="h6" gutterBottom>
          {index + 1}/{props.guests.length}{" "}
          {translateGuestType(guest.type)}
        </Typography>

        <Controller
          name={`guests.${index}.firstname`}
          rules={{ required: 'Obligatoire' }}
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              key={`guest_${index}_firstname`}
              name="firstname"
              error={error !== undefined}
              label="Prénom"
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
          rules={{ required: 'Obligatoire' }}
          control={props.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              key={`guest_${index}_lastname`}
              name="lastname"
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
              required: 'Obligatoire',
              validate: (value, formValues) => {
                const intValue = parseInt(value);
                console.log(formValues.guests[index].type, intValue);
                if (guest.type !== "child") return true;
                if (intValue > 2025 || intValue < 1980)
                  return "L'année de naissance doit raisonable";
              },
            }}
            render={({ field: newField, fieldState: { error } }) => (
              <TextField
                {...newField}
                type="number"
                key={`guest_${index}_birthyear`}
                required
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
