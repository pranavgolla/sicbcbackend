const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const AdminRoutes=require('./routes/Admin/AdminRoutes')
const PrincipalRoutes=require('./routes/Principal/principalRoutes')
const HodRoutes=require('./routes/Hod/HodRoutes')
const ProfessorRoutes=require('./routes/Professor/ProfessorRoutes')
const labInchargeRoutes = require("./routes/LabIncharge/LabInchargeRoutes");
const studentRoutes = require("./routes/Student/StudentRoutes");
const guardianRoutes = require("./routes/Guardian/GuardianRoutes");


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
app.use("/sicbc/principal",PrincipalRoutes)
app.use("/sicbc/hod",HodRoutes)
app.use('/sicbc/professor',ProfessorRoutes)
app.use("/sicbc/labincharge", labInchargeRoutes)
app.use("/sicbc/student", studentRoutes);
app.use("/sicbc/guardian", guardianRoutes);



app.listen(5000, () => {
  console.log("server is running in http://localhost:5000");
});
