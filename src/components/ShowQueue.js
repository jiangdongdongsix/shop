import React from 'react';
import { Layout,Icon,Button,Row,Col,Input,Form,Modal,Table } from 'antd';
import TableQueue from '../images/chouhao_pic.png';
import '../styles/showqueue.css'
const { Content,} = Layout;
const FormItem = Form.Item;

const columns = [{
    title: '排队号',
    dataIndex: 'name',
    width: '15%'
}, {
    title: '用餐人数',
    dataIndex: 'props',
    width: '15%'
}, {
    title: '是否选座',
    dataIndex: 'Price',
    width: '15%'
},{
    title: '排队时间',
    dataIndex: 'VipPrice',
    width: '25%'
},{
    title: '客户姓名',
    dataIndex: 'describe',
    width: '15%'
}, {
    title: "联系方式",
    dataIndex: '',
    width: '15%'
}]
const CreateTable = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        return (
            <Modal
                visible={visible}
                title="队列信息"
                onCancel={onCancel}
                onOk={onCreate}
                footer={null}
            >
                <Table columns={columns} />
            </Modal>
        );
    }
);

export default class CallClear extends React.Component{
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    render(){
        return (
            <Layout style={{backgroundColor:'white',padding:"20px 0px"}}>
                <Content>
                    <Row>
                        <Col span={6}>
                            <div className="queuePanel">
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={23}>小桌(5-6人)</Col>
                                </Row>
                                <Row style={{padding:"10px 0px 7px 0px"}}>
                                    <Col span={2}></Col>
                                    <Col span={10}>
                                        <img src={TableQueue} alt="" style={{width:"50%",height:"50%"}}/>
                                    </Col>
                                    <Col span={10}>
                                        <div>
                                            <h3>已排10桌</h3>
                                            <p>即将叫号A101</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="queueIcon" onClick={this.showModal}>
                                            <Icon type="search" />查看队列
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <div className="queuePanel">
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={23}>小桌(5-6人)</Col>
                                </Row>
                                <Row style={{padding:"10px 0px 7px 0px"}}>
                                    <Col span={2}></Col>
                                    <Col span={10}>
                                        <img src={TableQueue} alt="" style={{width:"50%",height:"50%"}}/>
                                    </Col>
                                    <Col span={10}>
                                        <div>
                                            <h3>已排10桌</h3>
                                            <p>即将叫号A101</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="queueIcon" onClick={this.showModal}>
                                            <Icon type="search" />查看队列
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <div className="queuePanel">
                                <Row>
                                    <Col span={1}></Col>
                                    <Col span={23}>小桌(5-6人)</Col>
                                </Row>
                                <Row style={{padding:"10px 0px 7px 0px"}}>
                                    <Col span={2}></Col>
                                    <Col span={10}>
                                        <img src={TableQueue} alt="" style={{width:"50%",height:"50%"}}/>
                                    </Col>
                                    <Col span={10}>
                                        <div>
                                            <h3>已排10桌</h3>
                                            <p>即将叫号A101</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="queueIcon" onClick={this.showModal}>
                                            <Icon type="search" />查看队列
                                        </p>
                                        <CreateTable
                                            ref={this.saveFormRef}
                                            visible={this.state.visible}
                                            onCancel={this.handleCancel}
                                            onCreate={this.handleCreate}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}