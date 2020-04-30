import { createStore } from "@coriou/react-easy-store"

const initialState = {
	theme: "",
}

const reducers = {
	toggleTheme: (store, [task]) => {
		store.theme = store.theme === "dark" ? "light" : "dark"
	},
}

export default createStore(initialState, reducers)
