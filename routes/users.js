const express = require('express')
const router = express.Router()
const db = require('../db')
const { route } = require('./posts')

// 전체 조회 && 필터링
router.get('/', async(req, res) => {
    try{
        const {role} = req.query

        let query = 'select * from users '
        const params = []

        if(role){
            query += 'where role = ?'
            params.push(role)
        }

        const [rows] = await db.query(query, params)
        
        console.log('회원 조회 성공')
        return res.json({
            success: true,
            message: '회원 조회 성공',
            data: rows
        })

    } catch(err){
        console.log('회원 조회 실패')
        return res.json({error: '에러 발생', details: err.message});
        }
})

// 단일 조회
router.get('/:id', async(req, res) =>{
    try{
        const id = Number(req.params.id)

        const query = 'select * from users where id = ?'

        const [rows] = await db.query(query, [id])

        console.log(`id: ${id} 님의 정보 조회`, rows)
        return res.json({
            success: true,
            message: `${id}님의 정보 `,
            data: rows
        })

    } catch (err) {
        console.log(`id: ${id} 정보 조회 실패`)
        return res.json({error: '서버 에러 발생', details: err.message})
    }
})

// 회원 생성
router.post('/', async(req, res) => {
    try{
        const {name, email, password, role} = req.body

        
       const checkQuery = 'select * from users where email = ?'
       const [existingRows] = await db.query(checkQuery, [email])

       if(existingRows.length > 0) {
        console.log('회원가입 실패: 이미 존재하는 이메일')
        return res.json({
            success: false,
            message: '이미 존재하는 이메일'
        })
       }

        if(!name || !email || !password) {
            return res.json({error: 'name, email, password 는 필수입력'})
        }


        const query = 'insert into users (name, email, password, role) values (?, ?, ?, ?)'

        const params = [name, email, password, role || 'user']

        const [result] = await db.query(query, params)

        console.log('회원 생성 성공')
        return res.json({
            success: true,
            message: '회원가입 성공',
            id:result.insertId
        })

    } catch (err) {
        console.log('회원가입 실패')
        return res.json({error: '에러 발생', details: err.message })
    }
})

// 로그인
router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body
        
        const query = 'select * from users where email = ? and password = ? '
        
        const params = [email, password]

        const [rows] = await db.query(query, params)

        if(rows.length === 0){
            console.log('로그인 실패')
            return res.json({
                success: false,
                message: 'email 또는 password가 틀림'
            })
        }

        console.log('로그인 성공')
        return res.json({
            success: true,
            message: '로그인 성공'
        })
    } catch (err) {
        console.log(err)
        return res.json({error: '에러 발생', details: err.message})
    }
})

// 회원정보 수정
router.patch('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)
        const {name, email, password, role} = req.body

        let query = 'update users set '
        let params = []
        let updates = []

        if(name){
            updates.push('name = ?')
            params.push(name)
        }

        if(email){
            updates.push('email = ?')
            params.push(email)
        }

        if(password){
            updates.push('password = ?')
            params.push(password)
        }

        if(role){
            updates.push('role = ?')
            params.push(role)
        }

        query += updates.join(', ') + ' where id = ?'
        params.push(id)
        const [result] = await db.query(query, params)

        console.log('회원정보 수정 완료')
        return res.json({
            success: true,
            message:'회원정보 수정 완료'
        })
    } catch (err) {
        console.log('회원정보 수정 실패')
        return res.json({error: '에러 발생', details: err.message })
    }
})


// 회원탈퇴
router.delete('/:id', async(req, res) => {
    try{
        const id = Number(req.params.id)

        const [result] = await db.query('delete from users where id = ?', [id])

        console.log('회원탈퇴 성공')
        return res.json({
            success: true,
            message: ' 회원탈퇴 성공 ',
            data: result
        })
    } catch (err) {
        console.log('회원탈퇴 실패')
        return res.json({error: 'err', details: err.message})
    }
})



module.exports = router


