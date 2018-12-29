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

app.get('/api/foods/',(req,res)=>{
    connection.query('CALL getFoods()',(err,result)=>{
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/api/food_id/',(req,res)=>{
    let food_id = req.body.food_id;

    connection.query('CALL getFoods(?)',[food_id],(err,result)=>{
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
});



var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running on port : " + port);
});