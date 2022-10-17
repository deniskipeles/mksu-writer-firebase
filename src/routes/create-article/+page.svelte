  <svelte:head>
	<!-- head content -->
	<script src="https://cdn.tiny.cloud/1/q7h0i8r0h7ha598lyeh91pwubnpq34dseiz76p98qmzol7dc/tinymce/6/tinymce.min.js" referrerpolicy="origin" on:load={tinymceloaded}></script>
  </svelte:head>
{percentage}
  <textarea>
    Welcome to TinyMCE!
  </textarea>
  <script>
// @ts-nocheck

	// import firebase from "firebase/app";
	import {db, storage} from "$lib/firebase"
	import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
	// const storageRef = ref(storage, 'some-child');

	// // 'file' comes from the Blob or File API
	// uploadBytes(storageRef, file).then((snapshot) => {
	// 	console.log('Uploaded a blob or file!');
	// });

	let url = null;
	let percentage = 0;

	const uploadFile = async (pic) => {
		// pic = e.target.file[0];
		const file = pic.blob()
		const storageRef = ref(storage, `${Date.now()}/${pic.filename()}`);
		const uploadTask = uploadBytesResumable(storageRef, file);


		// const mainPicturePath = `/${Date.now()}/${Date.now()}-${pic.filename()}`;
		// const storage = getStorage();
		// const ref = storage.ref(mainPicturePath);
		// await ref.put(pic.blob());
		// return mainPicturePath;

		uploadTask.on("state_changed",
		(snapshot) => {
			const progress =
			Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			percentage = progress
		},
		(error) => {
			alert(error);
		},
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				url = downloadURL;
			});
		}
		);
	};

	export const getUrl = async (path) => {
		const storage = storage();
		return await storage.ref(path).getDownloadURL();
	};



	function extractContent(s) {
		var span = document.createElement('span');
		span.innerHTML = s;
		return span.textContent || span.innerText;
	};

	function tinymceloaded(){
		window.tinymce.init({
			selector: 'textarea',
			images_upload_handler: image_upload_handler,
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



	async function image_upload_handler (blobInfo, success, failure, progress) {
		const path = await uploadFile(blobInfo);
		if (url) {
			// const url = await getUrl(path);
			success(url);
		} else {
			failure('failed to upload the image')
		}

	};




  </script>