const express = require('express')
const router = express.Router()
const {products} = require('../../data/data')

// 전체 조회 && 필터링
router.get('/', (req, res) => {
    const {category, minPrice, maxPrice} = req.query

    let filterProducts = [...products]

    if (category) {
        filterProducts = filterProducts.filter(c => c.category === category);
        console.log("카테고리 필터 후:", filterProducts);
    }

    if (minPrice) {
        filterProducts = filterProducts.filter(p => p.price >= Number(minPrice));
        console.log("최소가격 필터 후:", filterProducts);
    }

    if (maxPrice) {
        filterProducts = filterProducts.filter(p => p.price <= Number(maxPrice));
        console.log("최대가격 필터 후:", filterProducts);
    }

    res.json(filterProducts)
    
})

// 단일 조회
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    const product = products.find(p => p.id === id)

    console.log(`id: ${id} 의 상품 목록 조회`)
    res.json(product)
})

// 생성 
router.post('/', (req, res) => {
    const {name, price, stock, category} = req.body

    const id = products[products.length-1].id+1

    const newProduct = {
        id: id,
        name,
        price,
        stock,
        category
    }

    products.push(newProduct)
    console.log(`id: ${id} 새로운 상품 생성`)
    res.json(newProduct)
})

// 수정
router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const product = products.find(p => p.id === id )

    const { name, price, stock, category } = req.body

    if(name) product.name = name
    if(price) product.price = price
    if(stock) product.stock = stock
    if(category) product.category = category

    console.log(`id: ${id} 상품 수정`)
    res.json(product)
})

// 삭제
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    
    const product = products.find(d => d.id === id)
    const deleteProduct = products.filter(p => p.id !== id)

    res.json(deleteProduct)
})

module.exports = router