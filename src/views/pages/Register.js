import { Nav,
Form,
Col,
Row, 
Button } from 'react-bootstrap';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../assets/css/Authen.css';
import axios from '../../utils/axios';
import { useStore } from '../../store';

function Register() {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roles, setRoles] = useState('visitor')
    const timeoutRef = useRef(null);
    const [errors, setErrors] = useState({
        //phoneNumber: null,
        email: null,
        password: null,
        confirmPassword: null,
        username: null
    });
    const navigate = useNavigate();  
    const { showToast } = useStore();

    
    const checkData = (func) => {
        // hủy hết các hẹn giwof trước đó
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        //thiết lập kiểm tra sau 2s
        timeoutRef.current = setTimeout(func, 1000)
    }

    //hiện error ở ui ở đây
    // useEffect(() => {
    //     console.log(errors)
    // }, [errors])


    const changePhoneNumber = (e) => {
        const newValue = e.target.value;
        setPhoneNumber(newValue)
        
        checkData(() => {
            setErrors((oldvalue) => ({
                ...oldvalue,
                phoneNumber: null
            }))
            if(newValue.length === 10) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    phoneNumber: null
                }))                
            }
            
            if(!/^0\d+$/.test(newValue) || newValue.length !== 10) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    phoneNumber: "Số điện thoại không hợp lệ!"
                }))
            }
            if(newValue.length === 0) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    phoneNumber: "Số điện thoại không được để trống!"
                }))
            }                      
        })
    }

    const changeEmail = (e) => {
        const newValue = e.target.value;
        setEmail(newValue)
        
        checkData(() => {
            setErrors((oldvalue) => ({
                ...oldvalue,
                email: null
            }))
            
            if(!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(newValue)) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    email: "Email không hợp lệ!"
                }))
            }
            if(newValue.length === 0) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    email: "Email không được để trống!"
                }))
            }                      
        })
    };

    const changeUsername = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
        setErrors((oldvalue) => ({
            ...oldvalue,
            username: null
        }))
        checkData(() => {
            if(newValue.length===0) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    username: "Tên tài khoản không được để trống!"
                }))
            }
        })
    }

    const changePassword = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
        checkData(() => {
            setErrors((oldvalue) => ({
                ...oldvalue,
                password: null
            }))
            if(!/\W/.test(newValue)) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    password: "Mật khẩu phải chứa ký tự đặc biệt!"
                }))
            }
            if(!/\d/.test(newValue)) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    password: "Mật khẩu phải chứa ký tự số!"
                }))
            }
            if(!/[A-Z]/.test(newValue)) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    password: "Mật khẩu phải chứa ký tự hoa!"
                }))
            }
            if(newValue.length < 8) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    password: "Mật khẩu phải tối thiểu 8 ký tự!"
                }))
            }
            if(newValue.length === 0) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    password: "Mật khẩu không được bỏ trống!"
                }))
            }
            
        })
    };

    const changeConfirmPassword = (e) => {
        const newValue = e.target.value;
        setConfirmPassword(newValue);
        checkData(() => {
            setErrors((oldvalue) => ({
                ...oldvalue,
                confirmPassword: null
            }))
            if(newValue !== password) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    confirmPassword: "Mật khẩu không trùng khớp!"
                }))
            };
            if(newValue.length === 0) {
                setErrors((oldvalue) => ({
                    ...oldvalue,
                    confirmPassword: "Mật khẩu không được bỏ trống!"
                }))                
            }
        })
    };
    
    const changeRoles = (e) => {
        console.log(e.target.value)
        if(e.target.value === 'visitor') {
            setRoles('shopCoffee')
        }
        else {
            setRoles('visitor')
        }

    }

    const handleSend = async () => {
        const postData = {
            username,
            email,
            password,
            confirmPassword,
            roles
        }; 
        console.log(postData)
        if(Object.values(postData).some(x => x === '')) {
            showToast("Vui lòng nhập đầy đủ thông tin", 'error')
            return;
        } 
        if(!Object.values(errors).every(x => x===null)) {
            showToast("Vui lòng nhập chính xác thông tin", 'error')
            return;
        }              
        
        await axios.post('auth/register', postData)
        .then((res) => {
            console.log(res.data);
            //thành công
            if(res.data.success) {
                showToast(res.data.message, "success");
                navigate('/login')
            }
            //lỗi validate
            else {
                showToast(res.data.message, 'error')
            }
        })
        .catch((err) => {
            console.log(err);
            showToast("Đăng ký thất bại!", 'error')
        })

    }

    

    return (
        <div className='auth'>
            <Nav variant="tabs" defaultActiveKey="/register">
                <Nav.Item>
                    <Nav.Link href="/register">Đăng ký</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login">Đăng nhập</Nav.Link>
                </Nav.Item>
            </Nav>
            <Form className='form'>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Tên tài khoản
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder='Tên tài khoản'
                            value={username}
                            onChange={changeUsername}
                            className={errors.username != null ? 'error' : null}
                        />
                        {errors.username != null ? 
                            (<span                
                                style={{color:'red'}}>{errors.username} </span>)
                            : ""
                        }
                    </Col>
                </Form.Group>                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder='Email' 
                            value={email}
                            onChange={changeEmail}  
                            className={errors.email != null ? 'error' : null}     
                            type='email'                   
                        />
                        {errors.email != null ? 
                            (<span                
                                style={{color:'red'}}>{errors.email} </span>)
                            : ""
                        }
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Mật Khẩu
                    </Form.Label>
                    <Col sm="10">
                        <span className='note'>Mật khẩu phải tối thiểu 8 ký tự, chứa ít nhất 1 ký tự hoa, ký tự số, ký tự đặc biệt</span>
                        <Form.Control type="password"
                            placeholder="Nhập mật khẩu" 
                            value={password}
                            onChange={changePassword}
                            className={errors.password != null ? 'error' : null}
                        />
                        {errors.password != null ? 
                            (<span                
                                style={{color:'red'}}>{errors.password} </span>)
                            : ""
                        }
                    </Col>                 
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Nhập lại mật khẩu
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" 
                            placeholder="Nhập lại mật khẩu" 
                            value={confirmPassword}
                            onChange={changeConfirmPassword}
                            className={errors.confirmPassword != null ? 'error' : null}
                        />
                        {errors.confirmPassword != null ? 
                            (<span                
                                style={{color:'red'}}>{errors.confirmPassword} </span>)
                            : ""
                        }
                    </Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Trở thành chủ cửa hàng
                    </Form.Label>
                    <Col sm='10'>
                        <Form.Check onChange={changeRoles}
                        value={roles}/>
                    </Col>
                </Form.Group>
                <Button className='btnregis'
                    onClick={handleSend}
                >
                    Đăng ký
                </Button>
                <div className='btngroup'>
                    <Button className='btn'>
                        <BsFacebook style={{color: '#0d6efd'}}/>
                        Facebook
                    </Button>
                    <Button className='btn'>
                        <FcGoogle />
                        Google
                    </Button>
                </div>
            </Form>
        </div>
    )
};
export default Register;