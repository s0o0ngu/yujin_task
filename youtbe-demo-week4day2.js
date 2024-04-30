//express 모듈셋팅
const express =require('express');
const app = express();
app.listen(1235);

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

youtuber_db.set(id++, youtuber1)
youtuber_db.set(id++, youtuber2)
youtuber_db.set(id++, youtuber3)

//Rest Api 설계
app.get("/youtubers" , function (req, res) {
    var youtubers = {}
    db.forEach(function (value, key){
        youtubers[key] = value
    });

    res.json(youtubers)
})

app.get('/youtubers/:id',function (req,res) {
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
app.post('/youtubers', (req, res) => {
    console.log(req.body)

    //등록...? Map(db)에 저장(put) 해주셔야 해요
    db.set(id++, req.body)

    res.json({
        message : `${db.get(id-1).channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})

app.delete('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    if (youtuber == undefined) {
        res.json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    } else {
        const channelTitle = youtuber.channelTitle
        db.delete(id)
    
        res.json({
            message : `${channeltTitle}님, 아쉽지만 우리 인연은 여기까지 인가요..`
        })
    }
})

app.delete('/youtubers', function(req, res) {

    var msg = ""
    //db에 값이 1개 이상이면, 전체 삭제
    if (db.size >= 1) {
        db.clear()
        msg = "전체 유튜버가 삭제되었습니다."
    } else { //값이 없으면
        msg =  "삭제할 유튜버가 없습니다."
    }

    res.json({
        message : msg
    })
})

app.put('/youtubers/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    var oldTitle = youtuber.channelTitle
    if (youtuber == undefined) {
        res.json({
            message : `요청하신 ${id}번은 없는 유튜버입니다.`
        })
    } else {
        var newTitle = req.body.channelTitle

        youtuber.channelTitle = newTitle
        db.set(id, youtuber)

        res.json({
            message : `${oldTitle}님, 채널명이 ${newTItle}로 수정되었습니다.`
        })
    }
})