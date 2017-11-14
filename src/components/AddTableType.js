import React from 'react';
import { Button,Input,Modal,Form } from 'antd';
import './../styles/menu.css'
const FormItem = Form.Item;
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
                        {getFieldDecorator('tableTypeName', {
                            rules: [{ required: true, message: '请输入桌类型代码' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="桌类型名称" {...formItemLayout}>
                        {getFieldDecorator('describe', {
                            rules: [{ required: true, message: '请输入桌类型名称' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="最小用餐人数" {...formItemLayout}>
                        {getFieldDecorator('eatMinNumber', {
                            rules: [{ required: true, message: '请输入最小用餐人数' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="最大用餐人数" {...formItemLayout}>
                        {getFieldDecorator('eatMaxNumber', {
                            rules: [{ required: true, message: '请输入最大用餐人数' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="每桌用餐时间" {...formItemLayout}>
                        {getFieldDecorator('eatTime', {
                            rules: [{ required: true, message: '请输入每桌用餐时间' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="提前推送桌数" {...formItemLayout}>
                        {getFieldDecorator('pushNumbers', {
                            rules: [{ required: true, message: '请输入提前推送桌数' }],
                        })(
                            <Input />
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
export default class AddTableType extends React.Component {
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
                describe: values.describe,
                tableTypeName:values.tableTypeName,
                eatMinNumber:values.eatMinNumber,
                eatMaxNumber:values.eatMaxNumber,
                eatTime:values.eatTime,
                pushNumbers:values.pushNumbers
            };
            console.log(addMenu);
            fetch('/iqesTT/restaurant/tableType', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addMenu)
            }).then(function(response) {
                return response.json();
            }).then(function () {
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
                <Button type="danger" icon="file-add" onClick={this.showModal}  className='whiteIcon'>
                    <span style={{color:"white"}}>新增桌型</span>
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