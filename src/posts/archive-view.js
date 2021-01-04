import {inject} from 'aurelia-framework';
import {PostService} from '../common/services/post-service';

@inject (PostService)
export class ArchiveView {

   // Constructor
   constructor(PostService) {
    this.postService = PostService;
  }

  // Activate
  activate(params) {
    this.archive = params.archive;
    this.postService.postsByArchive(this.archive).then(data => {
      this.posts = data.posts;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
