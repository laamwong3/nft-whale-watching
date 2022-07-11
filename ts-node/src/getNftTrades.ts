import { Moralis as MoralisDef } from "moralis/types/node";
import * as MoralisImport from "moralis/node";
import * as fs from "fs-extra";
import { config } from "dotenv";
config({ path: "../.env" });
const Moralis = MoralisImport as unknown as MoralisDef;

interface HistoryDetailsTypes {
  buyer: string;
  seller: string;
  tokenId: string;
  tokenAddress: string;
  price: string;
  date: string;
}
interface HistoryTypes {
  [index: string]: HistoryDetailsTypes[];
}

const testAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544"; //azuki

const getNftTrades = async () => {
  let buyer = {} as HistoryTypes;

  const nftTrades = await Moralis.Web3API.token.getNFTTrades({
    chain: "eth",
    address: testAddress,
    limit: 100,
  });

  if (nftTrades.result) {
    for (const trade of nftTrades.result) {
      if (!buyer[trade.buyer_address]) {
        buyer[trade.buyer_address] = [
          {
            tokenAddress: testAddress,
            buyer: trade.buyer_address,
            seller: trade.seller_address,
            tokenId: trade.token_ids.toString(),
            price: trade.price,
            date: trade.block_timestamp,
          },
        ];
      } else {
        buyer[trade.buyer_address].push({
          tokenAddress: testAddress,
          buyer: trade.buyer_address,
          seller: trade.seller_address,
          tokenId: trade.token_ids.toString(),
          price: trade.price,
          date: trade.block_timestamp,
        });
      }
    }
  }

  fs.writeFileSync("./data/buyer.json", JSON.stringify(buyer, null, 2));
  //   if (nftTrades?.result) console.log(nftTrades?.result[0].token_ids);
};

(async () => {
  await Moralis.start({
    appId: process.env.APP_ID,
    serverUrl: process.env.SERVER_URL,
  });
  await getNftTrades();
})().catch((error) => console.log(error));
