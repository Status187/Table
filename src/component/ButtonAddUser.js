import React from "react";

export const ButtonAddUser = (props) => {
    const showModalForm = props.showModal
    return (
        <button type='button' onClick={showModalForm}>Создать пользователя</button>
    )
}

