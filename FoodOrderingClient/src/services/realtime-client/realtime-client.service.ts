import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Observable, Subject} from "rxjs";
import {FoodRequest, Order, OrderState} from "../../../model/data";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RealtimeClientService {
  private hubConnection?: signalR.HubConnection;
  private pendingFoodUpdatedSubject = new Subject<Order[]>();
  ordersUpdated$: Observable<Order[]> = this.pendingFoodUpdatedSubject.asObservable();

  constructor() { 
    console.log("Creating  RealtimeClientService");
    this.hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug) // Add logging
    .withUrl('http://localhost:5083/foodhub',// Replace with your SignalR hub URL
    {
      // withCredentials: sessionStorage.getItem('token') != null,
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets} // Corrects Error connecting with SignalR Hub
    ) 
    .withAutomaticReconnect()
    .build();

    console.log("...Created  hubConnection");
    
    console.log(`......State: ${this.hubConnection.state}`);
    console.log(`......ServerTimeoutInMilliseconds: ${this.hubConnection.serverTimeoutInMilliseconds}`);
    console.log(`......BaseUrl: ${this.hubConnection.baseUrl}`);
    console.log(`......ConnectionId-Before: ${this.hubConnection.connectionId}`);
    // Error starts here
    // this.hubConnection.start()
    // .then(function (err) {return console.info('Connected to SignalR hub');})
    // .catch(function (err) {return console.error(err.toString());})

    console.log(`......ConnectionId-After: ${this.hubConnection.connectionId}`);
    console.log(`......State-After: ${this.hubConnection.state}`);
   
    // console.log("...Started  hubConnection");
    
    this.hubConnection.on('PendingFoodUpdated', (orders: Order[]) => {this.pendingFoodUpdatedSubject.next(orders);});
    // console.log("...Done");
  }
  disconnect(){
    console.log("Attempting to Disconnect...");
    this.hubConnection?.stop()
    .then(function (err) {return console.info('Connected to SignalR hub');})
    .catch(function (err) {return console.error(err.toString());})
  }
  
  connect(){
    console.log("Attempting to Connect...");
    this.hubConnection?.start()
    .then(function (err) {return console.info('Connected to SignalR hub');})
    .catch(function (err) {return console.error(err.toString());})
  }
  public hubConnectionState() {
    let state = this.hubConnection?.state; 
    // await hubConnection.state;
    return state;
  }
  async orderFoodItem(foodId: number, table: number) {
    console.log("Executing orderFoodItem");
    // this.connect()
    await this.hubConnection?.invoke('OrderFoodItem', {
      foodId,
      table,
    } as FoodRequest);
  }

  async updateFoodItem(orderId: number, state: OrderState) {
    await this.hubConnection?.invoke('UpdateFoodItem', orderId, state);
  } 
}
