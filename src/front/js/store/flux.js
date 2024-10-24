import {
	setAuthToken,
	getAuthToken,
	removeAuthToken,
	hasValidToken
} from '../../utils/AuthTokenUtil';
const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = process.env.BACKEND_URL;
	return {

		store: {
			userData: {},
			userDataSelecionado: [],
			userPatientSelecionado: {},
			userPsicologostoaprove: JSON.parse(sessionStorage.getItem("psicos")) || [],
			userPsicologos: [],
			userPacientes: JSON.parse(sessionStorage.getItem(!"psicos")) || [],
			phrase:[],
			userFpvData: {},
			patientTask: [],
			userScheduleData:{},
			userSession:{},
			scheduleSession:[],
			clientScheduleData:{},
			userPaymentData:{},
			userPatients:[],
			userRelationShip:[]
		},

		actions: {
			// Registrar al usuario en base de datos
			registerUser: async (data) => {
				let response = await fetch(`${API_URL}/api/sign-up`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				if (response.ok) {
					let data = await response.json();
					setAuthToken(data.token)
					
					return true;
				} else return false;
			},
			// Hacer el login para el usuario registrado
			loginUser: async (data) => {
				let response = await fetch(`${API_URL}/api/sign-in`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				});
				if (response.status == 200) {
					let data = await response.json();
					setAuthToken(data.token)
					// setTimeout(function () {
					// 	localStorage.remove("token");
					// }, 1000 * 60 * 60); //Ejecutar despues de una hora
					// console.log(setTimeout())
					return true;
				} else return false;
			},

			handleLogOut: () =>{
				removeAuthToken()
				if (!hasValidToken){
					return true
				}
				// setStore({token:""})
				return false
			},

			privateData: async () => {
				let response = await fetch(`${API_URL}/api/private`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`,
					},

				});
				let data = await response.json();

			},

			// getSchedule: async () => {
			// 	const store = getStore()
			// 	let response = await fetch(`${API_URL}/api/schedule`, {
			// 		method: 'GET',
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			Authorization: `Bearer ${getAuthToken("token")}`
			// 		},
			// 	});
			// 	if (response.ok) {
			// 		let body = await response.json()
			// 		setStore({
			// 			...store,
			// 			userTime: body
			// 		})
			// 		// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
			// 	}
			// },

			getPsicologiSchedule: async (id) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/sessions/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					setStore({
						...store,
						psicologySession: body
					})
					// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},

			getPsicologiScheduleDay: async (ids, fecha) => {
				const store = getStore()
			
				let response = await fetch(`${API_URL}/api/sessions/${ids}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					let i = 0
					for (i ; i < body.length; i++) {
						console.log(new Date(body[i]['calendar_date']).toGMTString().slice(0,17))
						console.log(new Date(fecha).toGMTString().slice(0,17))
						console.log("/////////////////////")
						}
					console.log(body)
					let schedule = body.filter(persona => new Date(persona.calendar_date).toGMTString().slice(0,17) == new Date(fecha).toGMTString().slice(0,17))
					
					console.log(schedule)
					setStore({
						...store,
						scheduleSession: schedule
					})
					// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},

			getPsicologiScheduleReservedDay: async (id, fecha) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/sessions/today/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					console.log(body)
					// let date = `${fecha} 00:00:00 GMT`
					// let schedule = body.filter(persona => persona.calendar_date == date && persona.reserved == true)
					setStore({
						...store,
						scheduleSession: body
					})
					// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},

			getClientScheduleReservedDay: async (id, fecha) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/sessions/today/client/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					
					setStore({
						...store,
						scheduleSession: body
					})
				}
			},

			deleteSchedule: async (data) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/schedule-handle/` + data, {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});

			},


			createSchedule: async (start, end, date, durationTime) => {
				let response = await fetch(`${API_URL}/api/session-create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`,
					},
					body: JSON.stringify({ 'start_time': start, "end_time": end, "calendar_date":date, "duration_time":durationTime })
				});
				if (response.ok) {
					console.log(response.statusText)
				} else return false;
				let data = await response.json();

			},


			handle_user_data_schedule: async (usuario) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/sessions/${usuario}/`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					let dataFiltada = body.filter((data) => data.id == usuario)
					let nuevaData = (Object.assign({}, ...dataFiltada));
					setStore({ userScheduleData: nuevaData })


				}
			},



			handle_reserved: async (id) => {
				let response = await fetch(`${API_URL}/api/session-reserved/${id}`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify({ "reserved": true })
				});
				if (response.ok) {
					getActions().getSessions()
				}

			},

			getSessions: async (id) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/sessions/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					setStore({
						...store,
						usersession: body
					})
					// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},

			handle_payment_data: async () => {
				let response = await fetch(`${API_URL}/api/payment-accounts`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					// body: JSON.stringify([])
				});

				if (response.ok) {
					let body = await response.json()
					setStore({ userPaymentData: body })

				}
			},

			psicology_payment_data: async (id) => {
				let response = await fetch(`${API_URL}/api/psicology-payment-accounts/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					// body: JSON.stringify([])
				});

				if (response.ok) {
					let body = await response.json()
			
					setStore({ userPaymentData: body })

				}
			},

			handle_user_data: async () => {
				let response = await fetch(`${API_URL}/api/get-user-data`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					// body: JSON.stringify([])
				});

				if (response.ok) {
					let body = await response.json()
					setStore({ userData: body })

				}
			},

			handle_patient_data: async () => {
				let response = await fetch(`${API_URL}/api/usuarios_relacionados`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					// body: JSON.stringify([])
				});

				if (response.ok) {
					let body = await response.json()
					setStore({ userPatients: body })
				}
			},

			handle_patient_data_seleccinado: async (usuario) => {
				let response = await fetch(`${API_URL}/api/user-patient-data/${usuario}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					setStore({ userDataSelecionado: body })
				}
			},

			handle_patient_own_task: async () => {
				let response = await fetch(`${API_URL}/api/patients/own/tasks`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					setStore({ patientTask: body })
				}
			},

			handle_user_data_seleccinado: async (id) => {
				let response = await fetch(`${API_URL}/api/user-psicologo-data/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				console.log(response)
				if (response.ok) {
					let body = await response.json()
					console.log(body)
					setStore({ userDataSelecionado: body })


				}
			},


			handle_user_psicologo: async () => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/psicologo-data`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					console.log(body)
					let dataFiltada = body.filter((data) => data.is_active == true)
					console.log(dataFiltada)
					
					setStore({
						...store,
						userPsicologos: dataFiltada
					})
				
				}
			},

			handle_user_psicologo_to_aprove: async () => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/psicologo-data-to-aprove`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					let body = await response.json()
					console.log(body)
					// let dataFiltada = body.filter((data) => data.is_active == false)
					setStore({
						...store,
						userPsicologostoaprove: body
					})
					sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},
			// handle_user_paciente: async () => {
			// 	let response = await fetch(`${API_URL}/api/user-paciente-data`, {
			// 		method: 'GET',
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			Authorization: `Bearer ${getAuthToken("token")}`
			// 		},
			// 		// body: JSON.stringify([])
			// 	});

			// 	if (response.ok) {
			// 		let body = await response.json()
			// 		setStore({ userPaciente: body })

			// 	}
			// },

			get_client_dates: async (id) => {
				let response = await fetch(`${API_URL}/api/sessions/today/client/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				
				});
				if (response.ok) {
					let body = await response.json()
					setStore({ clientScheduleData: body })

				}
			},

			get_phrase: async () => {
				let response = await fetch(`${API_URL}/api/random-phrase`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				
				});
				if (response.ok) {
					let body = await response.json()
					setStore({ phrase: [body.phrase] })

				}
			},

			get_today_psicologo_dates: async (id) => {
				let response = await fetch(`${API_URL}/api/sessions/today/${id}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				
				});
				if (response.ok) {
					let body = await response.json()
					setStore({ clientScheduleData: body })

				}
			},

			handle_edit: (data, prop) => {
				console.log(data,"data")
				console.log(prop,"prop")
				let store = getStore()
				let userProp = (store.userData[`${prop}`] = data)
				setStore(prev => ({
					...prev, userProp
				}))
			},

			handle_payment_edit: (data, prop) => {
				let store = getStore()
				let userProp = (store.userPaymentData[`${prop}`] = data)
				setStore(prev => ({
					...prev, userProp
				}))
			},

			picture_profile: async (data) => {
				let response = await fetch(`${API_URL}/api/update_profile_picture`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify({ "profile_picture": data })
				});
				if (response.ok) {
					getActions().handle_user_data()
				}

			},

			handle_user_upgrade: async () => {
				let response = await fetch(`${API_URL}/api/get-user-data`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify([])
				});

				if (response.ok) {
					if (response.status == 200) {
						let body = await response.json()
						return true;
					} else return false;
				}
			},

			active_user: async (id) => {
				let response = await fetch(`${API_URL}/api/activate/${id}`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify([])
				});
				if (response.ok) {
					if (response.status == 200) {
						alert("usuario activado con exito")
						getActions().handle_user_psicologo_to_aprove()
					} else return false;
				}
			},

			get_patient_task: async (id) => {
				let response = await fetch(`${API_URL}/api/psychologists/patients/${id}/tasks`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				
				});
				if (response.ok) {
					let body = await response.json()
					setStore({ patientTask: body })

				}
			},

			post_patient_task: async (id, newTask) => {
				let response = await fetch(`${API_URL}/api/patients/${id}/tasks`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify(newTask)
				});
				if (response.ok) {
					alert("tarea añadida con exito")
				}
			},

			Psicology_selected: async (id) => {
				console.log(id)
				let response = await fetch(`${API_URL}/api/select-psicologo/${id}`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},		
				});
				
			},

			put_patient_task: async (taskId, task) => {
				let response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify({"description" : task} )
				});
				if (response.ok) {
					alert("tarea editada con exito")
				}
			},

			complete_patient_task: async (taskId, completed) => {
				let response = await fetch(`${API_URL}/api/tasks/${taskId}/complete`, {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
					body: JSON.stringify({"completed" : completed} )
				});
				if (response.ok) {
					

				}
			},

			delete_patient_task: async (taskId) => {
				let response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.ok) {
					alert("tarea eliminada con exito")
				}
			},

			delete_psicologo: async (id) => {
				let response = await fetch(`${API_URL}/api/delete/${id}`, {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				});
				if (response.status == 200) {
					getActions().handle_user_psicologo_to_aprove()
					alert("usuario eliminado con exito")
				}
			},

			get_psicologo_asigned: async (id) => {
				let response = await fetch(`${API_URL}/api/psicologo_relacionado`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				
				});
				if (response.ok) {
					try{
						let body = await response.json()
						setStore({ userRelationShip: [body] })
					}catch(error){
					}
				}
			},
			
			get_psicologo_asigned: async (id) => {
				let response = await fetch(`${API_URL}/api/psicologo_relacionado`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getAuthToken("token")}`
					},
				
				});
				if (response.ok) {
					try{
						let body = await response.json()
						setStore({ userRelationShip: [body] })
					}catch(error){
					}
				}
			},

			sendContactMail: async (Mdata) => {
				try {
				  const response = await fetch(`${API_URL}/contact/mail`, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json'
					},
					body: JSON.stringify({
					  name: Mdata.name, 
					  email: Mdata.email,
					  message: Mdata.message
					})
				  });
			  
				  if (!response.ok) {
					console.error('Error response:', await response.json());
				  }
				} catch (error) {
				  console.error('Error sending email:', error);
				}
			},

			resetPassword: async (email) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/reset-password`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(email)

						}
					)

					console.log(response)

				} catch (error) {
					console.log(error)
				}
			},

			updatePassword: async (tokenUpdate, newPass) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/api/update-password`, {
						method: "PUT",
						headers: {
							"Authorization": `Bearer ${tokenUpdate}`,
							"Content-Type": "application/json"
						},
						body: JSON.stringify(newPass)
					})
					console.log(response)
				} catch (error) {
					console.log(error)
				}
			},

			
		}
	};
};

export default getState;
