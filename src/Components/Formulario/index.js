import styled from 'styled-components'
import React, { useCallback, useEffect } from 'react';
import { Input, Form, Table, Button, Modal, DatePicker, Select } from 'antd';
import { useState } from 'react';
import api from '../../api'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'


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
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')
    // função para cadastrar no banco


    //MODAL
    const showModal = (editing, record) => {
        setIsModalOpen(true)
        setEditMode(editing)
        if (record) {
            setName(record.name)
            setEmail(record.email)
            setDatebirthday(dayjs(record.datebirthday))
            setPhone(record.phone)
            setSex(record.sex)
            setId(record.user_id)
        } else {
            setName('')
            setEmail('')
            setDatebirthday('')
            setPhone('')
            setSex('')
            setId('')
        }
    };
    const handleOk = () => {
        if (editMode) {
            updateUser()
        } else {
            onRegisterPressed()
        }
        setIsModalOpen(false);
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
    const findUsers = useCallback((filter= '') => {
        api.get(`/select?name=${filter}`).then((response) => {
            setDataSource(response.data)
        })
            .catch(() => {
                console.log('erro')
            })
    }, [])

    useEffect(() => {
        findUsers()
    }, [findUsers])

    const onRegisterPressed = async () => {
        try {
            const data = await api.post('/insert', {
                name: name,
                sex: sex,
                datebirthday: datebirthday,
                phone: phone,
                email: email
            }).then(response => {
                if (response.status == 200) {
                    findUsers()
                }
            })
        } catch {
            console.log('t')
        }
    }

    // TABLE ANTD
    const columns = [
        {
            key: 'name',
            title: 'Full name',
            dataIndex: 'name'
        },
        {
            key: 'email',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: 'datebirthday',
            title: 'Date birthday',
            dataIndex: 'datebirthday'
        },
        {
            key: 'phone',
            title: 'Phone',
            dataIndex: 'phone'
        },
        {
            key: 'sex',
            title: 'Sex',
            dataIndex: 'sex'
        },
        {
            key: 'action',
            title: 'Actions',
            render: (record) => {
                return <>
                    <EditOutlined onClick={() => showModal(true, record)} style={{ color: 'blue', marginRight: '25px', fontSize: 20 }} />
                    <DeleteOutlined onClick={() => onDelete(record)} style={{ color: 'red', fontSize: 20 }} />
                </>
            }
        }
    ]

    const onDelete = async (record) => {
        Modal.confirm({
            title: 'Are you sure you want to delete it?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                api.delete(`deletar/${record.user_id}`).then(() => {
                    findUsers()
                })
            }
        })
    }

    const updateUser = async () => {
        const data = await api.put(`update/${id}`, {
            name,
            email,
            sex,
            phone,
            datebirthday
        })
        
        if (data.status == 200) {
            findUsers()
        }

    }

    return (
        <ContainerForm>
            <Modal open={isModalOpen} closable={true} okText={editMode ? 'Edit' : 'Add'} onOk={handleOk} onCancel={handleCancel}>
                <Form>
                    <div>
                        <InputCustom value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        <InputCustom value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <Selectantd value={sex} placeholder='Your sex' onChange={selectChange}>
                            <Option value="m">Masculine</Option>
                            <Option value="f">Feminine</Option>
                        </Selectantd>
                        <InputCustom value={phone} placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <Picker placeholder='Your Birthday' format={"DD/MM/YYYY"} value={datebirthday} onChange={onChangePicker} />
                    </div>
                </Form>
            </Modal>

            <TableAntd
                columns={columns}
                dataSource={dataSource}
            >
            </TableAntd>

            <ContainerBotoes>
                <ButtonCustom
                    type='primary'
                    onClick={() => showModal(false, undefined)}
                >
                    Add New
                </ButtonCustom>

                <Input placeholder='Search user by name' onChange={e => {
                    const text = e.target.value
                    findUsers(text)
                }}
                />
            </ContainerBotoes>
        </ContainerForm>
    )
}

export default Formulario
