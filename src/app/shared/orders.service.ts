import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private firestore: AngularFirestore ) { }
  form = new FormGroup({
    customerName: new FormControl('', Validators.required),
    orderNumber: new FormControl('', Validators.required),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  })

  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("coffeeOrders")
          .add(data)
          .then(res => {}, err => reject(err));
    });
  }
  
//get values stored in coffeeOrders collection
  getCoffeeOrders() {
    return this.firestore.collection("coffeeOrders").snapshotChanges();
  }
  updateCoffeeOrder(data) {
    return this.firestore
               .collection("coffeeOrders")
               .doc(data.payload.doc.id)
               .set({ completed: true }, { merge: true });
  }
  deleteCoffeeOrder(data) {
    return this.firestore
               .collection("coffeeOrders")
               .doc(data.payload.doc.id)
               .delete();
  }
}

