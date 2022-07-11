import { Moralis as MoralisDef } from "moralis/types/node";
import * as MoralisImport from "moralis/node";
import * as fs from "fs-extra";
import { config } from "dotenv";
config({ path: "../.env" });
const Moralis = MoralisImport as unknown as MoralisDef;

interface OwnerDetailsTypes {
  owner: string;
  tokenId: string[];
  amount: number;
}
interface OwnerTypes {
  [index: string]: OwnerDetailsTypes;
}

const testAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544"; //azuki

const getNftOwners = async () => {
  let owner = {} as OwnerTypes;

  const nftOwners = await Moralis.Web3API.token.getNFTOwners({
    chain: "eth",
    address: testAddress,
    limit: 100,
  });

  if (nftOwners.result) {
    for (const nftOwner of nftOwners.result) {
      if (!owner[nftOwner.owner_of]) {
        owner[nftOwner.owner_of] = {
          owner: nftOwner.owner_of,
          amount: Number(nftOwner.amount),
          tokenId: [nftOwner.token_id],
        };
      } else {
        owner[nftOwner.owner_of].amount++,
          owner[nftOwner.owner_of].tokenId.push(nftOwner.token_id);
      }
    }
    fs.writeFileSync(
      `./data/${nftOwners.result[0].name}.json`,
      JSON.stringify(owner, null, 2)
    );
  }
};

(async () => {
  await Moralis.start({
    appId: process.env.APP_ID,
    serverUrl: process.env.SERVER_URL,
  });
  await getNftOwners();
})().catch((error) => console.log(error));
