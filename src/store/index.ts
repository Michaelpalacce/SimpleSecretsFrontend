import { createStore, Store } from 'vuex'
import { InjectionKey } from "vue";
import SimpleSecrets from "@/store/interfaces/simpleSecret";
import Communicator from "@/assets/js/api/Communicator";

interface State {
	currentNamespace: string;
	namespaces: string[];
	secrets: {
		[namespace: string]: SimpleSecrets[]
	};
}
export const key: InjectionKey<Store<State>>	= Symbol()

const communicator	= new Communicator();

export const store	= createStore<State>({
	state: {
		currentNamespace: 'default',
		namespaces: [],
		secrets: {}
	},
	mutations: {
		updateNamespaces( state, { namespaces } ) { state.namespaces = namespaces },
		changeCurrentNamespace( state, { newNamespace } ) { state.currentNamespace = newNamespace },
		storeNamespacedSecrets( state, { namespace, secrets } ) { state.secrets[namespace]	= secrets; },
		storeNamespacedSecretData( state, { namespace, newSecret } ) { state.secrets[namespace].forEach( secret => {
			if ( secret.name === newSecret.name )
				secret.data	= newSecret.data;
		}) }
	},
	actions: {
		async changeCurrentNamespace({ state, commit, dispatch }, newNamespace ) {
			commit( "changeCurrentNamespace", { newNamespace } );
			if ( typeof state.secrets[newNamespace] === 'undefined' )
				dispatch( "populateSecrets", newNamespace );
		},
		async populateSecrets({ state, commit }, namespace ) {
			const response				= await communicator.getSecretsForNamespace( namespace );
			commit( "storeNamespacedSecrets", { namespace, secrets: response.data } );
		},
		async populateSecretsForCurrentNamespace({ state, dispatch }) {
			const namespace				= state.currentNamespace;
			dispatch( "populateSecrets", namespace );
		},
		async populateNamespaces({ commit }) {
			const response			= await communicator.getAllSecrets();
			const secrets			= response.data;

			const namespaces		= [...new Set(secrets.map( secret => {
					return secret.namespace;
				})
			)];

			commit( 'updateNamespaces', { namespaces } );
		},
		async populateSecret({ commit, state }, { namespace, name }) {
			const response	= await communicator.getSecret( namespace, name );

			commit( 'storeNamespacedSecretData', { namespace, newSecret: response.data } );
		}
	},
	modules: {
	},
	getters: {
		secret: ( state ) => ( namespace: string, name: string ) => {
			return state.secrets[namespace].find( secret => secret.name === name );
		}
	}
})
