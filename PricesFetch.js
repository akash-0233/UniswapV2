const ethers = require("ethers");
const {
  factoryAddresss,
  routerAddress,
  fromAddress,
  toAddress,
} = require("./AddressList");

const { erc20ABI, factoryABI, pairABI, routerABI } = require("./AbiInfo");

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-dataseed1.binance.org/"
); // rpc binance node

const factoryInstance = new ethers.Contract(
  factoryAddresss,
  factoryABI,
  provider
);

const routerInstance = new ethers.Contract(routerAddress, routerABI, provider);

const priceFetch = async (humanFormat) => {
  const token1 = new ethers.Contract(fromAddress, erc20ABI, provider);
  const token2 = new ethers.Contract(toAddress, erc20ABI, provider);

  const decimal1 = await token1.decimals();
  const decimal2 = await token2.decimals();

  const amountIn = ethers.utils.parseUnits(humanFormat, decimal1).toString();
  const amountOut = await routerInstance.getAmountsOut(amountIn, [
    fromAddress,
    toAddress,
  ]);
  const humanOutput = ethers.utils.formatUnits(
    amountOut[1].toString(),
    decimal2
  );
  console.log("Number of WBNB :", humanOutput);
};
humanFormat = "100";
priceFetch(humanFormat);
