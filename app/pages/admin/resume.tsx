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
import { useEffect, useState } from "react";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PeopleIcon from "@mui/icons-material/People";
import SetMealIcon from "@mui/icons-material/SetMeal";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import FlatwareIcon from "@mui/icons-material/Flatware";
import NightlifeIcon from "@mui/icons-material/Nightlife";

export default function AdminPageResume() {
  const [users, setUsers] = useState([]);
  const [openDinner, setOpenDinner] = useState(true);
  const [openReception, setOpenReception] = useState(true);

  const handleClick = (type: "C" | "D") => {
    if (type === "C") {
      setOpenReception(!openReception);
    } else {
      setOpenDinner(!openDinner);
    }
  };

  useEffect(() => {
    getAllGests().then(setUsers);
  }, []);

  function getCeremonieDetails() {
    return users.reduce(
      (acc, user: any) => {
        return {
          adults:
            acc.adults +
            user.guests.filter(
              (g: Guests) => g.reception && g.type === TypeGuest.ADULT
            ).length,
          childs:
            acc.childs +
            user.guests.filter(
              (g: Guests) => g.reception && g.type === TypeGuest.CHILD
            ).length,
          total:
            acc.total + user.guests.filter((g: Guests) => g.reception).length,
        };
      },
      {
        adults: 0,
        childs: 0,
        total: 0,
      }
    );
  }

  function getDinerDetails() {
    return users.reduce(
      (acc, user: any) => {
        console.log(user);
        if (!user.withDinner) {
          return acc;
        }
        return {
          poisson:
            acc.poisson +
            user.guests.filter(
              (g: Guests) => g.dinner && g.reception && g.menu === "poisson"
            ).length,
          viande:
            acc.viande +
            user.guests.filter(
              (g: Guests) => g.dinner && g.reception && g.menu === "viande"
            ).length,
          enfant:
            acc.enfant +
            user.guests.filter(
              (g: Guests) => g.dinner && g.reception && g.menu === "enfant"
            ).length,
          total:
            acc.total +
            user.guests.filter((g: Guests) => g.dinner && g.reception).length,
        };
      },
      {
        poisson: 0,
        viande: 0,
        enfant: 0,
        total: 0,
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
            <ListItemText primary={`${getCeremonieDetails().total}`} />
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
                <ListItemText primary={getCeremonieDetails().adults} />
              </ListItemButton>
            </List>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ChildCareIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Enfants" />
                <ListItemText primary={getCeremonieDetails().childs} />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider variant="inset" component="li" />

          <ListItemButton onClick={() => handleClick("D")}>
            <ListItemIcon>
              <FlatwareIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Nombre de Présents au repas : `} />
            <ListItemText primary={`${getDinerDetails().total}`} />
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
                <ListItemText primary={getDinerDetails().viande} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <SetMealIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Menu Poisson" />
                <ListItemText primary={getDinerDetails().poisson} />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ChildCareIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Menu Enfant" />
                <ListItemText primary={getDinerDetails().enfant} />
              </ListItemButton>
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
