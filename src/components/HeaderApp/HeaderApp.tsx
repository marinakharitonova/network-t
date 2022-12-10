import React, {useContext, useEffect} from 'react';
import {Layout, Button, Image, Typography, Space} from 'antd';
import logo from '../../assets/images/logo.png'
import HeaderDropdown from "./HeaderDropdown/HeaderDropdown";
import {ColorContext} from "../../App";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchAuthorization} from "../../redux/features/authSlice";
import {Link} from "react-router-dom";

const {Header} = Layout;
const {Text} = Typography;

const HeaderApp = (): JSX.Element => {
    const context = useContext(ColorContext);

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.auth.status)
    const avatar = useAppSelector(state => state.profile.authorizedUserAvatar)
    const isUserAuthorized = useAppSelector(state => state.auth.isUserAuthorized)
    const login = useAppSelector(state => state.auth.login)!


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAuthorization())
        }
    }, [status, dispatch])

    let content
    if (status === 'succeeded') {
        content = (isUserAuthorized && avatar.status === 'succeeded') ?  (
            <HeaderDropdown login={login} avatar={avatar.src}/>
        ) : (
            <Link to="login">
                <Button type="text" style={{color: 'white'}}>Log in</Button>
            </Link>
        )
    } else {
        content = '';
    }

    return (
        <Header style={{background: context?.color}}>
            <div className="container">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Space align={'center'}>
                        <Image
                            width={36}
                            src={logo}
                            preview={false}
                        />
                        <Text strong={true} style={{color: 'white', fontSize: '24px'}}>NETWORK</Text>
                    </Space>
                    <div>
                        {content}
                    </div>
                </div>
            </div>
        </Header>
    )
}

export default HeaderApp