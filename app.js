const express = require("express");
const {getData, getDataById, addOrUpdateData, deleteDataById} = require("./database");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(cors());


// Get data 
app.get("/data", async(req,res)=>{
    const datas = await getData();
    console.log(datas);
    res.json(datas);
});

// Get specific data 
app.get("/data/:id", async(req,res)=>{
    const id = req.params.id;
    const datas = await getDataById(id);
    console.log(datas);
    res.json(datas);
});


// Post data
app.post("/data", async(req,res)=>{
    const data = req.body;
    console.log(data);
    const newData = await addOrUpdateData(data);
    res.json(newData);
})


// Put data
app.post("/data/:id", async(req,res)=>{
    const data = req.body;
    const { id } = req.params;
    data.id = id;
    const updatedData = await addOrUpdateData(data);
    console.log(updatedData);
    res.json(updatedData);
})

// Delete specific data

app.delete("/data/:id", async(req,res)=>{
    const { id } = req.params;
    const deleteData = await deleteDataById(id);
    console.log(deleteData);
    res.json(deleteData);
})







app.get("/", async(req,res)=>{
    res.send("Book Server Started");
})

app.listen(port, async(req, res)=>{
    console.log(`Port listening at ${port}`)
})