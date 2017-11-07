import React from 'react';
import { Button,Row,Col } from 'antd';
import './../styles/menu.css'

export default class TableInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            Info:{
                    area:'',
                    number:''
                }
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
    componentWillMount(){
        console.log(111);
        this.handleCreate();
    }
    render() {
        let AreaTable = [];
        for(let table in this.state.Info){
            AreaTable.push(
                <div>
                    <Col span={2}>
                        <Button type="primary" style={{padding:"0 10px"}} disabled={false}>
                            <span style={{color:"white"}}>{table}区 {this.state.Info[table]>0 ? '空'+this.state.Info[table]+'桌' : '已满' }</span>
                        </Button>
                    </Col>
                </div>)
        }
        return (
            <div>
                <Row>
                    <Col span={2} style={{paddingTop:"5px"}}>
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