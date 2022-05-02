const routes=require("express").Router();
const mysqlClient= new (require("../controllers/mysql"));

mysqlClient.getConnection();
mysqlClient.setQuery();

routes.get("/getdispositivos",async (req,res)=>{
    const results=await mysqlClient.getDispositivos();
    res.status(200).send(results);
})

routes.post("/getmeasure",async (req,res)=>{
    const dispositivo=req.body;
    const results=await mysqlClient.getMeasure(dispositivo);
    res.status(200).send(results)
})

routes.post("/getelectrovalvula",async (req,res)=>{
    const electroValvula=req.body;
    const results=await mysqlClient.getElectroValvula(electroValvula);
    res.status(200).send(results)
})
routes.post("/getriego",async (req,res)=>{
    const logRiego=req.body;
    const results=await mysqlClient.getRiegos(logRiego);
    res.status(200).send(results)
})
routes.post("/addriego",async (req,res)=>{
    const logRiego=req.body;
    const results=await mysqlClient.addRiego(logRiego);
    res.status(200).send(results)
})

routes.post("/addmeasure",async(req,res)=>{
    const measure=req.body;
    const results= await mysqlClient.addMeasure(measure)
    res.status(200).send(results);
})


module.exports=routes;
