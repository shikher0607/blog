import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit, OnDestroy {
  public params: any;
  public postData: any
  public similarPosts: Array<any> | undefined;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        this.params = params;
        console.log(this.params);
        
        return this.postsService.getPostById(this.params.id)
      })
    ).subscribe({
      next: ((post: any) => {
        this.postsService.countViews(this.params.id)
        this.postData = post;
        this.getSimilarPost(this.postData.category.categoryId)
      }),
      error: (err => console.log('Error in getting post for single post', err))
    })
  }

  public getSimilarPost(categoryId: string) {
    this.postsService.getSimilarPosts(categoryId).subscribe({
      next: ((posts: any) => {
        this.similarPosts = posts;
        console.log('similarPosts', this.similarPosts);
      }),
      error: (err => console.log('Error in getting post for single post', err))
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
