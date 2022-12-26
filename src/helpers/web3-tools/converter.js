import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 99, DECIMAL_PLACES: 50 })

const weiToKwei = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(3)).toString()
const weiToMwei = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(6)).toString()
const weiToGwei = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(9)).toString()
const weiToSzabo = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(12)).toString()
const weiToFinney = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(15)).toString()
const weiToEther = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(18)).toString()
const weiToKether = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(21)).toString()
const weiToMether = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(24)).toString()
const weiToGether = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(27)).toString()
const weiToTether = (x) => new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(30)).toString()

const kweiToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(3)).toString()
const mweiToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(6)).toString()
const gweiToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(9)).toString()
const szaboToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(12)).toString()
const finneyToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(15)).toString()
const etherToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(18)).toString()
const ketherToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(21)).toString()
const metherToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(24)).toString()
const getherToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(27)).toString()
const tetherToWei = (x) => new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(30)).toString()

export {
  weiToKwei,
  weiToMwei,
  weiToGwei,
  weiToSzabo,
  weiToFinney,
  weiToEther,
  weiToKether,
  weiToMether,
  weiToGether,
  weiToTether,
  kweiToWei,
  mweiToWei,
  gweiToWei,
  szaboToWei,
  finneyToWei,
  etherToWei,
  ketherToWei,
  metherToWei,
  getherToWei,
  tetherToWei
}
