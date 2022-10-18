<svelte:head>
	<!-- head content -->
	<script src="https://cdn.tiny.cloud/1/q7h0i8r0h7ha598lyeh91pwubnpq34dseiz76p98qmzol7dc/tinymce/6/tinymce.min.js" referrerpolicy="origin" on:load={tinymceloaded}></script>
	
</svelte:head>

{body}
<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={title}/>
		<br/>
	<textarea bind:value={body}></textarea>
	<br/>
	<input type="submit" value="save">
</form>
  
  

<script>
// @ts-nocheck

	// import firebase from "firebase/app";
	import {db, storage} from "$lib/firebase"
	import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
	import { collection, doc, setDoc } from "firebase/firestore";
	// import Counter from "../Counter.svelte";

	let body=`test`;
	let title;
	let photos = [];
	// let percentage = 0;

	async function handleSubmit() {
		let html_text = extractContent(body);
		// Add a new document with a generated id
		const newArticleRef = doc(collection(db, "article"));

		// later...
		const data = {
			author:'cIWHsCZgkVM9hu0snc9mM2qGpe93',
			title,
			body,
			photos,
			text:html_text
		}
		// console.log(data)
		await setDoc(newArticleRef, data);
				
		// const docRef = await addDoc(collection("article"), );
		console.log("Document written with ID: ", data);
	}



	const uploadFile = (pic, progress) => new Promise((resolve, reject)=>{
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



	function extractContent(s) {
		var span = document.createElement('span');
		span.innerHTML = s;
		return span.textContent || span.innerText;
	};

	function tinymceloaded(){
		window.tinymce.init({
			selector: 'textarea',
			images_upload_handler: uploadFile,
			plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect',
			toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
			tinycomments_mode: 'embedded',
			tinycomments_author: 'Author name',
			mergetags_list: [
				{ value: 'First.Name', title: 'First Name' },
				{ value: 'Email', title: 'Email' },
			],
		});
	}




  </script>