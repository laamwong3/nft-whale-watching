import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import DataTable from "../components/DataTable";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { allCollections } from "../constants/nftCollection";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import MenuCard from "../components/MenuCard";

//fetch recent data from the nft transfers
//display the collected data
// 1. identify the whales
// 2. keep on monitor them
const Home: NextPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="column" gap={5}>
          <Typography variant="h4" component="div" textAlign="center">
            Blue Chip NFTs Statistics
          </Typography>

          <Grid
            container
            spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            // columns={4}
            // justifyContent="center"
            // alignItems="center"
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          >
            {allCollections.map((collection, index) => (
              <Grid item key={index} xs={1} sm={1} md={1} lg={1}>
                <MenuCard collection={collection} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
