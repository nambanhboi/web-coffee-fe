import { Button, Container,
Form
 } from "react-bootstrap";
import { FiSend,
    FiMapPin } from 'react-icons/fi'
import { BsFacebook } from 'react-icons/bs'
import { AiOutlineTwitter,
AiFillYoutube,
AiOutlineGoogle,
AiOutlinePhone,
AiOutlineMail } from 'react-icons/ai';
import { Link } from "react-router-dom";
import '../../assets/css/Footer.css';
import vid from '../../assets/video/footer.mp4';

function Footer() {
    return (
        <div className="footer">
            <video src={vid} loop autoPlay muted type="video/mp4"></video>
            <Container className="info">
                <Form className="contactwu">
                    <Form.Group className="mb-3 formemail" controlId="formGroupEmail">
                        <Form.Label className="label">Liên hệ với chúng tôi</Form.Label>
                        <Form.Control className="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Button className="button">Gửi
                        <FiSend />
                    </Button>
                </Form>
                <div className="block card">
                    <div className="introduction-footer">
                        <span className="title-footer">Giới thiệu</span>
                        <p>Discover our extensive collection of stylish and high-quality footwear for every occasion at our online shoe store. Step into fashion and comfort with us today!</p>
                        <div>
                            <BsFacebook className="icon"/>
                            <AiOutlineTwitter className="icon"/>
                            <AiFillYoutube className="icon"/>
                            <AiOutlineGoogle className="icon"/>
                        </div>
                    </div>
                    <div className="contact">
                        <span className="title-footer">Liên hệ</span>
                        <span>
                            <FiMapPin className="icon"/>
                            Nhà số 7, ngách 112, ngõ 54, Lê Quang Đạo, Nam Từ Liêm, Thành phố Hà Nội
                        </span>
                        <span>
                            <AiOutlinePhone className="icon"/>
                            0704112515
                        </span>
                        <span>
                            <AiOutlineMail className="icon"/>
                            vuhainam18102003@gmail.com
                        </span>
                    </div>
                    <div className="help">
                        <span className="title-footer">Trợ giúp</span>
                        <Link to="" className="link">Giao Hàng</Link>
                        <Link to="" className="link">Hoàn trả</Link>
                        <Link to="" className="link">Trợ giúp</Link>
                    </div>
                    <div className="aboutus">
                        <span className="title-footer">Về chúng tôi</span>
                        <Link to="" className="link">Tin tức</Link>
                        <Link to="" className="link">Thành viên</Link>
                        <Link to="" className="link">Về chúng tôi</Link>
                    </div>
                </div>
            </Container>
        </div>
        
    )
}

export default Footer;