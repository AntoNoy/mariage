import { Guests, translateGuestType } from "@/services/api/guests";
import { Paper, Switch, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface GuestFormProps {
  control: Control<FieldValues, any>;
  guests: Guests[];
  type: string;
}

export default function GuestConfirmForm({
  guests,
  control,
  type,
}: GuestFormProps) {
  useEffect(() => {}, [type]);

  return guests.map((guest, index) => {
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
          {control
            ._getWatch([
              `guests.${index}.firstname`,
              `guests.${index}.lastname`,
            ])
            .join(" ")}
        </Typography>

        <Controller
          name={`guests.${index}.${type}`}
          rules={{ required: "Obligatoire" }}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              key={`Guest_${index}_switch_${type}`}
              defaultChecked={field.value}
            />
          )}
        />
      </Paper>
    );
  });
}
