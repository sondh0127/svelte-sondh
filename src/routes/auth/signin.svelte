<script lang="ts">
	import { goto } from '$app/navigation';

	import { supabase } from '$lib';
	import {
		Form,
		FormGroup,
		Button,
		TextInput,
		PasswordInput,
		InlineNotification
	} from 'carbon-components-svelte';
	let email: string = 'sondh0127@gmail.com';
	let password: string = 'secret@123';

	type Result = Awaited<ReturnType<typeof supabase.auth.signIn>>;

	let result: Result;
	async function signInWithEmail() {
		result = await supabase.auth.signIn({
			email: email,
			password: password
		});
		// getUser();
	}
</script>

<Form on:submit={signInWithEmail}>
	<FormGroup>
		<div class="flex justify-center">
			<span class="text-24px font-semibold">Sign In</span>
		</div>
	</FormGroup>
	{#if result?.error}
		<InlineNotification title="Error:" subtitle={result.error.message} />
	{/if}
	<FormGroup legendText="Email">
		<TextInput bind:value={email} placeholder="Enter email..." />
	</FormGroup>
	<FormGroup legendText="Password">
		<PasswordInput bind:value={password} placeholder="Enter password..." />
	</FormGroup>
	<div class="flex space-x-2">
		<Button type="submit">Sign In</Button>
		<Button
			type="button"
			kind="ghost"
			on:click={() => {
				goto('/auth/signup');
			}}
		>
			Sign Up
		</Button>
	</div>
</Form>
