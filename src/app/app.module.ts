import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environment/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './component/modal/modal.component';
import { PageFooterComponent } from './component/page-footer/page-footer.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { PageNavbarComponent } from './component/page-navbar/page-navbar.component';
import { TopComicRcmComponent } from './component/top-comic-rcm/top-comic-rcm.component';
import { LayoutComponent } from './layout/layout.component';
import { QuanLyChuongComponent } from './page/CMS/quan-ly-chuong/quan-ly-chuong.component';
import { QuanLyTruyenComponent } from './page/CMS/quan-ly-truyen/quan-ly-truyen.component';
import { TrangChuComponent } from './page/WEB/trang-chu/trang-chu.component';
import { LoginComponent } from './page/WEB/login/login.component';
import { ChiTietChapComponent } from './page/WEB/chi-tiet-chap/chi-tiet-chap.component';
import { ChiTietTruyenComponent } from './page/WEB/chi-tiet-truyen/chi-tiet-truyen.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgselectComponent } from './component/ngselect/ngselect.component';
import { ComicInfoComponent } from './component/comic-info/comic-info.component';
import { TimTruyenComponent } from './page/WEB/tim-truyen/tim-truyen.component';
import { TrangCaNhanComponent } from './page/WEB/trang-ca-nhan/trang-ca-nhan.component';
import { ThongTinChungComponent } from './page/WEB/trang-ca-nhan/thong-tin-chung/thong-tin-chung.component';
import { TruyenTheoDoiComponent } from './component/truyen-theo-doi/truyen-theo-doi.component';
import { TruyenBinhLuanComponent } from './component/truyen-binh-luan/truyen-binh-luan.component';
import { ThongTinCaNhanComponent } from './page/WEB/trang-ca-nhan/thong-tin-ca-nhan/thong-tin-ca-nhan.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    PageFooterComponent,
    PageHeaderComponent,
    PageNavbarComponent,
    TopComicRcmComponent,
    LayoutComponent,
    QuanLyChuongComponent,
    QuanLyTruyenComponent,
    TrangChuComponent,
    LoginComponent,
    ChiTietChapComponent,
    ChiTietTruyenComponent,
    NgselectComponent,
    ComicInfoComponent,
    TimTruyenComponent,
    TrangCaNhanComponent,
    ThongTinChungComponent,
    TruyenTheoDoiComponent,
    TruyenBinhLuanComponent,
    ThongTinCaNhanComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // AngularFireStorage,
    NgxPaginationModule,
    // NgImageSliderModule,
    CarouselModule,
    NgSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
