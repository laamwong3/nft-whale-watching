import * as fs from "fs";
import { Moralis as MoralisDef } from "moralis/types/node";
import * as MoralisImport from "moralis/node";
import { config } from "dotenv";
const Moralis = MoralisImport as unknown as MoralisDef;

config({ path: "../.env" });

const contractAddress = "0x23581767a106ae21c074b2276D25e5C3e136a68b"; //Moonbirds

const getAllOwners = async () => {
  let cursor: string = "";
  let owner = {};
  let history = {};
  let res;
  let accountedToken = [];

  const response = await Moralis.Web3API.token.getContractNFTTransfers({
    address: contractAddress,
    chain: "eth",
    limit: 1,
    cursor: cursor,
  });

  console.log(response);

  console.log(
    `Got page ${response.page} of ${Math.ceil(
      response.total / response.page_size
    )}, ${response.total} in totals`
  );
  // cursor = response.cursor;
};

(async () => {
  await Moralis.start({
    appId: process.env.APP_ID,
    serverUrl: process.env.SERVER_URL,
  });
  await getAllOwners();
})();
