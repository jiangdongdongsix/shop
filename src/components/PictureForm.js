import React, { Component } from 'react';
import { Upload, Icon, Modal,Row,Col,Select ,message  } from 'antd';
const Option = Select.Option;

const successDelete = () => {
    message.success('删除成功');
};

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'http://172.21.84.73:3333/iqesTT/upload/1508835585034_生活照片.jpg',
        }],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleRemove= (file) => {
        console.log(file.uid)
        fetch("/restaurant/restaurantPhoto?id="+file.uid,{
            method: 'DELETE',
        }).then(function(response) {
            return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            // successDelete();
        }).catch(function () {
            console.log('出错了');
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    onChange = (value) => {
        console.log(value);
    }

    //初始化数据
    componentDidMount(){
         const that = this;
         let fileList = [];
        fetch("/restaurant/restaurantPhoto/photos")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            jsonData.restaurantPhotoList.map((k,index) => {
                let obj ={
                    uid: k.id,
                    name: 'xxx.png',
                    status: 'done',
                    url: 'http://172.21.84.161:3333'+k.url,
                }
                fileList.push(obj);
                that.setState({
                    fileList:fileList
                })
            })
        }).catch(function () {
            console.log('出错了');
        });
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="firstForm">
                <Row className="headerContent">
                    {/*<Col span={1}><div className="block"></div></Col>*/}
                    <Col span={2}><div className="block"></div><p>店面照片设置</p></Col>
                    <Col span={18}><hr/></Col>
                    <Col span={4}></Col>
                </Row>
                <div className="pictureConfig">
                    <Row className="show">
                        <Col span={2}><p>请选择显示位置</p></Col>
                        <Col span={6}>
                            <Select defaultValue="jack" style={{ width: 120 }} >
                                <Option value="jack">请选择显示位置</Option>
                                <Option value="lucy">直立机轮播区</Option>
                                <Option value="disabled">APP图片</Option>
                            </Select>
                        </Col>
                        <Col span={15}></Col>
                    </Row>
                    <div className="clearfix">
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        <Upload
                            action="/restaurant/restaurantPhoto?displayArea=1234"
                            listType="picture-card"
                            fileList={fileList}
                            onRemove={this.handleRemove}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                     </div>
                </div>
            </div>
        );
    }
}

export default PicturesWall;