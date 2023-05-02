
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  animations: [ trigger('divState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0)'
    })),
    state('highlighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px)'
    })),
    transition('normal => highlighted', animate(300)),
    transition('highlighted => normal', animate(800))
  ]),

  trigger('wildState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0) scale(1)'
    })),
    state('shrunken', style({
      'background-color': 'green',
      transform: 'translateX(0px) scale(0.5)'
    }))
    ,
    state('highlighted', style({
      'background-color': 'blue',
      transform: 'translateX(100px) scale(1)'
    })),
    transition('normal => highlighted', animate(300)),
    transition('highlighted => normal', animate(800)),
    transition('shrunken <=> *', animate(500))
    
  ])

],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  state = 'normal';
  wildstate = 'normal';

  constructor() { }

  ngOnInit(): void {
  }

  onAnimate(){
    this.state == 'normal' ? this.state = 'highlighted' : this.state = 'normal'
    this.wildstate == 'normal' ? this.wildstate = 'highlighted' : this.wildstate = 'normal'
  }
  onShrink(){
    this.wildstate = 'shrunken';
  }

}
