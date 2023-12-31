import axios from '../../../utils/axios';
import styles from '../../../assets/css/Profile.module.css';
import { urlApi } from "../../../config/config";
import CardImage from "../../../components/CardImage";
import CardImageCircle from "../../../components/CardImageCircle";
import CardImageHover from "../../../components/CardImageHover";
import { useStore, actions } from '../../../store';
import ModalEditInfo from './ModalEditInfo';

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
import ModalEditImage from './ModalEditImage';

function Profile() {
    const { state, dispatch, showToast } = useStore();

    const  { id } = useParams();
    console.log(id);
    const [column1, setColumn1] = useState([]);
    const [column2, setColumn2] = useState([]);
    const [column3, setColumn3] = useState([]);
    const [styleColumn, setStyleColumn] = useState({});
    const [listImage, setListImage] = useState([])

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
    const [openEdit, setOpenEdit] = useState(false);
    const [openEditImage, setOpenEditImage] = useState(false);

    const getData = async () => {
        const url = id ? `/shopCoffee/getShopCoffeeById?id=${id}` : `/shopCoffee/getShopCoffeeById`
        await axios.get(url)
        .then(res => {
            console.log(res);
            if(res.data.success) {
                setData(res.data.result);
                setListImage(res.data.result.listImageName)
            }
        })
        .catch(err => {
            console.log(err);
        })

        await axios.get('/user/profile')
        .then(res => {
            if(res.data.success) {
                setListShopSaved(res.data.result.listSaved);
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


    const [listShopSaved, setListShopSaved] = useState([])

    const listHighlightStory = [
        {
            title: "story",
            representImage: 'avatarDefault.jpg',
            images: []
        },
        {
            title: "story",
            representImage: 'avatarDefault.jpg',
            images: []
        }
    ]; 
    const listPosted = [
        {
            imgName: 'avatarDefault.jpg',
            quantityLike: 60,
            quantityComment: 10
        },
        {
            imgName: 'avatarDefault.jpg',
            quantityLike: 50,
            quantityComment: 9
        },
        {
            imgName: 'avatarDefault.jpg',
            quantityLike: 60,
            quantityComment: 10
        },
        {
            imgName: 'avatarDefault.jpg',
            quantityLike: 50,
            quantityComment: 9
        }
    ]


    //file
    const normFile = async (e) => {
        console.log('Upload event:', e.file);
        const formData = new FormData();
        formData.append('avatar', e.file);

        await axios.post('/upload/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then((response) => {
            console.log('File uploaded successfully:', response);
            if(response.data.success) {
                showToast("Thay đổi ảnh đại diện thành công!", "success")
                dispatch(actions.setavatar(response.data.result))
            }
        })
        .catch((error) => {
            console.error('Error uploading file:', error);
            showToast("Ảnh không đúng định dạng!", "error")
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
                    <Image src={`${urlApi}/uploads/${state.auth.avatar ?? data.avatar}`} 
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
                            <Button className={styles.btn_edit}
                                onClick={() => setOpenEdit(true)}
                            >Sửa Thông tin</Button>
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
            {/* <div className={styles.highlight_story}>
                {listHighlightStory.map((item, index) => (
                     <CardImageCircle key={index}
                        imgName={item.representImage}
                        title={item.title}
                        type={'highLightStory'}
                     />                   
                ))}
            </div> */}
            {state.isAuth == "shopCoffee" && (
                <div className={styles.intro}>
                    <h2 >Thông tin giới thiệu</h2>
                    <p className={styles.intro_p}>{data.information}</p>
                </div>
            )}
            <hr />
            <div className={styles.profile_history}>
                <Tabs
                    defaultActiveKey="posted"
                    id="fill-tab-example"
                    className="mb-3"
                    variant="underline"
                    justify                   
                >
                    <Tab eventKey="posted" title={
                        <>
                            <FaTableCells />
                            Đã đăng
                        </>
                    }>
                        <Button className={styles.btn_edit}
                                onClick={() => setOpenEditImage(true)}
                            >Sửa ảnh</Button>
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
                    </Tab>
                    <Tab eventKey="saved" title={
                        <>
                            <BiBookmark />
                            Đã lưu
                        </>
                    }>
                        <div className={styles.listPostSaved}>
                            {listShopSaved && listShopSaved.map((shop, index) => (
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
                    </Tab>
                </Tabs>
            </div>
            <ModalEditInfo openEdit={openEdit} setOpenEdit={setOpenEdit} />
            <ModalEditImage openEditImage={openEditImage} setOpenEditImage={setOpenEditImage} listImage={listImage} />
        </div>
    )
};
export default Profile;