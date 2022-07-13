const express= require("express");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


mongoose.connect("mongodb+srv://admin-binay:binay671@atlascluster.fwius.mongodb.net/remindersDB", {useNewUrlParser: true});
const reminderSchema= {
    date: String,
    time: String,
    name: String,
    content: String,
    link: String
}

const Reminder= mongoose.model("reminder", reminderSchema);

app.get("/", function(req,res){
    res.send("Hello IGITian!");
});




app.route("/reminders")
    .get(function(req,res){
        Reminder.find(function(err, foundItems){
            if(!err){

                res.send(foundItems);
            }else{
                res.send(err);
            }
        })
    })

    .post( function(req, res){

        const newReminder= new Reminder({
            date: req.body.date,
            time: req.body.time,
            name: req.body.name,
            content: req.body.content,
            link: req.body.link
        })
        newReminder.save(function(err){
            if(!err){
                res.send("Successfully Posted");
            }else{
                res.send(err);
            }
        });
        
    })

    .delete( function(req,res){
        Reminder.deleteMany(function(err){
            if(!err){
                res.send("Successfully deleted all items");
            }else{
                res.send(err);
            }
        })
    });

app.route("/reminders/:tag")
.delete(function(req,res){
    console.log("this is my log"+ req.params.tag);
    Reminder.deleteMany(
        {date: req.params.tag},
        function(err){
            if(!err){
                res.send("Deleted Successfully");
            }else{
                res.send(err+ " " + req.params.tag);
            }
        }
    )
});
// .get(function(req,res){
//     Article.findOne({name: req.params.tag}, function(err, foundItem){
//         if(foundItem){
//             res.send(foundItem);
//         }else{
//             res.send("No such Article found");
//         }
//     });
// })

// .put(function(req,res){
//     Article.updateOne(
//         {name: req.params.tag},
//         {name: req.body.name, content: req.body.content},
//         function(err,results){
//             if(!err){
//                 res.send("Updated Successfully");
//             }else{
//                 res.send("there was some problem");
//             }
//         }
//     )
// })

// .patch(function(req,res){
//     Article.updateOne(
//         {name: req.params.tag},
//         {$set: req.body},    //simply writing req.body will also work
//         function(err){
//             if(!err){
//                 res.send('Updated Successfully');
//             }
//         }
//     )
// })


















app.listen(process.env.PORT, function(){
    console.log("server running");
});
