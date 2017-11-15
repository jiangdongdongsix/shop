import React,{ Component } from 'react'
import { Table,Layout,Button,Row,Col,Input,Switch,Popconfirm,Icon,message } from 'antd';
import HeaderCustom from './HeaderCustom'
import AddArea from './AddArea';
import './../styles/menu.css'
const {Content} = Layout;
const Search = Input.Search;

/**
 * 可编辑输入框
 * @auther jiangdongdong
 * @since 2017-11-14 15：12
 */
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
                            {value || '0'}
                        </div>
                }
            </div>
        );
    }
}


/**
 * 区域编辑
 * @author jiangdongdong
 * @since 2017-11-14 15:13
 */
export default class AreaForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            data:[],
        };

        this.confirm = this.confirm.bind(this);
        this.showEdit = this.showEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        function cancel(e){
            console.log(e);
            message.error('取消删除');
        };

        this.columns = [{
            title: '序列',
            dataIndex: 'id',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'id', text),
        },{
            title: '区域名称',
            dataIndex: 'areaName',
            width: '25%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'areaName', text),
        }, {
            title: '区域描述',
            dataIndex: 'areaDescribe',
            width: '45%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'areaDescribe', text),
        },{
            title: '操作',
            dataIndex: 'operation',
            render:(text, record, index)=>{
                const Id = record.key;
                const { editable } = this.state.data[index].areaName;
                return(
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                               <a onClick={() => this.editDone(index, 'save')}>保存</a>
                                    {/*<Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>*/}
                                    <a onClick={() => this.editDone(index, 'cancel')} style={{marginLeft: 20}}>取消</a>
                                    {/*</Popconfirm>*/}
                            </span>
                                :
                                <span>
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
        console.log(data);
        Object.keys(data[index]).forEach((item) => {
            console.log(data[index][item].editable)
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
            console.log(data[index][item].editable)
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
            areaName:data.areaName.value,
            areaDescribe:data.areaDescribe.value,
        }

        console.log(JSON.stringify(info));
        fetch("/iqesTT/restaurant/area",{
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
        const that = this;
        let dataList = [];
        fetch("/iqesTT/restaurant/area/all")
            .then(function(response) {
                return response.json();
            }).then(function (jsonData) {
            console.log(JSON.stringify(jsonData))
            console.log(jsonData)
            jsonData.areas.map((k,index) =>{
                let obj ={
                    key: k.id,
                    id:{
                        editable: false,
                        value: k.id,
                    },
                    areaName: {
                        editable: false,
                        value: k.areaName,
                    },
                    areaDescribe:  {
                        editable: false,
                        value: k.areaDescribe,
                    },

                };
                dataList.push(obj);
            });
            that.setState({
                data:dataList
            })
        }).catch(function () {
            console.log('访问出错');
        });
    }


    componentWillMount(){
        this.getdata();
    }

    confirm(id){
        const that = this;
        fetch("/iqesTT/restaurant/area?id="+id, {
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

        return(
            <Layout style={{backgroundColor:'white'}}>
                <HeaderCustom/>
                <Content style={{border:"2px solid #f9f7f7",padding:20, margin:24}}>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={22}>
                            <Row>
                                <Col span={2}>
                                    <AddArea refersh = {this.getdata.bind(this)}/>
                                </Col>
                                <Col span={1}></Col>
                                <Col span={2}>
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