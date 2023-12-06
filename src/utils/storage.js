const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split(';')
    for(let i=0; i< cookies.length; i++) {
        const cookie = cookies[i].trim();
        if(cookie.startsWith(cookieName+'=')) {
            return cookie.substring(cookieName.length+1);
        }
    }
    return null;
} 
//token lưu trong cookie
//auth(username), islogin lưu trong localstorage
const storage = {
    getAccessToken() {
        return getCookieValue('accessToken');
    },
    setAccessToken(accessToken) {
        document.cookie = `accessToken=${accessToken};`
    },
    getRefreshToken() {
        return getCookieValue('refreshToken');
    },
    setRefreshToken(refreshToken) {
        document.cookie = `refreshToken=${refreshToken};`
    },
    getIsAuth() {
        return JSON.parse(localStorage.getItem('isAuth')) || null;
    },
    setIsAuth(isAuth) {
        localStorage.setItem('isAuth', JSON.stringify(isAuth));
    },
    getAuth() {
        return JSON.parse(localStorage.getItem('auth')) || null;
    },
    setAuth(auth) {
        localStorage.setItem('auth', JSON.stringify(auth));
    },
    removeAuth() {
        localStorage.removeItem('auth');
    },
    removeIsAuth() {
        localStorage.removeItem('isAuth');
    }
};

export default storage;


// const storage = {
//     async getAccessToken() {
//         return new Promise((resolve) => {
//             const accessToken = getCookieValue('accessToken');
//             resolve(accessToken);
//         });
//     },

//     async setAccessToken(accessToken) {
//         return new Promise((resolve) => {
//             document.cookie = `accessToken=${accessToken};`;
//             resolve();
//         });
//     },

//     async getRefreshToken() {
//         return new Promise((resolve) => {
//             const refreshToken = getCookieValue('refreshToken');
//             resolve(refreshToken);
//         });
//     },

//     async setRefreshToken(refreshToken) {
//         return new Promise((resolve) => {
//             document.cookie = `refreshToken=${refreshToken};`;
//             resolve();
//         });
//     },

//     async getIsAuth() {
//         return new Promise((resolve) => {
//             const isAuth = JSON.parse(localStorage.getItem('isAuth')) || null;
//             resolve(isAuth);
//         });
//     },

//     async setIsAuth(isAuth) {
//         return new Promise((resolve) => {
//             localStorage.setItem('isAuth', JSON.stringify(isAuth));
//             resolve();
//         });
//     },

//     async getAuth() {
//         return new Promise((resolve) => {
//             const auth = JSON.parse(localStorage.getItem('auth')) || null;
//             resolve(auth);
//         });
//     },

//     async setAuth(auth) {
//         return new Promise((resolve) => {
//             localStorage.setItem('auth', JSON.stringify(auth));
//             resolve();
//         });
//     },

//     async removeAuth() {
//         return new Promise((resolve) => {
//             localStorage.removeItem('auth');
//             resolve();
//         });
//     },

//     async removeIsAuth() {
//         return new Promise((resolve) => {
//             localStorage.removeItem('isAuth');
//             resolve();
//         });
//     },
// };

// export default storage;
