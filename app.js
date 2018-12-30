const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let connection = mysql.createConnection({
    connectionLimit : 10,
    aquireTimeOut: 120000,
    host : '139.162.172.118',
    user : 'chatgram_myuser',
    password : 'm*0cn9G4D?PK',
    database : 'chatgram_foodsystem'
});

app.get('/',function(req,res){
    res.send("runnibg server node js");
});

app.get('/api/main',(req,res)=>{

    connection.query('CALL AgentTopByCategory(?)',[0],(err,result)=>{
        if(err){
            res.status(404).json(err);
        }else {
            res.json(result);
        }
    });
});

// api get more foods by max rate (restruent and home)

app.post('/api/MoreFoods',(req,res)=>{

    let fromId = req.body.fromId;

    connection.query('CALL Mob_FoodGetMore(?,?);',[fromId,parseInt(fromId) + 9],(err,result)=>{
        if(err){
            res.status(404).json(err);
        }else {
            res.json(result);
        }
    });
});

// api get more Agent by max rate and type

app.post('/api/MoreAgent',(req,res)=>{

    let fromId       = req.body.fromId;
    let agent_type   = req.body.agent_type;

    connection.query('CALL Mob_AgentGetMoreByType(?,?,?);',[fromId,parseInt(fromId) + 9,agent_type],(err,result)=>{
        if(err){
            res.status(404).json(err);
        }else {
            res.json(result);
        }
    });
});

// api get agent foods

app.post('/api/AgentFoods',(req,res)=>{

    let agent_id = req.body.agent_id;

    connection.query('CALL Mob_AgentGetFood(?);',[agent_id],(err,result)=>{
        if(err){
            res.status(404).json(err);
        }else {
            res.json(result);
        }
    });
});

// api get Info of specific food and all foods of this agent

app.post('/api/FoodInfo',(req,res)=>{

    let food_id = req.body.food_id;

    connection.query('CALL FoodsGetInfo(?);',[food_id],(err,result)=>{
        if(err){
            res.status(404).json(err);
        }else {
            res.json(result);
        }
    });
});



var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running on port : " + port);
});