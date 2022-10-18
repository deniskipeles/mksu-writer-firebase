


<div>
	<form on:submit|preventDefault={signup}>
		<input type="email" bind:value={email} placeholder="enter email">
		<input type="password" bind:value={password} placeholder="enter password">
		<input type="submit" value="signup">
	</form>
	<a href="/login">login</a>
</div>


  <script>
	import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
	let email='';
	let password='';
	let user=null;

	const auth = getAuth();
	function signup(){
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			user = userCredential.user;
			// console.log(user)
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
	}
  </script>