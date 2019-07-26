const mongoose = require('mongoose');

const {Schema} = mongoose;

/*스키마 생성 함수*/
const User = new Schema({
    userId : String,
    userPassword : String,
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

/*모델 생성 함수*/
module.exports = mongoose.model('User', User);
/*
mongoose.model('스키마 이름','스키마 객체')
데이터베이스는 스키마 이름을 정해주면 이 이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만듭니다.
*/