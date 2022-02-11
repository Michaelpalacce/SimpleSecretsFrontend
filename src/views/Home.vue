<template>
	<Namespace class="absolute right-0 top-0" :namespaces="namespaces"></Namespace>
	<div class="grid grid-cols-1 gap-2 mx-auto lg:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-4 mt-10 p-2">
		<SecretCard v-for="secret in secrets" :name="secret.name" :namespace="secret.namespace" :version="secret.version" @clicked="getSecret"/>
	</div>
</template>

<script>
import { defineComponent }	from 'vue';
import SecretCard			from "@/components/Secret/SecretCard.vue";
import Namespace			from '@/components/Dropdowns/Namespace.vue';
import Communicator			from "@/assets/js/api/Communicator";
const communicator			= new Communicator();

export default defineComponent({
	name: 'Home',
	data: () => {
		return {};
	},
	components: {
		SecretCard,
		Namespace
	},
	async created() {
		await this.$store.dispatch( 'populateNamespaces' );
		await this.$store.dispatch( 'populateSecretsForCurrentNamespace' );
	},
	computed: {
		namespaces() { return this.$store.state.namespaces; },
		secrets() { return this.$store.state.secrets[this.$store.state.currentNamespace]; }
	},
	methods: {
		async getSecret( target ) {
			const namespace	= target.namespace;
			const name		= target.name;
			await this.$store.dispatch( 'populateSecret', { namespace, name } );

			// @TODO finish me
			alert( JSON.stringify( this.$store.getters.secret( namespace, name ) ) );
		}
	}
});
</script>
