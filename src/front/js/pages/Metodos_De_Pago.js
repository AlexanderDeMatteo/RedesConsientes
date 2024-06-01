import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";
import "../../styles/pagina_principal.css";


export const MetodosDePago = () => {
    
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
        actions.handle_payment_data();
    }, []);

    function changeSelect(e) {
        const { name } = e.target;
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


    function handleChange(event) {
     
        actions.handle_payment_edit(event.target.value, event.target.name);

    }



    const onDeleter = (e, value) => {
        e.preventDefault();
        let element = lista.la_lista.filter((name) => name !== value);
 
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
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Correo
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="email"
                                                                            className="form-control"
                                                                            name="zell_email"
                                                                            placeholder="Correo"
                                                                            value={store.userPaymentData.zell_email || ""}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.zell_email}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>




                                                        <div className="form-group row">
                                                            <div className="offset-sm-2 col-sm-10">
                                                                <button
                                                                    type="submit"
                                                                    onClick={Editar}
                                                                    className="btn btn-danger"
                                                                >
                                                                    {!show ? "Guardar" : "Editar"}
                                                                </button>
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
                                                            className="col-sm-2 col-form-label"
                                                        >
                                                            Usdt
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <div>
                                                                {!show ? (
                                                                    <input
                                                                        onChange={handleChange}
                                                                        type="email"
                                                                        className="form-control"
                                                                        name="binance_route"
                                                                        placeholder="Ruta USDT"
                                                                        value={store.userPaymentData.binance_route}
                                                                    />
                                                                ) : (
                                                                    <p className="text-muted mb-0">
                                                                        {store.userPaymentData.binance_route}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <div className="offset-sm-2 col-sm-10">
                                                            <button
                                                                type="submit"
                                                                onClick={Editar}
                                                                className="btn btn-danger"
                                                            >
                                                                {!show ? "Guardar" : "Editar"}
                                                            </button>
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
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="paypal_name"
                                                                            placeholder="Nombre de la cuenta Paypal"
                                                                            value={store.userPaymentData.paypal_name}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.paypal_name}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Usuario
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="text"
                                                                            className="form-control"
                                                                            name="paypal_user"
                                                                            placeholder="Usuario de Paypal"
                                                                            value={store.userPaymentData.paypal_user || ""}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.paypal_user}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Correo
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="email"
                                                                            className="form-control"
                                                                            name="paypal_email"
                                                                            placeholder="Correo"
                                                                            value={store.userPaymentData.paypal_email || ""}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.paypal_email}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="form-group row">
                                                            <div className="offset-sm-2 col-sm-10">
                                                                <button
                                                                    type="submit"
                                                                    onClick={Editar}
                                                                    className="btn btn-danger"
                                                                >
                                                                    {!show ? "Guardar" : "Editar"}
                                                                </button>
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
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Banco
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="email"
                                                                            className="form-control"
                                                                            name="pagomovil_bank"
                                                                            placeholder="ingrese el Banco"
                                                                            value={store.userPaymentData.pagomovil_bank || ""}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.pagomovil_bank}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Cedula
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="email"
                                                                            className="form-control"
                                                                            name="pagomovil_ci"
                                                                            placeholder="ingresa cedula de identidad"
                                                                            value={store.userPaymentData.pagomovil_ci}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.pagomovil_ci}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="form-group row">
                                                            <label
                                                                for="inputName"
                                                                className="col-sm-2 col-form-label"
                                                            >
                                                                Numero Telefonico
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <div>
                                                                    {!show ? (
                                                                        <input
                                                                            onChange={handleChange}
                                                                            type="tel"
                                                                            className="form-control"
                                                                            name="pagomovil_phone"
                                                                            placeholder="ingresa el numero telefonico"
                                                                            value={store.userPaymentData.pagomovil_phone || ""}
                                                                        />
                                                                    ) : (
                                                                        <p className="text-muted mb-0">
                                                                            {store.userPaymentData.pagomovil_phone}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <div className="offset-sm-2 col-sm-10">
                                                                <button
                                                                    type="submit"
                                                                    onClick={Editar}
                                                                    className="btn btn-danger"
                                                                >
                                                                    {!show ? "Guardar" : "Editar"}
                                                                </button>
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
