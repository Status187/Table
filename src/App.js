import React from 'react'
import styled from 'styled-components'
import {Table} from "./component/Table";
import * as api from "./api/UsersApi";
import {getAccess, getAuth} from "./api/UsersApi";
import {ButtonAddUser} from "./component/ButtonAddUser";
import {AddUserModal} from "./component/AddUserModal";

// import makeData from './makeData'

const StylesWrapper = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 3px solid black;
    margin: 50px auto 0 auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function App() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Аватар',
                columns: [
                    {
                        Header: 'Изображения',
                        accessor: () => <img src='http://forumavatars.ru/i/default_avatar.jpg' alt='avatar'/>,
                    },
                ],
            },
            {
                Header: 'Info',
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
                        Header: 'Username',
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
                ],
            },
        ],
        []
    )

    const [isOpen, setIsOpen] = React.useState(false)

    const [data, setData] = React.useState()

    React.useEffect( () => {
            api.getUsers(0, 'asc').then((users) => {
                setData(users);
            })
    }, [])

    return ( data ?
        <StylesWrapper>
            <Table columns={columns} data={data} />
            <ButtonAddUser showModal={() => {setIsOpen(true)}}/>
            <AddUserModal isOpen={isOpen} closeModal={() => {setIsOpen(false)}}/>
        </StylesWrapper>
            : <div>Loading</div>
    )
}

export default App;
