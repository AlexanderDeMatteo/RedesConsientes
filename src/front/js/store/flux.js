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
			userDataSelecionado: {},
			userPsicologos: JSON.parse(sessionStorage.getItem("psicos")) || [],
			userPacientes: JSON.parse(sessionStorage.getItem(!"psicos")) || [],
			userFpvData: {},
			userScheduleData:{},
			userSession:{},
			scheduleSession:{},
			clientScheduleData:{}
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
					let date = `${fecha} 00:00:00 GMT`
					let schedule = body.filter(persona => persona.calendar_date == date)
					setStore({
						...store,
						scheduleSession: schedule
					})
					// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
				}
			},

			getPsicologiScheduleReservedDay: async (id, fecha) => {
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
					let date = `${fecha} 00:00:00 GMT`
					let schedule = body.filter(persona => persona.calendar_date == date && persona.reserved == true)
					setStore({
						...store,
						scheduleSession: schedule
					})
					// sessionStorage.setItem("psicos", JSON.stringify(store.userPsicologos))
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

			// createSession: async (schedule_id, calendar_date) => {

			// 	let response = await fetch(`${API_URL}/api/session-create`, {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			Authorization: `Bearer ${getAuthToken("token")}`,
			// 		},
			// 		body: JSON.stringify({ 'schedule_id': schedule_id, "calendar_date": calendar_date })
			// 	});
			// 	if (response.ok) {

			// 		console.log(response.statusText)
			// 	} else return false;
			// 	let data = await response.json();

			// },

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

			handle_user_data: async () => {
				let response = await fetch(`${API_URL}/api/user-data`, {
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

			handle_user_data_seleccinado: async (usuario) => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/user-psicologo-data`, {
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
					setStore({ userDataSelecionado: nuevaData })


				}
			},


			handle_user_psicologo: async () => {
				const store = getStore()
				let response = await fetch(`${API_URL}/api/user-psicologo-data`, {
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
						userPsicologos: body
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
				let response = await fetch(`${API_URL}/sessions/today/client/${id}`, {
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

			get_today_psicologo_dates: async (id) => {
				let response = await fetch(`${API_URL}/sessions/today/${id}`, {
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
				let store = getStore()
				let userProp = (store.userData[`${prop}`] = data)
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
				let response = await fetch(`${API_URL}/api/user-data`, {
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

			// 	handleList: async (e) => {
			// 	if (e.key === "Enter" && addTodolist != "") {
			// 		let newTask = [...todoList, { label: e.target.value, done: false }];
			// 		const response = await fetch(apiUrl, {
			// 			method: "PUT",
			// 			body: JSON.stringify(newTask),
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 			},
			// 		});
			// 		setAddTodolist("");
			// 		if (response.ok) {
			// 			getTodoList();
			// 		}
			// 	}
			// };


			// userData: async () => {
			// 	getUserData: async () => {
			// 		const store = getStore()
			// 		let response = await fetch(`${store.API_URL}`);
			// 		if (response.ok) {
			// 			let body = await response.json()
			// 			setStore({ UserData: body.results })
			// 		}
			// 	},
			// },
		}
	};
};

export default getState;
