"use client";

import { Box, Button, Typography } from "@mui/material";
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
      <Box width={"100%"}>
        <Typography>Vous pouvez nous envoyer vos photos.</Typography>

        <Button
          fullWidth
          endIcon={<CloudUploadIcon />}
          href="http://82.64.187.177//photo/mo/request/A6doKILJP#/"
          target="_blank"
          variant="contained"
        >
          Envoyer des photos
        </Button>
      </Box>
      <Box width={"100%"}>
        <Typography>
          Vous pouvez télécharger les photos du mariage qui vous intéressent.
        </Typography>
        <Button
          fullWidth
          endIcon={<CloudDownloadIcon />}
          href="http://82.64.187.177//photo/mo/sharing/bRPVmCplw"
          target="_blank"
          variant="contained"
        >
          Voir des photos
        </Button>
      </Box>
    </Box>
  );
}
