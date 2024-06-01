import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Observable, Subject} from "rxjs";
import {FoodRequest, Order, OrderState} from "../../model/data";

@Injectable({
  providedIn: 'root'
})
export class RealtimeClientService {
  private hubConnection?: signalR.HubConnection;
  private pendingFoodUpdatedSubject = new Subject<Order[]>();
  ordersUpdated$: Observable<Order[]> = this.pendingFoodUpdatedSubject.asObservable();

  constructor() { 
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5083/foodhub') // Replace with your SignalR hub URL
      .build();
  
    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch((err: any) => console.error('Error connecting to SignalR hub:', err));
  
    this.hubConnection.on('PendingFoodUpdated', (orders: Order[]) => {
      this.pendingFoodUpdatedSubject.next(orders);
    });
  }

  async orderFoodItem(foodId: number, table: number) {
    console.log("ordering");
    await this.hubConnection.invoke('OrderFoodItem', {
      foodId,
      table,
    } as FoodRequest);
  }

  async updateFoodItem(orderId: number, state: OrderState) {
    await this.hubConnection.invoke('UpdateFoodItem', orderId, state);
  } 
}
