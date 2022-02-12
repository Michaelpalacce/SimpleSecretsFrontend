<template>
	<div class="absolute top-0 right-0 float-right mt-2 flex w-full">
		<div class="w-8/12 block md:inline-block mx-auto">
			<span class="mt-2 mr-4">Currently using:</span>

			<input class="inline-block w-96 mx-auto w-6/12 border-2 border-black rounded-md p-2 border-bold" v-model="currentUrl" @change="updateUrl"/>
		</div>

		<button class="bg-green-500 px-7 py-2 mr-5 rounded-md text-md text-white font-semibold w-2/12" @click="createModalVisible = true">Create New Secret</button>

		<Namespace class="inline-block w-1/12" :namespaces="namespaces"></Namespace>
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
			currentUrl: '',
			createModalVisible: false,
			modalVisible: false,
			modalSecret: {}
		}
	},
	components: { SecretCard, Namespace, UpdateModal, CreateModal },
	async created() {
		this.currentUrl	= this.$store.state.currentUrl;
		await this.refreshCurrent();
	},
	computed: {
		namespaces() { return this.$store.state.namespaces; },
		secrets() { return this.$store.state.secrets[this.$store.state.currentNamespace]; }
	},
	methods: {
		async refreshCurrent(){
			await this.$store.dispatch( 'fetchNamespaces' );
			await this.$store.dispatch( 'fetchSecretsForCurrentNamespace' );
		},
		async updateUrl() {
			this.$store.commit( 'updateCurrentUrl', { newUrl: this.currentUrl } );
			await this.refreshCurrent();
		},
		async getSecret( target ) {
			const namespace	= target.namespace;
			const name		= target.name;
			await this.$store.dispatch( 'fetchSecret', { namespace, name } );

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
