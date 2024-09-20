const mongoose= require('mongoose');
const url= process.env.DBURI || "mongodb://localhost:27017";
mongoose.connect(url ,{
    useNewUrlParser :true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to DB')).catch((e)=> console.log('Error',e))