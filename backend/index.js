const express=require("express");
const routes=require("./routes/routes");
const cors=require("cors");


const app=express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);


app.listen(process.env.PORT || 3000, ()=>{
    console.log("estamos funcionando");
})