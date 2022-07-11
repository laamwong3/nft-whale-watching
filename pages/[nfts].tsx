import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import moment from "moment";

const Nfts: NextPage = () => {
  const router = useRouter();
  const startDate = moment().subtract(7, "days").calendar();

  const { token } = useMoralisWeb3Api();
  const { data: nftTrades } = useMoralisWeb3ApiCall(
    token.getNFTTrades,
    {
      chain: "eth",
      address: router.query.nfts?.toString()!,
      from_date: startDate,
      // marketplace: "opensea",
    },
    { autoFetch: true }
  );
  const { data: nftLowestPrice } = useMoralisWeb3ApiCall(
    token.getNFTLowestPrice,
    {
      address: router.query.nfts?.toString()!,
      chain: "eth",
      days: 7,
      marketplace: "opensea",
    },
    { autoFetch: false }
  );
  console.log(nftTrades);
  return <>{nftTrades?.result && <div>{}</div>}</>;
};

export default Nfts;
