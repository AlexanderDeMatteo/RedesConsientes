import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css"

export const Footer = () => (
	// <footer className=" footer mt-auto py-3 text-center">
	// 	<div>
	// 	<Link to={`https://www.x.com/`} id="icon" target="_blank"> <i class="fa-brands fa-square-x-twitter p-2 xx-large"></i></Link>
	// 	<Link to={`https://www.instagram.com/`} id="icon" target="_blank"><i class="fa-brands fa-instagram p-2"></i></Link>
	// 	<Link to={`https://www.facebook.com/`} id="icon" target="_blank"><i class="fa-brands fa-square-facebook p-2"></i></Link>
	// 	<Link to={`https://www.tiktok.com/`} id="icon" target="_blank"><i class="fa-brands fa-tiktok p-2"></i></Link>
	// 	<Link to={`https://www.linkedin.com/`} id="icon" target="_blank"><i class="fa-brands fa-linkedin p-2"></i></Link>
	// 	</div>
	// 	<p>
	// 		© Copyright RedesConscientes 2024 | Todos los derechos reservados
	// 	</p>
	// </footer>
	<footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <ul class="social">
						<li><Link to={`https://www.x.com/`} target="_blank"> <i class="fa-brands fa-square-x-twitter pl-2"></i></Link></li>
                        <li><Link to={`https://www.instagram.com/`} target="_blank"><i class="fa-brands fa-instagram pl-2"></i></Link></li>
                        <li><Link to={`https://www.facebook.com/`}  target="_blank"><i class="fa-brands fa-square-facebook pl-2"></i></Link></li>
                        <li><Link to={`https://www.tiktok.com/`}  target="_blank"><i class="fa-brands fa-tiktok pl-2"></i></Link></li>
                        <li><Link to={`https://www.linkedin.com/`}  target="_blank"><i class="fa-brands fa-linkedin pl-2"></i></Link></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <p class="copyright">Copyright &copy; RedesConscientes 2024 - Todos los derechos reservados</p>
                </div>
            </div>
        </div>
    </footer>
);
