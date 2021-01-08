import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';

@inject (EventAggregator, Router, PostService)
export class Edit {

  // Constructor
  constructor(EventAggregator, Router, PostService) {
    this.eventAggregator = EventAggregator;
    this.router = Router;
    this.postService = PostService;
  }

  // Activate
  activate(params) {
   this.postService.find(params.slug).then(data => {
    this.post = data.post;
   }).catch(error => {
    console.log(error);
   });
    this.title = 'Edit post';
  }

  // Edit post
  editPost() {
    this.postService.update(this.post).then(data => {
      this.eventAggregator.publish('post-updated', Date());
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    });
  }

}
