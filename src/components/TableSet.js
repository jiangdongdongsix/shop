import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,Modal,Form } from 'antd';
import HeaderCustom from './HeaderCustom'
import './../styles/tableset.css'
const {Content} = Layout;
const Search = Input.Search;
const FormItem = Form.Item;

export default class WaitVerify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            data:[],
            idNum:1
        };
        this.columns = [{
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
            render(){
                return(
                    <span>
                        <Switch defaultChecked={false}/>
                        <Icon type="edit" className="Menu-operation"/>
                        <Popconfirm title="确定删除?">
                            <Icon type="delete" className="Menu-operation"/>
                        </Popconfirm>
                    </span>
                )
            }
        }];
    }
    componentDidMount(){
        fetch("/restaurant/menu?id=1")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);

        }).catch(function () {
            console.log('出错了');
        });
    }

    /*模态框*/
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
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
                                    <Button type="danger" icon="file-add" onClick={this.showModal}>
                                        <span style={{color:"white"}}>新增菜单</span>
                                    </Button>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={2}>
                                    <Button type="danger" icon="code-o">
                                        <span style={{color:"white"}}>导入菜单</span>
                                    </Button>
                                </Col>
                                <Col span={9}></Col>
                                <Col span={6}>
                                    <Search
                                        placeholder="input search text"
                                        onSearch={value => console.log(value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <div className="Menu-table">
                                    <Table columns={this.columns} dataSource={this.data} onChange={this.handleChange} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Modal title="新增菜单" visible={this.state.visible}
                               onOk={this.handleOk} onCancel={this.handleCancel}
                        >
                            <Form layout="vertical">
                                <FormItem label="标题">

                                </FormItem>
                                <FormItem label="描述">

                                </FormItem>
                                <FormItem className="collection-create-form_last-form-item" style={{marginBottom: 0}}>

                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        )
    }

}
