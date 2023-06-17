import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { QuanLyChuongComponent } from './page/CMS/quan-ly-chuong/quan-ly-chuong.component';
import { QuanLyTruyenComponent } from './page/CMS/quan-ly-truyen/quan-ly-truyen.component';
import { ChiTietChapComponent } from './page/WEB/chi-tiet-chap/chi-tiet-chap.component';
import { ChiTietTruyenComponent } from './page/WEB/chi-tiet-truyen/chi-tiet-truyen.component';
import { LoginComponent } from './page/WEB/login/login.component';
import { TrangChuComponent } from './page/WEB/trang-chu/trang-chu.component';


const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'trang-chu',
        component: TrangChuComponent,
        title: 'Trang chủ',
      },
      {
        path: 'chi-tiet-truyen/:id',
        component: ChiTietTruyenComponent,
        title: 'Chi tiết truyện',
      },
      {
        path: 'chi-tiet-chap/:id',
        component: ChiTietChapComponent,
        title: 'Chi tiết chap',
      },
      {
        path: 'them-truyen',
        component: QuanLyTruyenComponent,
        title: 'Thêm truyện',
      },
      {
        path: 'them-chap/:id',
        component: QuanLyChuongComponent,
        title: 'Thêm chap',
      },

      { path: "", pathMatch: 'full', redirectTo: 'trang-chu' },
    ]
      
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
