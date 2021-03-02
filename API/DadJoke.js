
const axios = require('axios');
const getDadJoke = async()=>{
    
        const config = {headers: {Accept:'application/json'}}
       const res = await axios.get('https://icanhazdadjoke.com/', config)
       console.log(res.data.joke) 
    
}