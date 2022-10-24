<script>
	import Counter from './Counter.svelte';
	import ListArticles from '$lib/comp/ListArticles.svelte';
	import {app,db} from '$lib/firebase.js';
	import { getFirestore, collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let articles = [];

	async function getArticles() {
		const articlesCol = collection(db, 'article');
		const articleSnapshot = await getDocs(articlesCol);
		const articleList = articleSnapshot.docs.map(doc => {
			const data=doc.data()
			return{
				...data,
				id:doc.id
			}
	});
		articles = articleList
		console.log(articles)
	}

	onMount(async () => {
		await getArticles()
	});
</script>


<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
	<ListArticles articles={articles} />
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
