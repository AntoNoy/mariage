import { getAllGests } from "@/services/api/guests";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function AdminPageGuests() {
  const [guests, setGuests] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>([]);
  useEffect(() => {
    getAllGests().then((data: any[]) => {
      console.log(data);
      setGuests(data.flatMap((user) => {
        return user.guests.map((guest: any) => {
          return {
            id: guest.id || 0,
            firstname: guest.firstname || "",
            lastname: guest.lastname || "",
            userRef: user.username,
            reception: guest.reception,
            dinner: guest.dinner,
            foodAllergies: guest.foodAllergies,
            age: guest.age,
            type: guest.type,
            menu: guest.menu
          };
        });
      }));
    });
  }, []);

  const columns = [
    {
      field: "userRef",
      headerName: "Utilisateur",
      type: "string",
    },
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstname",
      headerName: "Prénom",
      editable: true,
    },
    {
      field: "lastname",
      headerName: "Nom",
      editable: true,
    },
    {
      field: "reception",
      headerName: "Reception",
      type: "boolean",
    },
    {
      field: "dinner",
      headerName: "Dinner",
      type: "boolean",
    },
    {
      field: "foodAllergies",
      headerName: "Alergie Alimentaire",
    },
    {
      field: "type",
      headerName: "Type",
    },
    {
      field: "age",
      headerName: "Année de naissance",
    },
    {
      field: "menu",
      headerName: "Menu",
    },
  ];




  return (
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
      <h1>Admin Page</h1>

      <button onClick={() => setFilters([ { field: 'reception', operator: 'is', value: 'true' }])}>
          
        test
      </button>
      {guests.length ? (
        <DataGrid
          rows={guests}
          columns={columns}
          onFilterModelChange={(model, details) => {
            console.log('model', model)
            console.log('details', details)
          }}
          filterModel={filters.length ? { items: filters }: undefined}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
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
