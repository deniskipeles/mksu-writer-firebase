<!-- <svelte:head>
	<script src="https://cdn.tiny.cloud/1/q7h0i8r0h7ha598lyeh91pwubnpq34dseiz76p98qmzol7dc/tinymce/6/tinymce.min.js" referrerpolicy="origin" on:load={tinymceloaded}></script>
</svelte:head> -->
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
	
	
	
	
	<form class="form-inline" on:submit|preventDefault={handleSubmit}>
	  <label for="title">Title:</label>
	  <input bind:value={title} type="text" id="title" placeholder="Enter title" name="title" required>
	  <br/>
	  <Editor
	   {apiKey}
	   {conf}
	   bind:value={body}
	  />
		<br/>
	  <button type="submit">Submit</button>
	</form>
	


 <!-- <main>
 <button on:click={getImageSrc}>check text</button>
 <form on:submit|preventDefault={handleSubmit}>
   <input type="text" bind:value={title}/>
		<br/>
   <Editor
    {apiKey}
    {conf}
    bind:value={body}
   />
	 <br/>
	<input type="submit" value="save">
	</form>
 </main>
   -->
  

<script>

// @ts-nocheck

	// import firebase from "firebase/app";
	import {db, storage} from "$lib/firebase"
	import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
	import { collection, doc, setDoc } from "firebase/firestore";
	// import Counter from "../Counter.svelte";
	import Editor from '@tinymce/tinymce-svelte';
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	import { goto } from '$app/navigation';
	

	// const querySnapshot = await getDocs(q);
	let userData,id=null;

	const auth = getAuth();
	onAuthStateChanged(auth, async(user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		id = user.uid;
		userData = user;
		// ...
	} else {
		// User is signed out
		// ...
		userData = null;
	}
	});

 	let apiKey = "q7h0i8r0h7ha598lyeh91pwubnpq34dseiz76p98qmzol7dc";

	let body='<p>Hello World ....</p>';
	let title;
	let text;
	let photos=[];

	const getImageSrc = () => {
		var images = [];
		var span = document.createElement('span');
		span.innerHTML = body;
		var imageTags = span.getElementsByTagName("img");

		for (var i in imageTags) {
			var src = imageTags[i].src;
			if (src != null && src != undefined) {
				images.push(src);
			}
		}

		if (images.length > 10) {
			photos=images.slice(0,10);
		}else{
			photos = images;
		}
		console.log(photos)
	}

	// const logPhotos = () => console.log(photos)

  



  const uploadFile = async(pic, progress) => new Promise((resolve, reject)=>{
		// pic = e.target.file[0];
		const file = pic.blob()
		// console.log(pic)
		const storageRef = ref(storage, `${Date.now()}/${pic.filename()}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on("state_changed",
		(snapshot) => {
			progress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
		},
		(error) => {
			reject("failed to upload");
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				// console.log(downloadURL)
				photos.push(downloadURL+'')
				resolve(downloadURL);
			});
		}
		);
	});


 let conf = {
   "height": 500,
	 "images_upload_handler": uploadFile,
   "plugins": [
       "a11ychecker","advlist","advcode","advtable","autolink","checklist","export",
       "lists","link","image","charmap","preview","anchor","searchreplace","visualblocks",
       "powerpaste","fullscreen","formatpainter","insertdatetime","media","table","help","wordcount"
     ],
    "toolbar": "undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | " +
       "bullist numlist checklist outdent indent | removeformat | code table help"
 }

	
	// let percentage = 0;

	async function handleSubmit() {
		getImageSrc()
		const html_text = extractContent(body);
		const text = html_text.substring(0,300);
		// Add a new document with a generated id
		const newArticleRef = doc(collection(db, "article"));

		// later...
		const data = {
			author:id,
			title,
			body,
			photos,
			text
		}
		// console.log(data)
		const res = await setDoc(newArticleRef, data);
				
		// const docRef = await addDoc(collection("article"), );
		// console.log(newArticleRef.id)
		goto(`/article/${newArticleRef.id}`, { replaceState:true })
	}



	


	function extractContent(s) {
		var span = document.createElement('span');
		span.innerHTML = s;
		return span.textContent || span.innerText;
	};





  </script>