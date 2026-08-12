const express = require('express')
const router = express.Router()
const db =  require('../db')
const { patch } = require('./posts')

// 전체 조회
router.get('/', async(req, res) => {
    try{
        const {done} = req.query

        let query = 'select * from todos'
        const params = []

        if(done){
            query += 'where done = ?'
            params.push(done === true ? 1 : 0)
        }

        const [data] = await db.query(query, params)

        console.log('todos 조회 성공')
        return res.json({
            success: true,
            message: 'todo 조회 성공',
            data: data
        })
    } catch (err) {
        console.log(' todo 조회 실패')
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 단일조회
router.get('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)

        const query = 'select * from todos where id = ? '

        const [rows] = await db.query(query, [id])

        console.log(`id: ${id} todo 조회 성공`)
        return res.json({
            success: true,
            message: `${id}님의 todo `,
            data: rows
        })
    } catch (err) {
        console.log(`${id} 조회 실패`)
        return res.json({error: '에러 발생', details: err.message})
    }
})

// todo 생성
router.post('/', async(req, res) => {
    try{
        const { user_id, title, done, priority} = req.body

        const query = 'insert into todos (user_id, title, done,priority) values (?, ?, ?, ?)'
        const params = [user_id, title, done, priority]

        const [rows] = await db.query(query, params)

        console.log('todo 생성 완료')
        return res.json({
            success: true,
            message: 'todo 생성 완료',
            data: rows
        })

    } catch (err) {
        console.log('todo 생성 실패')
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 완료 처리
router.patch('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)
        const {done} = req.body

        const query = 'update todos set done = ? where id = ?'
        const params = [done === true ? 1 : 0, id]

        const [result] = await db.query(query, params)

        console.log('done 수정 완료')
        return res.json({
            success: true,
            message: 'done 수정 완료'
        })
    } catch (err) {
        console.log('done 수정 실패')
        return res.json({error: '에러 발생', details: err.message})
    }

})

// todo 수정
router.patch('/:id', async(req, res) =>{
    try{
        const id = Number(req.params.id)
        const { title, done, priority } = req.body

        let query = 'update todos set'
        let updates = []
        let params = []

        if(title){
            updates.push('title = ? ')
            params.push(title)
        }

        if(done){
            updates.push('done = ? ')
            params.push(done)
        }

        if(priority){
            updates.push('priority = ? ')
            params.push(priority)
        }

        query += updates.join(', ') + 'where id = ? '
        
    }
})

//todo 삭제
router.delete('/:id', async(req, res) => {
    try{ 
        const id = Number(req.params.id)

        const [result] = await db.query('delete from todos where id = ?', [id])

        console.log(`id: &{id}님의 todo 삭제 완료`)
        return res.json({
            success: true,
            message: `id: ${id}님의 todo 삭제 완료`
        })
    } catch (err) {
        console.log(`id: ${id} todo 삭제 실패`)
        return res.json({error: '에러 발생', details: err.message})
    }
})

module.exports = router
