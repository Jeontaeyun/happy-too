// React에서 State의 부분 | User 부분을 가지고 있는 초기값
export const initialState = {
    isLogined: false,               // is Logined?
    isLoggingIn: false,             // is Logingin process?
    isLoggingOut: false,            // is Logingout process?
    logInErrorReason: '',           // the reason why Error in login process
    signedUp: false,                // whether signup is okay or not?
    isSigningUp: false,             // is Signing process?
    signUpErrorReason: '',          // the reason why Error in signup process
    me: {
        userId: "",
        userPassword: ""
    }                       // My info
};

// Redux Action
// Login Action Pattern
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// Logoutt Action Pattern
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// Signup Action Pattern
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//Redux reducer 
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
        default:{
            return{
                ...state
            }
        };
    }
};

export default reducer;