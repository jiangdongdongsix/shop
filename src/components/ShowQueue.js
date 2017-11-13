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


//叫号清桌页面 分桌型查看队列
export default class CallClear extends React.Component{
    constructor() {
        super();
        this.state = {
            visible: false,
            Info:[
                {
                    key:'',
                    arrivingQueueInfo:'',
                    eatMaxNumber:'',
                    eatMinNumber:'',
                    queueNumbers:'',
                    tableTypeDescribe:""
                }
            ],
            queueInfo:[],
            tableTypeDescribe:''
        };
    }

    showModal = (tableTypeDescribe) => {
        console.log(tableTypeDescribe);
        clearInterval(this.timer);
        this.setState({
            visible: true,
            tableTypeDescribe:tableTypeDescribe
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
            tableTypeDescribe:''
        });
    };

    handleQueueInfo(){
        let that = this;
        fetch('/iqesTT/restaurant/tableType/queue').then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            let len = jsonData.tableTypeDTOs.length;
            let queueInfo = [];
            for(let i=0;i<len;i++){
                queueInfo.push({
                        key:i,
                        tableTypeDescribe:jsonData.tableTypeDTOs[i].tableTypeDescribe,
                        eatMaxNumber: jsonData.tableTypeDTOs[i].eatMaxNumber,
                        eatMinNumber: jsonData.tableTypeDTOs[i].eatMinNumber,
                        queueNumbers: jsonData.tableTypeDTOs[i].queueNumbers,
                        arrivingQueueInfo: jsonData.tableTypeDTOs[i].arrivingQueueInfo
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
    componentDidMount(){
        this.timer = setInterval(()=>{
            this.handleQueueInfo()},2000)
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }

    render(){
        const queueElements=[];      //保存渲染以后 JSX的数组
        for(let queue of this.state.Info){
            queueElements.push(
                <div key={queue.key}>
                    <Col span={6}  style={{paddingBottom:'10px'}}>
                        <div className="queuePanel">
                            <Row>
                                <Col span={1}></Col>
                                <Col span={23} style={{fontSize:'16px','color':'#516b77'}}>{queue.tableTypeDescribe}({queue.eatMinNumber}-{queue.eatMaxNumber}人)</Col>
                            </Row>
                            <Row style={{padding:"10px 0px 7px 0px"}}>
                                <Col span={2}></Col>
                                <Col span={8}>
                                    <img src={TableQueue} alt="" style={{width:"60%",height:"60%"}}/>
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <span style={{fontSize:'30px',color:'#444'}}>已排{queue.queueNumbers}桌</span>
                                        <p>即将叫号{queue.arrivingQueueInfo}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <p className="queueIcon" onClick={this.showModal.bind(this,queue.tableTypeDescribe)}>
                                        <Icon type="search" style={{padding:'0px 10px'}}/>查看队列
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </div>)
        }
        const CreateTable = Form.create()(
            (props) => {
                const { visible, onCancel, onCreate,tableTypeDescribe } = props;
                return (
                    <Modal
                        visible={visible}
                        title="队列信息"
                        onCancel={onCancel}
                        onOk={onCreate}
                        footer={null}
                    >
                        <ShowTableQueue tableTypeDescribe={tableTypeDescribe}/>
                    </Modal>
                );
            }
        );
        return (
            <Layout style={{backgroundColor:'white',padding:"20px 0px"}}>
                <Content>
                    <div>
                        {queueElements}
                        <CreateTable
                            visible={this.state.visible}
                            tableTypeDescribe={this.state.tableTypeDescribe}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
                    </div>
                </Content>
            </Layout>
        )
    }

}