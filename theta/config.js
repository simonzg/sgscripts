const thetaRpc = "http://54.169.171.97:18888/rpc";

const toAddress = "0x1d18c6fca6817175fff59763a36ac03ca9755165";

const tokens = [
  {
    name: "WETH",
    address: "0x3674d64aab971ab974b2035667a4b3d09b5ec2b3",
    startBlock: "13000000",
    endBlock: "14559807"
  },
  {
    name: "BNB",
    address: "0xdff772186ace9b5513fb46d7b05b36efa0a4a20d",
    startBlock: "13000000",
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