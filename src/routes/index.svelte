<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import supabase from '$lib/supabase';
	import type { definitions } from 'src/types/supabase';
	import { onMount } from 'svelte';
	import { Button } from 'carbon-components-svelte';

	let page = 1;
	let perPage = 5;

	$: from = (page - 1) * perPage;
	$: to = page * (perPage - 1);
	$: promise = supabase.from<definitions['overlays']>('overlays').select('*').range(from, to);

	let user;
	function getUser() {
		user = supabase.auth.user();
	}

	onMount(() => {
		getUser();
	});

	let email: string = 'sondh0127@gmail.com';
	let password: string = 'secret@123';

	let signInRes;
	async function signInWithEmail() {
		signInRes = await supabase.auth.signIn({
			email: email,
			password: password
		});
		getUser();
	}

	let signUpRes;
	async function signUpWithEmail() {
		if (!email || !password) return;
		signUpRes = await supabase.auth.signUp({
			email,
			password
		});
		getUser();
	}

	async function signOut() {
		await supabase.auth.signOut();
		getUser();
	}
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

	<div>
		User:
		<pre>{JSON.stringify(user, null, 2)}</pre>
	</div>
	<div class="flex flex-col items-start	 justify-center">
		<div>
			<label for="email"> Email: </label>
			<input id="email" bind:value={email} />
		</div>
		<div>
			<label for="password"> Password: </label>
			<input id="password" bind:value={password} />
		</div>
	</div>
	<button on:click={signUpWithEmail}> SignUp </button>
	<button on:click={signInWithEmail}> SignIn </button>
	<Button on:click={signOut}>Sign out</Button>

	<div class="flex flex-col items-center mt-4">
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
			<div>{JSON.stringify(error)}</div>
		{/await}

		<Counter bind:count={page} />
	</div>
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
