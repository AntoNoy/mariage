import { getAllGests, Guests, TypeGuest } from "@/services/api/guests";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PeopleIcon from "@mui/icons-material/People";
import SetMealIcon from "@mui/icons-material/SetMeal";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import FlatwareIcon from "@mui/icons-material/Flatware";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";

export default function AdminPageResume() {
  const [users, setUsers] = useState([]);
  const [openDinner, setOpenDinner] = useState(true);
  const [openReception, setOpenReception] = useState(true);
  const [openCamping, setOpenCamping] = useState(false);

  const handleClick = (type: "C" | "D" | "CP") => {
    switch (type) {
      case "C":
        setOpenReception(!openReception);
        break;
      case "D":
        setOpenDinner(!openDinner);
        break;
      case "CP":
        setOpenCamping(!openCamping);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getAllGests().then(setUsers);
  }, []);

  function getCeremonieDetails() {
    return users.reduce(
      (
        acc: {
          adults: Guests[];
          childs: Guests[];
          total: Guests[];
        },
        user: any
      ) => {
        return {
          adults: [
            ...acc.adults,
            ...user.guests.filter(
              (g: Guests) => g.reception && g.type === TypeGuest.ADULT
            ),
          ],
          childs: [
            ...acc.childs,
            ...user.guests.filter(
              (g: Guests) => g.reception && g.type === TypeGuest.CHILD
            ),
          ],
          total: [
            ...acc.total,
            ...user.guests.filter((g: Guests) => g.reception),
          ],
        };
      },
      {
        adults: [],
        childs: [],
        total: [],
      }
    );
  }

  function getDinerDetails() {
    return users.reduce(
      (
        acc: {
          poisson: Guests[];
          viande: Guests[];
          enfant: Guests[];
          total: Guests[];
        },
        user: any
      ) => {
        if (!user.withDinner) {
          return acc;
        }
        return {
          poisson: [
            ...acc.poisson,
            ...user.guests.filter(
              (g: Guests) => g.dinner && g.reception && g.menu === "poisson"
            ),
          ],
          viande: [
            ...acc.viande,
            ...user.guests.filter(
              (g: Guests) => g.dinner && g.reception && g.menu === "viande"
            ),
          ],
          enfant: [
            ...acc.enfant,
            ...user.guests.filter(
              (g: Guests) => g.dinner && g.reception && g.menu === "enfant"
            ),
          ],
          total: [
            ...acc.total,
            ...user.guests.filter((g: Guests) => g.dinner && g.reception),
          ],
        };
      },
      {
        poisson: [],
        viande: [],
        enfant: [],
        total: [],
      }
    );
  }

  return (
    <>
      <Box>
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <MarkEmailReadIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Nombre de réponses : `} />
            <ListItemText
              primary={`${
                users.filter((us: any) => us.repliedAt != null).length
              }/
            ${users.length}`}
            />
          </ListItemButton>
          <Divider variant="inset" component="li" />

          <ListItemButton onClick={() => handleClick("C")}>
            <ListItemIcon>
              <NightlifeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Nombre de Présents à la cérémonie : `} />
            <ListItemText primary={`${getCeremonieDetails().total.length}`} />
            {openReception ? (
              <ExpandLess color="primary" />
            ) : (
              <ExpandMore color="primary" />
            )}
          </ListItemButton>
          <Collapse in={openReception} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Adultes" />
                <ListItemText primary={getCeremonieDetails().adults.length} />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ChildCareIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Enfants" />
                <ListItemText primary={getCeremonieDetails().childs.length} />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider variant="inset" component="li" />

          <ListItemButton onClick={() => handleClick("D")}>
            <ListItemIcon>
              <FlatwareIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Nombre de Présents au repas : `} />
            <ListItemText primary={`${getDinerDetails().total.length}`} />
            {openDinner ? (
              <ExpandLess color="primary" />
            ) : (
              <ExpandMore color="primary" />
            )}
          </ListItemButton>
          <Collapse in={openDinner} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LunchDiningIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Menu viande" />
                <ListItemText primary={getDinerDetails().viande.length} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SetMealIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Menu Poisson" />
                <ListItemText primary={getDinerDetails().poisson.length} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ChildCareIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Menu Enfant" />
                <ListItemText primary={getDinerDetails().enfant.length} />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => handleClick("CP")}>
            <ListItemIcon>
              <HolidayVillageIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Nombre de places de camping : `} />
            <ListItemText
              primary={`${users.reduce((acc: number, us: any) => {
                return acc + us.campingCount || 0;
              }, 0)}`}
            />
            {openCamping ? (
              <ExpandLess color="primary" />
            ) : (
              <ExpandMore color="primary" />
            )}
          </ListItemButton>

          <Collapse in={openCamping} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {users
                .filter((user: any) => user.campingCount)
                .map((user: any, index) => {
                  return (
                    <ListItemButton sx={{ pl: 4 }} key={`campingCountResume-${index}`}>
                      <ListItemIcon>
                        <AirlineSeatIndividualSuiteIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={user.username} />
                      <ListItemText primary={user.campingCount} />
                    </ListItemButton>
                  );
                })}
            </List>
          </Collapse>
        </List>

        {/* <Typography>
          {`Nombre de réponses : `}
          <span>
            {users.filter((us: any) => us.repliedAt != null).length}/
            {users.length}
          </span>
        </Typography>
        <Typography>
          {`Nombre de Présents à la cérémonie : `}
          <span>{JSON.stringify(getCeremonieDetails(), null, "  ")}</span>
        </Typography>
        <Typography>
          {`Nombre de Présents au repas : `}
          <span>{JSON.stringify(getDinerDetails(), null, "  ")}</span>
        </Typography> */}
      </Box>
    </>
  );
}
