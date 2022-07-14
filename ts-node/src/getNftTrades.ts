// import { Moralis as MoralisDef } from "moralis/types/node";
// import * as MoralisImport from "moralis/node";
import * as fs from "fs-extra";
import { config } from "dotenv";
import { type } from "os";
config({ path: "../.env" });
// const Moralis = MoralisImport as unknown as MoralisDef;
import Moralis from "moralis/node";

interface HistoryDetailsTypes {
  buyer: string;
  seller: string;
  tokenId: string;
  tokenAddress: string;
  price: string;
  date: string;
  block: number;
}
interface HistoryTypes {
  [index: string]: HistoryDetailsTypes[];
}

type AccountTokenTypes = Array<string> & { [index: string]: string };

const testAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544"; //azuki

const getNftTrades = async () => {
  let buyer = {} as HistoryTypes;
  let seller = {} as HistoryTypes;
  let accountTokenBuyer = [] as unknown as AccountTokenTypes;
  let accountTokenSeller = [] as unknown as AccountTokenTypes;

  const nftTrades = await Moralis.Web3API.token.getNFTTrades({
    chain: "eth",
    address: testAddress,
    limit: 100,
  });

  if (nftTrades.result) {
    for (const trade of nftTrades.result) {
      if (
        !buyer[trade.buyer_address] &&
        !accountTokenBuyer.includes(trade.token_ids.toString())
      ) {
        buyer[trade.buyer_address] = [
          {
            tokenAddress: testAddress,
            buyer: trade.buyer_address,
            seller: trade.seller_address,
            tokenId: trade.token_ids.toString(),
            price: trade.price,
            date: trade.block_timestamp,
            block: Number(trade.block_number),
          },
        ];
        accountTokenBuyer.push(trade.token_ids.toString());
      } else if (!accountTokenBuyer.includes(trade.token_ids.toString())) {
        buyer[trade.buyer_address].push({
          tokenAddress: testAddress,
          buyer: trade.buyer_address,
          seller: trade.seller_address,
          tokenId: trade.token_ids.toString(),
          price: trade.price,
          date: trade.block_timestamp,
          block: Number(trade.block_number),
        });
        accountTokenBuyer.push(trade.token_ids.toString());
      }

      if (
        !seller[trade.seller_address] &&
        !accountTokenSeller.includes(trade.token_ids.toString())
      ) {
        seller[trade.seller_address] = [
          {
            tokenAddress: testAddress,
            seller: trade.seller_address,
            buyer: trade.buyer_address,
            tokenId: trade.token_ids.toString(),
            price: trade.price,
            date: trade.block_timestamp,
            block: Number(trade.block_number),
          },
        ];
        accountTokenSeller.push(trade.token_ids.toString());
      } else if (!accountTokenSeller.includes(trade.token_ids.toString())) {
        seller[trade.seller_address].push({
          tokenAddress: testAddress,
          seller: trade.seller_address,
          buyer: trade.buyer_address,
          tokenId: trade.token_ids.toString(),
          price: trade.price,
          date: trade.block_timestamp,
          block: Number(trade.block_number),
        });
        accountTokenSeller.push(trade.token_ids.toString());
      }
    }
  }

  fs.writeFileSync("./data/buyer.json", JSON.stringify(buyer, null, 2));
  fs.writeFileSync("./data/seller.json", JSON.stringify(seller, null, 2));
  //   if (nftTrades?.result) console.log(nftTrades?.result[0].token_ids);
};

(async () => {
  await Moralis.start({
    appId: process.env.APP_ID,
    serverUrl: process.env.SERVER_URL,
  });
  await getNftTrades();
})().catch((error) => console.log(error));
