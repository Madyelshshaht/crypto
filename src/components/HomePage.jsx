import React from 'react'
import millify from 'millify'
import Cryptocurrencies from '../components/Cryptocurrencies'
import News from '../components/News'
import { Link } from 'react-router-dom';
import Loader from './Loader';

import {useGetCryptosQuery} from "../Services/CryptoApi"

import { Typography , Row , Col , Statistic } from 'antd' ;
const {Title} =  Typography;

const HomePage = () => {
    const {data , isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    console.log(globalStats);
    if(isFetching) return <Loader />;
    return (
        <>
            <Title level={2} className='Heading'> Global Crypto Stats </Title>
            <Row>
                <Col span={12} > <Statistic title="Total Cryptocurrencies" value={globalStats.totalCoins} /> </Col>
                <Col span={12} > <Statistic title="Total Exchanges" value= {millify(globalStats.totalExchanges)} /> </Col>
                <Col span={12} > <Statistic title="Total Market Cap" value= {millify(globalStats.totalMarketCap)} /> </Col>
                <Col span={12} > <Statistic title="Total 24h Volume" value= {millify(globalStats.total24hVolume)} /> </Col>
                <Col span={12} > <Statistic title="Total Markets" value= {millify(globalStats.totalMarkets)}  /> </Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={4} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified  />
            <div className="home-heading-container">
                <Title level={2} className='home-title'>Latest News</Title>
                <Title level={4} className='show-more'><Link to="/news">Show More</Link></Title>
            </div>
            <News limit={10} />
        </>
    )
}

export default HomePage
