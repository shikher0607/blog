import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, switchMap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit, OnDestroy {
  public postsByCategory!: Array<any>
  public params: any;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private route: ActivatedRoute, private posts: PostsService) {}

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        this.params = params;
        return this.posts.getPostsByCategory(params.id);
      })
    ).subscribe(({
      next: ((posts: any) => {
        this.postsByCategory = posts;
        console.log('postsByCategory', this.postsByCategory)
      }),
      error: (err => console.log(`Error in getting posts of ${this.params.name} category from posts collection`, err))
    }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
