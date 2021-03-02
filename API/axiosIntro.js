const axios = require('axios');
const fetchBitCoinPrice = async()=>{
    try {
       const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
       console.log(res.ticker.data.price) 
    } catch (error) {
        console.log("Error",error) 

    }
}