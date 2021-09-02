const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const data =fs.readFileSync('./database.json');
const conf =JSON.parse(data);
const mariadb = require('mariadb');
const { pid } = require('process');



const connection = mariadb.createPool({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database,
    multipleStatements: true,
    
});

const options = {
  Origin: 'http://172.16.2.171/api/board', // 접근 권한을 부여하는 도메인
  Credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  OptionsSuccessStatus: 200 // 응답 상태 200으로 설정 
};

app.use(cors(options));

//app.use(cors());
async function asyncFunction() {
    let conn;
    try {
    
      conn = await connection.getConnection();
      
      

      // 커넥션 쿼리 비동기처리로 인해 게시판 즉시 갱신문제
      app.get('/api/board',async(req,res)=>{
        const rows1 = await conn.query("SELECT * FROM  board order by udate desc,pid desc"); // 최신 게시물이 상위로 올라가도록 날짜(udate)기준 내림차순 정렬
         await res.send(rows1)
      })

      app.post('/api/board_write',async(req,res) => {
        try{
       var title = req.body.title;
       var content = req.body.content;
       var writer =req.body.writer;
       var udate = req.body.udate;

        var rows12 = await conn.query(
          "INSERT INTO board (title,content,writer,udate) VALUES (?,?,?,?)",
          [title,content,writer,udate,]
          );
            
          if((JSON.stringify(rows12)) != '{"affectedRows": 1, "insertId": 0, "warningStatus": 0}'){
            res.send({'success':true});
          }
          else {
            res.send({'success':false,'reserve':'예매 실패'});
          }
        } catch(err) {
          console.log(err);
        }
      })

      app.post('/api/board_update',async(req,res) => {
        try{
      var pid = req.body.pid;
       var title = req.body.title;
       var content = req.body.content;


        var rows13 = await conn.query(
          "UPDATE board SET title = ?, content = ? WHERE pid = ?",
          [title,content,pid]
          );
            
          if((JSON.stringify(rows13)) != '{"affectedRows": 1, "insertId": 0, "warningStatus": 0}'){
            res.send({'success':true});
          }
          else {
            res.send({'success':false,'reserve':'예매 실패'});
          }
        } catch(err) {
          console.log(err);
        }
      })

      app.post('/api/board_delete',async(req,res) => {
        try{
      var pid = req.body.pid;
  
        var rows14 = await conn.query(
          "CALL delsort(?)",
          [pid]
          );
            
          if((JSON.stringify(rows14)).length >0){
            res.send({'success':true});
          }
          else {
            res.send({'success':false,'reserve':'예매 실패'});
          }
        } catch(err) {
          console.log(err);
        }
      })
  
      
      




      app.post('/api/users',async(req,res) => {
        try{
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
        } catch (err) {
          console.log(err);
        }
      })

      app.post('/api/userlist',async(req,res) => {
        try{
       var inputvalue = req.body.inputvalue;
         
       if (inputvalue.length > 0) {
        const re = await conn.query(
          "SELECT * FROM user WHERE uid=? or uname = ? or dept = ? or stdnum = ? ",
          [inputvalue,inputvalue,inputvalue,inputvalue]
          );
          if(re.length>0) {
            res.send({'success':true,'user':re});
        }
        else {
        res.send({'success':false,'message': 'User Not Found'});
        }
       }
       else {
        const re = await conn.query(
          "SELECT * FROM user WHERE NOT dept= '학생지원과' "
          );
          if(re.length>0) {
            res.send({'success':true,'user':re});
        }
        else {
        res.send({'success':false,'message': 'User Not Found'});
        }
       }
      
          
         
        } catch (err) {
          console.log(err);
        }
      })

      app.post('/api/userlist',async(req,res) => {
        try{
       
      const re = await conn.query(
          "SELECT * FROM user WHERE NOT dept= '학생지원과' "
          );
          
          if(re.length>0) {
              res.send({'success':true,'user':re});
          }
          else {
          res.send({'success':false,'message': 'User Not Found'});
          }
        } catch (err) {
          console.log(err);
        }
      })

    
    app.get('/api/route_local',async(req,res)=>{
      const rows7 =await conn.query("SELECT local FROM  route group by local");
      await res.send(rows7)
    })

    app.post('/api/routes',async(req,res) => {
      try{
      var local = req.body.local;
      var rows8 = await conn.query(
        "SELECT * FROM  route WHERE local = ? order by start_point",
        [local]
        );
        if(rows8.length>0){
          res.send({'success':true,'route':JSON.stringify(rows8)});
        }
        else {
          res.send({'success':false,'route':'network error'});
        }
      } catch(err) {
        console.log(err);
      }
 
    })
    app.post('/api/route',async(req,res) => {
      try{
      var rows16 = await conn.query(
        "SELECT * FROM route order by start_point"
        );
        if(rows16.length>0){
          res.send(rows16)
        }
        else {
          res.send({'success':false,'route':'network error'});
        }
      } catch(err) {
        console.log(err);
      }
 
    })
    
      
      
      app.post('/api/roaddetail',async(req,res) => {
        try{
        var startAreas = req.body.startAreas;
        var rows15 = await conn.query(
          "SELECT * FROM  roaddetail WHERE roadname = ? order by numID",
          [startAreas]
          );
          if(rows15.length>0){
            res.send({'success':true,'startAreas':JSON.stringify(rows15)});
          }
          else {
            res.send({'success':false,'startAreas':'network error'});
          }
        } catch(err) {
          console.log(err);
        }
      })

    app.post('/api/reserve',async(req,res) => {
      try{
      var route = req.body.route;
      var start_date = req.body.start_date;
      var rows9 = await conn.query(
        "SELECT reserve_seat,uid FROM  reserve WHERE start_point = ? and start_date = ? order by reserve_seat",
        [route,start_date]
        );
     
        
        if(rows9.length>0){
          res.send({'success':true,'reserve':rows9});
        }
        else {
          res.send({'success':false,'message':'network error'});
        }
      } catch(err) {
        console.log(err);
      }
    })

    app.post('/api/reserve_check',async(req,res) => {
      try{
      var user = req.body.uid;
      var rows6 = await conn.query(
        "SELECT * FROM reserve WHERE uid = ? AND start_date >= DATE_ADD(NOW(),INTERVAL -7 DAY) AND STATUS = 0", // 지금 현재시간 ~ 7일전까지 범위 검색 uid 리턴 or * 리턴
        [user]
        );
     
        
        if(rows6.length>0){
          res.send({'success':false,'message':'예약 내역이 존재합니다.', 'reserve':JSON.stringify(rows6)}); // 예약테이블에 7일이내 예약기록이 있을 경우, 예약 실패
        }
        else {
          res.send({'success':true }); // 조회 데이터 없을 경우 예약 가능.
        }
      } catch(err) {
        console.log(err);
      }
    })



    app.post('/api/reserve_delete', async(req,res) => {
      try{
        var user = req.body.uid;
        var rows6 = await conn.query(
          "DELETE FROM reserve WHERE uid = ? ",
          [user]
          );

          if(rows6.length>0){
            res.send({'success':true,'message':'지워졌습니다.', 'reserve':JSON.stringify(rows6)}); // 예약테이블에 7일이내 예약기록이 있을 경우, 예약 실패
          }
          else {
            res.send({'success':false }); // 조회 데이터 없을 경우 예약 가능.
          }
        } catch(err) {
          console.log(err);
        }
      })
    

    app.post('/api/reserve_input',async(req,res) => {
      try{
      var start =req.body.start;
      var end = req.body.end;
      var start_time = req.body.start_time;
      var route = req.body.route;
      var start_date = req.body.start_date;
      var reserve_seat = req.body.reserve_seat;
      var uid = req.body.uid;
      var rows4 = await conn.query(
        "INSERT INTO reserve (local,start_point,end_point,start_time,reserve_seat,start_date,uid) VALUES (?,?,?,?,?,?,?)",
        [start,route,end,start_time,reserve_seat,start_date,uid,]
        );
          
        if((JSON.stringify(rows4)) != '{"affectedRows": 1, "insertId": 0, "warningStatus": 0}'){
          res.send({'success':true});
        }
        else {
          res.send({'success':false,'reserve':'예매 실패'});
        }
      } catch(err) {
        console.log(err);
      }
    })

    app.post('/api/reserve_modify',async(req,res) => {
      try{
      var route = req.body.route; // 노선정보
      var start_date = req.body.start_date;
      var reserve_seat = req.body.reserve_seat;
      var uid = req.body.uid;

      var rows5 = await conn.query(
        "UPDATE reserve SET reserve_seat = ? WHERE start_point = ?  AND start_date= ? AND uid= ? ", // 변경번호 , 경로,예약날, uid
        [reserve_seat,route,start_date,uid]
        );
          
        
        if(rows5){
          res.send({'success':true,'reserve':rows5});
        }
        else {
          res.send({'success':false,'reserve':'예매변경 실패'});  
        }
      } catch(err) {
        console.log(err);
      }
    })

    app.post('/api/penalty',async(req,res) => {
      try{
      var uid = req.body.uid;
      var rows10 = await conn.query(
        "SELECT * FROM penalty WHERE uid = ?",
        [uid]
        );
        if(rows10.length>0){
          res.send({'success':true,'penalty':JSON.stringify(rows10)});
        }
        else {
          res.send({'success':false,'message':'페널티 내역이 없습니다.'});
        }
      } catch(err) {
        console.log(err);
      }
    })
    app.post('/api/reserve_history',async(req,res) => {
      try{
      var uid = req.body.uid;
      var rows11 = await conn.query(
        "SELECT * FROM reserve WHERE uid = ?",
        [uid]
        );
        if(rows11.length>0){
          res.send({'success':true,'reserve':JSON.stringify(rows11)});
        }
        else {
          res.send({'success':false,'message':'이용 내역이 없습니다.'});
        }
      } catch(err) {  //handle query error
        console.log(err);
      }
    })


    // console.log(12345);
    
    } catch (err) { //handle connection errorzz
      console.log(err);
      throw(err);
    }
    // } 
    // finally {
    //   console.log(56789);
      // conn.release(); //release to pool
    //   //asyncFunction();
    // }
  }
asyncFunction();
app.listen (port, () => console.log(`${port}`));


 