import {
  getAllGests,
  Guests,
  postUser,
  TypeGuest,
} from "@/services/api/guests";
import {
  Box,
  Button,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


interface UserCustom {
  username?: string;
  withDinner?: boolean;
  guests?: Guests[];
}

export default function AdminPageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>([]);

  const [userCustom, setUserCustom] = useState<undefined | UserCustom>(
    undefined
  );

  const [userCustomGuestCount, setUserCustomGuestCount] = useState<{
    childs: number;
    adults: number;
  }>({ childs: 0, adults: 0 });
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (!userCustom) {
      setUserCustomGuestCount({ childs: 0, adults: 0 });
    } else {
      if (!userCustom.guests) {
        setUserCustom((prevValue) => ({ ...prevValue, guests: [] }));
        return;
      }
      setUserCustomGuestCount({
        childs:
          userCustom.guests?.filter((g) => g.type !== TypeGuest.ADULT).length ||
          0,
        adults:
          userCustom.guests?.filter((g) => g.type === TypeGuest.ADULT).length ||
          0,
      });
    }
  }, [userCustom]);

  useEffect(() => {}, [userCustomGuestCount]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid grey",
    boxShadow: 24,
    p: 4,
  };

  function closeModal() {
    setOpenModal(false);
    setUserCustom(undefined);
  }

  async function setUserToApi() {
    postUser(userCustom).then(() => {
      closeModal();
      reloadUsers();
    });
  }

  function reloadUsers() {
    getAllGests().then((data: any[]) => {
      console.log(data);
      setUsers(
        data.map((user) => {
          return {
            ...user,
            guestCount: user.guests.length,
          };
        })
      );
    });
  }

  useEffect(() => {
    reloadUsers();
  }, []);

  const columns: GridColDef<any>[] = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "username",
      headerName: "Utilisateur",
      type: "string",
      width: 140,
    },
    {
      field: "guestCount",
      headerName: "Nbr",
      // editable: true,
      type: "number",
      width: 30,
    },
    {
      field: "withDinner",
      headerName: "Repas",
      // editable: true,
      type: "boolean",
      width: 30,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              setUserCustom(row);
              setOpenModal(() => true);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label="Share"
            className="textPrimary"
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/uuid/${row.uuid}`)
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  function updateGuestCount() {
    if (!userCustom) {
      return;
    }
    if (!userCustom.guests) {
      userCustom.guests = [];
    }
    if (userCustomGuestCount.childs !== undefined) {
      const actualChilds = userCustom.guests.filter(
        (g) => g.type !== TypeGuest.ADULT
      );
      const childDiff = -(actualChilds.length - userCustomGuestCount.childs);
      if (childDiff > 0) {
        for (let i = 0; i < childDiff; i++) {
          userCustom.guests.push({
            type: TypeGuest.CHILD,
            age: null,
            dinner: false,
            firstname: null,
            lastname: null,
            menu: null,
            reception: false,
          });
        }
      } else if (childDiff < 0) {
        for (let i = childDiff; i < 0; i++) {
          userCustom.guests.splice(
            userCustom.guests.findIndex((g) => g.type !== TypeGuest.ADULT),
            1
          );
        }
      }
    }
    if (userCustomGuestCount.adults !== undefined) {
      const actualAdults = userCustom.guests.filter(
        (g) => g.type === TypeGuest.ADULT
      );
      const adultsDiff = -(actualAdults.length - userCustomGuestCount.adults);
      if (adultsDiff > 0) {
        for (let i = 0; i < adultsDiff; i++) {
          userCustom.guests.push({
            type: TypeGuest.ADULT,
            age: null,
            dinner: false,
            firstname: null,
            lastname: null,
            menu: null,
            reception: false,
          });
        }
      } else if (adultsDiff < 0) {
        for (let i = adultsDiff; i < 0; i++) {
          userCustom.guests.splice(
            userCustom.guests.findIndex((g) => g.type === TypeGuest.ADULT),
            1
          );
        }
      }
    }

    console.log(userCustom);
  }

  return (
    <>
      <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
        <h1>Gestion des comptes</h1>

        <button
          onClick={() =>{
            setUserCustom({ username: "", withDinner: false, guests: [] })
            setOpenModal(true);
          }}
        >
          Ajouter un compte
        </button>
        {users.length ? (
          <DataGrid
            sx={{ width: "100%" }}
            rows={users}
            columns={columns}
            filterModel={filters.length ? { items: filters } : undefined}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 100 },
              },
            }}
            getRowId={(row: any) => {
              return row.id;
            }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        ) : null}
      </Box>

      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <TextField
            name="username"
            value={userCustom?.username || ""}
            label="Nom d'utilisateur"
            sx={{
              my: 1,
              // width: "100%",
            }}
            onChange={(el) => {
              setUserCustom({
                ...userCustom,
                username: el.target.value,
              });
            }}
          />
          <Box display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'center'}>

          Repas :{" "}
          <Switch
            checked={userCustom?.withDinner}
            onChange={(el) => {
              console.log(el, el.target.checked);
              setUserCustom({
                ...userCustom,
                withDinner: el.target.checked,
              });
            }}
          />
          </Box>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'}>
            <TextField
              name="adults"
              value={userCustomGuestCount.adults || 0}
              label="nbr d'adultes"
              type="number"
              sx={{
                my: 1,
                // width: "100%",
              }}
              onChange={(el) => {
                setUserCustomGuestCount((value) => ({
                  ...value,
                  adults: parseInt(el.target.value),
                }));
              }}
            />
            <TextField
              name="enfants"
              value={userCustomGuestCount.childs || 0}
              label="nbr d'enfants"
              type="number"
              sx={{
                my: 1,
                // width: "100%",
              }}
              onChange={(el) => {
                setUserCustomGuestCount((value) => ({
                  ...value,
                  childs: parseInt(el.target.value),
                }));
              }}
            />
          </Box>
          
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-around"}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => {
                updateGuestCount();
                setUserToApi();
                console.log(userCustom);
              }}
            >
              Oui
            </Button>
            <Button onClick={closeModal}>Annuler</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

/**
 * import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { getAllGests } from "@/services/api/guests";

const roles = ["Market", "Finance", "Development"];

const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    let i = 0;
    setRows((oldRows) => [
      { id: 0, username: "", guestsCount: "", isNew: true },
      ...oldRows,
    ]);
    setRowModesModel((oldModel) => {
      return {
        ...oldModel,
        [Object.values(oldModel).length]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      };
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    getAllGests().then((data: any[]) => {
      console.log(data);
      setRows(data.map((user) => {
       
          return {
            id: user.id ,
            username: user.username,
            guestsCount: user.guests.length,
            // userRef: user.username,
            // reception: guest.reception,
            // dinner: guest.dinner,
            // foodAllergies: guest.foodAllergies,
            // age: guest.age,
            // type: guest.type,
            // menu: guest.menu
          };
      }));
    });
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 40, editable: true },
    {
      field: "username",
      headerName: "Utilisateur",
      type: "string",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "guestsCount",
      headerName: "Nbr",
      type: "number",
      width: 20,
      // editable: true,
    },
    {
      field: "withDinner",
      headerName: "Repas",
      // width: 220,
      editable: true,
      type: "boolean",
      // valueOptions: ["Market", "Finance", "Development"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

 */
