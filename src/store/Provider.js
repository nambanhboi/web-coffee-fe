import { useEffect, useReducer, useState } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initState);

    const [toast, setToast] = useState(null);

    const showToast = (message, type) => {
        setToast({message, type});
        setTimeout(() => {           
            setToast(null);
        }, 4000);
    };
    useEffect(() => {
        let timer;
        if(toast !== null) {
            timer = setTimeout(() => {
                setToast(null);
            }, 4000)
        }
        return () => {
            clearTimeout(timer);           
        }
    }, [toast]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const isAuth = await storage.getIsAuth();
    //         const auth = await storage.getAuth();
    //         console.log("1: ", isAuth);
    //         console.log("2:, ", auth );
    //         const accessToken = await storage.getAccessToken();
    //         const refreshToken = await storage.getRefreshToken();
        
    //         // Sau khi lấy được dữ liệu từ cookie và localStorage, gửi nó vào reducer
    //         dispatch(actions.init({ isAuth, auth, accessToken, refreshToken }));
    //         console.log('run...')
    //     };

    //     fetchData();
    //   }, []);

    return (
        <Context.Provider value={{state, dispatch, toast, showToast}}>
            { children }
        </Context.Provider>
    );
};

export default Provider;