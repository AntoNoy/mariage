// // pages/merci.js
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Link,
// } from '@mui/material';

// export default function Merci() {
//   return (
//     <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
//       <Paper
//         elevation={3}
//         sx={{
//           p: 4,
//           borderRadius: 4,
//           backgroundColor: 'background.paper',
//           color: 'text.primary',
//         }}
//       >
//         <Box textAlign="center">
//           <Typography variant="h4" gutterBottom color="primary" sx={{ fontSize:"50px",fontFamily: "\"Brush Script MT\", cursive;" }}>
//             Merci du fond du cœur !
//           </Typography>

//           <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
//             Ce mariage restera gravé dans nos mémoires comme un moment magique et rempli d’émotions, grâce à chacun d’entre vous.
//             Votre présence, vos sourires, vos attentions et votre énergie ont fait de cette journée une fête unique, pleine de chaleur et d’amour.
//           </Typography>

//           <Typography variant="body1" sx={{ mb: 2 }}>
//             Un immense merci pour vos mots, vos gestes, vos cadeaux et surtout pour avoir partagé avec nous ce moment si spécial.
//             Nous espérons que vous avez passé un aussi bon moment que nous.
//           </Typography>

//           <Typography variant="body1" sx={{ mb: 4 }}>
//             Pour prolonger un peu cette belle journée, voici les différents albums photos que nous avons réunis :
//           </Typography>

//           <List>
//             <ListItem>
//               <ListItemText
//                 primary={
//                   <Link href="https://lien-vers-album-invites.com" target="_blank" rel="noopener" color="primary">
//                     Photos prises par les invités
//                   </Link>
//                 }
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={
//                   <Link href="https://lien-vers-album-photographe.com" target="_blank" rel="noopener" color="primary">
//                     Photos du photographe
//                   </Link>
//                 }
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={
//                   <Link href="https://lien-vers-photobooth.com" target="_blank" rel="noopener" color="primary">
//                     Photos du photobooth
//                   </Link>
//                 }
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemText
//                 primary={
//                   <Link href="https://lien-pour-envoyer-vos-photos.com" target="_blank" rel="noopener" color="primary">
//                     Envoyez-nous vos propres photos
//                   </Link>
//                 }
//               />
//             </ListItem>
//           </List>

//           <Typography variant="h6" sx={{ mt: 4, fontSize:"30px",fontFamily: "\"Brush Script MT\", cursive;" }} color="primary">
//             Mélanie & Antony
//           </Typography>
//           <Typography variant="caption" display="block" sx={{ mt: 0, fontSize:"20px"}}>
//             17 mai 2025
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }



import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Link,
    useTheme,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import GroupIcon from '@mui/icons-material/Group';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';

export default function Merci() {
    const theme = useTheme();

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                }}
            >
                <Box textAlign="center">
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: '"Brush Script MT", cursive',
                            fontSize: "50px",
                            color: 'primary.main',
                        }}
                        gutterBottom
                    >
                        Merci du fond du cœur !
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                        Ce mariage restera gravé dans nos mémoires comme un moment magique et rempli d’émotions, grâce à chacun d’entre vous.
                        Votre présence, vos sourires, vos attentions et votre énergie ont fait de cette journée une fête unique, pleine de chaleur et d’amour.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Un immense merci pour vos mots, vos gestes, vos cadeaux et surtout pour avoir partagé avec nous ce moment si spécial.
                        Nous espérons que vous avez passé un aussi bon moment que nous.
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Pour prolonger un peu cette belle journée, voici les différents albums photos que nous avons réunis :
                    </Typography>
                </Box>

                {/* LIENS ILLUSTRÉS */}
                <Grid container spacing={2} justifyContent="center">
                    {[
                        {
                            title: 'Photos prises par les invités',
                            icon: <GroupIcon fontSize="large" sx={{ color: 'primary.main' }} />,
                            url: 'https://le-noyeau.direct.quickconnect.to/photo/mo/sharing/bRPVmCplw',
                        },
                        {
                            title: 'Photos du photographe',
                            icon: <CameraEnhanceIcon fontSize="large" sx={{ color: 'primary.main' }} />,
                            url: 'https://le-noyeau.direct.quickconnect.to/photo/mo/sharing/6vl13YkFz',
                        },
                        {
                            title: 'Photos du photobooth',
                            icon: <PhotoCameraIcon fontSize="large" sx={{ color: 'primary.main' }} />,
                            url: 'https://le-noyeau.direct.quickconnect.to/photo/mo/sharing/ugsSHQtz3',
                        },
                        {
                            title: 'Envoyez-nous vos propres photos',
                            icon: <AddPhotoAlternateIcon fontSize="large" sx={{ color: 'primary.main' }} />,
                            url: 'https://le-noyeau.direct.quickconnect.to/photo/mo/request/bpf6cEITu',
                        },
                    ].map(({ title, icon, url }) => (
                        <Grid item xs={12} sm={6} md={6} key={title}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 2,
                                    border: `1px solid ${theme.palette.primary.main}22`,
                                    borderRadius: 2,
                                    height: '100%',
                                }}
                            >
                                {icon}
                                <CardContent sx={{ flex: 1 }}>
                                    <Link href={url} target="_blank" rel="noopener" underline="hover" color="text.primary">
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {title}
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* PHOTOS */}
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Quelques souvenirs
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            justifyContent: 'center',
                        }}
                    >
                        {[
                            '/voiture.jpg',
                            '/coeur.jpg',
                            '/couple.jpg',
                        ].map((src, index) => (
                            <Card
                                key={index}
                                sx={{
                                    flex: '1 1 auto',
                                    maxWidth: 300,
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={src}
                                    alt={`Souvenir ${index + 1}`}
                                    sx={{
                                        height: 300,
                                        width: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </Card>
                        ))}
                    </Box>
                </Box>

                {/* <Box sx={{ mt: 6 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Quelques souvenirs
                    </Typography>
                    <Grid container spacing={2}>
                        {[
                            '/voiture.jpg',
                            '/coeur.jpg',
                            '/couple.jpg',
                        ].map((src, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card
  sx={{
    borderRadius: 2,
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: 6,
    },
  }}
>
  <CardMedia
    component="img"
    image={src}
    alt={`Souvenir ${index + 1}`}
    sx={{
      height: 300,
      width: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
    }}
  />
</Card>

                            </Grid>
                        ))}
                    </Grid>
                </Box> */}

                {/* SIGNATURE */}
                <Box textAlign="center" sx={{ mt: 6 }}>
                    <Typography variant="h6" sx={{ mt: 4, fontSize: "30px", fontFamily: "\"Brush Script MT\", cursive;" }} color="primary">
                        Mélanie & Antony
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 0, fontSize: "20px" }}>
                        17 mai 2025
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}
