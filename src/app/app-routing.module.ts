import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { QuanLyChuongComponent } from './page/CMS/quan-ly-chuong/quan-ly-chuong.component';
import { QuanLyTruyenComponent } from './page/CMS/quan-ly-truyen/quan-ly-truyen.component';
import { ChiTietChapComponent } from './page/WEB/chi-tiet-chap/chi-tiet-chap.component';
import { ChiTietTruyenComponent } from './page/WEB/chi-tiet-truyen/chi-tiet-truyen.component';
import { LoginComponent } from './page/WEB/login/login.component';
import { TrangChuComponent } from './page/WEB/trang-chu/trang-chu.component';
import { TimTruyenComponent } from './page/WEB/tim-truyen/tim-truyen.component';
import { TrangCaNhanComponent } from './page/WEB/trang-ca-nhan/trang-ca-nhan.component';
import { ThongTinChungComponent } from './page/WEB/trang-ca-nhan/thong-tin-chung/thong-tin-chung.component';
import { ThongTinCaNhanComponent } from './page/WEB/trang-ca-nhan/thong-tin-ca-nhan/thong-tin-ca-nhan.component';


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
        path: 'tim-truyen',
        component: TimTruyenComponent,
        title: 'Tìm truyện',
      },
      {
        path: 'them-chap/:id',
        component: QuanLyChuongComponent,
        title: 'Thêm chap',
      },
      {
        path: 'trang-ca-nhan',
        component: TrangCaNhanComponent,
        title: 'Trang cá nhân',
        children:[
          {
            path: 'thong-tin-chung',
            component: ThongTinChungComponent,
            title:'Thông tin chung'
          },
          {
            path: 'thong-tin-ca-nhan',
            component: ThongTinCaNhanComponent,
            title:'Thông tin cá nhân'
          },
          { path: "", pathMatch: 'full', redirectTo: 'thong-tin-chung' },
        ]
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
