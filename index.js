const express = require('express')
const app = express()
const port = 3000

const todolistRoute = require('./routes/todolistRoute')
const userRoute = require('./routes/userRouste')
const postRoute = require('./routes/postRoute')
const productRoute = require('./routes/productRoute')
const usertodoRoute = require('./routes/usertodoRoute')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/todolist', todolistRoute )
app.use('/users', userRoute)
app.use('/posts', postRoute)
app.use('/products', productRoute)
app.use('/users', usertodoRoute)

app.listen(port, () => {
    console.log('서버 실행 중')
})