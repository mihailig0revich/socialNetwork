import React from 'react';
import s from './sidebar.module.css';
import { NavLink } from 'react-router-dom';

const UserUnit = (props) => {
    return (
        <li>{props.name}</li>
    );
}

const Sidebar = (props) => {
    let peopleData = [
        {name: "Ярик"},
        {name: "Паша"},
        {name: "Надя"},
        {name: "Настя"},
        {name: "Миша"}
    ];

    let users = peopleData.map((item)=>{
        return (
            <UserUnit name = {item.name}/>
        );
    });

    return (
        <sidebar className = {s.sideBar}>
            <ul className = {s.menu}>
                <li>
                    <NavLink 
                        className = {s.navElement} 
                        to = {"/Profile/" + props.auth.id}
                    >
                        <p 
                            className={s.sideButton}
                        >
                            Профиль
                        </p>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className = {s.navElement} 
                        to = {"/Messages"}
                    >
                        <p 
                            className={s.sideButton}
                        >
                            Сообщения
                        </p>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className = {s.navElement} 
                        to = {"/User"}
                    >
                        <p 
                            className={s.sideButton}
                        >
                            Пользователи
                        </p>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        className = {s.navElement} 
                        to = {"/Settings"}
                    >
                        <p 
                            className={s.sideButton}
                        >
                            Настройки
                        </p>
                    </NavLink>
                </li>
                <li 
                    className = {s.navElement}
                    onClick = {props.logout}
                >
                    <p 
                        className={s.sideButton}
                    >
                        Выход
                    </p>
                </li>
            </ul>
        </sidebar>
    );
}

export default Sidebar;