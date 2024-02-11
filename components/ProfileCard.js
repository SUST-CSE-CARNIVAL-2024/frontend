import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

export default function ProfileCard() {
  return (
    <Card sx={{ width: "-webkit-fill-available" }}>
      <CardContent sx={{ minWidth: "100%" }}>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>PC</Avatar>
        <Typography
          sx={{ height: 40, display: "flex", alignItems: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          Prangon Chakraborty
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Software Engineer
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Profile</Button>
        <Button size="small"></Button>
      </CardActions>
    </Card>
  );
}
