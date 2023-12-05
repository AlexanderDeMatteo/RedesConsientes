import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/sidebar2.css";
import { Context } from "../store/appContext";

export const Sidebarx = () => {

    const [contentPerfil, setContentPerfil] = useState(false)
    const [contentAdmPaciente, setContentAdmPaciente] = useState(false)
    const [contentadmCuenta, setContentadmCuenta] = useState(false)
    const [contentNavega, setContentNavega] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    // let sidebar = document.querySelector(".sidebar");
    // let closeBtn = document.querySelector("#btn");

    // closeBtn.addEventListener("click", () => {
    //     sidebar.classList.toggle("open");
    //     menuBtnChange();
    // });

    // function menuBtnChange() {
    //     if (sidebar.classList.contains("open")) {
    //         closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    //     } else {
    //         closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    //     }
    // }

    return (
        <>
            <div className="sidebar" style={{ width: isOpen ? "260px" : "85px" }} >
                <div className="logo-details">
                    <i class="fa-solid fa-bars" id="btn" onClick={toggle}></i>
                    <div className="logo_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Redesconscientes</div>
                </div>
                <ul className="nav-list">
                    <li>
                        <a onClick={() => setContentPerfil(!contentPerfil)}>
                            <i class="fa-regular fa-user"></i>
                            <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: isOpen ? "block" : "none" }} > Personal </span>
                        </a>
                        {/* <span className="tooltip">Personal</span> */}
                        {contentPerfil && <ul className="ulContent">
                            <li>
                                <a href="/perfil">
                                    <i class="fa-regular fa-address-card"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Perfil</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sessions">
                                    <i class="fa-solid fa-house-laptop"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Sesiones Online</span>
                                </a>
                            </li>
                            <li>
                                <a href="/calendar_today">
                                    <i class="fa-solid fa-book"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Agenda del dia</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <i class="fa-regular fa-address-book"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Contactos Personales</span>
                                </a>
                            </li>
                        </ul>}
                    </li>
                    <li>
                        <a onClick={() => setContentAdmPaciente(!contentAdmPaciente)}>
                            <i class="fa-solid fa-users"></i>
                            <span className="links_name" style={{ opacity: isOpen ? "1" : "0" }}>Administración de Pacientes</span>
                        </a>
                        {/* <span className="tooltip">Administración de Pacientes</span> */}
                        {contentAdmPaciente && <ul className="ulContent">
                            <li>
                                <a>
                                    <i class="fa-regular fa-folder"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Expedientes</span>
                                </a>
                            </li>
                            <li>
                                <a href="/calendar">
                                    <i class="fa-solid fa-book-open"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Manejo de Agenda</span>
                                </a>
                            </li>
                        </ul>}
                    </li>
                    <li>
                        <a onClick={() => setContentadmCuenta(!contentadmCuenta)}>
                            <i class="fa-solid fa-money-bill-trend-up"></i>
                            <span className="links_name" style={{ opacity: isOpen ? "1" : "0" }}>Administración de Cuenta</span>
                        </a>
                        {/* <span className="tooltip">Administración de Cuenta</span> */}
                        {contentadmCuenta && <ul className="ulContent">
                            <li>
                                <a>
                                    <i class="fa-solid fa-coins"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Facturación</span>
                                </a>
                            </li>
                            <li>
                                <a href="/metodosDePago">
                                    <i class="fa-solid fa-money-bill-transfer"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Modalidad de Pago</span>
                                </a>
                            </li>
                        </ul>}
                    </li>
                    <li>
                        <a onClick={() => setContentNavega(!contentNavega)}>
                            <i class="fa-solid fa-globe"></i>
                            <span className="links_name" style={{ opacity: isOpen ? "1" : "0" }}>Navega</span>
                        </a>
                        {/* <span className="tooltip">Navega</span> */}
                        {contentNavega && <ul className="ulContent">
                            <li>
                                <a>
                                    <i class="fa-regular fa-newspaper"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Noticias</span>

                                </a>
                            </li>
                            <li>
                                <a href="/buscador">
                                    <i class="fa-solid fa-users-viewfinder"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Buscador de Psicologos</span>

                                </a>
                            </li>
                            <li>
                                <a>
                                    <i class="fa-solid fa-store"></i>
                                    <span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Mercado</span>

                                </a>
                            </li>
                        </ul>}
                    </li>

                </ul>

            </div >



        </>
    )
}