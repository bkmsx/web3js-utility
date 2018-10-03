// Add the web3 node module
var airdropABI = require("./airdrop_abi");

var Web3 = require("web3");

// Show web3 where it needs to look for the Ethereum node.
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/75bdcbca0b894b1ebed5777a506bbfea"
  )
);

var contract = web3.eth
  .contract(airdropABI.contractAbi)
  .at("0x37497e75516153246eb123b83c974f963d867874");
contract.airdropToken(
  ["0x087cb2b984a102fdbc5b4a496b6e8308fd12786d"],
  { from: "0x657eb3ce439ca61e58ff6cb106df2e962c5e7890" },
  function(err, data) {
    console.log(data);
    console.log(err);
  }
);
