"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function FestiveMealPage() {
  return (
    <Box
      alignItems={"center"}
      flexDirection={"column"}
      display={"flex"}
      justifyContent={"space-around"}
      height={"100%"}
    > 
      <Card>
        <CardContent>
        <Typography
          align={"center"}
          fontSize={18}
        >{`Vous avez pris de belles photos pendant`}</Typography>
         <Typography
          align={"center"}
          fontSize={18}
        >{`notre mariage ?`}</Typography>

          <Divider sx={{my: 2}}/>

        <Typography
          align={"center"}
          fontSize={18}
        >{`Partagez les avec nous et nos invités grâce au lien ci-dessous.`}</Typography>
        </CardContent>
        <CardActions>
        <Button
        fullWidth
        endIcon={<CloudUploadIcon />}
        href="http://82.64.187.177/photo/mo/request/bpf6cEITu"
        target="_blank"
        variant="contained"
      >
        Envoyer vos photos
      </Button>
        </CardActions>
      </Card>

      <Card>
        <CardContent>
          <Typography align={"center"} fontSize={18}>
            {`Les photos de notre mariage sont enfin là !!`}
          </Typography>
          <Divider sx={{my: 2}}/>

          <Typography align={"center"} fontSize={18}>
            {`Téléchargez les en cliquant sur le lien ci-dessous et revivez ces moments inoubliables avec nous.`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            endIcon={<CloudDownloadIcon />}
            href="http://82.64.187.177/photo/mo/sharing/bRPVmCplw"
            target="_blank"
            variant="contained"
          >
            Photos des invités
          </Button>
        </CardActions>
        <CardActions>
          <Button
            fullWidth
            endIcon={<CloudDownloadIcon />}
            href="http://82.64.187.177/photo/mo/sharing/ugsSHQtz3"
            target="_blank"
            variant="contained"
          >
            Photos du Photoboot
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
