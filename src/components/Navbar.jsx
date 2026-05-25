import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
    HomeOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    FundOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Icon from "../images/cryptocurrency.png"
const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setscreenSize] = useState(null)

    useEffect(() => {
        const handleresize = () => setscreenSize(window.innerWidth);
        window.addEventListener("resize", handleresize);

        handleresize();

        return () => window.addEventListener("resize", handleresize);
    }, [])
    useEffect(() => {
        if (screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar size="large" src={Icon} />
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={ ()=> setActiveMenu(!activeMenu) }>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
};

export default Navbar;
