<script setup>
defineProps({
	error: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="card text-center m-3 py-4">
		<h2>Error page</h2>
		<h3>{{ error.statusCode }}</h3>
		<p>{{ error.message }}</p>
	</div>
</template>
