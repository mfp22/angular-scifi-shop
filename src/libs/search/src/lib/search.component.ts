import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MaterialModule } from '@scifi/material/material.module';
import { Observable, Subscription, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent {
  @HostListener('window:scroll', ['event']) onScroll() {
    if (!this.isMediumViewport) return;
    if (window.scrollY > this.scrollY) {
      this.hideSearchbar = true;
    } else {
      this.hideSearchbar = false;
    }
    this.scrollY = window.scrollY;
  }
  productName = '';
  scrollY = 0;
  hideSearchbar = false;
  isMediumViewport: boolean | undefined;

  private readonly _mediumViewport$: Observable<boolean> = this._breakpointObserver
    .observe('(max-width: 800px)')
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
  private _subscription = Subscription.EMPTY;

  constructor(
    private _store: Store,
    private _router: Router,
    private _breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this._subscription = this._mediumViewport$.subscribe((matches) => {
      this.isMediumViewport = matches;
    });
  }

  search(searchForm: NgForm) {
    if (!this.productName?.trim()) return;
    this._router.navigate(['/products'], {
      queryParams: {
        product: this.productName,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
    searchForm.reset();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
