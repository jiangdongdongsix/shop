import React, { Component } from 'react';
import { Upload, Icon, Modal,Row,Col,Select ,message,Button  } from 'antd';
const Option = Select.Option;

const successDelete = () => {
    message.success('删除成功');
};
const success = () => {
    message.success('保存成功');
};
const error = () => {
    message.error('保存失败');
};
class PicturesWall extends React.Component {
    state = {
        displayArea:"1",
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleRemove= (file) => {
        console.log(file.uid)
        fetch("/iqesTT/restaurant/restaurantPhoto?id="+file.uid,{
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


    //初始化数据
    componentDidMount(){
         const that = this;
         let fileList = [];
        fetch("/iqesTT/restaurant/restaurantPhoto/displayArea?displayArea="+that.state.displayArea)
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            jsonData.restaurantPhotos.map((k,index) => {
                console.log(k);
                let obj ={
                    uid: k.id,
                    name: k.id+'.png',
                    status: 'done',
                    url: k.url,
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


    handleChangeArea = (value) => {
        console.log(value);
        const that = this;
        let fileList = [];
        console.log(`selected ${value}`);
        this.setState({
            displayArea:value,
        });
        console.log(that.state.displayArea);
        fetch("/iqesTT/restaurant/restaurantPhoto/displayArea?displayArea="+value)
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            jsonData.restaurantPhotos.map((k,index) => {
                console.log(k);
                let obj ={
                    uid: k.id,
                    name: k.id+'.png',
                    status: 'done',
                    url:k.url
                }
                fileList.push(obj);
                that.setState({
                    fileList:fileList
                })
            })
     })
    }

    handleSubmitBroadcast(){
        success();
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
                    <Col span={3}><div className="block"></div><p>店面照片设置</p></Col>
                    <Col span={17}><hr/></Col>
                    <Col span={4}><Button type="danger" className="save" onClick={this.handleSubmitBroadcast.bind(this)}>保存</Button></Col>
                </Row>
                <div className="pictureConfig">
                    <Row className="show">
                        <Col span={2}><p>请选择显示位置</p></Col>
                        <Col span={6}>
                            <Select  style={{ width: 120 }} onChange={this.handleChangeArea} value ={this.state.displayArea}>
                                <Option value="1">直立机轮播区</Option>
                                <Option value="2">APP图片</Option>
                            </Select>
                        </Col>
                        <Col span={15}></Col>
                    </Row>
                    <div className="clearfix">
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                        <Upload
                            action={"/iqesTT/restaurant/restaurantPhoto?displayArea="+ this.state.displayArea}
                            listType="picture-card"
                            fileList={fileList}
                            onRemove={this.handleRemove}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            { fileList.length >= 5 || this.state.displayArea == 0 ? null : uploadButton}
                        </Upload>
                     </div>
                </div>
            </div>
        );
    }
}

export default PicturesWall;