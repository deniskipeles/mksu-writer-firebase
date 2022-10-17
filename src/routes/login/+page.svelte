<div>
	<form on:submit|preventDefault={signin}>
		<input type="email" bind:value={email} placeholder="enter email">
		<input type="password" bind:value={password} placeholder="enter password">
		<input type="submit" value="login">
	</form>
	<a href="/signup">signup</a>
</div>
  
  
<script>
	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
	import {auth} from '$lib/firebase.js';
	let email='';
	let password='';
	let user;

	// const auth = getAuth();
	function signin(){
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			user = userCredential.user;
			console.log(user)
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
	}
</script>