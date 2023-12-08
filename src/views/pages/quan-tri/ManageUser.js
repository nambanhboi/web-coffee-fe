import axios from "../../../utils/axios";
import CTable from "../../../components/CTable";
import { useState, memo, useEffect, useRef } from "react";
import styles from "../../../assets/css/ManageUser.module.css";

import { AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import ModalAddUser from "./ModalAddUser";
import ModalSeenUser from "./ModalSeenUser";
import { Popconfirm, Button, Tag } from "antd";
import { useStore } from "../../../store";



function ManageUser() {   
    const { showToast } = useStore();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const columns = [
        {
          title: 'Tên tài khoản',
          dataIndex: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Quyền',
          dataIndex: 'roles',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (tag) => (
                <>                
                    <Tag color={tag === 'active' ? 'green' : (tag === 'disable' ? 'volcano' : 'geekblue')} key={tag}>
                        {tag.toUpperCase()}
                    </Tag>
                </>
              ),
        },
        {
          title: 'Thao tác',
          dataIndex: 'user_id',
          key: 'x',
          render:(id) => (
            <>
                <AiOutlineEye 
                    className={styles.iconAction} 
                    onClick={() => handleSeen(id)}
                />
                <FiEdit 
                    className={styles.iconAction} 
                    onClick={() => handleEdit(id)}
                />
                <Popconfirm
                    title="Xóa người dùng"
                    description="Bạn có chắc chắn muốn xóa không?"
                    okText="Có"
                    cancelText="Không"
                    onConfirm={() => handleDelete([id])}
                >
                    <span>
                        <RiDeleteBin6Line 
                            className={styles.iconAction}                     
                        />          
                    </span>
                </Popconfirm>
            </>
          ),
        },
    ];
    const [data, setData] = useState([]);


    const [openSeen, setOpenSeen] = useState(false);
    const [userId, setUserId] = useState('');

    const getData = async () => {
        console.log("get data");
        await axios.get('/user/getAllUser')
        .then(res => {
            var listUser = res.data.result.map(x => ({...x, key: x.user_id}))
            setData(listUser)
        })
        .catch(err => {
            console.log(err);
        })
    }
    //getData();
    useEffect(() => {
        getData()
    }, [])

    const handleSeen = (id) => {
        console.log("DSD",id);
        setOpenSeen(true);
        setUserId(id);
    }
    const handleEdit = (id) => {

    }
    const handleDelete = async (arrId) => {
        console.log("arid: ", arrId);
        if(arrId.length <=0 ) {
            showToast("Vui lòng chọn người dùng để xóa!", 'error');
            return;
        }
        await axios.post('/user/deleteUserByArrId', arrId)
        .then(res => {
            console.log(res);
            if(res.data.success) {
                showToast("Xóa thành công!", 'success');
                getData();
            }
            else {
                showToast(res.data.message, 'error');

            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="container">
            <h1 style={{textAlign: 'center', margin: '2rem'}}>Quản lý người dùng</h1>
            <ModalAddUser getData={getData}/>
            <Popconfirm
                    title="Xóa người dùng"
                    description="Bạn có chắc chắn muốn xóa không?"
                    okText="Có"
                    cancelText="Không"
                    onConfirm={() => handleDelete(selectedRowKeys)}
                >
                    <Button type="primary" 
                        danger
                        style={{margin: '1rem'}}
                    >
                        Xóa người dùng
                    </Button>
                </Popconfirm>
            <ModalSeenUser userId={userId}
                openSeen={openSeen}
                setOpenSeen={setOpenSeen}
            />
            <CTable selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                columns={columns}
                data={data}
                setData={setData}
            />
        </div>

    )
}

export default memo(ManageUser);