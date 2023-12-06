// import axios from "axios";
import storage from "../utils/storage";
import { LOGIN, LOGOUT, INIT, SET_AVATAR } from "./constants";
import { setAuthToken } from "../utils/axios";

const isAuth = storage.getIsAuth();
const auth = storage.getAuth();
const accessToken = storage.getAccessToken();
const refreshToken = storage.getRefreshToken();

const initState = {
    isAuth,
    auth,
    accessToken,
    refreshToken
};
let newAccessToken;
let newRefreshToken;
let newIsAuth;
let newAuth;

function reducer(state, action) {
    switch (action.type) {
        default: 
            throw new Error('invalid action');
        case LOGIN:
            newAccessToken = action.payload.accessToken;
            storage.setAccessToken(newAccessToken);
            newRefreshToken = action.payload.refreshToken;
            storage.setRefreshToken(newRefreshToken);
            newIsAuth = action.payload.roles;
            storage.setIsAuth(newIsAuth);
            newAuth = {
                username: action.payload.username,
                avatar: action.payload.avatar
            }
            storage.setAuth(newAuth)

            //set token header axios
            setAuthToken(newAccessToken);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                isAuth: newIsAuth,
                auth: newAuth
            };
        case LOGOUT:
            storage.setAccessToken(null);
            storage.removeAuth();
            storage.removeIsAuth();
            storage.setRefreshToken(null);
            return {
                accessToken: null,
                refreshToken: null,
                isAuth: null,
                auth: null
            }
        case INIT: 
            newAccessToken = action.payload.accessToken;
            newRefreshToken = action.payload.refreshToken;
            newIsAuth = action.payload.isAuth;
            newAuth = action.payload.auth;
            setAuthToken(newAccessToken);
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                isAuth: newIsAuth,
                auth: newAuth
            };
        case SET_AVATAR: 
            newAuth = {
                ...newAuth,
                avatar: action.payload
            }
            storage.setAuth(newAuth)
            return {
                ...state,
                auth: newAuth
            }
    }
};

// async function reducer(state, action) {
//     switch (action.type) {
//         default:
//             throw new Error('invalid action');
//         case LOGIN:
//             const newAccessToken = action.payload.accessToken;
//             await storage.setAccessToken(newAccessToken);
//             const newRefreshToken = action.payload.refreshToken;
//             await storage.setRefreshToken(newRefreshToken);
//             const newIsAuth = action.payload.roles;
//             await storage.setIsAuth(newIsAuth);
//             const newAuth = {
//                 username: action.payload.username,
//             };
//             await storage.setAuth(newAuth);
//             return {
//                 accessToken: newAccessToken,
//                 refreshToken: newRefreshToken,
//                 isAuth: newIsAuth,
//                 auth: newAuth,
//             };
//         case LOGOUT:
//             await storage.setAccessToken(null);
//             await storage.removeAuth();
//             await storage.removeIsAuth();
//             await storage.setRefreshToken(null);
//             return {
//                 accessToken: null,
//                 refreshToken: null,
//                 isAuth: null,
//                 auth: null,
//             };
//     }
// }
export { initState };
export default reducer;