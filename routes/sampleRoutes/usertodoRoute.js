const express = require('express')
const router = express.Router()
const { users, todolist } = require('../../data/data')

// 특정 회원의 todo 목록 조회
router.get('/:id/todos', (req, res) => {
    const id = Number(req.params.id)
    const {done} = req.query

    const userId = users.find(u => u.id === id)
    const userTodo = todolist.filter(t => t.userId === id)


    if(userTodo){
        const trueDone = userTodo.filter(t => t.done === true)
        const doneCount = trueDone.length

        console.log(`id: ${id}의 done: true ${doneCount}개`, trueDone)
        return res.json(trueDone)
    }


    console.log(`id: ${id}님의 todolist 목록 조회`, userTodo)
    res.json(userTodo)
})

// 특정 회원의 todo 생성
router.post('/:id/todos', (req, res) => {
    const id = Number(req.params.id)
    const userId = users.find(u => u.id === id)

    const { title, done, priority } = req.body
    const todoId = todolist[todolist.length-1].id+1

    const newTodo = {
        id: todoId,
        userId: id,
        title,
        done,
        priority
    }

    todolist.push(newTodo)
    
    res.json(newTodo)
}) 

// 회원 삭제 시 관련 todo도 같이 삭제(CASCADE)***************
router.delete('/:id/delete', (req, res) => {
    const id = Number(req.params.id)

    const remainUser = users.filter(u => u.id !== id)  
    
    const userTodo = todolist.filter(t => t.userId === id)

    const remainTodo = todolist.filter(f => f.userId !== id)
    const todoCount = remainTodo.length

    res.json({
        users: remainUser,
        deletedTodoCount: todoCount
    })
})

//유저별 통게 조회
router.get('/:id/todos/stats', (req, res) =>{
    const id =Number(req.params.id)

    const userId = users.find(u => u.id === id)

    const userTodo = todolist.filter(t => t.userId === userId)
    const done = todolist.filter(d => d.done === true )
    const notDone = todolist.filter(n => n.done === false)

    res.json({
        total: userTodo.length,
        Done: done.length,
        notDone: notDone.length
    })
})

module.exports = router