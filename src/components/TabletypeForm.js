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
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            console.log(k);
            return (

                <Row key={k}>
                <Form layout="inline">
                    <FormItem
                        {...formItemLayout}
                        label="桌子类型"
                        required={false}
                    >
                        {getFieldDecorator('tableTyble', {
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input style={{ width: '50%', marginRight: 8 }} />
                        )}
                    </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="用餐人数"
                            required={false}
                        >
                            {getFieldDecorator('eatNumber', {
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: "Please input passenger's name or delete this field.",
                                }],
                            })(
                                <Input  style={{ width: '50%', marginRight: 8 }} />
                            )}
                        </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="描述（选填）"
                        required={false}
                    >
                        {getFieldDecorator('eatNumber', {
                            rules: [{
                                required: false,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field.",
                            }],
                        })(
                            <Input  style={{ width: '50%', marginRight: 8 }} />
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
            <div>
                {formItems}
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> Add field
                </Button>
            </div>

        );
    }
}

const ChangeFormCountBySelf = Form.create()(DynamicFieldSet);

export default ChangeFormCountBySelf;