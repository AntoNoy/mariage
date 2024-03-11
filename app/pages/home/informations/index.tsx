import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function InformationPage() {
  return (<>
    <Box alignItems={"center"} flexDirection={"column"} display={"flex"}>

      <Typography variant="h3">
        Comment venir ?
      </Typography>
      <Box alignItems={"center"} flexDirection={"row"} display={"flex"} flexWrap={"wrap"}>

        <Card sx={{
          flex: "1 0 21%",
          margin: "5px",
          minWidth: "300px"
          // height: "100px",
        }}>
          <CardHeader
            // avatar={
            // initiales ? (
            //   <Avatar
            //     sx={{ bgcolor: theme.palette.primary.main }}
            //     aria-label="recipe"
            //   >
            //     {initiales}
            //   </Avatar>
            // ) : null
            // }
            // action={headerAction}
            title={"la Mairie"}
          subheader={"Rendez vous à 14h"}
          />

          <CardContent>
            <Typography variant="body2" color="text.primary" fontSize={14} pb={"15px"}>
              <p>
                Addresse:
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae cupiditate ullam optio possimus totam culpa fuga eaque quisquam ad illum veritatis odio fugit?
              </p>

            </Typography>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824573244!2d2.2646349063797047!3d48.85893843461574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis!5e0!3m2!1sfr!2sfr!4v1710270774597!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: "0" }}
            ></iframe>
          </CardContent>
        </Card>

        <Card sx={{
          flex: "1 0 21%",
          margin: "5px",
          minWidth: "300px"
          
        }}>
          <CardHeader
            // avatar={
            // initiales ? (
            //   <Avatar
            //     sx={{ bgcolor: theme.palette.primary.main }}
            //     aria-label="recipe"
            //   >
            //     {initiales}
            //   </Avatar>
            // ) : null
            // }
            // action={headerAction}
            title={"la Reception"}
           subheader={"Après la Mairie (à partir de 15h15 environ)"}
          />
          <CardContent>
          <Typography variant="body2" color="text.primary" fontSize={14} pb={"15px"}>
              <p>
                Addresse:
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae cupiditate ullam optio possimus totam culpa fuga eaque quisquam ad illum veritatis odio fugit?
              </p>

            </Typography>


            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82240.01966279316!2d2.2022812066413673!3d49.89879178352961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e78413d78b760b%3A0x40af13e816220e0!2sAmiens!5e0!3m2!1sfr!2sfr!4v1710271283615!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
            ></iframe>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h3" mt={"15px"}>
        Les logements
      </Typography>
      <Box alignItems={"center"} flexDirection={"row"} display={"flex"} flexWrap={"wrap"}>

      <Card sx={{
          flex: "1 0 21%",
          margin: "5px",
          minWidth: "300px"
        }}>
          <CardHeader
            // avatar={
            // initiales ? (
            //   <Avatar
            //     sx={{ bgcolor: theme.palette.primary.main }}
            //     aria-label="recipe"
            //   >
            //     {initiales}
            //   </Avatar>
            // ) : null
            // }
            // action={headerAction}
            title={"Les logements"}
          // subheader={""}
          />
          <CardContent>
            <Typography variant="body2" color="text.primary" fontSize={14}>
              <p>
                Addresse:
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae cupiditate ullam optio possimus totam culpa fuga eaque quisquam ad illum veritatis odio fugit?
              </p>

            </Typography>
          </CardContent>
        </Card>
        <Card sx={{
          flex: "1 0 21%",
          margin: "5px",
          minWidth: "300px"
        }}>
          <CardHeader
            // avatar={
            // initiales ? (
            //   <Avatar
            //     sx={{ bgcolor: theme.palette.primary.main }}
            //     aria-label="recipe"
            //   >
            //     {initiales}
            //   </Avatar>
            // ) : null
            // }
            // action={headerAction}
            title={"la Mairie"}
          // subheader={""}
          />
          <CardContent>
            <Typography variant="body2" color="text.primary" fontSize={14}>
              <p>
                Addresse:
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam, dolorem. Doloribus fugiat sunt porro, iusto molestiae cupiditate ullam optio possimus totam culpa fuga eaque quisquam ad illum veritatis odio fugit?
              </p>

            </Typography>
          </CardContent>
        </Card>



      </Box>
    </Box>

  </>
  );
}
