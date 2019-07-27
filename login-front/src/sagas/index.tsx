import {all, fork, takeLatest,takeEvery, put, call} from 'redux-saga/effects';
import {LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS} from '../reducers';
import axios from 'axios';
// Setting base URL with axios property
axios.defaults.baseURL = 'http://localhost:8080/api';        
/*
Saga Pattern
01. watch Actions
02. call API
03. if API is Success then put Success actions. But other case pust Failure actions.
*/
/*LOG_OUT*/
function* logoutAPI(){
    return axios.post('/user/logout',{},{
        withCredentials: true
        // withCredentials is option for transforming cookie
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
        console.log(e);
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
    return axios.post('/user/login', loginData, {
        withCredentials: true
    });
}
function* login(action){
    try{
        /*yield call | Synchronous Actions*/
        const result = yield call(loginAPI, action.data);
        // result.data is promise, So, we got to async/await for resolving Promise
        const data = yield result.then(async (result)=>{
            return await result.data;
        });
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
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp)
    ]);
}