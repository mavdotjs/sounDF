<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<div>
	<form method="POST" use:enhance>
		<label for="username">Username</label><br />
		<input type="text" id="username" name="username" /><br />
		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />
        <button type="submit" formaction="?/login">Log in</button>
        <button type="submit" formaction="?/signup">Sign Up</button>
	</form>
</div>