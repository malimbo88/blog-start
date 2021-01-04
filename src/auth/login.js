import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';

@inject (EventAggregator, Router, AuthService)
export class Login {

  // Constructor
  constructor(EventAggregator, Router, AuthService) {
    this.eventAggregator = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
  }

  // Activate 
  activate() {
    this.error = null;
  }

  // Login
  login() {
    this.authService.login(this.name).then(data => {
      this.eventAggregator.publish('user', data.name);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });
  }
}
