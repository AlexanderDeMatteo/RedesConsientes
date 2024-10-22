import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Jumbotron } from "../component/home_component/jumbotron";
import "../../styles/landingpage/templatemo-softy-pinko.css"
import { Features } from "../component/home_component/features";
import { FirstHeading } from "../component/home_component/firstHeading";
import { SecondHeading } from "../component/home_component/secondHeading";
import { Paralax } from "../component/home_component/Parallax";
import { Testimonials } from "../component/home_component/testimonials";
import { PrincingPlans } from "../component/home_component/pricingPlans";
import { ParalaxCounter } from "../component/home_component/paralaxCounter";
import { Blog } from "../component/home_component/blog";
import { Contact } from "../component/home_component/contact";

export const LandingPage = () => {
	const { store, actions } = useContext(Context);
	const [isLoading, setIsLoading] = useState(true)



	useEffect(() => {
        
		const loading = () =>{
		  setIsLoading(true)
		  
		setTimeout(() => {
				setIsLoading(false);
				console.log(isLoading)
			  }, 2000)
		 
	
	  }
	  loading()
	  }, []);


	  console.log(isLoading)

	return (



		<div>

{isLoading == true ? <div id="preloader">
        		<div class="jumper">
					<div></div>
					<div></div>
					<div></div>
        		</div>
    		</div>  :

			<>
			  
			<Jumbotron/>
			<Features/>
			<FirstHeading/>
			<ParalaxCounter/>
			<SecondHeading/>
			<Paralax/>
			<Testimonials/>
			{/* <PrincingPlans/> */}
			{/* <Blog/> */}
			<Contact/>
			</>
}


		</div >
	);
};
