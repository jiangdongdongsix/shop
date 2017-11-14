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
            wrapperCol: { span: 12 },
        };
        return (
            <Modal
                visible={visible}
                title="新增餐桌"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout='horizontal'>
                    <FormItem label="餐桌编号" {...formItemLayout}>
                        {getFieldDecorator('index', {
                            rules: [{ required: true, message: '请输入餐桌编号' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="餐桌类型" {...formItemLayout}>
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请输入餐桌类型' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="餐桌所在区" {...formItemLayout}>
                        {getFieldDecorator('area', {
                            rules: [{ required: true, message: '请输入餐桌所在区' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="餐桌最多容纳人数" {...formItemLayout}>
                        {getFieldDecorator('pNumber', {
                            rules: [{ required: true, message: '请输入餐桌最多容纳人数' }],
                        })(
                            <Input />
                        )}
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

//门店图以及桌信息设置  新增餐桌
export default class AddTable extends React.Component {
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
            let tableNumber= {
                tableName:values.index,
                area:values.area,
                tableTypeDescribe:values.type,
                eatMaxNumber:values.pNumber
                };
            console.log(tableNumber);
            fetch('/iqesTT/restaurant/tableNumber', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tableNumber)
            }).then(function(response) {
                return response.json();
            }).then(function (jsonData) {
                console.log(jsonData);
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
                <Button type="danger" icon="file-add" onClick={this.showModal} className='whiteIcon'>
                    <span style={{color:"white"}}>新增餐桌</span>
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