const fs = require('fs');
const express = require('express');
const bodyParser =require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const data =fs.readFileSync('./database.json');
const conf =JSON.parse(data);
const mariadb = require('mariadb');



const connection = mariadb.createPool({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
});



async function asyncFunction() {
    let conn;
    try {
  
      conn = await connection.getConnection();

      

      const rows1 = await conn.query("SELECT * FROM  board");
      app.get('/api/board',(req,res)=>{
          res.send(rows1)
      })

      // const rows2 = await conn.query("SELECT * FROM  roadtest");
      // app.get('/api/roadtest',(req,res)=>{
      //     res.send(rows2)
      // })
      
      // /
      // app.post('/api/roaddetail',async(req,res) => {
      //   var startAreas = req.body.startAreas;
      //   console.log(startAreas)
      //   var rows3 = await conn.query(
      //     "SELECT * FROM  roaddetail WHERE StartArea = ? order by numID",
      //     [startAreas]
      //     );
      //     if(rows3.length>0){
      //       res.send({'success':true,'startAreas':JSON.stringify(rows3)});
      //     }
      //     else {
      //       res.send({'success':false,'startAreas':'network error'});
      //     }
      // })



      app.post('/api/users',async(req,res) => {

        var username = req.body.username;
        var password = req.body.password;
        
      const re = await conn.query(
          "SELECT uid,uname,dept,stdnum FROM user WHERE uid = ? AND upw = ?",
          [username,password]
          );
          
          if(re.length>0) {
              res.send({'success':true,'user':JSON.stringify(re[0])});
          }
          else {
          res.send({'success':false,'message': 'User Not Found'});
          }

    })

    const rows3 = await conn.query("SELECT local FROM  route group by local");
    app.get('/api/route_local',(req,res)=>{
        res.send(rows3)
    })

    app.post('/api/routes',async(req,res) => {
      var local = req.body.local;
      var rows3 = await conn.query(
        "SELECT * FROM  route WHERE local = ? order by start_point",
        [local]
        );
        if(rows3.length>0){
          res.send({'success':true,'route':JSON.stringify(rows3)});
        }
        else {
          res.send({'success':false,'route':'network error'});
        }
 
    })

    app.post('/api/reserve',async(req,res) => {
      var route = req.body.route;
      var start_date = req.body.start_date;
      var rows3 = await conn.query(
        "SELECT reserve_seat,uid FROM  reserve WHERE route = ? and start_date = ? order by reserve_seat",
        [route,start_date]
        );
     
        
        if(rows3.length>0){
          res.send({'success':true,'reserve':rows3});
        }
        else {
          res.send({'success':false,'reserve':'network error'});
        }
 
    })

    app.post('/api/reserve_input',async(req,res) => {
      var route = req.body.route;
      var start_date = req.body.start_date;
      var reserve_seat = req.body.reserve_seat;
      var uid = req.body.uid;
      var rows4 = await conn.query(
        "INSERT INTO reserve (route,reserve_seat,start_date,uid) VALUES (?,?,?,?)",
        [route,reserve_seat,start_date,uid,]
        );
          

        if((JSON.stringify(rows4)) != '{"affectedRows": 1, "insertId": 0, "warningStatus": 0}'){
          res.send({'success':true});
        }
        else {
          res.send({'success':false,'reserve':'예매 실패'});
        }
 
    })

    app.post('/api/reserve_modify',async(req,res) => {
      var route = req.body.route;
      var start_date = req.body.start_date;
      var reserve_seat = req.body.reserve_seat;
      var uid = req.body.uid;
      var rows5 = await conn.query(
        "UPDATE reserve SET reserve_seat = ? WHERE route = ?  AND start_date= ? AND uid= ?; ", // 변경번호 , 경로,예약날, uid
        [reserve_seat,route,start_date,uid,]
        );
          
        console.log(JSON.stringify(rows5));
        if(rows5){
          res.send({'success':true,'reserve':rows5});
        }
        else {
          res.send({'success':false,'reserve':'예매변경 실패'});
        }
 
    })

      

    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release(); //release to pool
    }
  }
asyncFunction();
app.listen (port, () => console.log(`${port}`));


 