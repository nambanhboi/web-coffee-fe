import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { ListHuyen } from '../../../config/enumConst';

import { useStore } from '../../../store';
const ModalAddUser = () => {
const { showToast } = useStore()
    const [open, setOpen] = useState(false);

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

    const onRoleChange = () => {

    }
    const rules = {
        confirmPassword: [
            {
                required: true,
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue(['user', 'password']) === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
                },
            }),
        ],
        password: [
            {
                required: true,
            },
            ({ getFieldValue }) => ({
                validator(_, value) {

                }
            })
        ]
    }
    
    const onFinish = (values) => {
        console.log(values);
        
        if(values) {
            setOpen(false)
        }

    };
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Thêm mới
            </Button>
            <Modal
                title="Thêm mới người dùng"
                centered
                open={open}
                onOk={() => {}}
                okText="Thêm mới"
                onCancel={() => setOpen(false)}
                cancelText="Thoát"
                width={1000}
                okButtonProps={{ form: 'formAdd', key: 'submit', htmlType: 'submit' }}
            >
                <Form
                    {...layout}
                    name="formAdd"
                    onFinish={onFinish}
                    style={{
                    maxWidth: 600,
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'username']}
                        label="Tên tài khoản"
                        rules={rules.username}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={rules.email}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'roles']}
                        label="Phân quyền"
                        rules={rules.roles}
                    >
                        <Select
                            placeholder="Phân quyền"
                            onChange={onRoleChange}
                            allowClear
                        >
                            <Option value="admin">Quản trị</Option>
                            <Option value="shopCoffee">Quán coffee</Option>
                            <Option value="visitor">Người dùng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['user', 'password']}
                        label="Mật khẩu"
                        rules={rules.password}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'confirmPassword'}
                        label="Nhập lại mật khẩu"
                        dependencies={['user', 'password']}
                        rules={rules.confirmPassword}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'address']}
                        label="Địa chỉ"
                        rules={rules.address}
                    >
                        <Select
                            placeholder="Chọn địa chỉ"
                            onChange={onRoleChange}
                            allowClear
                        >
                            {ListHuyen.map((item, index) => (
                                <Option key={index} value={item.value}>{item.label}</Option>
                            ))}
                            
                        </Select>
                    </Form.Item>
                    <Form.Item name={['user', 'addressDetail']} label="Địa chỉ cụ thể">
                        <Input.TextArea />
                    </Form.Item>-
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >               
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default ModalAddUser;