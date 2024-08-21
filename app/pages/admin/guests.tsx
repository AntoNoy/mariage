import { getAllGests } from "@/services/api/guests";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridLogicOperator,
} from "@mui/x-data-grid";

export default function AdminPageGuests() {
  const [guests, setGuests] = useState<any[]>([]);
  const [filters, setFilters] = useState<GridFilterModel>({
    items: [],
  });
  useEffect(() => {
    getAllGests().then((data: any[]) => {
      setGuests(
        data.flatMap((user) => {
          return user.guests.map((guest: any) => {
            return {
              id: guest.id || 0,
              firstname: guest.firstname || "",
              lastname: guest.lastname || "",
              username: user.username,
              reception: guest.reception,
              dinner: guest.dinner,
              foodAllergies: guest.foodAllergies,
              age: guest.age,
              type: guest.type,
              menu: guest.menu,
              repliedAt: user.repliedAt,
            };
          });
        })
      );
    });
  }, []);

  const columns = [
    {
      field: "username",
      headerName: "Utilisateur",
      type: "string",
    },
    {
      field: "firstname",
      headerName: "Prénom",
    },
    {
      field: "lastname",
      headerName: "Nom",
    },
    {
      field: "reception",
      headerName: "Reception",
      type: "boolean",
      width: 5,
    },
    {
      field: "dinner",
      headerName: "Dinner",
      type: "boolean",
      width: 5,
    },
    {
      field: "foodAllergies",
      headerName: "Alergie Alimentaire",
    },
    {
      field: "type",
      headerName: "Type",
      width: 10,
    },
    {
      field: "age",
      headerName: "Age",
      width: 10,
    },
    {
      field: "menu",
      headerName: "Menu",
    },
    {
      field: "repliedAt",
      headerName: "Répondu",
      type: "Date",
    },
  ] as GridColDef<any>[];

  return (
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
      <Typography variant="h6" color={"primary"} fontWeight={"bold"}>
        Liste des invités
      </Typography>
      <ButtonGroup
        variant="text"
        aria-label="Basic button group"
        sx={{ mb: 2, mt: 1 }}
      >
        <Button
          onClick={() =>
            setFilters({
              items: [],
            })
          }
        >
          Tous
        </Button>
        <Button
          onClick={() =>
            setFilters({
              items: [{ field: "repliedAt", operator: "isNotEmpty" }],
            } as GridFilterModel)
          }
        >
          Répondu
        </Button>
        <Button
          onClick={() =>
            setFilters({
              items: [{ field: "reception", operator: "is", value: "true" }],
            })
          }
        >
          Reception
        </Button>
        <Button
          onClick={() =>
            setFilters({
              items: [{ field: "dinner", operator: "is", value: "true" }],
            })
          }
        >
          Diner
        </Button>
      </ButtonGroup>

      {/* <Button
        onClick={() =>
          setFilters({
            items: [],
          })
        }
      >
        TOUT
      </Button>
      <Button
        onClick={() =>
          setFilters({
            items: [{ field: "reception", operator: "is", value: "true" }],
          })
        }
      >
        Cérémonie
      </Button>
      <Button
        onClick={() =>
          setFilters({
            items: [
              { field: "dinner", operator: "is", value: "true" },
            ],
          })
        }
      >
        Repas
      </Button> */}
      {guests.length ? (
        <DataGrid
          sx={{ maxWidth: "100%" }}
          rows={guests}
          columns={columns}
          columnVisibilityModel={
            {
              foodAllergies: false,
              username: false,
              id: false,
              repliedAt: false,
            } as GridColumnVisibilityModel
          }
          onFilterModelChange={(model, details) => {
            console.log("model", model);
            console.log("details", details);
          }}
          filterModel={filters}
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
  );
}
