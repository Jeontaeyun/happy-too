// React에서 State의 부분 | User 부분을 가지고 있는 초기값
export const initialState = {
    isLogined: false,               // 로그인 여부
    isLoggingOut: false,            // 로그아웃 시도 중
    isLoggingIn: false,             // 로그인 시도 중
    logInErrorReason: '',           // 로그인 실패 사유
    signedUp: false,                // 회원가입 성공
    isSigningUp: false,             // 회원가입 시도 중
    signUpErrorReason: '',          // 회원가입 실패 사유
    me: null                       // 내 정보
};
// React에서 setState의 부분
// Redux에서 Action 부분 = State를 바꾸는 행위
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// 로그인 후 사용자 정보를 불러오는 Action
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
// 로그아웃 Action
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
// 회원가입 Action
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

// Redux의 Reducer = Action의 결과로 State를 어떻게 바꿀지 정의하는 부분
export const reducer = (state= initialState, action) => {
    switch(action.type){
        case LOG_IN_REQUEST: {
            return {
                ...state,
                isLoggingIn: true,
                logInErrorReason: ''
                
            }
        };
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLogined: true,
                isLoggingIn: false,
                me: action.data
            }
        };
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLogined: false,
                isLoggingIn: false,
                me: null,
                logInErrorReason: action.error
                
            }
        };
        case LOG_OUT_REQUEST: {
            //setState를 구현하는 부분
            return {
                ...state,
                isLoggingOut: true
            }
        };
        case LOG_OUT_SUCCESS: {
            //setState를 구현하는 부분
            return {
                ...state,
                isLoggingOut: false,
                isLogined: false,
                me: null
            }
        };
        case LOG_OUT_FAILURE: {
            //setState를 구현하는 부분
            return {
                ...state,
                isLoggingOut: false
            }
        };
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
                signUpErrorReason : ''
            }
        };
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                signedUp: true,
                signupData: action.data
            }
        };
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                signedUp: false,
                signUpErrorReason: action.error
            }
        };
        case LOAD_USER_REQUEST: {
            return {
                ...state
            }
        };
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                me: action.data
            }
        };
        case LOAD_USER_FAILURE: {
            return {
                ...state
            }
        };
        default:{
            return{
                ...state
            }
        };
    }
};

export default reducer;