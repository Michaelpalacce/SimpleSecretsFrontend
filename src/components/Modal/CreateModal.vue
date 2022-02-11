<template>
	<div class="bg-gray-800 bg-opacity-75 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
		<div class="bg-white px-16 py-14 rounded-md text-center w-full lg:w-1/2">
			<input v-model="name" class="mx-auto block p-5 text-left border shadow-lg mb-6 w-full" placeholder="Name"/>
			<input v-model="namespace" class="mx-auto block p-5 text-left border shadow-lg mb-6 w-full" placeholder="Namespace"/>
			<input v-model="type" class="mx-auto block p-5 text-left border shadow-lg mb-6 w-full" placeholder="Type"/>
			<textarea v-model="data" class="mx-auto block p-5 text-left border shadow-lg mb-6 w-full" placeholder="Data (JSON)"/>

			<button class="bg-green-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="submit">Submit</button>
			<button class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" @click="$emit( 'onClick' )">Close</button>
		</div>
	</div>
</template>

<script>
import Communicator	from "@/assets/js/api/Communicator";

export default {
	name: "Modal",
	data: function () {
		return {
			data: '',
			name: '',
			namespace: '',
			type: ''
		}
	},
	methods: {
		async submit() {
			const namespace		= this.namespace;
			const name			= this.name;
			const data			= JSON.parse( this.data );
			const type			= this.type;
			const communicator	= new Communicator();
			await communicator.createSecret( { name, namespace, data, type } );
			await this.$store.dispatch( "populateSecret", { name, namespace } )

			this.$emit( 'onSubmit' );
		}
	},
}
</script>


<style>
</style>