import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import './../styles/menu.css'
const {Content} = Layout;
const Search = Input.Search;


export default class TableState extends React.Component{
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
            title: '状态',
            dataIndex: 'name',
            width: '15%'
        }, {
            title: '桌编号',
            dataIndex: 'props',
            width: '15%'
        }, {
            title: '所在区域',
            dataIndex: 'Price',
            width: '13%'
        },{
            title: '桌类型',
            dataIndex: 'VipPrice',
            width: '13%'
        },{
            title: '已排桌数',
            dataIndex: 'describe',
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
                        <Icon type="notification" className="Menu-operation" onClick={this.showEdit.bind(this,Id)}/>
                    </span>
                )
            }
        }]
    }
    componentDidMount(){
        let that = this;
        fetch("/iqesTT/restaurant/menu/menus")
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
                                <Col span={2} style={{paddingTop:"5px"}}>
                                    区域桌信息:
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" style={{padding:"0 10px"}}>
                                        <span style={{color:"white"}}>A区 空一桌</span>
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" style={{padding:"0 10px"}}>
                                        <span style={{color:"white"}}>B区 空一桌</span>
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" style={{padding:"0 10px"}}>
                                        <span style={{color:"white"}}>C区 空一桌</span>
                                    </Button>
                                </Col>
                                <Col span={2}>
                                    <Button type="primary" style={{padding:"0 10px"}}>
                                        <span style={{color:"white"}}>D区 空一桌</span>
                                    </Button>
                                </Col>
                                <Col span={10}></Col>
                                <Col span={4} style={{paddingTop:"8px",color:"orange",fontSize:"12px"}}>*当前显示为全部区域桌信息</Col>
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
