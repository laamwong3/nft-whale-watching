import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { CardActionArea, Stack } from "@mui/material";
import Image, { StaticImageData } from "next/image";

interface MenuCardPropsTypes {
  name: string;
  image: StaticImageData;
}

export default function MenuCard({ name, image }: MenuCardPropsTypes) {
  return (
    <Card sx={{ width: 200, display: "flex" }}>
      <CardActionArea>
        <Stack direction="row">
          <Typography>{name}</Typography>
          <Image src={image} objectFit="cover" />
        </Stack>
      </CardActionArea>
    </Card>
  );
}
