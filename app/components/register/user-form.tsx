import { Paper, TextField, Typography } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface UserFormProps {
  control: Control<FieldValues, any>;
  user: any;
}

export default function UserForm({ control, user }: UserFormProps) {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          my: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Informations de connexion
        </Typography>

        <Controller
          name="username"
          disabled
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              name="username"
              error={error !== undefined}
              label="Nom d'utilisateur"
              sx={{
                my: 1,
                width: "100%",
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue={""}
          rules={{
            required: "Obligatoire",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Doit contenir 8 caractère 1 maj 1 min et 1 chiffre",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              type="password"
              error={error !== undefined}
              label="Mot de passe"
              helperText={error?.message}
              sx={{
                my: 1,
                width: "100%",
              }}
            />
          )}
        />
        <Controller
          name="password-verif"
          control={control}
          defaultValue={""}
          rules={{
            required: true,
            validate: (value, formValues) => {
              return value === formValues.password || "ne correspond pas";
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              type="password"
              error={error !== undefined}
              label="Vérification du mot de passe"
              helperText={error?.message}
              sx={{
                my: 1,
                width: "100%",
              }}
            />
          )}
        />
      </Paper>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: "100%",
          my: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Informations de contact
        </Typography>

        <Controller
          name="email"
          control={control}
          // defaultValue={user.email}
          rules={{
            required: "Obligatoire",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "E-mail invalide",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              onChange={(e) => field.onChange(e.target.value)}
              name="email"
              error={error !== undefined}
              label="E-mail"
              helperText={error?.message}
              sx={{
                width: "100%",
                my: 1,
              }}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          // defaultValue={user.phone}
          rules={{
            required: "Obligatoire",
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              required
              error={error !== undefined}
              label="Téléphone"
              helperText={error?.message}
              sx={{
                width: "100%",
                my: 1,
              }}
            />
          )}
        />
      </Paper>
    </>
  );
}
