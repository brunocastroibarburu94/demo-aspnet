// [1] - Add references needed
import { Component, OnDestroy, OnInit,signal } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";

import {RealtimeClientService} from "../../services/realtime-client/realtime-client.service";
import {firstValueFrom, Subscription} from "rxjs";
import {OrderState, Order} from "../../../model/data";//AuthenticationResponse (add later)
import {FormControl, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms'; // Solves NG8002: Can't bind to 'ngModel' since it isn't a known property of 'input'. 

import {JsonPipe, DatePipe} from "@angular/common";


// import {toSignal} from "@angular/core/rxjs-interop";
// import {AuthenticationInterceptor} from "../../interceptors/authinterceptor";
// import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

// [2] - Modify component annotations?
@Component({
  selector: 'app-kitchen', // changed it from app-costumer 
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.css'
})
export class KitchenComponent implements OnInit, OnDestroy{
  // [3] - Add Attributes
  foodStates = ['Ordered', 'Preparing', 'AwaitingDelivery', 'Completed'];
  orderSubscription: Subscription | undefined;
  orders = signal<Order[]>([]);

  // [4] - Declare constructor
  constructor(private realtime: RealtimeClientService, private http: HttpClient) {
  }

  async ngOnInit() {
    // Load exisiting orders (static data)
    let existingOrders = await firstValueFrom(this.http.get<Array<Order>>('http://localhost:5083/api/Kitchen/GetExistingOrders'));
    this.orders.set([...existingOrders]);
    /// Subscribe to future order updates
    this.orderSubscription = this.realtime.ordersUpdated$.subscribe(orders => this.orders.set([...orders]));
  }
  
  ngOnDestroy(): void { // [5] - Implement OnDestroy
    this.orderSubscription?.unsubscribe();
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
  async updateState(id: number, $event: Event) {
    let value = ($event.target as HTMLSelectElement)?.value; // Get the text from the control
    await this.realtime.updateFoodItem(id, value as OrderState); // Set the new enum value
  }

  public signalRHubState() { // [8] - Define the send order command
    return this.realtime.hubConnectionState();
  }

}
