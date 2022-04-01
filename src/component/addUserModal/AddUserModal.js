import Modal from 'react-modal';
import React from "react";
import * as api from "../../api/UsersApi";
import { useForm } from "react-hook-form";
import s from "./AddUserModal.module.css"

// api.addUser(data);
export const AddUserModal = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    let keyNext = 1;

    Modal.setAppElement("#root")

    const [organizations, setOrganizations] = React.useState([])

    React.useEffect( () => {
        api.organizations().then((data) => {
            setOrganizations(data);
        })
    }, [])

    const {isOpen, closeModal} = props;
    return (
        <Modal className={s.modal}
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Пример модального"
        >
            <h2 className={s.h2}>Создание пользователя</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
                <label className={s.labelWrapper}>Имя:
                    <input {...register("name", { required: true })} />
                </label>
                <label className={s.labelWrapper}>Фамилия:
                    <input {...register("lastName", { required: true })} />
                </label>
                <label className={s.labelWrapper}>E-mail:
                    <input type="email" {...register("email", { required: true })} />
                </label>
                <label className={s.labelWrapper}>Пароль:
                    <input type="password" {...register("password", { required: true }) } />
                </label>
                <label className={s.labelWrapper}>Роль:
                    <select name="select">
                        {organizations.map((item) => {
                            keyNext += 1;
                            console.log(item)
                            return <option value={item.id} key={`${keyNext}`}>{item.companyTitle}</option>

                        })}
                    </select>
                </label>
                <label className={s.labelWrapper}>Организация:
                    <select name="select">
                        {organizations.map((item) => {
                            keyNext += 1;
                            return <option value={item.id} key={`${keyNext}`}>{item.companyTitle}</option>
                        })}
                    </select>
                </label>
                <label className={s.labelWrapper}>Дата рождения:
                    <input type="date" {...register("date", { required: true })} />
                </label>
                <div className={s.buttonWrapper}>
                    <button onClick={closeModal}>Закрыть</button>
                    <button type="submit">Сохранить</button>
                </div>
            </form>

        </Modal>
    )
}