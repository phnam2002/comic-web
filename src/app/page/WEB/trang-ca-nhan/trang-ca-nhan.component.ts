import { Component } from '@angular/core';
import { DefaultImage } from 'src/app/common/constants';

@Component({
  selector: 'app-trang-ca-nhan',
  templateUrl: './trang-ca-nhan.component.html',
  styleUrls: ['./trang-ca-nhan.component.css']
})
export class TrangCaNhanComponent {

  image = DefaultImage;
}
