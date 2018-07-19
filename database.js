let pg = require('pg');
const operations = require('./operations');
let conString = process.env.ELEPHANTSQL_URL ||  "postgres://kllvkuli:d6bCkNqdB2Py3a-Iq-LmE5L9QS0TWojN@pellefant.db.elephantsql.com:5432/kllvkuli";

let client = new pg.Client(conString);
function connectDb(){
    client.connect();
}
function display(getdata){
    operations.sendtodolist(client,function(data){
        getdata(data);
    });
}
function additem(item,senddata){
    operations.insertintolist(client,item,function(data){
        senddata(data);
    });
}
function changeitem(newitem,olditem,changedata){
    operations.modifylist(client,newitem,olditem,function(data){
        changedata(data);
    });
}
function deleteitem(item,removedata){
    operations.removeitem(client,item,function(data){
        removedata(data);
    });

}

module.exports = {
    connectDb,
    display,
    additem,
    changeitem,
    deleteitem
};
