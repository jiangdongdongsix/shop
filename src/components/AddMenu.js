import React from 'react';
import { Button,Input,Modal,Form,Upload,Icon,message} from 'antd';
import './../styles/menu.css'
const FormItem = Form.Item;
const CreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form} = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        this.normFile = (e) => {
            console.log('Upload event:', e);
            console.log(JSON.stringify(e));
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        return (
            <Modal
                visible={visible}
                title="新建菜单"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout='horizontal' onSubmit={this.handleSubmit} encType="multipart/form-data">
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
                    <FormItem label="菜品图片" {...formItemLayout}>
                        {getFieldDecorator('menuPic', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,

                        })(
                            <Upload name="menuPic">
                                <Button>
                                    <Icon type="upload" /> Click to upload
                                </Button>
                            </Upload>
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

//菜单基本设置页面  新增菜单组件
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

    saveFormRef = (form) => {
        this.form = form;
    };
    handleSubmit = (e) => {
        const that = this;
        const form = that.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            let addMenu = {
                menuPhoto:values.menuPic[0],
                menuName:values.name,
                menuPrice:values.Price,
                menuType:values.props,
                memberMenuPrice:values.VipPrice,
                describe:values.describe
            };
            let addMenuData = new FormData();
            addMenuData.append('menuPhoto',values.menuPic[0]);
            addMenuData.append('menuName',values.name);
            addMenuData.append('menuPrice',values.Price);
            addMenuData.append('menuType',values.props);
            addMenuData.append('memberMenuPrice',values.VipPrice);
            addMenuData.append('describe',values.describe);
            console.log(addMenuData.length);
            fetch('/iqesTT/restaurant/menu/testSave', {
                method: 'POST',
                headers: {
                    'Accept':'application/json,text/plain,*/*',
                    'Content-Type': 'multipart/form-data',
                },
                body:addMenuData
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
    };

    render() {
        return (
            <div>
                <Button type="danger" icon="file-add" onClick={this.showModal} className='whiteIcon'>
                    <span style={{color:"white"}}>新增菜单</span>
                </Button>
                <CreateForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleSubmit}
                />
            </div>
        );
    }
}