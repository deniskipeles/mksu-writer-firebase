<script>
	import ListArticles from '$lib/comp/MyArticles.svelte';
	import {app,db} from '$lib/firebase.js';
	// import { getFirestore, collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { collection, query, where, getDocs } from "firebase/firestore";
	import { getAuth, onAuthStateChanged } from "firebase/auth";
	

	// const querySnapshot = await getDocs(q);
	let userData;

	const auth = getAuth();
	onAuthStateChanged(auth, async(user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		const id = user.uid;
		userData = user;
		await getArticles(id)
		// ...
	} else {
		// User is signed out
		// ...
		userData = null;
	}
	});

	let articles = [];

	async function getArticles(id) {

		// const articlesCol = collection(db, 'article');
		const q = query(collection(db, "article"), where("author", "==", id));
		const articleSnapshot = await getDocs(q);
		// console.log(id)
		const articleList = articleSnapshot.docs.map(doc => {
			const data=doc.data()
			return{
				...data,
				id:doc.id
			}
	});
		articles = articleList
		// console.log(articleSnapshot)
	}

	const refetch = async () => {
		await getArticles(userData.uid)
	};
</script>


<svelte:head>
	<title>My Articles</title>
	<meta name="description" content="This is a list the articles that I have publish" />
</svelte:head>
	<ListArticles articles={articles} refetch={refetch} />
	<!-- <Counter /> -->
<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
