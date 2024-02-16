import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/pagina_principal.css";


export const MetodosDePagoPaciente = (id) => {
    
    const API_URL = process.env.BACKEND_URL;
    const [show, setShow] = useState(true);
    const [lista, setLista] = useState({
        la_lista: [],
    });

    const [profileUser, setProfile] = useState({});
    const [modal, setmodal] = useState();
    const { actions, store } = useContext(Context);
    const [selectedTab, setSelectedTab] = React.useState({
        li_0: { nav: "nav-link active", tab: "active tab-pane" },
        li_1: { nav: "nav-link", tab: "tab-pane" },
        li_2: { nav: "nav-link", tab: "tab-pane" },
        li_3: { nav: "nav-link", tab: "tab-pane" },
        li_4: { nav: "nav-link", tab: "tab-pane" },
        li_5: { nav: "nav-link", tab: "tab-pane" },
        li_6: { nav: "nav-link", tab: "tab-pane" },
    });

    useEffect(() => {
        // actions.privateData()
        actions.psicology_payment_data(id.psicologoID);
    }, []);
    console.log(id.psicologoID)
    function changeSelect(e) {
        const { name } = e.target;
        console.log(store);
        if (e.target.name && selectedTab[name].nav === "nav-link") {
            Object.filter = (obj, predicate) =>
                Object.keys(obj)
                    .filter((key) => predicate(obj[key]))
                    .reduce((res, key) => ((res[key] = obj[key]), res), {});
            let result = Object.filter(
                selectedTab,
                (score) => score.nav === "nav-link active"
            );
            let [firstKey] = Object.keys(result);

            setSelectedTab((prevSelected) => ({
                ...prevSelected,
                [name]: { nav: "nav-link active", tab: "active tab-pane" },
                [firstKey]: { nav: "nav-link", tab: "tab-pane" },
            }));
        } else if (e.target.name) {
            console.log("bbb");
            setSelectedTab((prevSelected) => ({
                ...prevSelected,
                [name]: { nav: "nav-link", tab: "tab-pane" },
            }));
        }
    }


    function Editar() {
        if (!show) {
            guardar();
        }
        setShow((wasShow) => !wasShow);
    }

    function Editar2() {
        if (!show) {
            guardarExperience();
        }
        setShow((wasShow) => !wasShow);
    }

    function Editar3() {
        if (!show) {
            guardarExperience();
        }
        setShow((wasShow) => !wasShow);
    }

    function handleChange(event) {
        console.log(event.target.value)
        console.log(event.target.name)
        actions.handle_payment_edit(event.target.value, event.target.name);

    }



    const onDeleter = (e, value) => {
        e.preventDefault();
        let element = lista.la_lista.filter((name) => name !== value);
        console.log(element, "Line 64");
        setLista((prevLista) => {
            return {
                la_lista: element,
            };
        });
    };


    const guardar = async () => {
        const response = await fetch(`${API_URL}/api/payment-accounts`, {
            method: "PUT",
            body: JSON.stringify(store.userPaymentData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.ok) {
            alert("datos actualizados");
            actions.handle_payment_data();
        }

    };
    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Metodos de pago</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills" id="seleccionadorPerfil">
                                            <li onClick={changeSelect} className="nav-item">
                                                <a
                                                    className={selectedTab["li_0"].nav}
                                                    name="li_0"
                                                    data-toggle="tab"
                                                >
                                                    Zelle
                                                </a>
                                            </li>
                                            <li onClick={changeSelect} className="nav-item">
                                                <a
                                                    className={selectedTab["li_1"].nav}
                                                    name="li_1"
                                                    data-toggle="tab"
                                                >
                                                    Binance
                                                </a>
                                            </li>

                                            <li onClick={changeSelect} className="nav-item">
                                                <a
                                                    className={selectedTab["li_2"]["nav"]}
                                                    name="li_2"
                                                    data-toggle="tab"
                                                >
                                                    Paypal
                                                </a>
                                            </li>


                                            < li onClick={changeSelect} className="nav-item">
                                                <a
                                                    className={selectedTab["li_3"]["nav"]}
                                                    name="li_3"
                                                    data-toggle="tab"
                                                >
                                                    Pagomovil
                                                </a>
                                            </li>


                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className={selectedTab["li_0"]["tab"]} id="timeline">
                                                <div className="post clearfix">
                                                    <div className="user-block">

                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Correo
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {store.userPaymentData.zell_email ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.zell_email}
                                                                        </p>
                                                                    ) : (
                                                                        <p>
                                                                            El usuario no tiene información de pago
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>




                                                        
                                                    </div>
                                                </div>

                                            </div>
                                            <div className={selectedTab["li_1"]["tab"]} id="activity">
                                                <div className="form-horizontal">
                                                    <div className="form-group row">
                                                        <label
                                                            for="inputName"
                                                            className="col-sm-2 "
                                                        >
                                                            Usdt
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <div>
                                                                {store.userPaymentData.binance_route ? (
                                                                    
                                                                    <p className="text-muted mb-0">
                                                                        {store.userPaymentData.binance_route}
                                                                    </p>
                                                                ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                            </div>

                                            <div className={selectedTab["li_2"]["tab"]} id="timeline">
                                                <div className="tab-pane" id="settings">
                                                    <div className="form-horizontal">
                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {store.userPaymentData.paypal_name ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.paypal_name}
                                                                        </p>
                                                                    ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Usuario
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {store.userPaymentData.paypal_user ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.paypal_user}
                                                                        </p>
                                                                    ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Correo
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {store.userPaymentData.paypal_email ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.paypal_email}
                                                                        </p>
                                                                    ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>


                                                        
                                                    </div>
                                                </div>


                                            </div>
                                            <div className={selectedTab["li_3"]["tab"]} id="timeline">
                                                <div className="tab-pane" id="settings">
                                                    <div className="form-horizontal">
                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Banco
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {store.userPaymentData.pagomovil_bank ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.pagomovil_bank}
                                                                        </p>
                                                                    ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Cedula
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {store.userPaymentData.pagomovil_ci ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.pagomovil_ci}
                                                                        </p>
                                                                    ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 "
                                                            >
                                                                Telefono
                                                            </label>
                                                            <div className="col-sm-10 ">
                                                                <div>
                                                                    {store.userPaymentData.pagomovil_phone ? (
                                                                        
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.pagomovil_phone}
                                                                        </p>
                                                                    ) : (
                                                                    <p>
                                                                        El usuario no tiene información de pago
                                                                    </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        
                                                    </div>
                                                </div>


                                            </div>
                                            {/* perfil profecional */}


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}
