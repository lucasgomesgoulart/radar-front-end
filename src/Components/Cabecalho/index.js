import styled from 'styled-components'
import React from 'react';
import { Input, Row, Col } from 'antd';


const Cabecalho = () => {

    const links = ['', '']

    const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`

    const Opcoes = styled.ul`
    display: flex;
    justify-content: center;
    gap: 10px;
`


    const Texto = styled.p`
    font-size: 22px;
    &:hover,
    &:focus{
        color: #ff0000;
    }
`

    return (
        <>
            <Row>
                <Col span={24} style={{ backgroundColor: '#F1f2f3' }}>
                    <Opcoes>
                        {links.map((link) => (
                            <Opcao>
                                <Texto>{link}</Texto>
                            </Opcao>
                        ))}
                    </Opcoes>
                </Col>
            </Row>
        </>
    )
}

export default Cabecalho;