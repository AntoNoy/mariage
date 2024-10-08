"use client";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import theme from "../ThemeRegistry/theme";

export default function WeddingCardComponent({
  image,
  title,
  subTitle,
  children,
  initiales,
  bottomAction,
  headerAction,
  ...props
}: {
  initiales?: string;
  image: any;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  headerAction?: React.ReactNode;
  bottomAction?: React.ReactNode;
}) {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 4 }}>
      <CardHeader
        avatar={
          initiales ? (
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main }}
              aria-label="recipe"
            >
              {initiales}
            </Avatar>
          ) : null
        }
        action={headerAction}
        title={title}
        subheader={subTitle}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      {/* <img src={image}></img> */}
      <CardContent>
          {children}
      </CardContent>
      {bottomAction ? (
        <CardActions disableSpacing>
          {bottomAction}
        </CardActions>
      ) : null}
    </Card>
  );
}
