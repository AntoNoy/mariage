import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import theme from "../ThemeRegistry/theme";
import { destroyCookie, parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

export default function AppMenu() {
  const [user, setUser] = React.useState<any>(undefined);

  React.useEffect(() => {
    let { token } = parseCookies();
    if (token) {
      setUser(jwtDecode(token));
    }
    console.log(user);
  }, []);

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "#ffffff",
              color: theme.palette.primary.main,
            }}
          >
            {user?.username ? user?.username.substring(0, 1) : "M"}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user?.role === "admin" && (
          <>
            <MenuItem
              onClick={() => {
                router.push("/admin/guests");
              }}
            >
              <Avatar /> Liste des invités
            </MenuItem>

            <MenuItem
              onClick={() => {
                router.push("/admin/users");
              }}
            >
              <Avatar />Gestion des comptes
            </MenuItem>
          </>
        )}

        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Mon compte
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            handleClose;
            destroyCookie(null, "token");
            router.push("/login");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Se déconnecter
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
