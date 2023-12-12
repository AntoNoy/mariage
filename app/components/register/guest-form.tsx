import { Guests, translateGuestType } from "@/services/api/guests";
import { Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

export interface GuestFormProps {
  control: Control<FieldValues, any>;
  guests: Guests[];
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export default function GuestForm(props: GuestFormProps) {
  const { fields, append } = useFieldArray(
    {
      control: props.control, // control props comes from useForm (optional: if you are using FormContext)
      name: "guests", // unique name for your Field Array
    }
  );

  const watchItems = props.watch("guests");

  useEffect(() => {
    props.guests.map((guest: Guests) => {
      if (!watchItems.find((guestWatch: any) => guestWatch.id === guest.id)) {
        append(guest);
      }
    });
  }, [props.guests]);

  return fields.map((field, index) => {
    const guest = props.guests[index];

    if (!guest) return null;

    return (
      <Paper
        elevation={3}
        key={field.id}
        sx={{
          p: 2,
          my: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {index + 1}/{props.guests.length}
          {translateGuestType(guest.type)}
        </Typography>

        <TextField
          sx={{
            my: 1,
          }}
          {...props.register(`guests.${index}.firstname`)}
          fullWidth
          required
          key={field.id + "_firstname"}
          label="Prénom"
        />
        <TextField
          sx={{
            my: 1,
          }}
          {...props.register(`guests.${index}.lastname`)}
          fullWidth
          required
          key={field.id + "_lastname"}
          label="Nom de famille"
        />

        {guest.type === "child" && (
          <Controller
          name={`guests.${index}.birthyear`}
          control={props.control}
            rules={{
              validate: (value, formValues) => {
                  if(!value.length) return "Obligatoire"
                  const intValue = parseInt(value);
                  console.log(formValues.guests[index].type, intValue);
                if (formValues.guests[index].type !== "child") return true;
                if (intValue < 2025 || intValue > 1980)
                  return "L'année de naissance doit raisonable";
              },
            }}
            render={({ field : newField, fieldState: { error } }) => (
              <TextField
                {...newField}
                type="number"
                error={error !== undefined}
                label="Année de naissance"
                sx={{
                  my: 1,
                  width: "100%",
                }}
              />
            )}
          />
          //   <TextField
          //     sx={{
          //       my: 1,
          //     }}
          //     {...props.register(`guests.${index}.birthyear`)}
          //     fullWidth
          //     required
          //     key={field.id+'_birthyear'}
          //     label="Année de naissance"
          //   />
        )}
      </Paper>
    );
  });
}
