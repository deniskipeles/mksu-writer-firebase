import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '$lib/firebase.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.article) {
    const docRef = doc(db, 'article', params.article);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dt = docSnap.data();
      return {
        ...dt,
        id: docSnap.id,
      };
    } else {
      return {
        title: 'no such article!',
        body: 'The article you just visited sems to be deleted...',
      };
    }
  }

  throw error(404, 'Not found');
}
