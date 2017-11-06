import React from 'react';
import { Table,Layout,Button,Row,Col,Icon,message } from 'antd';
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
        this.handleChange = this.handleChange.bind(this);
        this.columns = [{
            title:'',
            dataIndex:'key',
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
                const Id = record.id;
                return (
                    <span>
                        <Button onClick={this.handleChange.bind(this)}>设为空桌</Button>
                    </span>
                )
            }
        }
        ,{
            title: '呼叫',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.id;
                return(
                    <span>
                        <Icon type="notification" className="Menu-operation" />
                    </span>
                )
            }
        }]
    }
    componentDidMount(){
        let that = this;
        fetch("/iqesTT/restaurant/tableNumber/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            let len = jsonData.tableNumbers.length;
            let tableInfo = [];
            for(let i=0;i<len;i++) {
                if(jsonData.tableNumbers[i].state === '0'){
                    jsonData.tableNumbers[i].state = '就餐中';
                }else if(jsonData.tableNumbers[i].state === '1'){
                    jsonData.tableNumbers[i].state = '空闲中';
                }
                tableInfo.push({
                    state:jsonData.tableNumbers[i].state,
                    tableName: jsonData.tableNumbers[i].tableName,
                    area: jsonData.tableNumbers[i].area,
                    tableTypeDescribe: jsonData.tableNumbers[i].tableTypeDescribe,
                    tableNumber: '3'
                })
            }
            that.setState({data:tableInfo});
        }).catch(function () {
            console.log('出错了');
        });
    }

    handleChange(){
        console.log(111);
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
