import { Component, OnInit } from '@angular/core';
import { transition, trigger, state, style, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { NotificationService } from 'app/shared/messages/notification.service';



@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snackie', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!!';
  snackVisibility: string = 'hidden';

  constructor(private notification: NotificationService) { }

  ngOnInit() {
    this.notification.notifier
      .do(message => {
        this.message = message;
        this.snackVisibility = 'visible';
    }).switchMap(() => Observable.timer(3000))
      .subscribe(() => this.snackVisibility = 'hidden')
  }

  toggleSnack() {
    this.snackVisibility = (this.snackVisibility === 'hidden') ? 'visible' : 'hidden'
  }
}
