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
import { borderRadius } from "@mui/system";

interface MenuCardPropsTypes {
  name: string;
  image: StaticImageData;
}

export default function MenuCard({ name, image }: MenuCardPropsTypes) {
  return (
    <Card sx={{ width: 300, border: "5px solid black", borderRadius: 5 }}>
      <CardActionArea>
        <Stack direction="row">
          <Stack justifyContent="center" sx={{ flex: 1 }}>
            <Typography textAlign="center">{name}</Typography>
          </Stack>
          <Box>
            <Image src={image} height={100} width={100} />
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
