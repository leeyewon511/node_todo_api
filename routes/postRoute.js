const { post } = require("./todoRoute");

const express = require('express');
const router = express.Router();

const posts = [
  {
    id: 1,
    title: "첫 게시글",
    content: "내용입니다",
    category: "일상",
    views: 0,
    createdAt: "2026-08-01"
  },
  {
    id: 2,
    title: "Node.js 공부 시작",
    content: "Express로 서버를 구축해보는 중입니다.",
    category: "개발",
    views: 5,
    createdAt: "2026-08-02"
  },
  {
    id: 3,
    title: "오늘 점 뭐 먹지?",
    content: "메뉴 추천 받습니다. 김치찌개 vs 돈카츠",
    category: "일상",
    views: 12,
    createdAt: "2026-08-03"
  },
  {
    id: 4,
    title: "REST API란 무엇인가",
    content: "RESTful한 API 디자인에 대한 고찰.",
    category: "개발",
    views: 24,
    createdAt: "2026-08-04"
  },
  {
    id: 5,
    title: "Git 브랜치 전략 정리",
    content: "main과 feature 브랜치를 활용한 협업 방법",
    category: "개발",
    views: 8,
    createdAt: "2026-08-04"
  },
  {
    id: 6,
    title: "주말 날씨가 너무 좋네요",
    content: "산책 다녀오기 딱 좋은 날씨입니다.",
    category: "일상",
    views: 3,
    createdAt: "2026-08-05"
  },
  {
    id: 7,
    title: "자바스크립트 비동기 처리",
    content: "Promise와 async/await의 차이점 정리",
    category: "개발",
    views: 42,
    createdAt: "2026-08-05"
  },
  {
    id: 8,
    title: "운동 1일차 후기",
    content: "헬스장 등록했습니다. 삼일 이상 가기 목표!",
    category: "운동",
    views: 15,
    createdAt: "2026-08-06"
  },
  {
    id: 9,
    title: "Express 에러 핸들링 팁",
    content: "try-catch와 미들웨어를 이용한 에러 처리",
    category: "개발",
    views: 19,
    createdAt: "2026-08-06"
  },
  {
    id: 10,
    title: "여름 멘토링 프로젝트 회고",
    content: "Todo 앱과 회원 관리 API 구현 완료!",
    category: "개발",
    views: 30,
    createdAt: "2026-08-07"
  }
];

// 전체 조회 $ 필터링(category)
router.get('/', (req, res) => {
    const {category} = req.query

    if (category) {
      const filterPosts = posts.filter(p => p.category === category)
      console.log(`${category} 카테고리 페이지 조회`)

      return res.json(filterPosts)
    }

    res.json(posts)
})

// 단일 조회 & 조회수 증가
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  const post = posts.find(p => p.id === id)

  post.views += 1;

  console.log(`id:${id} 페이지 조회`)
  res.json(post)
})

// 게시글 생성
router.post('/', (req, res) => {
  const {title, content, category} = req.body

  const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1      // 저장된 게시글이 있으면 마지막 글 번호에 1을 더하고, 없으면 1을 쓰삼.
  const currentDate = new Date().toISOString().split('T')[0];

  const newPost = {
    id: newId,
    title,
    content,
    category,
    view: 0,
    createdAt: currentDate
  }

  posts.push(newPost)

  console.log(` 새로운 게시물 생성`, newPost)
  res.json(newPost)
  
})

// 게시글 수정
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const{title, content, category} = req.body

  const post = posts.find(p => p.id === id)

  if(title) post.title = title
  if(content) post.content = content
  if(category) post.category = category

  const currentDate = new Date().toISOString().split('T')[0];    // 현재 날짜와 시간을 가져와서 년-월-일 형태의 문자열로 바꾼 뒤 변수에 담으삼
  post.createdAt = currentDate;    // 찾아낸 게시글의 작성일(createdAt)을 방금 구한 오늘 날짜로 덮어씌우삼.

  res.json(post)
})

// 게시글 삭제
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  const userId = posts.filter(u => u.id === id)

  res.json(posts)
})

module.exports = router;