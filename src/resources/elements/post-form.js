import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {PostService} from '../../common/services/post-service';

@inject(PostService)
export class PostForm {
  @bindable post;
  @bindable title;

  // Constructor
  constructor(PostService) {
    this.postService = PostService;
  }

  // Attached
  attached() {
    this.postService.allTags().then(data => {
      this.allTags = data.tags;
    }).catch(error => {
      this.error = error.message;
    });
  }

  // Add Tag
  addTag() {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  // Submit
  submit() {

  }

  valueChanged(newValue, oldValue) {
    //
  }
}
