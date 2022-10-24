<style>
	form {font-family: Arial, Helvetica, sans-serif;}
	* {box-sizing: border-box;}
	
	.form-inline {  
	  display: flex;
	  flex-flow: row wrap;
	  align-items: center;
	}
	
	.form-inline label {
	  margin: 5px 10px 5px 0;
	}
	
	.form-inline input {
	  vertical-align: middle;
	  margin: 5px 10px 5px 0;
	  padding: 10px;
	  background-color: #fff;
	  border: 1px solid #ddd;
	}
	
	.form-inline button {
	  padding: 10px 20px;
	  background-color: dodgerblue;
	  border: 1px solid #ddd;
	  color: white;
	  cursor: pointer;
	}
	
	.form-inline button:hover {
	  background-color: royalblue;
	}
	
	@media (max-width: 800px) {
	  .form-inline input {
		margin: 10px 0;
	  }
	  
	  .form-inline {
		flex-direction: column;
		align-items: stretch;
	  }
	}
	</style>
	
	
	
	
	<form class="form-inline" on:submit|preventDefault={signup}>
	  <label for="email">Email:</label>
	  <input bind:value={email} type="email" id="email" placeholder="Enter email" name="email">
	  <br/>
	  <label for="password">Password:</label>
	  <input bind:value={password} type="password" id="password" placeholder="Enter password" name="password">
	  <br/>
	  <button type="submit">SIGNUP</button>
	</form>
		<a href="/login">login</a>






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