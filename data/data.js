const users = [
  { id: 1, name: "김철수", email: "chulsoo@test.com", password: "1234", role: "user" },
  { id: 2, name: "이영희", email: "younghee@test.com", password: "5678", role: "admin" },
  { id: 3, name: "박민수", email: "minsoo@test.com", password: "abcd", role: "user" },
  { id: 4, name: "이지은", email: "jieun@test.com", password: "9999", role: "admin" },
  { id: 5, name: "홍길동", email: "gildong@test.com", password: "password1", role: "user" }
];

const todolist = [
  { id: 1, userId: 1, title: "운동하기", done: false, priority: "high" },
  { id: 2, userId: 1, title: "책읽기", done: true, priority: "low" },
  { id: 3, userId: 2, title: "공부하기", done: false, priority: "high" },
  { id: 4, userId: 3, title: "방 청소하기", done: false, priority: "medium" },
  { id: 5, userId: 1, title: "자바스크립트 과제 하기", done: true, priority: "high" },
  { id: 6, userId: 4, title: "장보기", done: false, priority: "low" },
  { id: 7, userId: 2, title: "알고리즘 문제 풀기", done: true, priority: "high" },
  { id: 8, userId: 5, title: "친구 만나기", done: false, priority: "medium" },
  { id: 9, userId: 3, title: "유튜브 시청", done: true, priority: "low" },
  { id: 10, userId: 4, title: "일기 쓰기", done: false, priority: "medium" }
];

const products = [
  { id: 1, name: "무선마우스", price: 25000, stock: 10, category: "전자기기" },
  { id: 2, name: "기계식 키보드", price: 79000, stock: 5, category: "전자기기" },
  { id: 3, name: "스텐텀블러", price: 15000, stock: 20, category: "생활용품" },
  { id: 4, name: "소설책", price: 14200, stock: 8, category: "도서" },
  { id: 5, name: "블루투스 이어폰", price: 120000, stock: 3, category: "전자기기" },
  { id: 6, name: "노트북 스탠드", price: 22000, stock: 15, category: "생활용품" }
];

const myPost = [
  { id: 1, title: "첫 게시글", content: "내용입니다", category: "일상", views: 0, createdAt: "2026-08-01" },
  { id: 2, title: "자바스크립트 공부 기록", content: "오늘 배열 메서드를 배웠다.", category: "공부", views: 5, createdAt: "2026-08-03" },
  { id: 3, title: "맛집 추천합니다", content: "여기 파스타가 진짜 맛있어요.", category: "맛집", views: 12, createdAt: "2026-08-05" },
  { id: 4, title: "express 서버 구축하기", content: "라우터 분리하는 법 정리.", category: "공부", views: 8, createdAt: "2026-08-06" },
  { id: 5, title: "주말 일상 브이로그", content: "산책하고 카페 다녀옴.", category: "일상", views: 2, createdAt: "2026-08-07" }
];

module.exports = {
    users,
    todolist,
    products,
    myPost
}