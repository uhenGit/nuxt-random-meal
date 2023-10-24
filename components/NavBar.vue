<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<NuxtLink
				class="navbar-brand"
				href="/"
				title="Home"
			>
				<i class="bi bi-cookie"/>
			</NuxtLink>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"/>
			</button>
			<div
				id="navbarSupportedContent"
				class="collapse navbar-collapse"
			>
				<div class="navbar-nav me-auto mb-2 mb-lg-0">
					<NuxtLink
						class="nav-link"
						:class="{ 'active': $route.name === 'index' }"
						:aria-current="{ 'page': $route.name === 'index' }"
						to="/"
					>
						Home
					</NuxtLink>
					<NuxtLink
						class="nav-link"
						:class="{ 'active': $route.name === 'favorites' }"
						:aria-current="{ 'page': $route.name === 'favorites' }"
						to="/favorites"
					>
						Favorites
					</NuxtLink>
				</div>
				<form
					class="d-flex"
					role="search"
				>
					<input
						class="form-control me-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
					>
					<button
						class="btn btn-outline-success"
						type="submit"
					>
						Search
					</button>
				</form>
			</div>
		</div>
	</nav>
</template>
