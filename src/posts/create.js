import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {PostService} from '../common/services/post-service';

@inject (EventAggregator, Router, PostService)
export class Create {

  // Constructor
  constructor(EventAggregator, Router, PostService) {
    this.eventAggregator = EventAggregator;
    this.router = Router;
    this.postService = PostService;
  }

  // Attached
  attached() {
    this.post = {
      title: '',
      body: '',
      tags: []
    };
    this.title = 'Create post';
  }

  // Create post
  createPost() {
    this.postService.create(this.post).then(data => {
      this.eventAggregator.publish('post-updated', Date());
      this.router.navigateToRoute('post-view', {slug: data.slug});
    }).catch(error => {
      console.log(error);
    });
  }

}
