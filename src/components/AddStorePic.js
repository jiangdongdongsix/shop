import React from 'react';
import { Button,Input,Modal,Form,Upload,Icon,message,Col,Row } from 'antd';
import './../styles/menu.css'

//门店图以及桌信息设置  导入
export default class AddMenu extends React.Component {
    state = {
        url:""
    }

    componentDidMount(){
        const that = this;
        fetch("/iqesTT/restaurant/seatingChart")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
                console.log(jsonData);
            that.setState({
                url:jsonData.chartUrl
            })
        }).catch(function(){
            console.log("出错了789");
        })
    }

    handleChange = (info) =>{
        const that = this;
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            fetch("/iqesTT/restaurant/seatingChart")
                .then(function(response) {
                    return response.json();
                }).then(function (jsonData) {
                console.log(jsonData);
                that.setState({
                    url:jsonData.chartUrl
                })
            }).catch(function(){
                console.log("出错了789");
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        const props = {
            action: '/iqesTT/restaurant/seatingChart',
            onChange: this.handleChange,
            multiple: true,
        };
            return (
                <Col span={10}>
                    <Row>
                        <span className="Table-title">店面桌位图</span>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Upload {...props}>
                                <Button type='danger' className='whiteIcon'>
                                    <Icon type="upload"/> <span style={{color:'white'}}>导入门店图</span>
                                </Button>
                            </Upload>
                        </Col>
                        <Col span={12}>
                            <span className="Table-info">*导入的图中带有桌类型以及桌信息</span>
                        </Col>
                    </Row>
                    <Row  style={{marginTop:'100px'}}>
                        <img src={this.state.url} style={{width:'50%',height:'100%'}}/>
                    </Row>
                </Col>
            );
};
}