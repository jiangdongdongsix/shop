import React from 'react';
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import HeaderCustom from './HeaderCustom'
import AddTable from './AddTable'
import AddStorePic from './AddStorePic'
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
//桌位图上传以及桌信息设置页面

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
            title: '餐桌编号',
            dataIndex: 'tableName',
            width: '18%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'tableName', text),
        }, {
            title: '餐桌类型',
            dataIndex: 'tableTypeDescribe',
            width: '18%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'tableTypeDescribe', text),
        }, {
            title: '餐桌所在区',
            dataIndex: 'area',
            width: '18%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'area', text),
        },{
            title: '餐桌最多容纳人数',
            dataIndex: 'eatMaxNumber',
            width: '23%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'eatMaxNumber', text),
        },{
            title: '',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.key;
                const { editable } = this.state.data[index].tableName;
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
                                    <Switch defaultChecked={true}/>
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
        console.log(data);
        const info = {
            id:data.key,
            tableName:data.tableName.value,
            tableTypeDescribe:data.tableTypeDescribe.value,
            area:data.area.value,
            eatMaxNumber:data.eatMaxNumber.value
        };
        console.log(JSON.stringify(info));
        fetch("/iqesTT/restaurant/tableNumber",{
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
        const { editable, status } = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }

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
        fetch("/iqesTT/restaurant/tableNumber/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(jsonData);
            jsonData.tableNumbers.map((k,index) =>{
                let obj ={
                    key: k.id,
                    tableName:  {
                        editable: false,
                        value: k.tableName,
                    },
                    tableTypeDescribe: {
                        editable: false,
                        value: k.tableTypeDescribe,
                    },
                    area: {
                        editable: false,
                        value: k.area,
                    },
                    eatMaxNumber:{
                        editable: false,
                        value: k.eatMaxNumber,
                    }
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
        fetch("/iqesTT/restaurant/tableNumber?id="+id, {
            method: 'DELETE'
        }).then(function(response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
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
                        <AddStorePic/>
                        <Col span={14}>
                            <Row>
                                <span className="Table-title">桌位信息</span>
                            </Row>
                            <Row>
                                <Col span={2}>
                                    <AddTable refersh = {this.getdata.bind(this)}/>
                                </Col>
                                <Col span={3}></Col>
                                <Col span={2}>
                                    <Button type="danger" icon="code-o" className='whiteIcon'>
                                        <span style={{color:"white"}}>导入餐桌</span>
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
                                    <Table columns={this.columns} dataSource={dataSource} onChange={this.handleChange} />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        )
    }

}
