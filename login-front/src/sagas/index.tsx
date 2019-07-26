import {all, fork, takeLatest,takeEvery, put, call, delay} from 'redux-saga/effects';
import {LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS} from '../reducers';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/api';           // Axios에서 제공하는 공통된 URL 설정 방법
/*LOG_OUT*/
function* logoutAPI(){
    return axios.post('/user/logout',{},{
        withCredentials: true
        // 다른 도메인에 Cookie를 보내기 위한 설정.
    });
}
function* logout(){
    try{
        yield call(logoutAPI);
        yield put ({
            type: LOG_OUT_SUCCESS
        });
    }
    catch(e){
        console.log(e)
        yield put ({
            type: LOG_OUT_FAILURE
        });
    }
}
function* watchLogout(){
    yield takeEvery(LOG_OUT_REQUEST, logout);
}
/*LOG_IN*/
function* loginAPI(loginData){
    // 서버에 loginRequest를 보내는 부분
    return axios.post('/user/login', loginData, {
        withCredentials: true
        // 서버 측에서 Cookie를 받아오기 위한 Axios 설정 값.
    });
}
function* login(action){
    try{
        yield delay(2000);
        /*yield call | 동기적 함수 호출 loginAPI함수가 모두 실행된 후 다음 명령어 실행*/
        const result = yield call(loginAPI, action.data);
        const data = yield result.then(async (result)=>{
            return await result.data;
        });
        // Promise객체를 async/await을 통해서 일반 객체로 변경해주는 것 개념 다시 이해하기.
        yield put ({
            type: LOG_IN_SUCCESS,
            data
        });
    }
    catch (e){
        console.log(e);
        yield put ({
            type: LOG_IN_FAILURE,
            error: e
        });
    }
}
function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}
/*SIGN_UP*/
function* signupAPI(signUpData){
    //서버에 signupRequest를 보내는 부분
    return axios.post('/user', signUpData);
}
function* signup(action){
    try{
        yield call(signupAPI, action.data);
        yield put ({
            type: SIGN_UP_SUCCESS
        });
    }
    catch(e){
        console.error(e);
        yield put ({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }
}
//SING_UP_REQUEST를 확인한 후
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signup);
}
/*LOAD_USER*/
function* laodUserAPI(){
    return axios.get('/user', {
        withCredentials: true
    });
}
function* loaduser(){
    try{
        const result = yield call(laodUserAPI);
        const data = yield result.then( async (result)=>{
            return await result.data;
        }); 
        yield put ({
            type: LOAD_USER_SUCCESS,
            data
        });
    }
    catch(e){
        console.log(e)
        yield put ({
            type: LOAD_USER_FAILURE
        });
    }
}
function* watchLoadUser(){
    yield takeEvery(LOAD_USER_REQUEST,loaduser);
}
export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchSignUp)
    ]);
}