const express = require('express')
const router = express.Router();

const products = [
  {
    "id": 1,
    "name": "무선마우스",
    "price": 25000,
    "stock": 10,
    "category": "전자기기"
  },
  {
    "id": 2,
    "name": "기계식 키보드",
    "price": 89000,
    "stock": 5,
    "category": "전자기기"
  },
  {
    "id": 3,
    "name": "27인치 모니터",
    "price": 230000,
    "stock": 3,
    "category": "전자기기"
  },
  {
    "id": 4,
    "name": "블루투스 스피커",
    "price": 45000,
    "stock": 15,
    "category": "전자기기"
  },
  {
    "id": 5,
    "name": "USB-C 허브",
    "price": 21000,
    "stock": 20,
    "category": "전자기기"
  },
  {
    "id": 6,
    "name": "스테인리스 텀블러",
    "price": 18000,
    "stock": 30,
    "category": "생활용품"
  },
  {
    "id": 7,
    "name": "LED 스탠드",
    "price": 34000,
    "stock": 12,
    "category": "생활용품"
  },
  {
    "id": 8,
    "name": "인체공학 방석",
    "price": 29000,
    "stock": 8,
    "category": "생활용품"
  },
  {
    "id": 9,
    "name": "드리퍼 커피 서버 세트",
    "price": 38000,
    "stock": 7,
    "category": "주방용품"
  },
  {
    "id": 10,
    "name": "무선 핸디 청소기",
    "price": 59000,
    "stock": 4,
    "category": "생활용품"
  }
]


// 전체 조회 & 필터링(카테고리)
router.get('/', (req, res) => {
    const {category, minPrice, maxPrice} = req.query

    let filterProducts = [...products]

    if(category){
        filterProducts = filterProducts.filter(c => c.category === category)
    }

    if (minPrice) {
        filterProducts = filterProducts.filter(min => min.price >= Number(minPrice))
    }

    if (maxPrice) {
        filterProducts = filterProducts.filter(max => max.price <= Number(maxPrice))
    }

    res.json(filterProducts)
})

// 단일 조회
router.get('/:id', (req,res) => {
    const id = Number(req.params.id)

    const product = products.find(p => p.id === id)

    res.json(product)
})

// 생성
router.post('/', (req, res) => {
    const {name, price, stock, category} = req.body

    const newId =products[products.length -1].id+1

    const newProduct = {
        id: newId,
        name,
        price,
        stock,
        category
    }

    products.push(newProduct)
    res.json(newProduct)
})

//삭제
router.delete('/:id',(req, res) => {
    const id = Number(req.params.id)

    const deleteProduct = products.find(d => d.id === id)

    res.json(deleteProduct)
})

module.exports = router