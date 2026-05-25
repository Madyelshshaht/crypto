import React from "react";
import {  Row, Col, Card, Avatar, Typography } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import moment from "moment";
import Loader from "./Loader";
import { useGetFinanceNewsQuery } from "../Services/FinanceNewsApi";
const { Text, Title } = Typography;

const demoImage = 'https://i.pinimg.com/564x/2f/be/f1/2fbef1fc7dc4c95bf53228bc3df37cb1.jpg';
const News = ({ limit }) => {
  const { data: FinanceNwes, isFetching } = useGetFinanceNewsQuery();
  console.log(FinanceNwes);
  const news = FinanceNwes?.data?.news;
  console.log("finance =", news)

  const newstodisplay = limit ? news?.slice(0, limit) : news;
  if (isFetching) return <Loader />;
  return (
    <>
      <div className="header" style={{display: "flex" , justifyContent: "center" , alignItems: "center" , gap: "10px"}} >
        <Title level={1} className='home-title' style={{ textAlign: "center" }}>Latest News</Title>
        <BulbOutlined style={{fontSize: "30px" , marginTop: "-15px"}}/>
      </div>

      <Row gutter={[24, 24]} >

        {newstodisplay?.map((news, i) => (
          <Col lg={8} sm={12} xs={24}>
            <Card hoverable className="news-card" key={i}>
              <a href={news.article_url} target="_blanck" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={5} >{news.article_title}</Title>
                  <img src={news.article_photo_url || demoImage} alt="" className="img" />
                </div>
                <p>{news.snippet?.length > 100 ? `${news.snippet.slice(0, 100)}...` : news.snippet}</p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.subnews?.[0].images?.thumbnailProxied || demoImage} alt="" />
                    <Text className="provider-name">{news?.source}</Text>
                  </div>
                  <Text>{moment(news.post_time_utc).startOf('ss').fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}

      </Row>
    </>
  )
};

export default News;

