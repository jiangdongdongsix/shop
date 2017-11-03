/**
 * Created by jiang on 2017/10/22.
 */
import React from 'react';
import  '../styles/basic.css';
import { Layout, Menu, Breadcrumb, Icon,Row, Col ,Button} from 'antd';
import BasicInfoForm from './basicInfoForm';
import ChangeFormCountBySelf from './TabletypeForm';
import ReserveTimeConfig from './ReserveTimeConfig';
import PicturesWall from './PictureForm';
import ShowConfigForm from './ShowConfig';
const { Header, Content, Footer, Sider } = Layout;

class BasicContent extends React.Component{
    render(){
        return (
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <BasicInfoForm />
                    {/*<ChangeFormCountBySelf />*/}
                    <PicturesWall />
                    <ShowConfigForm />
                    <ReserveTimeConfig />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2016 Created by Ant UED
                </Footer>
            </Layout>
        )
    }

}

export default BasicContent;