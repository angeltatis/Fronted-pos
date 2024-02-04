import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { ToastModule } from "primeng/toast";
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { ProductComponent } from "../product/product.component";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    DashboardComponent,
    RouterLink,
    NgClass,
    ProductComponent,
    ToastModule,
    ProductDetailComponent,
    RouterOutlet
  ]
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router, private route: ActivatedRoute) {}

  onOption(routePath: string) {
    this.router.navigate([routePath], { relativeTo: this.route });
  }
}
