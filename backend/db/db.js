const mongoose=require('mongoose')

const connectdb=async()=>{
    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log('database is connected');
    })
    .catch(()=>{
        console.log('database is not connected');
        
    })
}
module.exports=connectdb