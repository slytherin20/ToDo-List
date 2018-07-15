function sendtodolist(client,data){
    client.query("SELECT task FROM todo",function(error,result){
        if(error)
        {
            throw error;
        }
        else
        {  console.log(result.rows);
        data(result.rows);
        }
    });
}
function insertintolist(client,item,callback){
   let values=[item];
   client.query('INSERT INTO todo(task)VALUES($1)',values,function(error){
       if(error){
           throw error;

       }
       else{
           callback("Task inserted");
       }
   });

}
function modifylist(client,newitem,olditem,modify){
    let values=[newitem,olditem];
    client.query("UPDATE todo SET task=($1) WHERE task=($2)",values,function(error){
        if(error){
            throw error;
        }
        else{
            modify("Task Updated");
        }
    });

}
function removeitem(client,item,deleted){
    client.query("DELETE FROM  todo WHERE task=($1)",[item],function(error){
        if(error){
            throw error;
        }
        else{
            deleted("Task deleted");
        }
    });
}
module.exports = {
    sendtodolist,
    insertintolist,
    modifylist,
    removeitem
};