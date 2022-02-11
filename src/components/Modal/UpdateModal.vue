<template>
	<div class="bg-gray-800 bg-opacity-75 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
		<div class="bg-white px-16 py-14 rounded-md text-center">
			<h1 class="text-xl mb-4 font-bold text-slate-500">{{ secret.namespace }}: {{ secret.name }}</h1>
			<div class="text-left">
				Type:
				<div class="inline-block my-5 text-xl mb-4 font-bold  ml-2" >{{ type }}</div>
			</div>
			<textarea v-model="data" class="mx-auto block p-5 text-left border shadow-lg mb-6" cols="50" rows="15"></textarea>

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
			type: ''
		}
	},
	props: {
		secret: {
			type: Object
		}
	},
	methods: {
		async submit() {
			const namespace		= this.secret.namespace;
			const name			= this.secret.name;
			const communicator	= new Communicator();
			await communicator.updateSecret( namespace, name, JSON.parse( this.data ) );
			await this.$store.dispatch( "populateSecret", { name, namespace } )

			this.$emit( 'onSubmit' );
		}
	},
	async created() {
		const data	= this.secret;
		this.data	= JSON.stringify( typeof data.data !== 'undefined' ? data.data[data.version] : {}, null, 4 );
		this.type	= data.type;
	},
}
</script>


<style>
</style>