import Modal from 'react-modal';
import React from "react";
import * as api from "../api/UsersApi";
import { useForm } from "react-hook-form";

export const AddUserModal = (props) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => api.addUser(data);

    Modal.setAppElement("#root")

    const [organizations, setOrganizations] = React.useState([])

    React.useEffect( () => {
            api.organizations().then((data) => {
                setOrganizations(data);
            })
    }, [])

    const {isOpen, closeModal} = props;
    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            // style={customStyles}
            contentLabel="Пример модального"
        >
            <h2>Создание пользователя</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Имя
                    <input {...register("name", { required: true })} />
                </label>
                <select name="select">
                    {organizations.map((item) => {
                        return <option value={item.id}>{item.companyTitle}</option>
                    })}
                </select>
                <button onClick={closeModal}>Закрыть</button>
                <button type="submit">Сохранить</button>
            </form>

        </Modal>
    )
}