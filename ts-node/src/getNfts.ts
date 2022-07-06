import * as fs from "fs";
import { Moralis as MoralisDef } from "moralis/types/node";
import * as MoralisImport from "moralis/node";
import { config } from "dotenv";
config({ path: "../.env" });

interface OwnersDetailsTypes {
  address: string;
  amount: number;
  tokenId: string[];
  price: number[];
  date: string[];
}
interface HistoryDetailsTypes {
  to: string;
  from: string;
  tokenId: string[];
  price: number[];
  date: string[];
}
interface OwnersTypes {
  [index: string]: OwnersDetailsTypes;
}
interface HistoryTypes {
  [index: string]: HistoryDetailsTypes[];
}
type AccountTokenTypes = Array<string> & { [index: string]: string };
// type OwnersTypes = Array<string> & {
//   [index: string]: OwnersDetailsTypes;
// };

const Moralis = MoralisImport as unknown as MoralisDef;

const contractAddress = "0x23581767a106ae21c074b2276D25e5C3e136a68b"; //Moonbirds

const getAllOwners = async () => {
  let owners = {} as OwnersTypes;
  let history = {} as HistoryTypes;
  let accountedToken = [] as unknown as AccountTokenTypes;

  const response = await Moralis.Web3API.token.getContractNFTTransfers({
    address: contractAddress,
    chain: "eth",
    limit: 100,
  });

  if (response.result) {
    for (const transfer of response.result) {
      if (
        !owners[transfer.to_address] &&
        !accountedToken.includes(transfer.token_id)
      ) {
        owners[transfer.to_address] = {
          address: transfer.to_address,
          amount: Number(transfer.amount),
          tokenId: [transfer.token_id],
          price: [Number(transfer.value)],
          date: [transfer.block_timestamp],
        };

        accountedToken.push(transfer.token_id);
      } else if (!accountedToken.includes(transfer.token_id)) {
        owners[transfer.to_address].amount++;
        owners[transfer.to_address].tokenId.push(transfer.token_id);
        owners[transfer.to_address].price.push(Number(transfer.value));
        owners[transfer.to_address].date.push(transfer.block_timestamp);
        accountedToken.push(transfer.token_id);
      }

      if (!history[transfer.to_address] && transfer.from_address) {
        history[transfer.to_address] = [
          {
            to: transfer.to_address,
            from: transfer.from_address,
            tokenId: [transfer.token_id],
            price: [Number(transfer.value)],
            date: [transfer.block_timestamp],
          },
        ];
      } else if (transfer.from_address) {
        history[transfer.to_address].push({
          to: transfer.to_address,
          from: transfer.from_address,
          tokenId: [transfer.token_id],
          price: [Number(transfer.value)],
          date: [transfer.block_timestamp],
        });
      }
    }
  }
  fs.writeFileSync("./owners.json", JSON.stringify(owners, null, 2));
  fs.writeFileSync("./history.json", JSON.stringify(history, null, 2));
  // console.log(owners);
  // console.log(accountedToken.length);
  // console.log(response);

  // cursor = response.cursor;
};

(async () => {
  await Moralis.start({
    appId: process.env.APP_ID,
    serverUrl: process.env.SERVER_URL,
  });
  await getAllOwners();
})().catch((error) => console.log(error));
