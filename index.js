const express = require('express');
const app = express();  //express를 실행해서 서버 애플리케이션 객체(app)를 생성함을 의미.
const port = 3000;
const todoRoute = require("./routes/todoRoute");

app.use(express.json());
app.use(express.urlencoded({express : false}));

app.use('/todolist', todoRoute);

app.listen(port, () => {
    console.log('실행됨')
})

