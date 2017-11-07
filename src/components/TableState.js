import React from 'react';
import { Table,Layout,Button,Row,Col,Icon,message,Popconfirm } from 'antd';
import './../styles/menu.css'
import AreaTableInfo from './AreaTableInfo'
const {Content} = Layout;


export default class TableState extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[{
                tableName: "",
                area: "",
                state: "",
                tableTypeDescribe: ""
            }]
        };

        function cancel(e){
            console.log(e);
            message.error('取消叫号');
        };
        this.columns = [{
            title:'',
            dataIndex:'id',
            width:'0'
        },{
            title: '状态',
            dataIndex: 'state',
            width: '15%'
        }, {
            title: '桌编号',
            dataIndex: 'tableName',
            width: '15%'
        }, {
            title: '所在区域',
            dataIndex: 'area',
            width: '13%'
        },{
            title: '桌类型',
            dataIndex: 'tableTypeDescribe',
            width: '13%'
        },{
            title: '已排桌数',
            dataIndex: 'tableNumber',
            width: '13%'
        }, {
            title: "设置为空桌",
            dataIndex: '',
            width: '13%',
            render: (text, record, index) => {
                const Id = record.key;
                return (
                    <span>
                        <Button onClick={this.handleTable.bind(this,Id)}>设为空桌</Button>
                    </span>
                )
            }
        }
        ,{
            title: '呼叫',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.key;
                return(
                    <span>
                        <Popconfirm title="确定叫号?"  onConfirm={this.confirm.bind(this,Id)} onCancel={cancel}>
                                    <Icon type="notification" className="Menu-operation"/>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    }
    //初始化数据
    getData(){
        let that = this;
        fetch("/iqesTT/restaurant/tableNumber/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            let tableInfo = [];
            jsonData.tableNumbers.map((k,index) =>{
                console.log(k);
                let obj ={
                    key: k.id,
                    state:  k.state === '1' ? '就餐中' :'空闲中',
                    tableName:k.tableName,
                    area: k.area,
                    tableTypeDescribe: k.tableTypeDescribe,
                    tableNumber:'3',
                };
                tableInfo.push(obj);
            });
            that.setState({
                data:tableInfo
            });
        }).catch(function () {
            console.log('出错了');
        });
    }

    componentWillMount(){
        this.getData();
    }
    //叫号
    confirm(id){
        console.log(id);
        console.log(this.state.data[0].tableName);
        const that = this;
        fetch("/iqesTT/queue/arrivingCustomer?tableName=0"+id,
        ).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            that.getData();
            message.success('叫号成功');
        }).catch(function () {
            console.log('出错了');
        });
    }
    //设为空桌
    handleTable(id) {
        console.log(id);
        let that = this;
        fetch("/iqesTT/restaurant/tableNumber/state?id="+id+'&state='+ 0,{
             method:'POST'
        }).then(function (response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            that.getData();
         }).catch(function () {
            console.log('出错了');
         });
    }
    render(){
        return (
            <Layout style={{backgroundColor:'white'}}>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <Row>
                        <Col span={24}>
                            <Row>
                                <AreaTableInfo/>
                            </Row>
                            <Row>
                                <div className="Menu-table">
                                    <Table columns={this.columns} dataSource={this.state.data} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}
