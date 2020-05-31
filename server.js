const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 7000;
const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({dest:'./upload'});
const connection = mysql.createConnection({
    host:conf.host,
    user: conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

connection.connect();

app.get('/api/employees',(req,res)=>{
    connection.query(
        "SELECT E.empno, E.ename, E.job, M.ENAME mgr , date_format(E.hiredate,'%Y-%m-%d') hiredate, E.sal, E.comm, D.DNAME deptno FROM EMP E, EMP M, DEPT D WHERE E.DEPTNO = D.DEPTNO && E.MGR=M.EMPNO order by E.empno",
        (err,rows,fields)=>{
            res.send(rows);
        }
    );
});
app.post('/api/employees/jobmodify/:empno',upload.single('image'),(req,res)=>{
    let sql = "UPDATE EMP SET JOB=? WHERE empno = ?"; //수정해야됨
    let job = req.body.job;
    let empno = parseInt([req.params.empno]);
    let params = [job, empno];
    connection.query(sql,params, (err,rows,fields)=>{
        res.send(rows);
   });
});

app.post('/api/employees',upload.single('image'),(req,res)=>{
    let sql = "INSERT INTO EMP VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    let empno = parseInt(req.body.empno);
    let ename = req.body.ename;
    let job = req.body.job;
    let mgr = parseInt(req.body.mgr);
    let hiredate = req.body.hiredate;
    let sal = parseInt(req.body.sal);
    let comm = parseInt(req.body.comm);
    let deptno = parseInt(req.body.deptno);
    let params = [empno, ename, job, mgr, hiredate,sal, comm, deptno];
    connection.query(sql,params, (err,rows,fields)=>{
        res.send(rows);
   });
});
app.delete('/api/employees/:empno', (req,res)=>{
    let sql = 'DELETE FROM EMP WHERE empno = ?';
    let params = parseInt([req.params.empno]);
    connection.query(sql,params,
        (err,rows,fields)=>{
        res.send(rows);
    });
});
app.listen(port,()=>console.log('Listening on port '+port));