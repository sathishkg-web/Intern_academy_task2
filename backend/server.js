const express=require('express')
const app=express()
const port=5000
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


var mongoDB='mongodb://localhost:27017/ecommerce'
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=>{console.log("DB connected succesfully")})
var db=mongoose.connection;
var Schema=mongoose.Schema;
var orderSchema=new Schema({
    name:String,
    email:String,
    address:String,
    Items:[String],
    Total:Number,
    orderAt:Date
})
const order=mongoose.model('order',orderSchema);

app.post("/api/order",(req,res)=>{
    console.log(req.body)
    res.send(req.body)
    db.collection('order').insertOne(req.body,(err,data)=>{
        if(err) return console.log(err);
        //res.send('saved to db'+data)
    })
})
app.listen(port,()=>{
    console.log('listening at port 5000')
})
