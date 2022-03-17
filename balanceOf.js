const meterify = require('meterify').meterify;
const Web3 =  require('web3')
const web3 = meterify(new Web3(), 'https://mainnet.meter.io')
const {abi} = require('./erc20.json')
const weth = '0x79a61d3a28f8c8537a3df63092927cfa1150fb3c';
const bnb = '0xf8bbb44e6fd13632d36fe09eb61820f9a44f5d74';
const fs = require('fs')
const BigNumber = require('bignumber.js')
const lines = fs.readFileSync('./accounts.txt');

(async()=>{
	console.log(`Address,WETH,BNB`)
	const wethCon = new web3.eth.Contract(abi, weth)	
	const bnbCon = new web3.eth.Contract(abi, bnb)
	for (const addr of lines.toString().split('\n')){
		const wethRes = await wethCon.methods.balanceOf(addr).call({}, 20644401)
		const bnbRes = await bnbCon.methods.balanceOf(addr).call({}, 20644401)
		const wethBal = new BigNumber(wethRes).div(1e18)
		const bnbBal = new BigNumber(bnbRes).div(1e18)
		if (wethBal.isGreaterThan(0) || bnbBal.isGreaterThan(0)){
			console.log(`${addr},${wethBal.toFixed()},${bnbBal.toFixed()}`)
		}
	}
})()
