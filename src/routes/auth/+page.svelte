<script lang="ts">
	import { enhance } from "$app/forms";
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	const storeTab: Writable<"login"|"signup"> = writable('login');
</script>
<TabGroup selected={storeTab}>
	<Tab value="login">Login</Tab>
	<Tab value="signup">Sign up</Tab>
</TabGroup>
{#if $storeTab === "login"}
	<div>
		<form method="POST" use:enhance={() => {
			return async ({ result, update }) => {
				console.log(result, await update())
			}
		}}>
			<label for="username">Username</label><br />
			<input type="text" id="username" name="username" /><br />
			<label for="password">Password</label><br />
			<input type="password" id="password" name="password" /><br />
			<!-- <button type="submit" formaction="?/login">Log in</button> -->
			<button type="submit" formaction="?/signup">Sign Up</button>
		</form>
	</div>
{/if}