import React from "react";
import { Col, Row, Typography, Avatar, Collapse } from "antd";

import { useGetCryptosQuery } from "../Services/CryptoApi";
import millify from "millify";
import Loader from "./Loader";

import { MoneyCollectOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptosQuery(100);
    const Cryptodata = data?.data.coins;
    console.log("Cryptodata", Cryptodata);

    if (isFetching) return <Loader />;

    return (
        <>
            <div
                className="header"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <Title level={2} className="home-title" style={{ textAlign: "center" }}>
                    Exchanges
                </Title>
                <MoneyCollectOutlined
                    style={{ fontSize: "30px", marginTop: "-10px" }}
                />
            </div>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {Cryptodata?.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                header={
                                    <Row key={exchange.id}>
                                        <Col span={6}>
                                            <Text>
                                                <strong>{exchange.rank}.</strong>
                                            </Text>
                                            <Avatar
                                                className="exchange-image"
                                                src={exchange.iconUrl}
                                            />
                                            <Text>
                                                <strong>{exchange.name}</strong>
                                            </Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                                        <Col span={6}>{millify(exchange.marketCap)}</Col>
                                        <Col span={6}>{millify(exchange.change)}%</Col>
                                    </Row>
                                }
                            >
                                <span>
                                    {exchange.name} is a digital currency with a finite supply,
                                    allowing users to send/receive money without a central
                                    bank/government, often nicknamed.{" "}
                                    <a
                                        href={exchange.coinrankingUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        details
                                    </a>{" "}
                                </span>
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;
