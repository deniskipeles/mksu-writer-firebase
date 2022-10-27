


<script>
// import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  
// import {app,db} from '$lib/firebase.js';

// export let lastVisible;

//     const nextPage = async() => {
//         // Construct a new query starting at this document,
//         // get the next 25 cities.
//         const next = query(collection(db, "article"),
//             orderBy("title"),
//             startAfter(lastVisible),
//             limit(2));
            
//         const documentSnapshots = await getDocs(next);

//         const articleList = documentSnapshots.docs.map(doc => {
//             const data=doc.data()
//             return{
//                 ...data,
//                 id:doc.id
//             }
//         });

//         // Get the last visible document
//         lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
//         console.log("last", lastVisible);

//         return {
//             lastVisible,
//             articleList
//         }

//     }




</script>



<div class="pagination">
  <a href="#">&laquo; previous</a>
  <a href="#">1</a>
  <a class="active" href="#">2</a>
  <a href="#">next &raquo;</a>
</div>


<style>
.pagination {
  display: inline-block;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: 1px solid #ddd;
}

.pagination a.active {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.pagination a:hover:not(.active) {background-color: #ddd;}

.pagination a:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination a:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>