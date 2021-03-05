const express=require('express');
const mongoose=require('mongoose');
const FoodModel=require('./models/Food');
const app=express();
const cors=require('cors')

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Jagdish:Whiteblack*1@cluster0.yunpw.mongodb.net/food?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
}
);


app.post("/insert", async(req,res)=>{

    
const foodName = req.body.foodName;
const days=req.body.days;
  

const food= new FoodModel({foodName:foodName, daySinceIAte: days});
 
 
  try{
  await food.save();
  res.send("inserted Data");
  }catch(err){
      console.log(err)
  }
});


app.get("/read", async(req,res)=>{

    FoodModel.find({}, (err,result)=>{

        if(err){
            res.send(err);
        }
        

        res.send(result);
      
    });

    
    });

    app.put("/update", async(req,res)=>{

    
        const newFoodName = req.body.newFoodName;
        const id=req.body.id;
          
         
         
          try{
          await FoodModel.findById(id,(err,updatedFood)=>{
            updatedFood.foodName=newFoodName;
            updatedFood.save();
            res.send("Update");
          });
          
          }catch(err){
              console.log(err)
          }
        });

        app.delete("/delete/:id", async(req,res)=>{
            const id=req.params.id;
           await FoodModel.findByIdAndRemove(id).exec();
            res.send("Deleted")
            });


app.listen(3001, ()=>{
    console.log("Server is runn ing on port 3001..");
});