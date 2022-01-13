<script lang="ts">
	import { goto } from '$app/navigation';

	import Header from '$lib/header/Header.svelte';

	onMount(() => {
		if (supabase.auth.user()) {
			goto('/');
		}
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_IN') {
			goto('/');
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
