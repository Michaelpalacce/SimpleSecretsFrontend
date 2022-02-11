<template>
	<div class="absolute top-0 right-0 float-right mt-2">
		<button class="bg-green-500 px-7 py-2 mr-5 rounded-md text-md text-white font-semibold" @click="createModalVisible = true">Create New Secret</button>

		<Namespace class="inline-block" :namespaces="namespaces"></Namespace>
	</div>
	<div class="grid grid-cols-1 gap-2 mx-auto lg:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-4 mt-12 p-2">
		<SecretCard v-for="secret in secrets" :name="secret.name" :namespace="secret.namespace" :version="secret.version" @clicked="getSecret" @onDelete="deleteSecret"/>
	</div>

	<UpdateModal v-if="modalVisible" :secret="modalSecret" @onClick="hideModal" @onSubmit="submitModal"/>
	<CreateModal v-if="createModalVisible" :secret="modalSecret" @onClick="hideCreateModal" @onSubmit="submitCreateModal"/>
</template>

<script>
import { defineComponent }	from 'vue';
import SecretCard			from "@/components/Secret/SecretCard.vue";
import Namespace			from '@/components/Dropdowns/Namespace.vue';
import UpdateModal			from '@/components/Modal/UpdateModal.vue';
import CreateModal			from '@/components/Modal/CreateModal.vue';

export default defineComponent({
	name: 'Home',
	data: () => {
		return {
			createModalVisible: false,
			modalVisible: false,
			modalSecret: {}
		}
	},
	components: { SecretCard, Namespace, UpdateModal, CreateModal },
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

			this.modalSecret	= this.$store.getters.secret( namespace, name )
			this.modalVisible	= true;
		},
		async deleteSecret( target ) {
			const namespace	= target.namespace;
			const name		= target.name;
			await this.$store.dispatch( 'deleteSecret', { namespace, name } );
		},
		async hideModal() { this.modalVisible	= false; },
		async submitModal() { this.modalVisible	= false; },
		async hideCreateModal() { this.createModalVisible	= false; },
		async submitCreateModal() { this.createModalVisible	= false; },
	}
});
</script>
