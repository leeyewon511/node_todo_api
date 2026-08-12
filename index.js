const express = require('express')
const app = express()
const port = 3000

const todolistRoute = require('./routes/sampleRoutes/todolistRoute')
const userRoute = require('./routes/sampleRoutes/userRoute')
const postRoute = require('./routes/sampleRoutes/postRoute')
const productRoute = require('./routes/sampleRoutes/productsRoute') // 
const usertodoRoute = require('./routes/sampleRoutes/usertodoRoute')

const todos = require('./routes/todos')
const users = require('./routes/users')
const posts = require('./routes/posts')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/todolist', todolistRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/product', productRoute)
app.use('/visitor', usertodoRoute)

app.use('/posts', posts)
app.use('/todos', todos)
app.use('/users', users)

app.listen(port, () => {
    console.log('서버 실행 중')
})