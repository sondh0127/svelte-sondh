<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import supabase from '$lib/supabase';
	import type { definitions } from 'src/types/supabase';

	let page = 1;
	let perPage = 5;

	$: from = (page - 1) * perPage;
	$: to = page * (perPage - 1);
	$: promise = supabase.from<definitions['overlays']>('overlays').select('*').range(from, to);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

		to your new<br />SvelteKit app
	</h1>
	{#await promise}
		<div>Loading ...</div>
	{:then { data }}
		{#each data as item, i (i)}
			<div>
				{JSON.stringify(item, null, 2)}
			</div>
		{/each}
	{:catch error}
		<div>Error ...</div>
	{/await}
	<h2>
		try editing <strong>src/routes/index.svelte</strong>
	</h2>

	<Counter bind:count={page} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
