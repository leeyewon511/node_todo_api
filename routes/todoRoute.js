const express = require('express');
const router = express.Router();

const todolist = [
  { 
    id: 1, 
    userId: 1, 
    title: "운동하기", 
    done: false, 
    priority: "high" 
  },
  { 
    id: 2, 
    userId: 1, 
    title: "책읽기", 
    done: true, 
    priority: "low" 
  },
  { 
    id: 3, 
    userId: 2, 
    title: "공부하기", 
    done: false, 
    priority: "high" 
  },
  { 
    id: 4, 
    userId: 3, 
    title: "방 청소하기", 
    done: false, 
    priority: "medium" 
  },
  { 
    id: 5, 
    userId: 1, 
    title: "자바스크립트 과제 하기", 
    done: true, 
    priority: "high" 
  },
  { 
    id: 6, 
    userId: 4, 
    title: "장보기", 
    done: false, 
    priority: "low" 
  },
  { 
    id: 7, 
    userId: 2, 
    title: "알고리즘 문제 풀기", 
    done: true, 
    priority: "high" 
  },
  { 
    id: 8, 
    userId: 5, 
    title: "친구 만나기", 
    done: false, 
    priority: "medium" 
  },
  { 
    id: 9, 
    userId: 3, 
    title: "유튜브 시청", 
    done: true, 
    priority: "low" 
  },
  { 
    id: 10, 
    userId: 4, 
    title: "일기 쓰기", 
    done: false, 
    priority: "medium" 
  }
];

// // 전체조회 & 필터링
// router.get('/', (req, res) => {
//     const {done} = req.query;

//     if(done){
//         const doneTrue = (done === 'true'); 
//         const todolistFilter = todolist.filter(todo => todo.done === doneTrue);
//        return res.json(todolistFilter);
//     }
//     res.json(todolist);
// })

// // 단일 조회
// router.get('/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const todo = todolist.find(todo => todo.id === id );

//     console.log(todo);
//     res.json(todo);
// })

// // 생성
//  router.post('/', (req, res) => {
//     const newTodo = req.body;

//     todolist.push(newTodo);

//     console.log(todolist);
//     res.json(todolist);
//  })

//  // todo 완료처리
// router.put('/:id', (req, res) => {
//     const id = Number(req.params.id);

//     const todo = todolist.find(todo => todo.id === id);

//     todo.done = !todo.done;

//     console.log(todo);
//     res.send(todo);
// })

// // 삭제
// router.delete('/:id', (req, res) => {
//     const id = Number(req.params.id);

//     const todo = todolist.filter(todo => todo.id !== id);

//     res.json(todo);
// })

module.exports = router;