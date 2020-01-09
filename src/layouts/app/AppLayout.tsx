import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import {Icon, Layout, Menu, notification} from 'antd';

const { Header, Footer } = Layout;

class AppLayout extends React.Component {
    logout() {
        notification['success']({
            message: 'Successfully logged out',
            description: ''
        });
        window.App.logout();
    }

    render() {
        let loginOrHomeLink = <Menu.Item key="3"><Link to={"/login"}>Log in</Link></Menu.Item>;

        if (window.App.isAuthorized()) {
            loginOrHomeLink = <Menu.Item key="3"><Link to={"/account/library"}><Icon type={"home"}/>Home</Link></Menu.Item>
        }

        return (
            <div className={styles.root}>
                <Layout className={styles.layout}>
                    <Header>
                        <Link to={"/"}>
                            <div className={styles.logo}>GitCom</div>
                        </Link>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><Link to={"/"}><Icon type={"share-alt"}/>Explore</Link></Menu.Item>
                            {loginOrHomeLink}
                            <Menu.Item key="help"><Link to={"/help"}><Icon type={"question-circle"}/>Help</Link></Menu.Item>
                            {
                                window.App.isAuthorized() ?
                                    <Menu.Item key="4"><Link onClick={this.logout} to={"/login"}>Logout</Link></Menu.Item>
                                    : null
                            }
                        </Menu>
                    </Header>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                    <Footer style={{textAlign: 'center'}}>
                        GitCom <Icon type={"copyright"}/> 2019-2020
                    </Footer>
                </Layout>
            </div>
        );
    }
}

export default AppLayout;