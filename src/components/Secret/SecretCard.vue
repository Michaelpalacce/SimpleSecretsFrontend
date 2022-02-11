<template>
	<div class="max-w-sm rounded overflow-hidden shadow-lg border cursor-pointer" @click="onClick">
		<div class="px-6 py-4">
			<div class="flex">
				<div class="flex-initial w-11/12 font-bold text-xl mb-2">{{ name }}</div>
				<div class="flex-none w-4 h-4 mt-2 rounded-full bg-green-400 animate-pulse"></div>
			</div>
			<p class="text-gray-700 font-semibold">
				{{ namespace }}
			</p>
		</div>
		<div class="px-6 pb-2">
			<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Version: {{ version }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent }	from 'vue';

export default defineComponent({
	name: 'SecretCard',
	props: {
		name: String,
		namespace: String,
		version: String
	},
	methods: {
		onClick() {
			this.$emit( 'clicked', this );
		}
	}
});
</script>

<style scoped>

</style>