import React from 'react';
import { Button,Input,Modal,Form } from 'antd';
import './../styles/menu.css'
const FormItem = Form.Item;
const { TextArea } = Input;
const CreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
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
                    <FormItem label="桌类型代码" {...formItemLayout}>
                        {getFieldDecorator('areaName', {
                            rules: [{ required: true, message: '请输入桌类型代码' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="桌类型名称" {...formItemLayout}>
                        {getFieldDecorator('areaDescribe', {
                            rules: [{ required: false, message: '请输入桌类型名称' }],
                        })(
                            <TextArea  />
                        )}
                    </FormItem>

                    {/*<FormItem label="提前推送桌数" {...formItemLayout}>*/}
                    {/*{getFieldDecorator('VipPrice', {*/}
                    {/*rules: [{ required: true, message: '请输入提前推送桌数' }],*/}
                    {/*})(*/}
                    {/*<Input />*/}
                    {/*)}*/}
                    {/*</FormItem>*/}
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
export default class AddArea extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        console.log(this.props.refersh);
        const form = this.form;
        const that = this;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            let addMenu = {
                areaName: values.areaName,
                areaDescribe:values.areaDescribe,
            };
            console.log(addMenu);
            fetch('/iqesTT/restaurant/area', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addMenu)
            }).then(function(response) {
                return response.json();
            }).then(function (jsonData) {
                console.log(jsonData);
                console.log("保存成功")
                that.props.refersh();
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
                    <span style={{color:"white"}}>新增区域</span>
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