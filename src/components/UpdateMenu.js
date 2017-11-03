import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import HeaderCustom from './HeaderCustom'
import AddMenu from './AddMenu'
import './../styles/menu.css'
const {Content} = Layout;
const Search = Input.Search;

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: this.props.editable || false,
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({ editable: nextProps.editable });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target.value;
        this.setState({ value });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div>
                {
                    editable ?
                        <div>
                            <Input
                                value={value}
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        :
                        <div className="editable-row-text">
                            {value || ' '}
                        </div>
                }
            </div>
        );
    }
}

export default class TableTypeForm extends React.Component{
    constructor(props){
        console.log("constructor");
        super(props);
        this.state = {
            visible: false,
            data:[],
            flag:true
        };

        this.confirm = this.confirm.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        function cancel(e){
            console.log(e);
            message.error('取消删除');
        };

        this.columns = [{
            title: '菜品名称',
            dataIndex: 'name',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
        }, {
            title: '菜品属性',
            dataIndex: 'props',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'props', text),
        }, {
            title: '价格',
            dataIndex: 'Price',
            width: '13%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'Price', text),
        },{
            title: '会员价格',
            dataIndex: 'VipPrice',
            width: '13%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'VipPrice', text),
        },{
            title: '描述',
            dataIndex: 'describe',
            width: '23%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'describe', text),
        },{
            title: '操作',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.key;
                const { editable } = this.state.data[index].name;
                return(
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                               <a onClick={() => this.editDone(index, 'save')}>保存</a>
                                    <a onClick={() => this.editDone(index, 'cancel')} style={{marginLeft: 20}}>取消</a>
                            </span>
                                :
                                <span>
                            <Switch defaultChecked={true} onChange={this.handleChange.bind(this,Id)}/>
                            <Icon type="edit" className="Menu-operation" onClick={() => this.edit(index)}/>
                            <Popconfirm title="确定删除?"  onConfirm={this.confirm.bind(this,Id)} onCancel={cancel}>
                            <Icon type="delete" className="Menu-operation"/>
                            </Popconfirm>
                            </span>
                        }
                    </div>
                )
            }
        }]
    }


    edit(index) {
        console.log(index);
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                console.log("nnnnnnnnnnn");
                data[index][item].editable = true;
            }
        });
        this.setState({ data });
    }

    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            console.log("99999");
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
            this.updateDate(data[index]);
        });
    }


    updateDate(data){
        const info = {
            id:data.key,
            name:data.name.value,
            props:data.props.value,
            Price:data.Price.value,
            VipPrice:data.VipPrice.value,
            describe:data.describe.value
        }
        console.log(JSON.stringify(info));
        fetch("/iqesTT/restaurant/menu",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log("保存成功")
            // success();
        }).catch(function () {
            // error();
            console.log('出错了');
        });

    }


    renderColumns(data, index, key, text) {
        if (typeof editable === 'undefined') {
            return text;
        }
        const { editable, status } = data[index][key];
        return (
            <EditableCell
                editable={editable}
                value={text}
                onChange={value => this.handleChange(key, index, value)}
                status={status}
            />
        );
    }


    handleChange(key, index, value) {
        console.log("888");
        const { data } = this.state;
        data[index][key].value = value;
        this.setState({data});
    }


    getdata(){
        console.log("初始化数据");
        const that = this;
        let dataList = [];
        fetch("/iqesTT/restaurant/menu/menus")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            console.log(11);
            jsonData.menus.map((k,index) =>{
                let obj ={
                    key: k.id,
                    name:  {
                        editable: false,
                        value: k.menuName,
                    },
                    Price: {
                        editable: false,
                        value: k.menuPrice,
                    },
                    props: {
                        editable: false,
                        value: k.menuType,
                    },
                    VipPrice:{
                        editable: false,
                        value: k.memberMenuPrice,
                    },
                    describe:{
                        editable: false,
                        value: k.describe,
                    },
                };
                dataList.push(obj);
            })
            that.setState({
                data:dataList
            })
        }).catch(function () {
            console.log('出错了');
        });
    }


    componentWillMount(){
        this.getdata();
    }

    confirm(id){
        const that = this;
        fetch("/iqesTT/restaurant/menu?id="+id, {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            if(jsonData.ErrorCode ==='0'){
                that.getdata();
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
    render(){
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return (
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Row>
                                <Col span={2}>
                                    <AddMenu refersh = {this.getdata.bind(this)}/>
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
                                    <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
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
