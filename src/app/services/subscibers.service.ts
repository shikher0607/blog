import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { SubscriptionInterface } from '../models/subscription-interface';

@Injectable({
  providedIn: 'root'
})
export class SubscibersService {

  constructor(private fireStore: Firestore) { }

  public async addSubscriber(subData: SubscriptionInterface): Promise<void> {
    // Check if the email already exists in the 'subscribers' collection
    const emailExistsQuery = query(
      collection(this.fireStore, 'subscribers'),
      where('email', '==', subData.email)
    );

    try {
      const querySnapshot = await getDocs(emailExistsQuery);
      if (!querySnapshot.empty) {
        throw new Error('Email already exists'); // Throw an error if email already exists
      }

      // If email doesn't exist, add the subscriber
      const collectionInstance = collection(this.fireStore, 'subscribers');
      await addDoc(collectionInstance, subData);
      console.log('Subscriber saved successfully to subscribers collection');
    } catch (error) {
      console.error('Error adding subscriber to subscribers collection:', error);
      throw error
    }
  }
}
