import { Container,
Form,
Button
} from "react-bootstrap";
import { BiFilter } from 'react-icons/bi';
import { SiCoffeescript } from 'react-icons/si';
import { FaUser } from 'react-icons/fa';
import { BsBalloonHeartFill } from 'react-icons/bs';
import { AiOutlineLeftCircle, AiOutlineRightCircle, AiFillHeart } from 'react-icons/ai';
import { GiReturnArrow } from "react-icons/gi";


import vid from '../../assets/video/footer.mp4';
import styles from '../../assets/css/Home.module.css';
import CardImage from "../../components/CardImage";
import axios from '../../utils/axios';
import imgIntro1 from '../../assets/image/intro1.jpg';
import { useEffect, useState } from "react";

function Home() {

    const [listHighlightShopCoffee, setListHighlightShopCoffee] = useState([])




    const [isSearch, setIsSearch] = useState(false);
    const [regionIdSearch, setRegionIdSearch] = useState("all");
    const [nameShopCoffeeSearch, setNameShopCoffeeSearch] = useState(null);
    const [listRegion, setListRegion] = useState([]);
    const [listShop, setListShop] = useState([]);



    // slioder
    const [currentIndexSlider, setCurrentIndexSlider] = useState(0);
    const sliderStyle = {
        transform: `translateX(-${currentIndexSlider * 20}rem)`
    }


    const handlePrev = () => {
        if(currentIndexSlider > 0) {
            setCurrentIndexSlider(currentIndexSlider - 1);
        }
    };

    const handleNext = () => {
        if(currentIndexSlider < listHighlightShopCoffee.length - 2) {
            setCurrentIndexSlider(currentIndexSlider + 1);
        }
    };
    const getData = async () => {
        await axios.get('/shopCoffee/getlistHighlightShopCoffee')
        .then(res => {
            console.log(res)
            if(res.data.success) {
                setListHighlightShopCoffee(res.data.result)
            }
        })
        .catch(err => {
            console.log(err)
        })

        await axios.get('/home/getRegion')
        .then(res => {
            console.log(res)
            if(res.data.success) {
                setListRegion(res.data.result);
                console.log(listRegion);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getData();
    }, []);


    const handleSearch = async () => {
        const postData = {
            regionIdSearch,
            nameShopCoffeeSearch
        }
        setIsSearch(true)
        console.log("regionIdSearch: ", postData);
        await axios.post('/shopCoffee/searchShopCoffee', postData)
        .then(res => {
            console.log(res)
            if(res.data.success) {
                setListShop(res.data.result)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <section>
            <div className={styles.head}>
                <video className={styles.videohead} src={vid} loop autoPlay muted type="video/mp4"></video>      
                <div className={styles.info}>
                    <span>Lịch trình của bạn</span>
                    <span>Tìm kiếm view đẹp cho hôm nay</span>
                    <Form className="search card">
                        <Form.Group className="mb-3" >
                            <Form.Label className="label">Tìm kiếm theo khu vực</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={regionIdSearch}
                                onChange={(e) => setRegionIdSearch(e.target.value) }
                            >
                                <option value="all">--Tất cả--</option>
                                {listRegion.map((item, index) => (
                                    <option value={item._id ? item._id : null}
                                        key={index}
                                    >{item.regionName}</option>
                                ))}
                            </Form.Select>
                             
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Tìm kiếm theo tên quán</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên quán"
                                defaultValue={nameShopCoffeeSearch}
                                onChange={(e) => setNameShopCoffeeSearch(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="button" onClick={handleSearch}>
                            <BiFilter />
                            Tìm kiếm
                        </Button>
                    </Form>
                </div>
            </div>
            {!isSearch ? (
                <>

                    <div className={styles.report + " containerApp8"}>
                        <div className={styles.report_title}>
                            <h2>Giới thiệu</h2>
                            <p>Trang web tìm kiếm quán coffee số 1</p>
                        </div>
                        <div className={styles.report1}>
                            <BsBalloonHeartFill className={styles.report_icon} />
                            <h3>Yêu thích</h3>
                            <p>Top 1 trang web được yêu thích nhất</p>
                        </div>
                        <div className={styles.report2}>
                            <FaUser className={styles.report_icon} />
                            <h3>Truy cập</h3>
                            <p>Hàng triệu lượt truy cập mỗi ngày</p>
                        </div>
                        <div className={styles.report3}>
                            <SiCoffeescript className={styles.report_icon} />
                            <h3>Bao phủ</h3>
                            <p>Bao phủ 80% các quán coffee ở Hà Nội</p>
                        </div>
                    </div>

                    <div className={styles.highlightCoffee + " container"}>
                        <div className={styles.highlightCoffee_title}>
                            <h2>Các quán coffee nổi bật</h2>
                            <p>Danh sách top 3 các quán nổi bật</p>
                        </div>
                        <div className={styles.highlightCoffee_listcard}
                            style={sliderStyle}
                        >
                                {listHighlightShopCoffee.map((shop, index) => (                           
                                    <CardImage key={index}
                                        imgName={shop.avatar}
                                        title={shop.username}
                                        address={shop.address}    
                                        statusLike={shop.statusLike} 
                                        statusSaved={shop.statusSaved}  
                                        shopCoffeeId={shop.shopId}
                                    />
                                ))}
                        </div>
                    
                        <AiOutlineLeftCircle onClick={handlePrev} className={styles.icon_sliderLeft} />
                        <AiOutlineRightCircle onClick={handleNext} className={styles.icon_sliderRight} />
                    </div>

                    <div className={styles.useful + " containerApp8"}>
                        <div className={styles.usefulCard}>
                            <FaUser className={styles.report_icon} />
                            <h3>Tiện ích</h3>
                            <p style={{padding: '0 2rem'}}>Trang web tìm kiếm quán cà phê của chúng tôi giúp bạn tra cứu dễ dàng các quán cà phê tại Hà Nội. Với hệ thống tìm kiếm thông minh, bạn có thể lọc kết quả theo vị trí, loại cà phê, hoặc bất kỳ tiêu chí nào bạn mong muốn. Không cần lãng phí thời gian trong việc tìm kiếm, bạn sẽ nhanh chóng tìm thấy quán cà phê ưng ý.</p>
                        </div>
                        <div className={styles.usefulCard}>
                            <FaUser className={styles.report_icon} />
                            <h3>Khám phá</h3>
                            <p style={{padding: '0 2rem'}}>Hà Nội nổi tiếng với văn hóa cà phê đa dạng, và chúng tôi tự hào giúp bạn tận hưởng hương vị cà phê độc đáo tại thủ đô. Tìm kiếm những quán cà phê phong cách và thú vị, từ những nơi ấm cúng đến những bữa tiệc cà phê thú vị, tất cả nằm trong tầm tay.</p>
                        </div>
                        <div className={styles.usefulCard}>
                            <FaUser className={styles.report_icon} />
                            <h3>Chia sẻ</h3>
                            <p style={{padding: '0 2rem'}}>Trang web của chúng tôi không chỉ giúp bạn tìm kiếm các quán cà phê nổi tiếng mà còn cho phép bạn chia sẻ khoảnh khắc tuyệt vời. Bạn có thể đăng bài viết, đánh giá quán cà phê, và tạo ra những kỷ niệm đáng nhớ với cà phê. Cùng nhau, hãy khám phá và yêu thương thế giới cà phê tại Hà Nội.</p>
                        </div>
                    </div>


                    <div className={styles.introduction}>
                        <div className={styles.introduction_title}>
                            <h2>Giới thiệu</h2>
                            <p>Trang web tìm kiếm quán coffee số 1</p>
                        </div>
                        <div className={styles.introduction_image}>
                            <img src={imgIntro1} alt="" className={styles.intro_img}/>
                        </div>
                        <div className={styles.introduction_text + " " + styles.introduction_text1}>
                            <h3>Hà Nội Cà Phê - Thế Giới Cà Phê Tại Đầu Ngón Tay</h3>
                            <p>Chào mừng bạn đến với Hà Nội Cà Phê, nơi tạo cầu nối giữa bạn và thế giới cà phê đa dạng của Hà Nội. Chúng tôi mang đến cho bạn cơ hội khám phá và trải nghiệm những quán cà phê độc đáo và phong cách, từ những nơi ấm cúng đến những bữa tiệc cà phê thú vị. Hãy tham gia cùng chúng tôi và bắt đầu cuộc hành trình thưởng thức cà phê tại thủ đô nhiều hương vị!</p>
                        </div>
                        <div className={styles.introduction_text}>
                            <h3>Khám Phá Cà Phê Hà Nội Cùng Chúng Tôi</h3>
                            <p>Chúng tôi sẵn sàng giúp bạn tìm kiếm những quán cà phê xuất sắc tại thủ đô, cho phép bạn khám phá và tận hưởng hương vị cà phê đặc biệt. Chúng tôi nơi kết nối những người yêu cà phê và những địa điểm độc đáo. Hãy tham gia cùng chúng tôi trong hành trình trải nghiệm cà phê tại Hà Nội!</p>
                        </div>
                        <div className={styles.introduction_image + " " + styles.introduction_image2}>
                            <img src={imgIntro1} alt="" className={styles.intro_img} />
                        </div>                
                    </div>
                </>
            ) : (
                <Container>
                    <div style={{position: "relative"}}>
                        <GiReturnArrow className={styles.iconReturn} 
                            onClick={() => setIsSearch(false)}
                        />
                        <h1 className={styles.titleSearch}>Kết quả tìm kiếm</h1>
                    </div>
                    <br />
                    <div className={styles.listShop}>
                        {listShop.length > 0 ? listShop.map((shop, index) => (
                            <CardImage key={index}
                                imgName={shop.avatar                                }
                                title={shop.username}
                                address={shop.address}
                                className={styles.cardImage}
                                shopCoffeeId={shop.shop_id}
                                statusLike={shop.statusLike}
                                statusSaved={shop.statusSaved} 
                            />
                        )) : (
                            <>
                                <h2 className={styles.noData}>Không có dữ liệu</h2>
                            </>
                        )}
                    </div>
                    <br/>
                </Container>
            )}



         

           
        </section>
    )
}

export default Home;