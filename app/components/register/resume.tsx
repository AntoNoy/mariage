import { Guests, translateGuestType } from "@/services/api/guests";
import { Paper, Typography } from "@mui/material";


export interface ResumeProps {
    user: any;
}

export default function Resume({user}: ResumeProps) {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          my: 1,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Informations personnels
        </Typography>
        <Typography variant="body1" gutterBottom>
          {"Nom d'utilisateur:"} {user.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
          E-mail: {user.email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Téléphone: {user.phone}
        </Typography>
      </Paper>
      {user.guests.map((guest: Guests, index: number) => (
        <Paper
          key={"Guest_" + guest.id}
          elevation={3}
          sx={{
            p: 2,
            my: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {index + 1}/{user.guests.length} {translateGuestType(guest.type)}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Prénom: {guest.firstname}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Nom de famille: {guest.lastname}
          </Typography>
          {guest.type === "child" && (
            <Typography variant="body1" gutterBottom>
              Année de naissance: {guest.birthyear}
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            {"Vin d'honneur:"} {guest.reception ? "Oui" : "Non"}
          </Typography>
          {user.withDinner && (
            <Typography variant="body1" gutterBottom>
              Repas: {guest.dinner ? "Oui" : "Non"}
            </Typography>
          )}
        </Paper>
      ))}
    </>
  );
}
