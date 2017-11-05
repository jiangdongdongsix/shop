import React from 'react';
import { Button,Input,Modal,Form,Upload,Icon } from 'antd';
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
                title="导入门店图"
                okText="确定"
                onCancel={onCancel}
                onOk={onCreate}
            >
            <PicUpload/>
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
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
        }],
    }
    handleChange = (info) => {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });

        this.setState({ fileList });
    };

    render() {
        const props = {
            action: '/iqesTT/restaurant/seatingChart',
            onChange: this.handleChange,
            multiple: true,
        };
            return (
            <Upload {...props} fileList={this.state.fileList}>
                <Button type='danger'>
                    <Icon type="upload"/> <span style={{color:'white'}}>导入门店图</span>
                </Button>
            </Upload>
            );
};
}