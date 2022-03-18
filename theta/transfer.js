const path = require('path');
const { ethers } = require('ethers');
const { default: BigNumber } = require('bignumber.js');

const { saveCSVFromObjects } = require('../utils/csv');
const { sleep } = require('../utils/utils');
const { abi } = require('../erc20.json');

const { thetaRpc, toAddress, tokens, csvOptions } = require('./config');
const WINDOW=5000

let transferCount = 0;
const step = 5;
const sleepTime = 30 * 1000;

(async () => {
  try {
    for (const t of tokens) {
      const p = new ethers.providers.JsonRpcProvider(thetaRpc);
      const c = new ethers.Contract(t.address, abi, p);

      console.log(`INFO: fetch ${t.name} from ${t.startBlock} to ${t.endBlock}`);
      const transfers = await getTransfer(c, t.startBlock, t.endBlock);
      if (!transfers.length) {
        console.log(`TIP: relative data no found`)
        continue;
      }

      console.log(`INFO: total transfers ${transfers.length}`);
      const decimals = await c.decimals();
      console.log(`TIP: ${t.name} token decimals ${decimals}`)
      console.log(transfers.length > 0 ? transfers[0] : '')
      const results = [];
      for (const ts of transfers) {
        results.push({
          account: ts.args.from,
          amount: new BigNumber(String(ts.args.value)).div(`1e${decimals}`).toFixed()
        })
      }

      const fileName = `${t.name.toLowerCase()}-${t.startBlock}-${t.endBlock}`;
      const filePath = path.join(__dirname, fileName + ".csv");
      await saveCSVFromObjects(results, csvOptions, filePath);

      console.log(`INFO: file ${fileName}.csv saved in ${filePath}`)
    }
  } catch (e) {
    console.log(`ERROR: ${e.message}`)
  }
})();

async function getTransfer(c, startBlock, endBlock ) {
  let _startBlock = Number(startBlock);
  let _endBlock = Number(endBlock);
  // should use c.filters.Transfer(null, to), but always encounter error.
  const e = c.filters.Transfer();

  const transfers = []

  for (let start = _startBlock; start <= _endBlock; start += WINDOW) {
    let end = start + WINDOW-1;

    if (end > _endBlock) {
      end = _endBlock;
    }

    console.log(`INFO: fetching transfers from ${start} -> ${end}`)

    // if (transferCount && transferCount % step === 0) {
    //   console.log(`TIP: sleep ${sleepTime / 1000}s`)
    //   await sleep(sleepTime);
    // }

    const ts = await c.queryFilter(e, start, end);

    // transferCount++;
    const filtered =ts.filter((t)=>t.args.to.toLowerCase()===toAddress) 

    console.log(`INFO: got ${filtered.length} transfers`);

    transfers.push(...filtered);
  }
  return transfers;
}