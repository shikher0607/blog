import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.scss']
})
export class CategoryNavbarComponent implements OnInit, OnDestroy {

  public categories!: Array<any>;
  private destroy$: Subject<void> = new Subject<void>();


constructor(private categoriesServices: CategoriesService) { }

public ngOnInit(): void {
  this.loadData();
}

public loadData(): void {
  this.categoriesServices.loadData()
  .subscribe({
    next: (data: any) => {
      this.categories = data;
      console.log(this.categories)
    },
    error: (error: any) => {
      console.log('error in loading data from categories collection', error)
    }
  });
}

public ngOnDestroy(): void {
  this.destroy$.next();
    this.destroy$.complete();
}

}
