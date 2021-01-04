import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from './common/services/auth-service';
import {PostService} from './common/services/post-service';


@inject(EventAggregator, AuthService, PostService)
export class App {

  // Constructor
  constructor(EventAggregator, AuthService, PostService) {
    this.eventAggregator = EventAggregator;
    this.authService = AuthService;
    this.postService = PostService;
  }

  // Attached
  attached() {
    this.currentUser = this.authService.currentUser;
    this.subscription = this.eventAggregator.subscribe('user', user => {
      this.currentUser = this.authService.currentUser;
    })
    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });
    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.error = error.message;
    });
  }

  // Router
  configureRouter(config, router) {
    this.router = router;
    config.title = 'My Blog';
    config.map([
      {route: '', name: 'home', moduleId: PLATFORM.moduleName('posts/index'), title: 'All posts'},
      {route: 'login', name: 'login', moduleId: PLATFORM.moduleName('auth/login'), title: 'Log in'},
      {route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('auth/signup'), title: 'Sign up'},
      {route: 'create-post', name: 'create-post', moduleId: PLATFORM.moduleName('posts/create'), title: 'Create post'},
      {route: 'post/:slug', name: 'post-view', moduleId: PLATFORM.moduleName('posts/view'), title: 'View post'},
      {route: 'tag/:tag', name: 'tag-view', moduleId: PLATFORM.moduleName('posts/tag-view'), title: 'View by tag'},
      {route: 'archive/:archive', name: 'archive-view', moduleId: PLATFORM.moduleName('posts/archive-view'), title: 'Post by archive'}
    ]);
  }

  // Detached
  detached() {
    this.subscription.dispose();
  }

  // Logout
  logout() {
    this.authService.logout().then(data => {
      console.log(data.success)
      this.eventAggregator.publish('user', null);
    }).catch(error => {
      this.error = error.message
    });
  }
}
