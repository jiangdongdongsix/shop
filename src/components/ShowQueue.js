import React from 'react';
import { Layout,Icon,Button,Row,Col,Input,Form,Modal,Table } from 'antd';
import TableQueue from '../images/chouhao_pic.png';
import ShowTableQueue from './ShowTableQueue'
import '../styles/showqueue.css'
const { Content,} = Layout;

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
}];
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
                <ShowTableQueue/>
            </Modal>
        );
    }
);

export default class CallClear extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: false,
            Info:[
                {
                    arrivingQueueInfoList: [],
                    eatMaxNumber:'',
                    eatMinNumber:'',
                    queueNumbers:'',
                    tableTypeDescribe:""
                }
            ],
            queueInfo:[]
        };
    }
    showModal = () => {
        this.setState({visible: true});
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleQueueInfo(){
        let that = this;
        fetch('/iqesTT/restaurant/tableType/queue').then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            let len = jsonData.tableTypeDTOs.length;
            let queueInfo = [];
            for(let i=0;i<len;i++){
                queueInfo.push({
                        tableTypeDescribe:jsonData.tableTypeDTOs[i].tableTypeDescribe,
                        eatMaxNumber: jsonData.tableTypeDTOs[i].eatMaxNumber,
                        eatMinNumber: jsonData.tableTypeDTOs[i].eatMinNumber,
                        queueNumbers: jsonData.tableTypeDTOs[i].queueNumbers,
                        arrivingQueueInfoList:'A101'
                });
            }
            that.setState({Info:queueInfo});
        }).catch(function () {
            console.log('查看排队失败');
        });
    }


    componentWillMount(){
        this.handleQueueInfo();
    }

    render(){
        const queueElements=[];      //保存渲染以后 JSX的数组
        for(let queue of this.state.Info){
            queueElements.push(
                <div>
                    <Col span={6}>
                        <div className="queuePanel">
                            <Row>
                                <Col span={1}></Col>
                                <Col span={23}>{queue.tableTypeDescribe}({queue.eatMinNumber}-{queue.eatMaxNumber}人)</Col>
                            </Row>
                            <Row style={{padding:"10px 0px 7px 0px"}}>
                                <Col span={2}></Col>
                                <Col span={10}>
                                    <img src={TableQueue} alt="" style={{width:"50%",height:"50%"}}/>
                                </Col>
                                <Col span={10}>
                                    <div>
                                        <h3>已排{queue.queueNumbers}桌</h3>
                                        <p>即将叫号{queue.arrivingQueueInfoList}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <p className="queueIcon" onClick={this.showModal.bind(this)}>
                                        <Icon type="search" />查看队列
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </div>)
        }
        return (
            <Layout style={{backgroundColor:'white',padding:"20px 0px"}}>
                <Content>
                    <Row>
                        {queueElements}
                        <CreateTable
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
                    </Row>
                </Content>
            </Layout>
        )
    }

}