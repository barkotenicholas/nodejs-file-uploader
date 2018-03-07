const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

//Set storage engine

const storge = multer.diskStorage({
     destination:'/home/nicholas/codes/node/fourth-app/public/uploads',filename:function(req,file,cb){
         cb(null,file.fieldname + '-' + Date.now+path.extname(file.originalname));
     }
});

//Init upload variable
const upload = multer({
     storage:storge
}).single('myImage');


// init our app variable

const app = express();

//EJS
app.set('view engine','ejs');

//public folder 
app.use(express.static('./public'));


app.get("/",(req,res) => res.render('index'));

app.post('/upload', (req,res) => {
    upload(req,res,(err) =>{
        if(err){
            res.render('index',{
                msg : err
            });
        }
        else{
            console.log(req.file);
            res.send('test');
        }
    });
});



//init our port number

const port = 3000;

app.listen(port, () => console.log(`server started on port ${port}`));





