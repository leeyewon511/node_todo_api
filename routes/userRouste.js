const express = require('express')
const router = express.Router()

const {users} = require('../data/data')

// users 전체 조회 && role 값이 admin인 요소 조회
router.get('/users', (req, res) => {
    const {role} = req.query
    
    if(role){
        const admin = users.filter(u => u.role === 'admin')
        
        console.log(admin)
        return res.json(admin)
    }

    res.json(users)
    
})

// 단일 조회
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const userId = users.find(i => i.id === id)
    
    console.log(`id: ${id} 정보`, userId)
    res.json(userId)
})

// 회원가입
router.post('/', (req, res) => {
    const { name, email, password, role, }= req.body

    const existingUser = users.find(u => u.email === email)

    if(existingUser){
        return res.json({message: '이미 존재하는 이메일'})
    }

    const userId = users[users.length-1].id+1
    

    const newUser = {
        id: userId,
        name,
        email,
        password,
        role
    }

    users.push(newUser)

    console.log('회원가입', newUser)
    res.json(newUser)

})

// 로그인
router.post('/login', (req, res) => {
    const {email , password} = req.body
    
    const userId = users.find(u => u.email === email && u.password ===password)

    if(!userId) {
        console.log('현재 회원이 아닙니다')
        return res.json({ message: '현재 회원이 아닙니다.'})
    }

    const {password:_, ...userWithoutPassword} = userId

    res.json(userId)
})

// ********* 회원정보 수정 ********
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    const user = users.find( u => u.id === id)

    const {name, email, password, role} = req.body

    if(name) user.name = name
    if(email) user.email = email
    if(password) user.password = password
    if(role) user.role= role

    const {password:_, ...userWithoutPassword} = user

    console.log(`${id} 님이 회원정보 수정함`, user)
    res.json(user)
})

//회원탈퇴
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const user = users.find(u => u.id === id)
    const deleteUser = users.find(d => d.id !== id)

    console.log(`id: ${id}=> 회원탈퇴완료`)
    res.json(deleteUser)
})

module.exports = router