import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import moment from "moment";

const Nfts: NextPage = () => {
  const router = useRouter();
  const startDate = moment().subtract(14, "days").calendar();

  const { token } = useMoralisWeb3Api();
  const { data: nftTrades } = useMoralisWeb3ApiCall(
    token.getNFTTrades,
    {
      chain: "eth",
      address: router.query.nfts?.toString()!,
      from_date: startDate,
      // from_block: 15132845,
      // marketplace: "opensea",
    },
    { autoFetch: true }
  );
  const { data: nftOwners } = useMoralisWeb3ApiCall(
    token.getNFTOwners,
    {
      address: router.query.nfts?.toString()!,
      chain: "eth",
    },
    { autoFetch: false }
  );
  console.log(nftTrades);
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
  // console.log(nftTrades);
  return <></>;
};

export default Nfts;
