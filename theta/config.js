const thetaRpc = "https://eth-rpc-api.thetatoken.org/rpc";

const toAddress = "0x1d18c6fca6817175fff59763a36ac03ca9755165";

const tokens = [
  {
    name: "WETH.eth",
    address: "0x3674d64aab971ab974b2035667a4b3d09b5ec2b3",
    startBlock: "14000000",
    endBlock: "14559807"
  },
  {
    name: "BNB.bsc",
    address: "0xdff772186ace9b5513fb46d7b05b36efa0a4a20d",
    startBlock: "14530000",
    endBlock: "14559807"
  }
];

const csvOptions = [
  { id: "account", title: "Account" },
  { id: "amount", title: "Amount" }
];

module.exports = {
  thetaRpc,
  toAddress,
  tokens,
  csvOptions
}