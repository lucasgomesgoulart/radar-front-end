import styled from 'styled-components'
import React, { useEffect } from 'react';
import { Input, Form, Table, Button, Modal, DatePicker, Select } from 'antd';
import { useState } from 'react';
import api from '../../api'

const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 150px;
`
const ContainerInputs = styled.div`
    display: flex;
    justify-content: space-between;
    width: 65%;
    gap: 25px;
    `

const TableAntd = styled(Table)`
    /* display: flex; */
    width: 50%;
    `
const InputCustom = styled(Input)`
    width: 100px;
    margin-top: 15px;    
    `

const Picker = styled(DatePicker)`
    width: 150px;
    margin-top: 15px;
    `

const Selectantd = styled(Select)`
    width: 110px;
    margin-top: 13px;
`

const Formulario = () => {
    const [dataSource, setDataSource] = useState([])
    const { Option } = Select;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [datebirthday, setDatebirthday] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    // função para cadastrar no banco
    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/insert', {
                name: name,
                sex: sex,
                datebirthday: datebirthday,
                phone: phone,
                email: email
            })
            if (data.status === 200) {
                console.log(data)
                alert(data.data.message)
            } else {
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //MODAL
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        onRegisterPressed()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // FIM MODAL

    // SELECT ANTD
    const selectChange = (value) => {
        setSex(value)
    }

    // DatePicker ANTD
    function onChangePicker(dateString) {
        setDatebirthday(dateString)
        console.log(datebirthday);
    }


// listando usuarios
    useEffect(() => {
        api.get('/select').then((response) => {
            setDataSource(response.data)

        })
            .catch(() => {
                console.log('erro')
            })
    },[])


// TABLE ANTD
const columns = [
        {
            key: 1,
            title: 'Full name',
            dataIndex: 'name'
        },
        {
            key: 2,
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 3,
            title: 'Date birthday',
            dataIndex: 'datebirthday'
        },
        {
            key: 4,
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            key: 5,
            title: 'Sex',
            dataIndex: 'sex'
        },
    ]

    return (
        <ContainerForm>
            <Button
                type='primary'
                onClick={showModal}
            >
                Add new
            </Button>

            <Modal open={isModalOpen} closable={true} okText={'Add'} onOk={handleOk} onCancel={handleCancel}>
                <ContainerInputs>
                    <Form>
                        <div>
                            <InputCustom value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
                            <InputCustom value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <Selectantd value={sex} placeholder='Your sex' onChange={selectChange}>
                                <Option value="m">Masculine</Option>
                                <Option value="f">Feminine</Option>
                            </Selectantd>
                            <InputCustom value={phone} placeholder='phone' onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <Picker value={datebirthday} placeholder='Your Birthday' format={"D/M/YYYY"} onChange={onChangePicker} />
                        </div>
                    </Form>
                </ContainerInputs>
            </Modal>
            <TableAntd
                columns={columns}
                dataSource={dataSource}
            >
            </TableAntd>
        </ContainerForm>
    )
}

export default Formulario
