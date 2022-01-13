<script lang="ts">
	import { supabase } from '$lib';
	import { Form, FormGroup, Button, TextInput } from 'carbon-components-svelte';
	let email: string = 'sondh0127@gmail.com';
	let password: string = 'secret@123';

	let signInRes;
	async function signInWithEmail() {
		signInRes = await supabase.auth.signIn({
			email: email,
			password: password
		});
		// getUser();
	}
</script>

<Form on:submit={signInWithEmail}>
	<FormGroup legendText="Email">
		<TextInput bind:value={email} labelText="" placeholder="Enter email" />
	</FormGroup>
	<FormGroup legendText="Password">
		<TextInput bind:value={password} labelText="" placeholder="Enter password" type="password" />
	</FormGroup>
	<Button type="submit">SignIn</Button>
</Form>
