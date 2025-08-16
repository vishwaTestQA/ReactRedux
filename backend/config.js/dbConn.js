import mongoose from "mongoose";

const connectDB = async() =>{
try{
 const connectDB = await mongoose.connect(process.env.DATABASE_URL,{
    // useUnifiedTopology: true,    //its depricated
    useNewUrlParser: true
  })

  console.log("Db is connected", connectDB.connection.host)
}catch(err){
   console.log("Db is not connected", err)
}
}

export default connectDB