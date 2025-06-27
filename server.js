const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const AdminRoutes=require('./routes/Admin/AdminRoutes')
const principalRoutes=require('./routes/Principal/principalRoutes')
//const routes=require('./routes/practice/r')

const bodyParser=require('body-parser')
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

dotEnv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(`MongoDB error:${error}`);
  });


 
app.use("/sicbc/admin",AdminRoutes)
app.use("/sicbc/principal",principalRoutes)


app.listen(5000, () => {
  console.log("server is running in http://localhost:5000");
});
