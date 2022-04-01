const USE_MOCKS = false;

const data = {
    "email": "superuser",
    "password": "superuser"
}

export const getUsers = async (page, sort) => {
    await getAuth()
    return USE_MOCKS ? Promise.resolve(
        [
            {
                "id": 1,
                "email": "admin",
                "active": true,
                "user": {
                    "id": 1,
                    "name": "lupa",
                    "lastName": "pupa",
                    "birthDate": "2000-08-19T09:20:51.071"
                },
                "roles": [
                    {
                        "name": "ROLE_ADMIN"
                    },
                    {
                        "name": "ROLE_USER"
                    }
                ],
                "organization": {
                    "companyTitle": "arSoft",
                    "isBlocked": false,
                    "license": {
                        "id": 1,
                        "endLicenseDate": "2035-08-23T13:54:31"
                    },
                    "blocked": false
                }
            },
            {
                "id": 2,
                "email": "user",
                "active": true,
                "user": {
                    "id": 3,
                    "name": "lupa",
                    "lastName": "pupa",
                    "birthDate": "2000-08-19T09:20:51.071"
                },
                "roles": [
                    {
                        "name": "ROLE_USER"
                    }
                ],
                "organization": {
                    "companyTitle": "arSoft",
                    "isBlocked": false,
                    "license": {
                        "id": 1,
                        "endLicenseDate": "2035-08-23T13:54:31"
                    },
                    "blocked": false
                }
            }
        ]
    )
        : fetch(`/account/api?page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer_${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                return response.json();
            })
};

let token = '';

export const getAuth = (page, sort) => {
    return token ? Promise.resolve() : fetch(`/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                token = response.token;
            })

};

export const organizations = async () => {
    await getAuth()
    return fetch(
        `/organization`, {
            headers: {
                Authorization: `Bearer_${token}`,
            }
        }
    )
        .then(response => {
            return response.json();
        })
        .then(data => data.data)
};

// export const getImage = (page, sort) => {
//     return USE_MOCKS ? Promise.resolve(
//     )
//         : fetch(
//         `http://23.111.202.224:8093/account/api?page=${page}&sort=${sort}`
//     )
// };
