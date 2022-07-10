import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import DataTable from "../components/DataTable";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { allCollections } from "../constants/nftCollection";
import { Box, Grid, Stack, Typography } from "@mui/material";
import MenuCard from "../components/MenuCard";

//fetch recent data from the nft transfers
//display the collected data
// 1. identify the whales
// 2. keep on monitor them
const Home: NextPage = () => {
  return (
    <>
      <Stack direction="column" gap={5}>
        <Typography variant="h4" component="div" textAlign="center">
          Blue Chip NFTs Statistics
        </Typography>

        <Grid
          container
          spacing={2}
          // columns={4}
          justifyContent="center"
          alignItems="center"
        >
          {allCollections.map((collection, index) => (
            <Grid item key={index}>
              <MenuCard name={collection.name} image={collection.img} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
};

export default Home;
