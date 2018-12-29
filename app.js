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

app.get('/main',(req,res)=>{

    connection.query('CALL AgentTopByCategory(?)',[0],(err,result)=>{
        if(err){
            res.status(404).json(err)
        }else {
            res.json(result);
        }
    });
});

app.get('/food/',(req,res)=>{

    let id_food = req.body.id_food;

    connection.query('CALL FoodsGetInfo(?);', [id_food] ,(error, results)=>{
        if (error) res.json("{error:error}");
        res.render('order-details',{
            foodInfo :results[0][0],
            foodinSameRestaurant :results[1],
        })
    });
});



var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is running on port : " + port);
});