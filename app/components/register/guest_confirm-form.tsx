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
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
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
              <Typography variant="body1" color="text.primary"  align="center">
                {"Assiette de foie gras"}
              </Typography>
              <FavoriteBorderIcon></FavoriteBorderIcon>
              <Typography variant="body1" color="text.primary"  align="center">
                {`Filet de boeuf en croûte sauce poivre vert,
                cêpes accompagné de son gratin gourmand de pomme de terre
                et sa tomate provençale`}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
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
              <Typography variant="body1" color="text.primary"  align="center">
                {"Coquille St Jacques sur son lit de poireaux"}
              </Typography>
              <FavoriteBorderIcon></FavoriteBorderIcon>
              <Typography variant="body1" color="text.primary"  align="center">
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
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
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
              <Typography variant="body1" color="text.primary"  align="center">
                {"Lasagnes au boeuf accompagné de sa salade."}
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
        console.log(guest);
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
                {index + 1}/{guests.length}{" "}
                {control
                  ._getWatch([
                    `guests.${index}.firstname`,
                    `guests.${index}.lastname`,
                  ])
                  .join(" ")}
              </Typography>

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
            </Box>

            <Controller
              name={`guests.${index}.menu`}
              rules={{
                validate: (value, formValues) => {
                  if (!formValues.guests[index].reception) return true;
                  if (!formValues.guests[index].dinner) return true;
                  if (!value) return "Choisissez un menu";
                },
              }}
              control={control}
              render={({ field, fieldState: { error } }) => {
                const birthyear = control._getWatch(
                  `guests.${index}.birthyear`
                );

                let adultMenu;
                if (guest.type === TypeGuest.ADULT) {
                  adultMenu = true;
                } else {
                  const birthyear = control._getWatch(
                    `guests.${index}.birthyear`
                  );
                  if (birthyear < 2010) {
                    adultMenu = true;
                  } else {
                    adultMenu = false;
                  }
                }

                if (!adultMenu) {
                  field.value = MenuEnum.ENFANT;
                } else if (field.value === MenuEnum.ENFANT) {
                  field.value = null;
                }

                return (
                  <>
                    <InputLabel id="select-dinner-label">Menu</InputLabel>
                    <Select
                      {...field}
                      label="Menu"
                      key={`Guest_${index}_menu`}
                      defaultChecked={field.value || null}
                      error={error !== undefined}
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
