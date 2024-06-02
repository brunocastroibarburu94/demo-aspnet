import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './root.component.html',
  styleUrl: './root.component.css'
})
export class RootComponent {
  title = 'FoodOrderingClient';
}

////////////////////////////////////
// import {Component} from '@angular/core';
// @Component({
//   selector: 'app-root', 
//   standalone: true,
//   imports: [
//   ],
//   templateUrl: './root.component.html',
//   styleUrl: './root.component.css'
// })
// export class RootComponent {

//   constructor() {
//   }

// }
