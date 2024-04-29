//express 모듈셋팅
const express =require('express')
const app = express()
app.listen(1234)

//데이터 셋팅
let youtuber1 = {
    channelTitile : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitile : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitile : "테오",
    sub : "54.8만명",
    videoNum : "726개"
}

let db = new Map() //key - value = json
var id = 1

db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)

//Rest Api 설계
app.get("/youtubers" , function (req, res) {
    res.json({
        message : "test"
    })
})
app.get('/youtuber/:id',function (req,res) {
    let {id} = req.params
    id = parseInt(id)

    const youtuber = db.get(id)
    if (youtuber == undefined){
        res.json({
            message : "유튜버 정보를 찾을 수 없습니다."
        })
    } else {
        res.json(youtuber)
    }
})

app.use(express.json()) // http 외 모듈인 '미들웨어' : json 설정
app.post('/youtuber', (req, res) => {
    console.log(req.body)


//등록...? Map(db)에 저장(put) 해주셔야 해요
db.set(id++, req.body)

res.json({
    message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})
