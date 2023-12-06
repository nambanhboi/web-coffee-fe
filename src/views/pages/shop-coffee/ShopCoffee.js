import { useStore } from "../../../store";
import axios from '../../../utils/axios';
import styles from '../../../assets/css/ShopCoffee.module.css';
import { urlApi } from "../../../config/config";
import CardImage from "../../../components/CardImage";
import CardImageCircle from "../../../components/CardImageCircle";
import CardImageHover from "../../../components/CardImageHover";

import { BsTelephone } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { BiBookmark } from 'react-icons/bi';
import { FaTableCells } from 'react-icons/fa6';
import { Button,
Tab,
Tabs } from "react-bootstrap";
import { Upload, Form, Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShopCoffee() {
    const { state, dispatch } = useStore();
    const  { id } = useParams();
    console.log(id);
    const [column1, setColumn1] = useState([]);
    const [column2, setColumn2] = useState([]);
    const [column3, setColumn3] = useState([]);
    const [styleColumn, setStyleColumn] = useState({});
    const [listImage, setListImage] = useState([
        "avatarDefault.jpg",
        "1700495512035.jpg",
        "1700979629594.png",
        "1700495512035.jpg",
        "1700979629594.png",
        "1700495512035.jpg",
    ])

    const [data, setData] = useState({
        address: null,
        avatar: null,
        email: null,
        information: null, 
        listImageName: null,
        phoneNumber: null, 
        username: null,
        isUser: false,
    });

    const getData = async () => {
        const url = id ? `/shopCoffee/getShopCoffeeById?id=${id}` : `/shopCoffee/getShopCoffeeById`
        await axios.get(url)
        .then(res => {
            console.log(res);
            if(res.data.success) {
                setData(res.data.result);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getData()
    }, [])
    console.log(data);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const numOfImages = listImage.length;

            if (width <= 768) {
                setColumn1(listImage.slice(0, Math.floor(numOfImages / 2)));
                setColumn2(listImage.slice(Math.floor(numOfImages / 2)));
                setColumn3([]); // Đảm bảo cột thứ 3 rỗng khi màn hình nhỏ hơn
                setStyleColumn({width: '48%'})
            } else {
                setColumn1(listImage.slice(0, Math.floor(numOfImages / 3)));
                setColumn2(listImage.slice(Math.floor(numOfImages / 3), Math.floor((2 * numOfImages) / 3)));
                setColumn3(listImage.slice(Math.floor((2 * numOfImages) / 3)));
                setStyleColumn({width: '32.6%'})
            }
        };

        handleResize(); // Gọi hàm khi load trang
        window.addEventListener('resize', handleResize); // Thêm sự kiện resize window

        return () => {
            window.removeEventListener('resize', handleResize); // Xóa sự kiện khi component unmount
        };
    }, [listImage]);
    //getData();

    //file
    const normFile = (e) => {
        console.log('Upload event:', e.file);
        const formData = new FormData();
        formData.append('avatar', e.file);

        axios.post('/upload/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
            console.log('File uploaded successfully:', response);
        // Do something after successful upload
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
            // Handle upload error
        });
        return e?.fileList;
    };
    const [fileList, setFileList] = useState([]);
    const propsFile = {
        onRemove: () => setFileList([]),
        beforeUpload: (file) => {
            setFileList([file]);
            console.log(fileList);
            return false;
        },
        fileList,
        maxCount: 1
    };




    return (
        <div className={styles.container_profile + " container"}>
            <div className={styles.profile}>
                <div className={styles.profile_avata}>   
                    <Image src={`${urlApi}/uploads/${data.avatar}`} 
                        alt="avatar"
                        className={styles.img_avata}
                        style={{margin: '0.4rem 0'}}
                        preview={{
                            maskClassName: styles.preAvatar
                        }}
                    />
                    {data.isUser && (
                        <Form>
                            <Form.Item
                                name={'avatar'}
                                label="Ảnh đại diện"
                                getValueFromEvent={normFile}
                            >
                                <Upload {...propsFile}>
                                    <Button >Tải lên</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                    )}
                </div>
                <div className={styles.profile_right}>
                    <div className={styles.profile_right1}>
                        <div className={styles.name}>
                            {data.username}
                        </div>
                        {data.isUser && ( 
                            <Button className={styles.btn_edit}>Sửa Thông tin</Button>
                        )}
                    </div>
                    <div className={styles.profile_info}>
                        <div>
                            <strong>11 </strong>
                            bài đăng
                        </div>
                        <div>
                            <strong>51 </strong>
                            theo dõi
                        </div>
                        <div>
                            <strong>71 </strong>
                            đang theo dõi
                        </div>
                    </div>
                    <div className={styles.profile_story}>
                        <BsTelephone className={styles.profile_site_icon}/>
                        {data.phoneNumber}
                    </div>
                    <div className={styles.profile_site}>
                        <FiMapPin className={styles.profile_site_icon} /> 
                        {data.address}
                    </div>
                </div>
            </div>

            <div className={styles.intro}>
                <h2 >Thông tin giới thiệu</h2>
                <p className={styles.intro_p}>{data.information}</p>
            </div>

            <div className={styles.listImage}>
                <div className={styles.column1} style={styleColumn}>
                    {column1 && column1.length > 0 && column1.map((imgName, index) => (
                        <>
                            <Image src={`${urlApi}/uploads/${imgName}`}
                                style={{margin: '0.4rem 0'}}
                            />
                        </>
                    ))}
                </div>
                <div className={styles.column2} style={styleColumn}>
                    {column2 && column2.length > 0 && column2.map((imgName, index) => (
                        <>
                            <Image src={`${urlApi}/uploads/${imgName}`}
                                style={{margin: '0.4rem 0'}}
                            />
                        </>
                    ))}
                </div>
                <div className={styles.column3} style={column3 && column3.length > 0 ? styleColumn : {}}>
                    {column3 && column3.length > 0 && column3.map((imgName, index) => (
                        <>
                            <Image src={`${urlApi}/uploads/${imgName}`}
                                style={{margin: '0.4rem 0'}}
                            />
                        </>
                    ))}
                </div>
            </div>
            
        </div>
    )
};
export default ShopCoffee;



// // ui 3 hàng đều
// const getGridColumn = () => {
//     if (window.innerWidth <= 768) {
//       return 'repeat(2, 1fr)';
//     }
//     return 'repeat(3, 1fr)';
//   };
//   const imageElements = listImage.map((imgName, index) => (
    //     <div className="image" key={index}>
    //       <img src={`${urlApi}/uploads/${imgName}`} alt={`Image ${index}`} />
    //     </div>
    //   ));
    
    //   const gridStyle = {
    //     display: 'grid',
    //     gridTemplateColumns: getGridColumn(),
    //     gap: '20px', // Khoảng cách giữa các ảnh
    //   };

    // <div className="image-container" style={gridStyle}>
    //             {imageElements}
    //             </div>