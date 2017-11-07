import React from 'react';
import './../styles/menu.css'
import {Table} from 'antd'
const columns = [{
    title: '排队号',
    dataIndex: 'queueId',
    width: '15%'
}, {
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
    width: '25%'
},{
    title: '客户姓名',
    dataIndex: 'customerName',
    width: '15%'
}, {
    title: "联系方式",
    dataIndex: 'customerTel',
    width: '15%'
}];

export default class ShowTableQueue extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            queueInfo:[],
            tableTypeDescribe:''
        };
    }
    showTable = (tableTypeDescribe) => {
        const that =this;
        console.log(that.props.tableTypeDescribe);
        fetch('/iqesTT/queue/tableTypeDescribe?tableTypeDescribe='+tableTypeDescribe, {
        }).then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            let info = [];
            console.log(jsonData);
            jsonData.queueInfos.map((k,index) => {
                let obj = {
                    queueId:k.queueId,
                    eatNumber:k.eatNumber,
                    seatFlag:k.seatFlag === false ? '否' : '是',
                    queueStartTime:k.queueStartTime,
                    customerName:k.customerName,
                    customerTel:k.customerTel,
                };
                info.push(obj);
            });
            that.setState({queueInfo:info});
        }).catch(function () {
            console.log('出错了');
        });
    };

    componentWillMount(){
        const tableTypeDescribe = this.props.tableTypeDescribe;
        this.showTable(tableTypeDescribe);
    }

    render() {
        return (
            <Table columns={columns} dataSource={this.state.queueInfo} />
        );
    }
}