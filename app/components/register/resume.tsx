import { Guests, translateGuestType } from "@/services/api/guests";
import { Divider, Paper, Typography } from "@mui/material";

export interface ResumeProps {
  user: any;
}

export default function Resume({ user }: ResumeProps) {
  const guestToReception = user.guests.filter(
    (guest: Guests) => guest.reception
  );

  const guestToDinner = user.guests.filter((guest: Guests) => guest.dinner);
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

      {guestToReception.length === 0 && (
        <Typography
          sx={{ mt: 3 }}
          color={"primary"}
          fontWeight={"bold"}
          fontSize={20}
          textAlign={"center"}
          variant="subtitle1"
        >
          {" Aucun invité de présent"}
        </Typography>
      )}

      <Divider sx={{ mx: 2, my: 3 }}></Divider>

      {guestToReception.length ? (
        <>
          <Typography
            color={"primary"}
            fontWeight={"bold"}
            fontSize={20}
            textAlign={"center"}
            variant="subtitle1"
          >
            {`${guestToReception.length} invité${
              guestToReception.length > 1 ? "s" : ""
            } présents sur ${user.guests.length}`}
          </Typography>

          {user.withDinner ? (
            <Typography
              color={"primary"}
              fontWeight={"bold"}
              fontSize={20}
              textAlign={"center"}
              variant="subtitle1"
            >
              {`${
                guestToDinner.length === 0
                  ? "Vous ne mangerez pas avec nous."
                  : `${guestToDinner.length} invité${
                      guestToDinner.length > 1 ? "s présents" : " présent"
                    } au repas`
              }`}
            </Typography>
          ) : null}
        </>
      ) : null}

      <Divider sx={{ mx: 2, my: 3 }}></Divider>

      {user.guests.map((guest: Guests, index: number) => {
        if (!guest.reception) {
          return null;
        }
        return (
          <Paper
            key={"Guest_" + guest.id}
            elevation={3}
          
            sx={{
              p: 2,
              my: 1,
              textAlign:'center'
            }}
          >
       
            <Typography variant="h6" color={'primary'} fontWeight={'bold'}>
              {`${guest.firstname} ${guest.lastname} 
                 ${guest.type === "child" ?`
                    (${guest.age} ${(guest.age && guest.age >1) ?`ans`:'an'})
                `:''}
              `}
            </Typography>
           
            {user.withDinner && (
              <>
                <Typography variant="body1" gutterBottom>
                  Repas: {guest.dinner ? "Oui" : "Non"}
                </Typography>
                {guest.dinner && <Typography variant="body1" gutterBottom>
                   {guest.menu ? `Menu ${guest.menu}` : "Aucun menu"}
                </Typography>}
              </>
            )}
          </Paper>
        );
      })}
    </>
  );
}
