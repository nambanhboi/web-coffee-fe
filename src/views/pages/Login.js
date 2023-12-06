import { Nav,
    Form,
    Col,
    Row, 
    Button } from 'react-bootstrap';
    import { BsFacebook } from 'react-icons/bs';
    import { FcGoogle } from 'react-icons/fc';
    import { useState, useRef } from 'react';
    import { Navigate, useNavigate } from 'react-router-dom';
    
    import '../../assets/css/Authen.css';
    import { useStore, actions } from '../../store';
    import axios from '../../utils/axios';
    function Login() {
        const [phoneNumber, setPhoneNumber] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [errors, setErrors] = useState({
            //phoneNumber: null,
            email: null,
            password: null
        });
        const timeoutRef = useRef(null);
        const { dispatch, showToast } = useStore();
        const navigate = useNavigate();
    
    
        const checkData = (func) => {
            // hủy hết các hẹn giwof trước đó
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            //thiết lập kiểm tra sau 2s
            timeoutRef.current = setTimeout(func, 1000)
        }
    
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
        };
    
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
    
        const handleSend = async () => {
            const postData = {
                email,
                password
            }
            console.log(postData)
            if(Object.values(postData).some(x => x === '')) {
                showToast("Vui lòng nhập đầy đủ thông tin", 'error')
                return;
            } 
            if(!Object.values(errors).every(x => x===null)) {
                showToast("Vui lòng nhập chính xác thông tin", 'error')
                return;
            }
            await axios.post('auth/login', postData)
            .then((res) => {
                console.log(res.data);
                //thành công
                if(res.data.success) {
                    dispatch(actions.login(res.data.user));
                    navigate('/')
                    showToast(res.data.message, "success");
                }
                //lỗi validate
                else {
                    showToast(res.data.message, 'error')
                }
            })
            .catch((err) => {
                console.log(err);
                showToast("Đăng nhập thất bại!", 'error')
            })
        }
        return (
            <div className='auth'>
                <Nav variant="tabs" defaultActiveKey="/login">
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
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control placeholder='Email' 
                                value={email}
                                onChange={changeEmail}  
                                className={errors.email != null ? 'error' : null}                        
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
                    <Button className='btnregis' onClick={handleSend}>
                        Đăng nhập
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
    export default Login;