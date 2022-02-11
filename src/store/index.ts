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
		deleteNamespacedSecret( state, { namespace, name } ) {
			state.secrets[namespace]	= state.secrets[namespace].filter( secret => {
				return secret.name !== name;
			});

			if ( state.secrets[namespace].length === 0 )
				state.namespaces	= state.namespaces.filter( currNamespace => currNamespace !== namespace );
		},
		storeNamespacedSecretData( state, { namespace, newSecret } ) {
			if ( typeof state.secrets[namespace] === 'undefined' )
				state.secrets[namespace]	= [];

			if ( typeof state.namespaces !== 'undefined' && state.namespaces.indexOf( namespace ) === -1 )
				state.namespaces.push( namespace );

			let found	= false;
			state.secrets[namespace].forEach( secret => {
				if ( secret.name === newSecret.name ) {
					secret.data		= newSecret.data;
					secret.version	= newSecret.version;
					found			= true;
				}
			});

			if ( ! found )
				state.secrets[namespace].push( newSecret );
		}
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
		},
		async deleteSecret({ commit, state }, { namespace, name }) {
			await communicator.deleteSecret( namespace, name );

			commit( 'deleteNamespacedSecret', { namespace, name } );
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
