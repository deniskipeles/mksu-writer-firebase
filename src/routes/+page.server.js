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






// const pageOne = async() => {
//   // Query the first page of docs
//   const first = query(collection(db, "article"), orderBy("title"), limit(2));
//   const documentSnapshots = await getDocs(first);

//   const articleList = documentSnapshots.docs.map(doc => {
//     const data=doc.data()
//     return{
//         id:doc.id,
//         title:data.title,
//         photos:data.photos,
//         text:data.text,
//     }
//   });

//   // Get the last visible document
//   const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
//   // console.log("last", lastVisible);

//   return {
//     lastVisible,
//     articleList
//   }
// }

// const nextPage = async(lastVisibleDoc) => {
//   // Construct a new query starting at this document,
//   // get the next 25 cities.
//   const next = query(collection(db, "article"),
//       orderBy("title"),
//       startAfter(lastVisibleDoc),
//       limit(2));
      
//   const documentSnapshots = await getDocs(next);

//   const articleList = documentSnapshots.docs.map(doc => {
//     const data=doc.data()
//     return{
//         ...data,
//         id:doc.id
//     }
//   });

//   // Get the last visible document
//   const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
//   console.log("last", lastVisible);

//   return {
//     lastVisible,
//     articleList
//   }

// }