import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Popconfirm,Icon,message } from 'antd';
import HeaderCustom from './HeaderCustom'
import AddTable from './AddTable'
import './../styles/tableset.css'
const {Content} = Layout;
const Search = Input.Search;

export default class WaitVerify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            table:[
                {
                    id:'',
                    name:'',
                    type:'',
                    area:'',
                    pNumber:''
                }
            ]
        };
        this.confirm = this.confirm.bind(this);
        function cancel(e){
            console.log(e);
            message.error('取消删除');
        };
        this.columns = [{
            title: '餐桌编号',
            dataIndex: 'name',
            width: '18%'
        }, {
            title: '餐桌类型',
            dataIndex: 'type',
            width: '18%'
        }, {
            title: '餐桌所在区',
            dataIndex: 'area',
            width: '18%'
        },{
            title: '餐桌最多容纳人数',
            dataIndex: 'pNumber',
            width: '23%'
        },{
            title: '',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.id;
                return(
                    <span>
                        <Icon type="edit" className="Menu-operation"/>
                        <Popconfirm title="确定删除?"  onConfirm={this.confirm.bind(this,Id)} onCancel={cancel}>
                            <Icon type="delete" className="Menu-operation"/>
                        </Popconfirm>
                    </span>

                )
            }
        }];
    }
    componentDidMount(){
        let that = this;
        fetch("/restaurant/tableNumber/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            let len = jsonData.tableNumbers.length;
            let tableNumber = [];
            for(let i=0;i<len;i++) {
                tableNumber.push({
                    id:jsonData.tableNumbers[i].id,
                    name:jsonData.tableNumbers[i].name + jsonData.tableNumbers[i].id,
                    type:jsonData.tableNumbers[i].tableType.describe,
                    area:jsonData.tableNumbers[i].restaurantArea.areaName,
                    pNumber:jsonData.tableNumbers[i].tableType.eatMaxNumber
                })
            }
            that.setState({table:tableNumber});
        }).catch(function () {
            console.log('出错了');
        });
    };
    confirm(id){
        let that = this;
        console.log(id);
        fetch("/restaurant/tableNumber?id="+id, {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            if(jsonData.ErrorCode === 0){
                console.log('删除成功');
            }
            console.log(that.state.table);
        }).catch(function () {
            console.log('出错了');
        });
    };

    render(){
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <Row>
                        <Col span={10}>
                            <Row>
                                <span className="Table-title">店面桌位图</span>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Button type="danger" icon="file-add" onClick={this.showModal}>
                                        <span style={{color:"white"}}>导入门店图</span>
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <span className="Table-info">*导入的图中带有桌类型以及桌信息</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row>
                                <span className="Table-title">桌位信息</span>
                            </Row>
                            <Row>
                                <Col span={2}>
                                    <AddTable/>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={2}>
                                    <Button type="danger" icon="code-o">
                                        <span style={{color:"white"}}>导入菜单</span>
                                    </Button>
                                </Col>
                                <Col span={11}></Col>
                                <Col span={6}>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div className="Menu-table">
                                    <Table columns={this.columns} dataSource={this.state.table} onChange={this.handleChange} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}
