import React from "react";
import s from "./ButtonAddUser.module.css"

export const ButtonAddUser = (props) => {
    const showModalForm = props.showModal
    return (
        <button className={s.button} type='button' onClick={showModalForm}>Создать пользователя</button>
    )
}

