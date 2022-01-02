<script lang="ts">
	import 'uno.css'
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main class=" flex-1 flex flex-col p-[1rem] w-full max-w-[1024px] my-0 mx-auto box-border">
	<slot />
</main>

<footer class="flex flex-col justify-center items-center p-[40px] sm:py-[40px] sm:px-0">
	<p class="font-mono">SvelteKit + Unocss</p>
</footer>
