import styled from 'styled-components'
import React, { useEffect } from 'react';
import { Input, Form, Table, Button, Modal, DatePicker, Select} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react';
import api from '../../api'


const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 120px;
`

const TableAntd = styled(Table)`
    /* display: flex; */
    width: 50%;
    `
const InputCustom = styled(Input)`
    width: 150px;
    margin-top: 15px;
    margin-right: 15px;
    `

const Picker = styled(DatePicker)`
    width: 315px;
    margin-top: 15px;
    `

const Selectantd = styled(Select)`
    width: 150px;
    margin-top: 13px;
    margin-right: 15px;
`

const ButtonCustom = styled(Button)`
    width: 200px;
`

const ContainerBotoes = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
`
const Formulario = () => {
    const { Option } = Select;
    const [dataSource, setDataSource] = useState([])
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
    const [gridData, setGridData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const response = await api.get('/select').then((response) => {
            setGridData(response.data)
            setLoading(false)
        })
    }

 

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
            title: 'Birthday',
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
        {
            key: 6,
            title: 'Options',
            dataIndex: 'options',
            render: (record) => {
                return <>
                    <EditOutlined onClick={deleteUser(record)} style={{ color: 'blue', marginRight: '25px', fontSize: 20 }}/>
                    <DeleteOutlined style={{ color: 'red', fontSize: 20}} />
                </>
            }
        },
    ]

    const deleteUser = async (record) =>{
        const response = await api.delete(`/deletar/${record}`)
        response(gridData)
    }

    return (
        <ContainerForm>
            <Modal open={isModalOpen} closable={true} okText={'Add'} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <div>
                        <InputCustom value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        <InputCustom value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Selectantd placeholder='Your sex' onChange={selectChange}>
                            <Option value="m">Masculine</Option>
                            <Option value="f">Feminine</Option>
                        </Selectantd>
                        <InputCustom value={phone} placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <Picker placeholder='Your Birthday' format={"D/M/YYYY"} onChange={onChangePicker} />
                    </div>
                </Form>
            </Modal>

            <TableAntd
                columns={columns}
                dataSource={gridData}
            >
            </TableAntd>

            <ContainerBotoes>
                <ButtonCustom
                    type='primary'
                    onClick={showModal}
                >
                    Add New
                </ButtonCustom>

                <Input placeholder='Search user by name' onChange={e => {
                    const text = e.target.value
                    const result = gridData.filter(user => user.name.includes(text))
                    setGridData(result)
                }}
                />
            </ContainerBotoes>
        </ContainerForm>
    )
}

export default Formulario
