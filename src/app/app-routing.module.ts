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
import { HOTComponent } from './page/WEB/hot/hot.component';
import { QuanLyNguoiDungComponent } from './page/CMS/quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { ChinhSuaComponent } from './page/CMS/quan-ly-nguoi-dung/chinh-sua/chinh-sua.component';
import { XemChiTietComponent } from './page/CMS/quan-ly-nguoi-dung/xem-chi-tiet/xem-chi-tiet.component';
import { LayoutCmsComponent } from './layout-cms/layout-cms.component';
import { ThemMoiComponent } from './page/CMS/quan-ly-nguoi-dung/them-moi/them-moi.component';
import { ThemTruyenComponent } from './page/CMS/quan-ly-truyen/them-truyen/them-truyen.component';
import { ThemChuongComponent } from './page/CMS/quan-ly-chuong/them-chuong/them-chuong.component';


const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Đăng nhập',
      },
      {
        path: 'trang-chu',
        component: TrangChuComponent,
        title: 'Trang chủ',
      },
      {
        path: 'hot',
        component: HOTComponent,
        title: 'HOT',
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
        children: [
          {
            path: 'thong-tin-chung',
            component: ThongTinChungComponent,
            title: 'Thông tin chung',
            data: { action: 'chung' },
          },          
          {
            path: 'thong-tin-ca-nhan',
            component: ThongTinCaNhanComponent,
            title: 'Thông tin cá nhân',
            data: { action: 'ca-nhan' },
          },
          { path: "", pathMatch: 'full', redirectTo: 'thong-tin-chung' },
        ]
      },
      { path: "", pathMatch: 'full', redirectTo: 'trang-chu' },
    ]
  },
  {
    path: 'cms',
    component: LayoutCmsComponent,
    children: [
      {
        path: 'quan-ly-chuong',
        component: QuanLyChuongComponent,
        title: 'Quản lý chương',
      },
      {
        path: 'quan-ly-chuong/them-moi',
        component: ThemChuongComponent,
        title: 'Thêm mới chương',
      },
      {
        path: 'quan-ly-truyen',
        component: QuanLyTruyenComponent,
        title: 'Quản lý truyện',
      },
      {
        path: 'quan-ly-truyen/them-moi',
        component: ThemTruyenComponent,
        title: 'Thêm mới truyện',
      },
      {
        path: 'quan-ly-nguoi-dung',
        component: QuanLyNguoiDungComponent,
        title: 'Quản lý người dùng'
      },
      {
        path: 'quan-ly-nguoi-dung/them-moi',
        component: ThemMoiComponent,
        title: 'Thêm mới người dùng',
      },
      {
        path: 'quan-ly-nguoi-dung/sua/:id',
        component: ChinhSuaComponent,
        title: 'Chỉnh sửa người dùng',
      },
      {
        path: 'quan-ly-nguoi-dung/xem/:id',
        component: XemChiTietComponent,
        title: 'Xem chi tiết người dùng',
      },
      { path: "", pathMatch: 'full', redirectTo: 'quan-ly-nguoi-dung' },
    ]

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
