// get the most up to date whale address
// look for someone who swipe the floor
import buyerList from "./data/buyer.json";
import azukiList from "./data/Azuki.json";

const testArr = {
  "0xe42f35fb3e55f5a080dfe7eb29e02baeece2d1ce": [
    {
      tokenAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      buyer: "0xe42f35fb3e55f5a080dfe7eb29e02baeece2d1ce",
      seller: "0x1abda388349f8d3b5787396fde07f8b25b8f5089",
      tokenId: "5563",
      price: "12420689999999998000",
      date: "2022-07-10T05:50:47.000Z",
      block: 15113099,
    },
    {
      tokenAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      buyer: "0xe42f35fb3e55f5a080dfe7eb29e02baeece2d1ce",
      seller: "0x6f133b985501dbc3a697fb5244924b57c5ac8c72",
      tokenId: "935",
      price: "18900000000000000000",
      date: "2022-07-10T04:15:30.000Z",
      block: 15112683,
    },
  ],
  "0x0394a2d392564aba9db2f38c2d26c2fd34968247": [
    {
      tokenAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
      buyer: "0x0394a2d392564aba9db2f38c2d26c2fd34968247",
      seller: "0x828702fc0c977f0b347c998c107df77618f85e87",
      tokenId: "2227",
      price: "12400000000000000000",
      date: "2022-07-10T05:30:03.000Z",
      block: 15113004,
    },
  ],
};

for (const index in testArr) {
  testArr[index as keyof typeof testArr].findIndex(
    (value) => value.block === 15112683
  );
}

// let i = 0;
// for (const index in buyerList) {
//   // console.log(index);

//   i = buyerList[index as keyof typeof buyerList].findIndex(
//     (value) => value.block === 15137329
//   );
//   console.log(i);
// }

// const testNum: number[] = [1, 3, 5, 7];

// const max = testNum.findIndex((value) => value === Math.max(...testNum));
// console.log(max);

// for (const index in azukiList) {
//   console.log(azukiList[index as keyof typeof azukiList].amount);
// }
