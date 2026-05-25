import React from 'react';
import './App.css';
import { Layout, Typography, Space } from 'antd';
import { Navbar, HomePage, Exchanges, Cryptocurrencies, News, CryptoDetails } from "./components";
import { Route, Link, Routes } from 'react-router-dom';
function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<HomePage />} />
              <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route exact path='/exchanges' element={<Exchanges />} />
              <Route exact path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route exact path='/news' element={<News />} />
            </Routes>

          </div>
        </Layout>

        <div className='footer'>
          <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
            Cryptoverse <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to="/"> Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            <Link to="/exchanges"> Exchanges</Link>
            <Link to="/news"> News </Link>
          </Space>
          {/* <p style={{color:'white' , paddingTop: "5px"}}>Copyright © 2024 made by 
            <a href='https://madyelshshaht.github.io/My-Profile/por.html' target="_blank" rel="noreferrer" style={{color: "#0071bd" }}>
             MohamedElshahat 
             </a>
              </p> */}
        </div>
      </div>
    </div>
  );
}

export default App;
