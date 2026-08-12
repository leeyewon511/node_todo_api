const express = require('express')
const router = express.Router()
const db =  require('../db')

// 전체 조회 && 필터링 (카테고리)
router.get('/', async(req, res) => {
    try{
        const {category} = req.query

        let query = 'select * from posts'
        const params = []

        if(category){
            query += 'where category = ? '
            params.push(category)
        }

        const [rows] = await db.params(query, params)

        console.log('게시글 조회 성공')
        return res.json({
            success: true,
            message: category ? `${category} 카테고리 게시글 조회 성공` : '전체 게시글 조회 성공',
            data: rows
        })

    } catch (err) {
        console.log('게시글 조회 실패')
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 단일 조회
router.get('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)

        const query = 'select * from posts where = ?'

        const [rows] = await db.query(query, [id])

        console.log(`id: ${id}님의 게시글 조회`)
        return res.json({
            success: true,
            message: `id: ${id}님의 게시글 조회 `,
            data: rows
        })
    } catch (err) {
        console.log(`id: ${id} 님의 게시글 조회 실패`)
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 게시글 생성
router.post('/', async(req, res) => {
    try{
        const {user_id, title, content, category} = req.body

        const query = 'insert into posts (user_id, title, content, category) values (?, ?, ?, ?)'
        const params = [user_id, title, content, category]

        const [result] = await db.query(query, params)

        console.log('게시글 생성 완료')
        return res.json({
            success: true,
            message: '게시글 생성 완료',
            data: result
        })
    } catch (err) {
        console.log(' 게시글 생성 실패')
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 게시글 수정
router.patch('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)
        const { title, content, category} = req.body

        let query = 'update posts set '
        let updates = []
        let params = []

        if(title){
            updates.push('title = ?')
            params.push(title)
        }

        if(content){
            updates.push('content = ?')
            params.push(content)
        }

        if(category){
            updates.push('category = ?')
            params.push(category)
        }

        query += updates.join(', ') + 'where id = ?'
        params.push(id)

        const [result] = await db.query(query, params)

        console.log(`id: ${id}님의 게시물 정보 수정 완료`)
        return res.json({
            success: true,
            message: `id: ${id}님의 게시물 정보 수정 완료`,
            data: result
        })
    } catch (err) {
        console.log('게시물 수정 실패')
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 게시물 삭제
router.delete('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)

        const query = 'delete from posts where id = ?'

        const [result] = await db.query(query, [id])

        console.log(`id: ${id} 님의 게시물 삭제`)
        return res.json({
            success: true,
            message: `id: ${id}님의 게시물 삭제 완료`
        })
    } catch (err) {
        console.log(`${id}님의 게시물 삭제 실패`)
        return res.json({error: '에러 발생', details: err.message})
    }
})

module.exports = router
