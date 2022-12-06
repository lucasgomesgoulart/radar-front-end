import styled from 'styled-components'
import React from 'react';
import { Input, Row, Col } from 'antd';


const Header = () => {
    return (
        <>
            <Row>
                <Col span={24} style={{ backgroundColor: '#F1f2f3' }}>
                    <h1>Cabecalho</h1>
                </Col>
            </Row>
        </>
    )
}

export default Header;