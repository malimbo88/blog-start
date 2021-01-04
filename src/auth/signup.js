import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';

@inject (EventAggregator, Router, AuthService)
export class Signup {

  // Constructor
  constructor(EventAggregator, Router, AuthService) {
    this.eventAggregator = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
    this.error = null;
  }

  // Signup
  signup() {
    this.error = null;
    this.authService.signup(this.name).then(data => {
      this.eventAggregator.publish('user', data.name);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });
  }
}
