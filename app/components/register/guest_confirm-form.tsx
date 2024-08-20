import { Guests, TypeGuest } from "@/services/api/guests";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export interface GuestFormProps {
  control: Control<FieldValues, any>;
  guests: Guests[];
}

export enum MenuEnum {
  POISSON = "poisson",
  VIANDE = "viande",
  ENFANT = "enfant",
}

export default function GuestConfirmForm({ guests, control }: GuestFormProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expanded2, setExpanded2] = useState<boolean>(false);
  const [expanded3, setExpanded3] = useState<boolean>(false);

  return (
    <>
      <div>
        <Accordion
          expanded={expanded}
          onChange={() => setExpanded((previous) => !previous)}
        >
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ color: "text.secondary", fontWeight: "500" }}>
              Menu Viande
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              alignItems={"center"}
              flexDirection={"column"}
              display={"flex"}
            >
              <Typography variant="body1" color="text.primary" align="center">
                {"Assiette de foie gras"}
              </Typography>
              <FavoriteBorderIcon></FavoriteBorderIcon>
              <Typography variant="body1" color="text.primary" align="center">
                {`Filet de boeuf en croûte sauce poivre vert,
                cêpes accompagné de son gratin gourmand de pomme de terre
                et sa tomate provençale`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded2}
          onChange={() => setExpanded2((previous) => !previous)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ color: "text.secondary", fontWeight: "500" }}>
              Menu Poisson
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              alignItems={"center"}
              flexDirection={"column"}
              display={"flex"}
            >
              <Typography variant="body1" color="text.primary" align="center">
                {"Coquille St Jacques sur son lit de poireaux"}
              </Typography>
              <FavoriteBorderIcon></FavoriteBorderIcon>
              <Typography variant="body1" color="text.primary" align="center">
                {`Filet de bar en croûte sauce écrevisses
                accompagné de son riz sauvage
                et son tatin d'endive`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        {control
          ._getWatch("guests")
          ?.filter((guest: Guests) => guest.reception)
          .some((guest: Guests) => guest.type === TypeGuest.CHILD) && (
          <Accordion
            expanded={expanded3}
            onChange={() => setExpanded3((previous) => !previous)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ color: "text.secondary", fontWeight: "500" }}>
                Menu Enfant
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                alignItems={"center"}
                flexDirection={"column"}
                display={"flex"}
              >
                <Typography variant="body1" color="text.primary" align="center">
                  {"Lasagnes bolognaise accompagnée de sa salade."}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </div>

      {guests.map((guest, index) => {
        if (!control._getWatch(`guests.${index}.reception`)) {
          return null;
        }
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

            <Box
              alignContent={"space-around"}
              flexDirection={"row"}
              alignItems={"center"}
              display={"flex"}
            >
              <Typography>Repas : Non</Typography>

              <Controller
                name={`guests.${index}.dinner`}
                control={control}
                render={({ field }) => (
                  <Switch
                    {...field}
                    key={`Guest_${index}_switch_dinner`}
                    defaultChecked={field.value}
                  />
                )}
              />
              <Typography>Oui</Typography>
            </Box>

            <Controller
              name={`guests.${index}.menu`}
              rules={{
                validate: (value, formValues) => {
                  if (!formValues.guests[index].reception) return true;
                  if (!formValues.guests[index].dinner) return true;
                  if(guest.type === TypeGuest.BABY) return true;
                  if (!value) return "Choisissez un menu";
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => {
                const age = control._getWatch(
                  `guests.${index}.age`
                );

                let adultMenu;
                if (guest.type === TypeGuest.ADULT) {
                  adultMenu = true;
                } else {
                  const age = control._getWatch(
                    `guests.${index}.age`
                  );
                  if (age > 15) {
                    adultMenu = true;
                  } else if(age < 2){
                    return (<Typography>{`Il n'y a pas de menu pour les bébés`}</Typography>);
                  } else {
                    adultMenu = false;
                  }
                }

                return (
                  <>
                    <InputLabel id="select-dinner-label">
                      Choix du menu
                    </InputLabel>
                    <Select
                      label="Menu"
                      key={`Guest_${index}_menu`}
                      defaultChecked={field.value || null}
                      error={error !== undefined}
                      {...field}
                      value={field.value}
                      disabled={
                        !control._getWatch(`guests[${index}].dinner`)
                      }
                    >
                      {adultMenu && (
                        <MenuItem value={MenuEnum.VIANDE}>Viande</MenuItem>
                      )}
                      {adultMenu && (
                        <MenuItem value={MenuEnum.POISSON}>Poisson</MenuItem>
                      )}
                      {!adultMenu && (
                        <MenuItem value={MenuEnum.ENFANT}>Enfant</MenuItem>
                      )}
                    </Select>

                    {error?.message && (
                      <FormHelperText error>{error?.message}</FormHelperText>
                    )}
                  </>
                );
              }}
            />
          </Paper>
        );
      })}
    </>
  );
}
