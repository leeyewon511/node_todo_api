const express = require('express');
const router = express.Router();
const {todolist} = require('./todoRoute');

const users = [
  {
    id: 1,
    name: "김철수",
    email: "chulsoo@test.com",
    password: "1234",
    role: "user",
    isActive: true
  },
  {
    id: 2,
    name: "영희",
    email: "younghee@test.com",
    password: "abcd",
    role: "admin",
    isActive: true
  },
  {
    id: 3,
    name: "박민수",
    email: "minsoo@test.com",
    password: "5678",
    role: "user",
    isActive: false
  },
  {
    id: 4,
    name: "이지은",
    email: "jieun@test.com",
    password: "password1",
    role: "user",
    isActive: true
  },
  {
    id: 5,
    name: "홍길동",
    email: "gildong@test.com",
    password: "9999",
    role: "admin",
    isActive: true
  },
  {
    id: 6,
    name: "김민지",
    email: "minji@test.com",
    password: "1122",
    role: "user",
    isActive: false
  },
  {
    id: 7,
    name: "정우성",
    email: "woosung@test.com",
    password: "7777",
    role: "user",
    isActive: true
  },
  {
    id: 8,
    name: "한가인",
    email: "gain@test.com",
    password: "3344",
    role: "user",
    isActive: true
  },
  {
    id: 9,
    name: "오나라",
    email: "nara@test.com",
    password: "5566",
    role: "user",
    isActive: false
  },
  {
    id: 10,
    name: "강하늘",
    email: "haneul@test.com",
    password: "8899",
    role: "admin",
    isActive: true
  }
];

// // 전체 조회 & 필터링
// router.get('/', (req, res) => {
//   const { role } = req.query;

//   if (role) {
//     const usersFilter = users.filter(users => users.role === role)

//     console.log(usersFilter)
//     res.json(usersFilter)
//   }
//   res.json(users)
// })

// // 단일 조회
// router.get('/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const user = users.find(user => user.id === id)

//   console.log(user)
//   res.json(user)
// })

// // 회원가입
// router.post('/register', (req, res) => {
//   const { name, email, password, role } = req.body

//   const existingUser = users.find(user => user.email === email)

//   if (existingUser) {
//     return res.json({ message: "이미 존재하는 이메일입니다." })
//   }

//   const newUser = {
//     id: users.length + 1,
//     name,
//     email,
//     password,
//     role: role || "user",
//     isActive: true
//   };

//   users.push(newUser)

//   console.log(newUser)
//   res.json(users)
// })

// // 로그인
// router.post('/login', (req, res) => {
//   const { email, password } = req.body

//   const user = users.find(user => user.email === email && user.password === password)

//   if (!user) {
//     return res.status(400).json({ message: "이메일 또는 비밀번호가 일치하지 않음." })
//   }

//   const { password: _, ...userWithoutPassword } = user

//   res.json({
//     message: "로그인 성공",
//     user: userWithoutPassword
//   })
// })

// // 회원정보 수정
// router.put('/:id', (req, res) => {
//   const id = Number(req.params.id)

//   const user = users.find(user => user.id === id)

//   const { name, email, password, role, isActive } = req.body;

//   user.name = name ?? user.name;
//   user.password = password ?? user.password;
//   user.role = role ?? user.role;
//   user.isActive = isActive ?? user.isActive;

//   console.log("수정된 유저", user)
//   res.json({
//     message: "회원정보 수정 성공",
//     user: user
//   })
// })

// //회원탈퇴(삭제)
// router.delete('/:id', (req, res) => {
//   const id = Number(req.params.id)

//   const user = users.find(user => user.id === id)

//   const deleteUser = users.filter(user => user.id !== id)

//   console.log(`${id} 회원탈퇴 완료`)
//   res.json(deleteUser)
// })

//-------------------------------------------???????????????????????-------------------------------------

// 특정 회원의 todo 목록 조회 && 특정 회원의 완료된 todo만 조회
router.get('/:id/todos', (req, res) => {
  const id = Number(req.params.id)
  const {done} = req.query

  const userId = todolist.filter(todo => todo.id === id)

  if(done) {
    let userId = todolist.filter(todo => todo.done === 'true')
  }

  res.json(userId)
})

// 특정 회원의 todo 생성
router.post('/:id/todos', (req, res) => {
  const id = Number(req.params.id)
  const {title, priority} = req.body

  const userId = users.find(u => u.id === id)

  const newId = todolist[todolist.length -1].id+1

  const newTodo = {
    id: newId,
    userId: id,
    title,
    done: false,
    priority
  }

  todolist.push(newTodo)
  console.log(newTodo)
  res.json(newTodo)
})

// 신원 확인

// 회원 삭제 시 관련 todo도 삭제 (CASCADE)
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const usersId = users.find(u => u.id !== id) 

  const userTodo = todolist.filter(t => t.id === id)
  const todolistCount = userTodo.length
  const deleteTodo = todolist.filter(t => t.userId !== id)

  todolist.length = 0          // 기존 todo 목록을 전부 비움
  todolist.push(...deleteTodo)    // 안 지워진 나머지 todo들만 다시 push

  res.json({
    users: usersId,
    todolist: userTodo
  })
})

// 유저별 통계 조회
router.get('/:id/todos/stats', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find(u => u.id === id)

  const todoId = todolist.filter(t => t.userId === id)

  const todoCount = todoId.length
  const done = todoId.filter(t => t.done === true).length
  const notDone = todoId.filter(f => f.done === false).length

  console.log(`total: ${todoCount}, done: ${done}, notDone: ${notDone}`)
  res.json({
    total: todoCount,
    done: done,
    notDone: notDone
  })
})





module.exports = router;
