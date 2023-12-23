import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/sidebar2.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Sidebarx = () => {
    const [contentPerfil, setContentPerfil] = useState(false)
    const [contentAdmPaciente, setContentAdmPaciente] = useState(false)
    const [contentadmCuenta, setContentadmCuenta] = useState(false)
    const [contentNavega, setContentNavega] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { actions, store } = useContext(Context)
    const navigate = useNavigate();
    console.log(store)
    const toggle = () => setIsOpen(!isOpen)

    // const guardarId = async () => {
    //     try {
    //         // Agrego el await antes del Axios
    //         let response = await fetch(`${API_URL}/api/user-data`, {
    //             method: 'GET',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${getAuthToken("token")}`
    //             },
    //             // body: JSON.stringify([])
    //         });
    //         console.log(response)
    //          //Asegurate si viene en response o response.data y usa el correspondiente, axios generalmente tiene .data
    //         if(response.ok){
    //             let body = response.json()
    //             console.log(body)
    //             console.log("aaaaaaaaaaaaaaaaaaaaaa")
    //           navigate(`/calendar_today/${id}/`, { state: {id: body.id} });
    //           // o este otro
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    
    const id = {
        id: store.userData.id
    };
    console.log(id)
    let calendar = "calendar"
    let calendar_today = "calendar_today"
    
    function handleClick(a) {
    navigate(`/${a}/${store.userData.id}`);
    console.log(a)
    }
    
    
    // return (
    // <div>
    // <h1>Componente 2</h1>
    // <button type="button" onClick={handleClick}>
    //     Ir a Componente 1 pasando objeto
    // </button>
    // </div>
    // );
    

    useEffect(() => {
        actions.handle_user_data()
    }, [])

    useEffect
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
                            <li onClick={() => handleClick(calendar_today)} >
                                <a>
                                    <i class="fa-solid fa-book"></i>
                                    <span className="links_name"  style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Agenda del dia</span>
                                    {/* { contentPerfil == true && isOpen == true ? <span className="links_name" onClick={handleClick()} style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Agenda del dia</span> :<span className="links_name" style={{ opacity: isOpen ? "1" : "0", display: !isOpen ? "none" : "block" }}>Agenda del dia</span>} */}
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
                            <li onClick={() => handleClick(calendar)} >
                                <a>
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