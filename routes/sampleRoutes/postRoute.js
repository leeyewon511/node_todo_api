const express = require('express')
const router = express.Router()
const {myPost} = require('../../data/data')

// 전체 조회 && 필터링 ********
router.get('/', (req, res) => {
    const {category} = req.query

    if(category){
        const post = post.filter(p => p.category === category)

        console.log(`카테고리 = ${category}} 를 조회 중 `)
        return res.json(post)
    }

    res.json(post)
})

// 단일 조회 && 조회수 증가 ****
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const user = post.find(p => p.id === id)

    user.views += 1

    console.log(`id: ${id} 의 게시글 조회`, user)
    res.json(user)
})

// 생성
router.post('/', (req, res) => {
    const {title, content, category} = req.body

    const id = post[post.length-1].id+1
    const today = new Date().toISOString().split('T')[0];

    const newPost = {
        id: id,
        title,
        content,
        category,
        view: 0,
        createdAt: today
    }

    post.push(newPost)

    console.log(`${id} 님의 글 생성`)
    res.json(newPost)
})

// 수정
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)

    const post = post.find(p => p.id === id)

    const { title, content, category} = req.body

    if(title) post.title = title
    if(content) post.content = content
    if (category)post.category = category


    console.log(`id: ${id} 님이 글 수정`)
    res.json(post)

})

// 삭제
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const postId = post.find(p => p.id === id)

    const deletePost = post.filter(d => d.id !== id)

    console.log(`${id}님이 게시글 삭제`, deletePost)
    res.json(deletePost)
})



module.exports = router