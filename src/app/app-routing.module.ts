import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layout/blank/blank.component';

const routes: Routes = [
  {
    path: 'page1',
    loadChildren: () =>
      import('./page1/page1.module').then((m) => m.Page1Module),
    data: {
      title: 'Page1',
    },
  },
  {
    path: 'page2',
    loadChildren: () =>
      import('./page2/page2.module').then((m) => m.Page2Module),
    data: {
      title: 'Page2',
      isBlank: true,
    },
  },
  {
    path: 'page3',
    loadChildren: () =>
      import('./page3/page3.module').then((m) => m.Page3Module),
    data: {
      title: 'Page3',
    },
  },
  {
    path: 'blog',
    component: BlankComponent,
    data: {
      title: 'Blog',
      externalUrl: 'https://blog.kevinyang.net/',
      isBlank: true,
    },
  },
  { path: '**', redirectTo: '/page1' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
