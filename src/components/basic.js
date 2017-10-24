/**
 * Created by jiang on 2017/10/22.
 */
import React from 'react';
import  '../styles/basic.css';
import { Layout, Menu, Breadcrumb, Icon,Row, Col ,Button} from 'antd';
import BasicInfoForm from './basicInfoForm';
import ChangeFormCountBySelf from './TabletypeForm';
const { Header, Content, Footer, Sider } = Layout;


class BasicContent extends React.Component{
    render(){
        return (
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <BasicInfoForm />
                    <div className="secondForm">
                        <Row className="headerContent">
                            {/*<Col span={1}><div className="block"></div></Col>*/}
                            <Col span={2}><div className="block"></div><p>店面桌类型设置</p></Col>
                            <Col span={18}><hr/></Col>
                            <Col span={4}><Button type="danger" className="save">保存</Button></Col>
                        </Row>
                        <ChangeFormCountBySelf />
                    </div>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        )
    }

}

export default BasicContent;