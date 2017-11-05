import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import './../styles/menu.css'
import AreaTableInfo from './AreaTableInfo'
const {Content} = Layout;
const Search = Input.Search;


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
        this.confirm = this.confirm.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        function cancel(e){
            console.log(e);
            message.error('取消删除');
        };

        this.columns = [{
            title:'',
            dataIndex:'key',
            width:'0'
        },{
            title: '状态',
            dataIndex: 'state',
            width: '15%',
            render:()=> {
                return (
                    <span>
                       <Icon type="smile" />
                        <span>就餐中</span>
                    </span>
                )
            }
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
                        <Button>设为空桌</Button>
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
                tableInfo.push({
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
    confirm(id){
        let that = this;
        console.log(id);
        fetch("/iqesTT/restaurant/menu?id="+id, {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            if(jsonData.ErrorCode == 0){
                console.log('删除成功');
            }
            console.log(that.state.data);
        }).catch(function () {
            console.log('出错了');
        });
    };
    showEdit(Id) {
        let that = this;
        console.log(that.state.data);
        let len = that.state.data.length;
        for (let i = 0; i < len; i++) {
            if (that.state.data[i].id == Id) {
                console.log(that.state.data[i]);
            }
        }
    }

    handleChange(Id){
        console.log(Id);
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
                                    <Table columns={this.columns} dataSource={this.state.data} onChange={this.handleChange} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}
