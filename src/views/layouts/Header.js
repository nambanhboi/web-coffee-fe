import { 
Nav,
NavDropdown,
Navbar,
Container,
 } from 'react-bootstrap';
 import '../../assets/css/Header.css';
import { useStore, actions } from '../../store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../utils/axios';
import logo from '../../assets/image/logo.jfif';
import  { urlApi } from '../../config/config';
function Header() {
    const { state, dispatch } = useStore();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(null);
    const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Theo dõi trạng thái và cập nhật isAuth và auth khi nó thay đổi
    if (state) {
        setIsAuth(state.isAuth);
        setAuth(state.auth);
        setAuthToken(state.accessToken)
    }
  }, [state]);

    const handleLogout = () => {
        dispatch(actions.logout());
        navigate('login');
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary ">
            <Container>
                <Navbar.Brand href="/" style={{ textAlign: 'center'}}>
                    <img src={logo} alt="" style={{ width: '3rem'}}/>
                    <div style={{fontFamily: "monospace"}}>Sợt Coffee</div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {isAuth==='admin' && (
                            <>
                                <NavDropdown title="Quản lý thông tin" id="basic-nav-dropdown">
                                    <NavDropdown.Item href='/manage_user'>Quản lý người dùng</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                        {/* nếu chưa đăng nhập  */} 
                        {isAuth !== null ? (
                            <>
                                <NavDropdown title={
                                        <img src={`${urlApi}/uploads/${auth.avatar}`} className='avata' alt=''/>
                                    } id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item>{auth?.username}</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile">Trang cá nhân</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Đăng xuất
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link href='/register'>Đăng ký</Nav.Link>
                                /
                                <Nav.Link href='/login'>Đăng nhập</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;