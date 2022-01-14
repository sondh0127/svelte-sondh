<script lang="ts">
	import 'uno.css';
	import '@unocss/reset/tailwind.css';

	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import 'carbon-components-svelte/css/all.css';
	let theme = 'g10'; // "white" | "g10" | "g80" | "g90" | "g100"
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	$: browser && document.documentElement.setAttribute('theme', theme);

	onMount(() => {
		if (!supabase.auth.user()) {
			goto('/auth/signin');
		}
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_OUT') {
			goto('/auth/signin');
		}
	});
</script>

<Header />

<main class=" flex-1 flex flex-col p-[1rem] w-full max-w-[1024px] my-0 mx-auto box-border">
	<slot />
</main>

<footer class="flex flex-col justify-center items-center p-[40px] sm:py-[40px] sm:px-0">
	<p class="font-mono">SvelteKit + Unocss</p>
</footer>
