// [1] - Add references needed
import { Component, OnDestroy, OnInit,signal } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient,withInterceptorsFromDi} from "@angular/common/http";

import {RealtimeClientService} from "../../services/realtime-client/realtime-client.service";
import {firstValueFrom, Subscription} from "rxjs";
import {FoodItem, Order} from "../../../model/data";//AuthenticationResponse (add later)
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms'; // Solves NG8002: Can't bind to 'ngModel' since it isn't a known property of 'input'. 

import {JsonPipe, NgOptimizedImage} from "@angular/common";


import {toSignal} from "@angular/core/rxjs-interop";
// import {AuthenticationInterceptor} from "../../interceptors/authinterceptor";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

// [2] - Modify component annotations?
@Component({
  selector: 'app-costumers', // changed it from app-costumer 
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
    JsonPipe,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit, OnDestroy{
  // [3] - Add Attributes
  availableFood = signal<Array<FoodItem>>([]);
  activeOrders = signal<Array<Order>>([]);
  activeOrdersSubscription?: Subscription;

  // [4] - Declare constructor
  constructor(private realtime: RealtimeClientService, private http: HttpClient) {
  }
  
  
  ngOnDestroy(): void { // [5] - Implement OnDestroy
    this.activeOrdersSubscription?.unsubscribe();
  }

  tableNumber?: number; // [6] - Define input tableNumber

  showActiveOrders = false;

  // async ngOnInit() {// [7] - Implement OnInit
      
  //   let food = await firstValueFrom(this.http.get<Array<FoodItem>>('http://localhost:5083/api/FoodItems/GetFoodItems'));
  //   this.availableFood.set([...food]);

  //   let orders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:5083/api/Kitchen/GetExistingOrders'));
  //   this.activeOrders.set([...orders]);

  //   this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(orders => {
  //     this.activeOrders.set([...orders]);
  //   });

  // }
  

  async ngOnInit() {
    // Retrieve Menu on start
    console.log(`Application started`);
    let food = await firstValueFrom(this.http.get<Array<FoodItem>>('http://localhost:5083/api/FoodItems/GetFoodItems'));
    this.availableFood.set([...food]);

    let orders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:5083/api/Kitchen/GetExistingOrders'));
    this.activeOrders.set([...orders]);

    this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(orders => {
      this.activeOrders.set([...orders]);
    });

  }

  public toggleConnection(){
    if(this.realtime.hubConnectionState()==="Connected"){
      console.log(`Disconnecting...`);
      this.realtime.disconnect();
    }else if(this.realtime.hubConnectionState()==="Disconnected"){
      console.log(`Connecting...`);
      this.realtime.connect();
    }else{
      console.log(`Be patient...`);

    }
  }

  async sendOrder(foodId: number, tableNumber: number) { // [8] - Define the send order command
    
    console.log(`[sendOrder] - ordering for table ${tableNumber} food ${foodId}`);
    await this.realtime.orderFoodItem(foodId, tableNumber);

    // let orders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:5083/api/Kitchen/GetExistingOrders'));
    // this.activeOrders.set([...orders]);
    // this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(orders => {
    //   this.activeOrders.set([...orders]);
    // });
  }

  // [8] - Define showActiveOrdersToggle
  showActiveOrdersToggle() {
    console.log(`Toggling Show Active Orders`);
    this.showActiveOrders = !this.showActiveOrders;
  }
  
  // [8] - Other functions loadOrders, sendOrder
  async loadOrders() {
    let food = await firstValueFrom(this.http.get<Array<FoodItem>>('http://localhost:5083/api/FoodItems/GetFoodItems'));
    this.availableFood.set([...food]);

    // let orders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:5083/api/Kitchen/GetExistingOrders'));
    // this.activeOrders.set([...orders]);

    // this.activeOrdersSubscription = this.realtime.ordersUpdated$.subscribe(orders => {
    //   this.activeOrders.set([...orders]);
    // });
  }
  

  public signalRHubState() { // [8] - Define the send order command
    return this.realtime.hubConnectionState();
  }
  
  // async doLogin() {
  //     try {
  //       this.realtime.connect();
  //     } catch (e) {
  //       alert("Incorrect username/password");
  //     }
  // }

}
