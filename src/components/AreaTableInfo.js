import React from 'react';
import { Button,Row,Col } from 'antd';
import './../styles/menu.css'

//叫号清桌页面  分区域空几桌
export default class TableInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            Info:{
                    area:'',
                    number:''
                },
            data:[{
                key:'',
                tableName: "",
                area: "",
                state: "",
                tableTypeDescribe: ""
            }],
        };
    }
    handleCreate = () => {
        const that = this;
            fetch('/iqesTT/restaurant/area/tableNumber/amount/state', {
            }).then(function(response) {
                return response.json();
            }).then(function (jsonData) {
                let map = jsonData.map;
                that.setState({Info:map});
                console.log("保存成功");
            }).catch(function () {
                console.log('出错了');
            });
    };

    handleArea(area){
        console.log(area);
        let that = this;
            fetch('/iqesTT/restaurant/tableNumber/area?areaName='+ area,{
            }).then(function(response) {
                return response.json();
            }).then(function(jsonData) {
            let areaInfo = [];
            console.log(jsonData);
            jsonData.tableNumbers.map((k, index) => {
                let obj ={
                    key: k.id,
                    state:k.state==='1' ? '就餐中' :'空闲中',
                    tableName:k.tableName,
                    area: k.area,
                    tableTypeDescribe: k.tableTypeDescribe,
                    tableNumber:'3',
                };
                areaInfo.push(obj);
                console.log('obj'+obj);
            });
                that.setState({data:areaInfo});
                that.handleAreaTable();
                console.log(that.state.data);
            }).catch(function () {
                console.log('查看排队失败');
            });
    }

    handleAreaTable(){
        this.props.handleAreaTable(this.state.data);
    }

    componentWillMount(){
        console.log(111);
        this.handleCreate();
    }
    render() {
        let AreaTable = [];
        for(let table in this.state.Info){
            AreaTable.push(
                <div key={Math.random()}>
                    <Col span={3} className='areaTableInfo'>
                        <Button type="primary" className='areaButton' onClick={this.handleArea.bind(this,table)}>
                            <span style={{color:"white"}}>{table}区 {this.state.Info[table]>0 ? '空'+this.state.Info[table]+'桌' : '已满' }</span>
                        </Button>
                    </Col>
                </div>)
        }
        return (
            <div>
                <Row>
                    <Col span={2} style={{paddingTop:"5px",fontSize:'15px'}}>
                        区域桌信息:
                    </Col>
                    {AreaTable}
                    <Col span={10}></Col>
                    <Col span={4} style={{paddingTop:"8px",color:"orange",fontSize:"12px"}}>*当前显示为全部区域桌信息</Col>
                </Row>
            </div>
        );
    }
}