<script setup>
defineProps({
	error: {
		type: Object,
		required: true,
	},
});
</script>

<template>
	<div class="card d-flex flex-column m-3 py-4">
		<h2 class="text-center">
			Error page
		</h2>
		<h3 class="text-center">
			{{ error.statusCode }}
		</h3>
		<p class="text-center">
			{{ error.message }}
		</p>
		<button
			type="button"
			class="align-self-center btn btn-info mt-1 w-25"
		>
			<NuxtLink
				to="/"
				class="text-body-secondary fs-6"
			>
				Try again
			</NuxtLink>
		</button>
	</div>
</template>
