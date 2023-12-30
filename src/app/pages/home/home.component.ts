import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public allPostsSubscription: Subscription | undefined;
  public allFeaturedPosts:Array<any> | undefined;
  public allLatestPosts:Array<any> | undefined;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private postsService: PostsService) {}

  public ngOnInit(): void {
    this.getFeaturedPosts();
    this.getLatestPost();
  }
  public ngOnDestroy(): void {
    this.allPostsSubscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getFeaturedPosts(): void {
    this.postsService.getFeaturedPosts().subscribe({
      next: ((posts: any) => {
        this.allFeaturedPosts = posts;
        console.log('this.allFeaturedPosts',this.allFeaturedPosts);
      }),
      error: (err => console.log('Error in getting featured posts from posts collection', err))
    })
  }

  public getLatestPost(): void {
    this.postsService.loadLatestPost().subscribe({
      next: ((posts: any) => {
        this.allLatestPosts = posts;
        console.log('allLatestPosts', this.allLatestPosts)
      }),
      error: (err => console.log('Error in getting latest posts from posts collection', err))
    })
  }

}
