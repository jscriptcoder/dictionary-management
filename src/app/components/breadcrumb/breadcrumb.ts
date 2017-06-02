/**
 * This component is based on:
 * http://brianflove.com/2016/10/23/angular2-breadcrumb-using-router/
 */
 
import 'rxjs/add/operator/filter';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';

interface Breadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.scss']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: Breadcrumb[];
  private activatedRoute: ActivatedRoute;
  private router: Router;

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    this.activatedRoute = activatedRoute;
    this.router = router;
    this.breadcrumbs = [];
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      if (!child.snapshot.data.breadcrumb) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      url += `/${routeURL}`;

      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data.breadcrumb,
        params: child.snapshot.params,
        url: url
      };

      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}