import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import HeaderCustom from './HeaderCustom'
import AddMenu from './AddMenu'
import './../styles/menu.css'
const {Content} = Layout;
const Search = Input.Search;


export default class TableTypeForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            data:[{
                id: "",
                tableTypeName: "",
                eatMinNumber: "",
                eatMaxNumber: "",
                eatTime: "",
                remindTime: "",
                describe:"",
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
            title: '桌类型代码',
            dataIndex: 'describe',
            width: '10%'
        },{
            title: '桌类型名称',
            dataIndex: 'tableTypeName',
            width: '15%'
        }, {
            title: '最小用餐人数',
            dataIndex: 'eatMinNumber',
            width: '15%'
        }, {
            title: '最大用餐人数',
            dataIndex: 'eatMaxNumber',
            width: '13%'
        },{
            title: '每桌用餐时间',
            dataIndex: 'eatTime',
            width: '13%'
        },{
            title: '提前推送桌数',
            dataIndex:'remindTime',
            width: '13%'
        },{
            title: '操作',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.id;
                return(
                    <span>
                        <Switch defaultChecked={true} onChange={this.handleChange.bind(this,Id)}/>
                        {/*<EditMenu/>*/}
                        <Icon type="edit" className="Menu-operation" onClick={this.showEdit.bind(this,Id)}/>
                        <Popconfirm title="确定删除?"  onConfirm={this.confirm.bind(this,Id)} onCancel={cancel}>
                            <Icon type="delete" className="Menu-operation"/>
                        </Popconfirm>
                    </span>
                )
            }
        }]
    }
    componentDidMount(){
        let that = this;
        fetch("/restaurant/tableType/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData)
            that.setState({data:jsonData.tableTypes});
        }).catch(function () {
            console.log('出错了');
        });
    }

    reload(){
        console.log("666666");
        let that = this;
        fetch("/restaurant/tableType/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData)
            that.setState({data:jsonData.tableTypes});
        }).catch(function () {
            console.log('出错了');
        });
    }




    confirm(id){
        let that = this;
        console.log(id);
        fetch("/restaurant/tableType?id="+id, {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
            if(jsonData.ErrorCode == 0){
                console.log('删除成功');
                // that.componentDidMount();
                // that.reload.bind(that);
            }
        }).catch(function () {
            console.log('出错了');
        });
    }
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
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Row>
                                <Col span={2}>
                                    <AddMenu/>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={2}>
                                    <Button type="danger" icon="code-o">
                                        <span style={{color:"white"}}>导入菜单</span>
                                    </Button>
                                </Col>
                                <Col span={15}></Col>
                                <Col span={4}>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div className="Menu-table">
                                    <Table columns={this.columns} dataSource={this.state.data} onChange={this.handleChange} />
                                </div>
                            </Row>
                        </Col>
                        <Col cpan={1}></Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}
