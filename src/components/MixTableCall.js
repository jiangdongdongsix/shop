import React from 'react';
import { Table,Button,Form,Input,Modal,Row,Col } from 'antd'
import './../styles/callclear.css'
const FormItem = Form.Item;
const columns = [{
    title: '排队号',
    dataIndex: 'queueId',
    width: '13%'
},{
    title: '桌类型',
    dataIndex: 'tableType',
    width: '13%'
},{
    title: '用餐人数',
    dataIndex: 'eatNumber',
    width: '15%'
}, {
    title: '是否选座',
    dataIndex: 'seatFlag',
    width: '15%'
},{
    title: '排队时间',
    dataIndex: 'queueStartTime',
    width: '15%'
},{
    title: '客户姓名',
    dataIndex: 'customerName',
    width: '15%'
}, {
    title: "联系方式",
    dataIndex: 'customerTel',
    width: '20%'
}];

//叫号清桌页面  手动拼桌叫号
export default class ShowTableQueue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            queueId:[],
            queueInfos:"",
            tables:"",
            queueInfo:[]
        };
    };

    showModal = () => {
        this.setState({ visible: true });
        this.initData();
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };


    onChangeTables = (e) => {
        this.setState({
                tables:e.target.value
       })
    }


    onChangeQueueInfos = (e) => {
        this.setState({
                queueInfos:e.target.value
        })
    }


    submitQueue(){
        let that = this;
        let tables = that.state.tables;
        let queueInfos = that.state.queueInfos;
        fetch('/iqesTT/queue/shareTable?tables='+tables+'&queueInfos='+queueInfos).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            if(jsonData.ErrorCode === '0'){
                console.log(11);
                that.setState({
                    queueInfos:jsonData.shareTableData.queueInfos,
                    tables:jsonData.shareTableData.tables,
                    visible: false
                })
            }
            that.handleMixTableCall();
            console.log(that.state.tables,that.state.queueInfos);
        }).catch(function () {
            console.log('拼桌叫号失败');
        });
    }

    handleMixTableCall(){
        this.props.handleMixTableCall(this.state.tables,this.state.queueInfos);
    }

    initData(){
        const that =this;
        fetch('/iqesTT/queue/all', {
        }).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            let info = [];
            console.log(jsonData);
            jsonData.QueueInfos.map((k,index) => {
                let obj = {
                    queueId:k.queueId,
                    tableType:k.tableType.describe,
                    eatNumber:k.eatNumber,
                    seatFlag:k.seatFlag === false ? '否' : '是',
                    queueStartTime:k.queueStartTime,
                    customerName:k.customerName,
                    customerTel:k.customerTel,
                };
                info.push(obj);
            });
            console.log(info);
            that.setState({queueInfo:info});
        }).catch(function () {
            console.log('出错了');
        });
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let queue ="";
                selectedRows.map((k,index)=>{
                    queue  = queue + k.queueId +',';
                    console.log(queue);
                })
                this.setState({
                        queueInfos:queue
                })
            }
        };

        return (
            <div>
                <Button type='primary' onClick={this.showModal} className='callTableNumberButton' style={{width:'120px',marginRight:'22px'}}>
                    <span style={{color:"white"}}>手动叫号拼桌</span>
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="手动叫号拼桌"
                    okText="确定"
                    onCancel={this.handleCancel}
                    footer={null}
                    width='550px'
                >
                    <Row style={{paddingBottom:'10px'}}>
                        <Col span={4} style={{paddingTop:"5px"}}>
                            请输入空桌号:
                        </Col>
                        <Col span={5}>
                            <Input placeholder="请输入空桌编号" value={this.state.tables}   onChange={this.onChangeTables}/>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={5} style={{paddingTop:"5px"}}>
                            请勾选客户排号:
                        </Col>
                        <Col span={5}>
                            <Input placeholder="请勾选客户排号" value={this.state.queueInfos} onChange={this.onChangeQueueInfos}/>
                        </Col>
                        <Col span={1}></Col>
                        <Col span={2}>
                            <Button onClick={this.submitQueue.bind(this)}>呼叫</Button>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Table columns={columns} rowSelection={rowSelection} dataSource={this.state.queueInfo}/>
                </Modal>
            </div>
        );
    }
}
