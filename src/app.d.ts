// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Platform {}
	interface PrivateEnv {
		PRIVATE_BUCKET_URI: string
	}
	// interface PublicEnv {}
	// interface Session {}
	interface Locals {
		validate: import("@lucia-auth/sveltekit").Validate;
		validateUser: import("@lucia-auth/sveltekit").ValidateUser;
		Hvalidate: import("@lucia-auth/sveltekit").Validate;
		HvalidateUser: import("@lucia-auth/sveltekit").ValidateUser;
		setSession: import("@lucia-auth/sveltekit").SetSession;
	}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import("./lucia.js").Auth;
	type UserAttributes = {
		username: string
	};
}