import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import HeaderCustom from './HeaderCustom'
import AddMenu from './AddMenu'
import EditMenu from './EditMenu'
import './../styles/menu.css'
const {Content} = Layout;
const Search = Input.Search;


export default class WaitVerify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            data:[{
                id: "",
                name: "",
                Price: "",
                props: "",
                VipPrice: "",
                describe: ""
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
            title: '菜品名称',
            dataIndex: 'name',
            width: '15%'
        }, {
            title: '菜品属性',
            dataIndex: 'props',
            width: '15%'
        }, {
            title: '价格',
            dataIndex: 'Price',
            width: '13%'
        },{
            title: '会员价格',
            dataIndex: 'VipPrice',
            width: '13%'
        },{
            title: '描述',
            dataIndex: 'describe',
            width: '23%'
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
        fetch("/restaurant/menu/menus")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            let len = jsonData.menus.length;
            let menuInfo = [];
            for(let i=0;i<len;i++) {
                menuInfo.push({
                    id:jsonData.menus[i].id,
                    name:jsonData.menus[i].menuName,
                    Price:jsonData.menus[i].menuPrice,
                    props:jsonData.menus[i].menuType,
                    VipPrice:jsonData.menus[i].memberMenuPrice,
                    describe:jsonData.menus[i].describe
                })
            }
            that.setState({data:menuInfo});
        }).catch(function () {
            console.log('出错了');
        });
    }
    confirm(id){
        let that = this;
        console.log(id);
            fetch("/restaurant/menu?id="+id, {
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
