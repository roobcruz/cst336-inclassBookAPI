var express = require("express");
var app = express();
var request = require("request");

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render('home');
})

app.get("/results", function(req,res){
    var ISBN = req.query.search;
    var url = "https://openlibrary.org/api/books?bibkeys=ISBN:" + ISBN + "&format=JSON&jscmd=data";
    request(url, function(error, response, dataStream){
        if(!error && response.statusCode == 200){
            //console.log(dataStream)
            var data = JSON.parse(dataStream);
            //console.log(dataStream)
            //console.log(ISBN);
            console.log(data["ISBN:"+ISBN]);
            
            res.render("results",{data: data["ISBN:" + ISBN]});
        }
    })
})

app.get('*', function(req, res){
    res.render("error");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server has been started...");
});