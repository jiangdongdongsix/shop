import React from 'react';
import { Button,Input,Modal,Form } from 'antd';
import './../styles/menu.css'
const FormItem = Form.Item;
const CreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        return (
            <Modal
                visible={visible}
                title="新建菜单"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout='horizontal'>
                    <FormItem label="菜品名称" {...formItemLayout}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入菜品名称' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="菜品属性" {...formItemLayout}>
                        {getFieldDecorator('props', {
                            rules: [{ required: true, message: '请输入菜品属性' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="价格" {...formItemLayout}>
                        {getFieldDecorator('Price', {
                            rules: [{ required: true, message: '请输入价格' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="会员价格" {...formItemLayout}>
                        {getFieldDecorator('VipPrice', {
                            rules: [{ required: true, message: '请输入会员价格' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="菜品描述" {...formItemLayout}>
                        {getFieldDecorator('describe')(<Input type="textarea" row={4}/>)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

const success = () => {
    console.log('保存成功');
};
const error = () => {
    console.log('保存失败');
};
export default class AddMenu extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const that = this;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            let addMenu = {
                menuName:values.name,
                menuPrice:values.Price,
                menuType:values.props,
                memberMenuPrice:values.VipPrice,
                describe:values.describe
            };
            fetch('/iqesTT/restaurant/menu', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addMenu)
            }).then(function(response) {
                console.log(addMenu);
                console.log(response);
                return response.json();
            }).then(function () {
                console.log("保存成功");
                that.props.refersh();
                success();
            }).catch(function () {
                error();
                console.log('出错了');
            });
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        return (
            <div>
                <Button type="danger" icon="file-add" onClick={this.showModal}>
                    <span style={{color:"white"}}>新增菜单</span>
                </Button>
                <CreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}