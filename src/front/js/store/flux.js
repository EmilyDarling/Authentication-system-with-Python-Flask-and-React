const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login:async(email, password) => {
				try{
					const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					if(!resp.ok){
						console.log("Error!", resp.status);
						return false;
					}

					const data = await resp.json();
					sessionStorage.setItem("token", data.token);
					sessionStorage.setItem("user_id", data.user_id);
					return true;
				} catch(error){
					console.log("Error!", error);
					return false;
				}
			},
			signup:async(email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					const data = await resp.json();
					console.log("Backend: ", data);
					return data
				} catch(error){
					console.error("Error!", error);
					throw error;
				}
			},

			isPrivate: async () => {
				const token = sessionStorage.getItem("token");
				if(!token){
					console.error("No Token!");
					return false;
				}
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: "GET",
						headers:{ 
							"Content-Type": "application/json" , 
							"Authorization": `Bearer ${token}`
						},
					});
					const data = await resp.json();
					if(!resp.ok){
						return false;
					} else{
						console.log("Backend: ", data);
						return true;
					}
				} catch(error) {
					console.error("Error!", error);
					return false;
				}
			
		},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}}
		};
	};


export default getState;
