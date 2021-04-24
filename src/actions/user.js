import axios from "axios";
import { toast } from "react-toastify";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// const [nhanvien, setNhanVien] = useContext(nhanvienContext);

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        localStorage.clear();
        dispatch(receiveLogout());
    };
}

export function loginUser(payload) {
    return (dispatch) => {
        dispatch(receiveLogin());
        
        if (payload.creds.email.length > 5 && payload.creds.password.length > 5) {   
            axios.post("http://127.0.0.1:8000/api/loginuser", {
                email: payload.creds.email,
                password: payload.creds.password,
            })
            .then(
                (res) => {
                    console.log(res);
                    (res.data.message === 'success') ? localStorage.setItem('authenticated', true): dispatch(loginError('Something was wrong. Try again'))
                    payload.history.push('/app/main/dashboard')
                    console.log(res.data.message)
                    console.log(res.data.user)
                    localStorage.setItem('user-current-name', res.data.user.name)
                    localStorage.setItem('user-current-role', res.data.user.phanquyen)
                    toast.success("Login Success", {
                        position: "bottom-right",
                        autoClose: 5000,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                      });
                },
                       // tra ve ket qua duoi server
            )
            .catch(err => console.log(err))
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
}
// export function getUserNhanVien(payload)
// {
//     return (dispatch) => {
//         dispatch(receiveLogin()); 
//             axios.get("http://127.0.0.1:8000/api/getusernhanvien")
//             .then(
//                 (res) => {
//                     console.log(res.data.message)
//                     localStorage.setItem('user',res.data.user)
//                     // setNhanVien((nhanvien) => [...nhanvien, ...res.data.user])
//                 }
//                        // tra ve ket qua duoi server
//             )
//             .catch(err => console.log(err))
//         }
// }