import React, { Component } from 'react';
import { Form, Input, Icon, Button,Row, Col} from 'antd';
const FormItem = Form.Item;

let uuid = 0;

class DynamicFieldSet extends React.Component {
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };

        const data = [{"eatMaxNumber":6,"eatMinNumber":5,"eatTime":20,"id":2,"tableTypeName":"B"},{"eatMaxNumber":4,"eatMinNumber":0,"eatTime":10,"id":1,"tableTypeName":"A"},{"eatMaxNumber":15,"eatMinNumber":11,"eatTime":40,"id":4,"tableTypeName":"D"},{"eatMaxNumber":10,"eatMinNumber":7,"eatTime":30,"id":3,"tableTypeName":"C"}];

        getFieldDecorator('keys', { initialValue: data });
        const keys = getFieldValue('keys');
        const formItems = data.map((k, index) => {
            console.log(k);
            return (
                <Row key={k}>
                <Form layout="inline" id={k.id}>
                    <FormItem
                        {...formItemLayout}
                        label="桌子类型"
                        required={false}
                    >
                        {getFieldDecorator('tableTypeName', {
                            rules: [{
                                required: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input style={{ width: '100%', marginRight: 8 }} />
                        )}
                    </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="用餐人数"
                            required={false}
                        >
                            {getFieldDecorator('eatMinNumber', {
                                rules: [{
                                    required: true,
                                    message: "Please input passenger's name or delete this field.",
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="描述（选填）"
                        required={false}
                    >
                        {getFieldDecorator('describe', {
                            rules: [{
                                required: false,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input />
                        )}
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    </FormItem>
                </Form>
                </Row>
            );
        });
        return (
            <div className="secondForm">
                <Row className="headerContent">
                    {/*<Col span={1}><div className="block"></div></Col>*/}
                    <Col span={2}><div className="block"></div><p>店面桌类型设置</p></Col>
                    <Col span={18}><hr/></Col>
                    <Col span={4}><Button type="danger" className="save">保存</Button></Col>
                </Row>
                {formItems}
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加桌型
                </Button>
            </div>

        );
    }
}

const ChangeFormCountBySelf = Form.create()(DynamicFieldSet);

export default ChangeFormCountBySelf;