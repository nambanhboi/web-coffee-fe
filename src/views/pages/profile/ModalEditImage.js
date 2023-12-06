import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useStore } from '../../../store';
import axios from '../../../utils/axios';
import styles from '../../../assets/css/Profile.module.css';
import { urlApi } from '../../../config/config';
import { Image } from 'antd';

function ModalEditImage({ openEditImage, setOpenEditImage, listImage }) {
    const { showToast, state } = useStore();

    const [listImageTam, setListImageTam] = useState(listImage);
    const [listFileUpload, setListFileUpload] = useState([])
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        setListImageTam(listImage)
    }, [listImage]);

    const getGridColumn = () => {
        if (window.innerWidth <= 768) {
        return 'repeat(2, 1fr)';
        }
        return 'repeat(3, 1fr)';
    };

    const handleDelete = (index) => {
        const updatedList = [...listImageTam];
        updatedList.splice(index, 1);
        setListImageTam(updatedList);
    };

    const handleDeleteFileUpload = (index) => {
        const updatedFileList = [...fileList];
        updatedFileList.splice(index, 1);
        setFileList(updatedFileList);

        const updatedFileListUpload = [...listFileUpload];
        updatedFileListUpload.splice(index, 1);
        setListFileUpload(updatedFileListUpload)
    }

    const isImageFile = (file) => {
        return file && file.type && file.type.startsWith('image/');
    };

    const handleUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter((file) => isImageFile(file));
        const urls = imageFiles.map((file) => URL.createObjectURL(file));
        setFileList([...fileList, ...urls]);
        setListFileUpload([...listFileUpload, ...imageFiles])
    };

    const imageElements = listImageTam.map((imgName, index) => (
        <div className="image" key={index} style={{ position: 'relative' }}>
            <Image src={`${urlApi}/uploads/${imgName}`} alt={`Image ${index}`} className={styles.imageEdit} />
            <IoCloseCircleSharp className={styles.iconClose} onClick={() => handleDelete(index)} />
        </div>
    ));

    const uploadButton = (
        <label className={styles.uploadButton}>
            <input type="file" onChange={handleUpload} multiple />
            Tải lên ảnh
        </label>
    );

    const gridStyle = {
        display: 'grid',
        width: '100%',
        gridTemplateColumns: getGridColumn(),
        gap: '20px', // Khoảng cách giữa các ảnh
    };

    const handleLuu = async () => {
        if (listImageTam.length > 0 || listFileUpload.length > 0) { // Sửa điều kiện kiểm tra độ dài của listFileUpload
            console.log(listImageTam);
            console.log(listFileUpload);
    
            const formData = new FormData();
    
            for (let i = 0; i < listFileUpload.length; i++) {
                formData.append(`files`, listFileUpload[i]); // Tạo key files[0], files[1], ...
            }
            // Đưa danh sách tên ảnh cũ vào formData
            listImageTam.forEach((imageName, index) => {
                formData.append(`listImageTam[${index}]`, imageName);
            });
    
            console.log(formData);
    
            try {
                const response = await axios.post('/upload/editImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                console.log('File uploaded successfully:', response.data);
                // Thực hiện các hành động sau khi upload thành công
            } catch (error) {
                console.error('Error uploading file:', error);
                // Xử lý khi có lỗi upload
            }
        }
    };
    
    return (
        <Modal
            title="Chỉnh sửa ảnh"
            centered
            open={openEditImage}
            onOk={handleLuu}
            okText="Lưu"
            onCancel={() => setOpenEditImage(false)}
            cancelText="Thoát"
            width={1000}
            okButtonProps={{ form: 'formAdd', key: 'submit', htmlType: 'submit' }}
        >
            <div className={styles.intro}>
                <h2>Danh sách ảnh</h2>
            </div>
            <div className={styles.listImage}>
                <div className="image-container" style={gridStyle}>
                    {imageElements}
                </div>
            </div>
            <div className={styles.intro}>
                <h2>Danh sách ảnh thêm mới</h2>
            </div>
            <div className={styles.listImage}>
                <div className="image-container" style={gridStyle}>
                    {fileList.map((url, index) => (
                        <div className="image" key={`file-${index}`} style={{ position: 'relative' }}>
                        <Image src={url} alt={`Image ${index}`} className={styles.imageEdit} />
                        <IoCloseCircleSharp
                            className={styles.iconClose}
                            onClick={() => handleDeleteFileUpload(index)}
                        />
                        </div>
                    ))}
                </div>
            </div>
            {uploadButton}
        </Modal>
    );
}

export default ModalEditImage;
