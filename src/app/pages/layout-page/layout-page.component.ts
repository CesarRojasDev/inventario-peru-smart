import { Component } from '@angular/core';

import { HeaderUserComponent } from "../../components/header-user/header-user.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [HeaderUserComponent, RouterOutlet],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

}
