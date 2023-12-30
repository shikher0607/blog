import { Injectable } from '@angular/core';
import { Firestore, DocumentData, collection, collectionData, where, query, limit, orderBy, doc, getDoc, updateDoc, FieldValue } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private fireStore: Firestore) { }

  public getFeaturedPosts(): Observable<DocumentData> {
    const collectionInstance = collection(this.fireStore, 'posts');
    const whereCondition = where('isFeatured', '==', true);
    const filteredQuery = query(collectionInstance, whereCondition, limit(4), orderBy('createdAt', 'desc'));
    return collectionData(filteredQuery, {idField: 'id'});
  }

  public loadLatestPost(): Observable<DocumentData> {
    const collectionInstance = collection(this.fireStore, 'posts');
    const orderByCondition = orderBy('createdAt', 'desc');
    const filteredQuery = query(collectionInstance, orderByCondition, limit(6));
    return collectionData(filteredQuery, {idField: 'id'});
  }

  public getPostsByCategory(categoryId: string): Observable<DocumentData> {
    const collectionInstance = collection(this.fireStore, 'posts');
    const whereCondition = where('category.categoryId', '==', categoryId);
    const filteredQuery = query(collectionInstance, whereCondition, orderBy('createdAt', 'desc'));
    return collectionData(filteredQuery, {idField: 'id'});
  }

  public getPostById(id: string): Observable<DocumentData | undefined> {
    const postRef = doc(this.fireStore, 'posts', id);
    return from(getDoc(postRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as DocumentData;
        } else {
          return undefined; // No document found
        }
      })
    );
  }

  public getSimilarPosts(categoryId: string): Observable<DocumentData> {
    const collectionInstance = collection(this.fireStore, 'posts');
    const whereCondition = where('category.categoryId', '==', categoryId);
    const filteredQuery = query(collectionInstance, whereCondition, orderBy('createdAt', 'desc'), limit(3));
    return collectionData(filteredQuery, {idField: 'id'});
  }

  public async countViews(postId: string): Promise<void> {
    const postRef = doc(this.fireStore, 'posts', postId);
    try {
      const docSnapshot = await getDoc(postRef);
      if (docSnapshot.exists()) {
        const currentViews = docSnapshot.data()?.['views'] || 0;
        await updateDoc(postRef, { views: currentViews + 1 });
        console.log('Views count incremented successfully');
      } else {
        console.error('Post not found');
      }
    } catch (error) {
      console.error('Error incrementing views count:', error);
    }
  }
}
