import { getAllGests } from "@/services/api/guests";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function AdminPage() {
  const router = useRouter();

  const [guests, setGuests] = useState([]);

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getAllGests().then((data) => {
      console.log(data);
      setUsers(data);
    });
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    // {
    //   field: "username",
    //   headerName: "First name",
    //   width: 150,
    //   editable: true,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   width: 110,
    //   editable: true,
    // },
    {
      field: "userRef",
      headerName: "User Ref",
      type: "checkboxSelection",
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
        field: "birthyear",
        headerName: "Année de naissance",
    },
    {
        field: "type",
        headerName: "Type",
    }




  ];

  /**
   * birthyear
: 
null
created_at
: 
"2023-12-08T21:57:46.870Z"
dinner
: 
true
firstname
: 
"qsdf"
foodAllergies
: 
null
id
: 
12
lastname
: 
"ffff"
reception
: 
false
type
: 
"adult"
updated_at
: 
"2023-12-09T08:54:35.000Z"
userId
: 
41
   */
  //

  return (
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>
      <h1>Admin Page</h1>
      {users.length ? (
        <DataGrid
          // rows={users}
          rows={users.flatMap((user) => {
            return user.guests.map((guest: any) => {
              return {
                id: guest.id || 0,
                firstname: guest.firstname || "",
                lastname: guest.lastname || "",
                userRef: user.username,
                reception: guest.reception,
                dinner: guest.dinner,
                foodAllergies: guest.foodAllergies,
                birthyear: guest.birthyear,
                type: guest.type,
                
              };
            });
          })}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 },
            },
          }}
          getRowId={(row: any) => {
            console.log(row);
            return row.id;
          }}
          pageSizeOptions={[10, 20]}
          // checkboxSelection
        />
      ) : null}
    </Box>
  );
}
