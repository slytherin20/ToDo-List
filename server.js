const server=require('express');
const app=server();
const PORT=process.env.PORT || 5000;
const db=require('./database');
const bodyParser = require('body-parser');
app.use('/',server.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/add',function(req,res){
    let todo=req.body.todo.task;
    db.additem(todo,function(data){
       res.send(data);
    });
});
app.get('/display',function(req,res){
    db.display(function(data){
        res.send(data);
    });

});

app.post('/delete',function(req,res){
    let item=req.body.task;
    db.deleteitem(item,function(data){
        res.send(data);
    })

});
app.post('/update',function(req,res){
    let newitem=req.body.newtask;
    let olditem=req.body.oldtask;
    db.changeitem(newitem,olditem,function(data){
        res.send(data);
    });
});
app.listen(PORT,function(req,res){
    console.log("server is listening at port 5000");
    db.connectDb();
});