import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

import { useStore } from '../../../store';
import axios from '../../../utils/axios';
import { useForm } from 'antd/es/form/Form';
function ModalEditInfo({ openEdit, setOpenEdit }) {
    const { showToast, state } = useStore();
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [formState, setFormState] = useState({});
    const [listRegion, setListRegion] = useState([]);

    const layout = {
        labelCol: {
        span: 8,
        },
        wrapperCol: {
        span: 16,
        },
    };

    const validateMessages = {
        required: '${label} là bắt buộc!',
    };
    const { Option } = Select;

    const rules = {
        username: [{ required: true }],
        phoneNumber:[
            {
                required: true
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if(!/^0\d+$/.test(value) || value.length != 10) {
                        return Promise.reject(new Error("Số điện thoại không hợp lệ!"))
                    }                                      
                    return Promise.resolve();
                }
            })
        ],
        region_id: [{ required: true }],
        addressDetail: [{ required: true }],
        information: [{ required: true }],
    };

    const getData = async () => {
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

        await axios.get('/user/getUserDetail')
        .then(res => {
            console.log(res)    
            setFormState(res.data.result)       
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (form && Object.keys(formState).length > 0) {
            form.setFieldsValue(formState);
        }
    }, [form, formState]);


    const onChangeRegionId = () => {}
    
    const onFinish = (values) => {
        console.log(values);    
        if(values) {
            axios.post(`user/editInfoUser`, values)
            .then(res => {
                console.log(res);
                if(res.data.success) {
                    showToast("Thêm mới thành công!", 'success');
                    form.resetFields()                
                    setOpenEdit(false);
                }
                else {
                    showToast(res.data.message, 'error')
                }
            })
            .catch((err) => {
                console.log(err);
                showToast("Thêm mới thất bại!", 'error')
            })           
        }

    };

    return (
        <Modal
            title="Chỉnh sửa thông tin"
            centered
            open={openEdit}
            onOk={() => {}}
            okText="Lưu"
            onCancel={() => setOpenEdit(false)}               
            cancelText="Thoát"
            width={1000}
            okButtonProps={{ form: 'formAdd', key: 'submit', htmlType: 'submit' }}
        >
            <Form
                form={form}
                {...layout}
                name="formAdd"
                onFinish={onFinish}
                style={{
                    maxWidth: 800,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name='username'
                    label="Tên tài khoản"
                    rules={rules.username}
                >
                    <Input placeholder="Nhập tên tài khoản"/>
                </Form.Item>
                <Form.Item
                    name='phoneNumber'
                    label="Tên tài khoản"
                    rules={rules.phoneNumber}
                >
                    <Input placeholder="Nhập số điện thoại"/>
                </Form.Item>
                <Form.Item
                    name='addressDetail'
                    label="Địa chỉ chi tiết"
                    rules={rules.addressDetail}
                >
                    <Input.TextArea placeholder="Nhập địa chỉ chi tiết"/>
                </Form.Item>
                <Form.Item
                    name='region_id'
                    label="Địa chỉ"
                    rules={rules.region_id}
                >
                    <Select
                        placeholder="Chọn địa chỉ"
                        onChange={onChangeRegionId}
                        allowClear
                    >
                        {listRegion.map((item, index) => (
                            <Option value={item._id}
                                key={index}
                            >{item.regionName}</Option>
                        ))}                   
                    </Select>
                </Form.Item>
                {state.isAuth == "shopCoffee" && (<Form.Item
                    name='information'
                    label="Thông tin chi tiết"
                    rules={rules.information}
                >
                    <Input.TextArea placeholder="Nhập thông tin chi tiết"/>
                </Form.Item>)}
            </Form>
        </Modal>

    );
};
export default ModalEditInfo;