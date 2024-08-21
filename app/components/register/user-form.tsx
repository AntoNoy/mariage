import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Paper, TextField, Typography } from "@mui/material";
import { use, useEffect, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface UserFormProps {
  control: Control<FieldValues, any>;
  setValue: any;
  user: any;
}

export default function UserForm({ control, setValue, user }: UserFormProps) {
  const [displayPwd, setDisplayPwd] = useState(false);

  useEffect(() => {
    setValue("password", "");
  }, [displayPwd]);

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

        <TextField
          name="username"
          disabled
          value={user.username}
          label="Nom d'utilisateur"
          sx={{
            my: 1,
            width: "100%",
          }}
        />

        <div onClick={() => setDisplayPwd((oldValue) => !oldValue)}>
          {displayPwd ? (
            <Typography variant="subtitle2" gutterBottom>
              <KeyboardArrowUp />
              Cliquez ici pour ne pas modifier le mot de passe
            </Typography>
          ) : (
            <Typography variant="subtitle2" gutterBottom>
              <KeyboardArrowDown />
              Votre mot de passe par default est 2025, si vous souhaitez le
              modifier, cliquez ici
            </Typography>
          )}
        </div>
        {displayPwd ? (
          <>
            <Controller
              name="password"
              control={control}
              defaultValue={""}
              rules={{
                required: "Obligatoire",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                  message: "Doit contenir 8 caractère 1 maj 1 min et 1 chiffre",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="password"
                  required
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
                  type="password"
                  required
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
          </>
        ) : (
          <></>
        )}
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
