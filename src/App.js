import React from 'react'
import styled from 'styled-components'
import {Table} from "./component/Table";
import * as api from "./api/UsersApi";
import {ButtonAddUser} from "./component/ButtonAddUser/ButtonAddUser";
import {AddUserModal} from "./component/addUserModal/AddUserModal";
import {StylesWrapper} from "./component/StylesWrapper/StylesWrapper";

function App() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Таблица',
                columns: [
                    {
                        Header: 'Имя',
                        accessor: 'user.name',
                    },
                    {
                        Header: 'Фамилия',
                        accessor: 'user.lastName',
                    },
                    {
                        Header: 'E-mail',
                        accessor: 'email',
                    },
                    {
                        Header: 'Роль',
                        accessor: (user, index) =>  user.roles.map( (role) => role.name).join(', '),
                    },
                    {
                        Header: 'Организация',
                        accessor: 'organization.companyTitle',
                    },
                    {
                        Header: 'Изображения',
                        accessor: () => <img src='http://forumavatars.ru/i/default_avatar.jpg' alt='avatar'/>,
                    },
                ],
            },
        ],
        []
    )

    const [isOpen, setIsOpen] = React.useState(false)

    const [data, setData] = React.useState()

    React.useEffect( () => {
            api.getUsers(0, 'asc').then((users) => {
                console.log(users);
                setData(users);
            })
    }, [])


    return ( data ?
        <StylesWrapper>
            <Table columns={columns} data={data} />
            <div className = 'bottomWrapper'>
                <div>Страницы</div>
                <ButtonAddUser showModal={() => {setIsOpen(true)}}/>
            </div>
            <AddUserModal isOpen={isOpen} closeModal={() => {setIsOpen(false)}}/>
        </StylesWrapper>
            : <div>Loading</div>
    )
}

export default App;
