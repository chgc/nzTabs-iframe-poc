import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  menuList: any[] = [{ title: 'Home', url: '' }];

  currentIndex = -1;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )

      .subscribe((event: any) => {
        const menu = { ...event };
        menu.url = this.router.url;
        const url = menu.url;
        this.titleService.setTitle(menu.title);
        if (menu.isExternal) {
          const exitMenu = this.menuList.find(
            (info, idx) => idx > 0 && info.url === url
          );
          if (!exitMenu) {
            this.menuList.push(menu);
          }
        } else {
          this.menuList[0] = { ...menu, title: 'Home' };
        }
        this.currentIndex = this.menuList.findIndex((p) => p.url === url);
        console.log(this.currentIndex);
      });
  }

  closeUrl(url: string) {
    const index = this.menuList.findIndex((p) => p.url === url);

    if (this.menuList.length === 1) {
      return;
    }
    this.menuList.splice(index, 1);

    // 删除复用
    // SimpleReuseStrategy.deleteRouteSnapshot(url);

    if (this.currentIndex === index) {
      let menu = this.menuList[index - 1];
      if (!menu) {
        menu = this.menuList[index];
      }
      this.router.navigate([menu.url]);
    }
  }

  nzSelectChange($event: NzTabChangeEvent) {
    this.currentIndex = $event.index ?? 0;
    const menu = this.menuList[this.currentIndex];
    this.router.navigate([menu.url]);
  }
}
