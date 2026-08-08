const express = require('express')
const router = express.Router()

const { todolist } = require('../data/data')

// todolist 전체 조회 && done 값이 true인 요소 필터링
router.get('/', (req, res) => {
    const {done} = req.query

    if(done) {
        const trueDone = todolist.filter(d => d.done === (done === 'true'))

        console.log('done: true 인 list', trueDone)
        res.json(trueDone)
        return
    }

    console.log('todolist 전체조회', todolist)
    res.json(todolist)
})

// todolist 단일 조회
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const todoId = todolist.find(i => i.id === id)

    console.log(`id: ${id} 의 todolist`, todoId)
    res.json(todoId)
})

// 생성
router.post('/', (req, res) => {
    const id = req.query
    const {title, done, priority} = req.body

    const todoId = todolist[todolist.length-1].id+1
    const userId = todolist.find(i => i.id === id)

    const newtodo = {
        id: todoId,
        userId: userId,
        title,
        done,
        priority
    }

    todolist.push(newtodo)
    console.log(`userId: ${userId} 게시물 생성`)
    res.json(newtodo)
    
})

// *****todo 완료 처리*****
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const todo = todolist.find(i => i.id === id)

    todo.done = !todo.done

    res.json(todo)
})

// 삭제
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const deletetodo = todolist.find(d => d.id !== id)

    const remainTodo = todolist.filter(r => r.id !== id)
    console.log(remainTodo)
    res.json(remainTodo)
})

module.exports = router