import { createStore, Store } from 'vuex'
import { InjectionKey } from "vue";

interface State {
	currentNamespace: string;
}
export const key: InjectionKey<Store<State>>	= Symbol()

export const store	= createStore<State>({
	state: {
		currentNamespace: 'default'
	},
	mutations: {
		changeCurrentNamespace( state, { newNamespace } ) { state.currentNamespace = newNamespace }
	},
	actions: {
	},
	modules: {
	}
})
