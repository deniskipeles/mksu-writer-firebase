import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
import {app,db} from '$lib/firebase.js';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

 
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const articles = await getArticles()
    // const lastVisible = await (await pageOne()).lastVisible
    console.log(articles)
    return {
      articles,
      // lastVisible
    };
}



async function getArticles() {
    const articlesCol = collection(db, 'article');
    const articleSnapshot = await (await getDocs(articlesCol));
    const articleList = articleSnapshot.docs.map(doc => {
            const data=doc.data()
            return{
              id:doc.id,
              title:data.title,
              photos:data.photos,
              text:data.text,
            }
    });
    return articleList;
}
