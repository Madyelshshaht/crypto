import React, { useState } from 'react'
import millify from 'millify'
import { Col, Typography, Select, Row } from 'antd';
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser/lib/index';
import { useGetCrypioIdQuery, useGetCryptoHistoryQuery } from '../Services/CryptoApi';
import LineChart from './LineChart';
import Loader from './Loader';

// Declare Normal
const { Title, Text } = Typography;
// const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const { timePeriod, setTimePeriod } = useState('7d');
    // const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const { data: coinHistory } = useGetCryptoHistoryQuery(coinId, timePeriod)
    console.log("coinHistory", coinHistory)
    // CryptoId Api 

    const { data, isFetching } = useGetCrypioIdQuery(coinId);
    const cryptoDetails = data?.data.coin;
    // console.log(cryptoDetails);

    if (isFetching) return <Loader />;
    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    return (
        <>
            <Col className='coin-detail-container'>
                {/* Header */}
                <Col className='coin-heading-container' style={{ backgroundImage: `url(${cryptoDetails.iconUrl})` }}>
                    {/* <img src={cryptoDetails.iconUrl} alt="..." style={{width:'50px' }}/> */}
                    <Title level={2} className='coin-name'>
                        {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                    </Title>
                    <p style={{ marginBottom: '10px' }}>
                        {cryptoDetails.name} live Price in US dollars.
                        View value statistics , market cap and supp;y.
                    </p>
                </Col>
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
                {/* Column 1 */}
                <Col className='stats-container'>
                    <Col className='coin-value-statistics'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-detailes-heading'>
                                {cryptoDetails.name} Value statistics
                            </Title>
                            <p>
                                An overview showing the stats of {cryptoDetails.name}
                            </p>
                        </Col>
                        {stats.map(({ icon, title, value }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        )
                        )}
                    </Col>
                    <Col className='other-stats-info'>
                        <Col className='coin-value-statistics-heading'>
                            <Title level={3} className='coin-detailes-heading'>
                                Other statistics
                            </Title>
                            <p>
                                An overview showing the stats of all cryptocurrencies
                            </p>
                        </Col>
                        {genericStats.map(({ icon, title, value }) => (
                            <Col className='coin-stats'>
                                <Col className='coin-stats-name'>
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className='stats'>{value}</Text>
                            </Col>
                        )
                        )}
                    </Col>
                </Col>
                {/* Column 2 */}
                <Col className='coin-desc-link'>
                    <Row className='coin-desc'>
                        <Title level={3} className='coin-heading'>
                            What is {cryptoDetails.name}
                        </Title>
                        <Title level={3} className='coin-details-heading'>
                            {HTMLReactParser(cryptoDetails.description)}
                        </Title>
                    </Row>
                    <Col className='coin-links'>
                        <Title level={3} className='coin-heading'>
                            {cryptoDetails.name} Links
                        </Title>
                        {cryptoDetails.links.map((link) => (
                            <Row className='coin-link' key={link.name}>
                                <Title level={5} className='link-name'>
                                    {link.type}
                                </Title>
                                <a href={link.url} target='_blank' rel="noreferrer">
                                    {link.name}
                                </a>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
        </>
    )
}

export default CryptoDetails;


// {/* SearchOption */}
// {/* <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: 'solid #d9d9d9 1px', marginTop: '10px' }}>
//     <Select
//         defaultValue="7d"
//         className='select-timeperiod'
//         placeholder="Select Time Period"
//         // onChange={(e) =>  { setTimePeriod(e.value) } }
//     >
//         {time.map((date) => (<Option key={date} value={date}>{date}</Option>))}
//     </Select> 
// </Col>*/}
