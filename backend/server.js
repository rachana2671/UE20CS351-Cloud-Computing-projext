const express = require("express");
const cors=require("cors");
const mysql=require("mysql");
const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database:"mysql"

})
app.post('/create',(req,res)=> {
    const sql="INSERT INTO student (Name,Email) VALUES (?);";
    const values=[
        req.body.name,
        req.body.email
    ]
    db.query(sql,[values],(err,data) => {
        if(err) return res.json(err);
            
        return res.json(data);

    })
})

app.put('/update/:id',(req,res)=> {
    const sql="update student set Name=?,Email=? where Id=?;";
    const values=[
        req.body.name,
        req.body.email
    ]
    const id=parseInt(req.params.id);
    db.query(sql,[...values,id],(err,data) => {
        if(err) return res.json(err);
            
        return res.json(data);

    })
})

app.delete('/student/:id',(req,res)=> {
    const sql="Delete from student where Id=?;";
    const id=parseInt(req.params.id);
    db.query(sql,[id],(err,data) => {
        if(err) return res.json(err);
            
        return res.json(data);

    })
})

app.get("/",(req,res) => {
    const sql="SELECT * FROM student";
    db.query(sql,(err,data) => {
        if(err) return res.json("Nope");
        return res.json(data);
    });
});
app.listen(8081,() => {
    console.log("listening");
})