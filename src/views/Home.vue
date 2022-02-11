<template>
	<Namespace class="absolute right-0" :namespaces="namespaces"></Namespace>
	<SecretCard name="mySecret" namespace="myNamespace"/>
</template>

<script lang="ts">
import { defineComponent }	from 'vue';
import SecretCard			from "@/components/Secret/SecretCard.vue";
import Namespace			from '@/components/Dropdowns/Namespace.vue';

export default defineComponent({
	name: 'Home',
	data: () => {
		return {
			namespaces: ["namespaceOne", "namespaceTwo"]
		};
	},
	components: {
		SecretCard,
		Namespace
	},
	created() {

	}
});
</script>
