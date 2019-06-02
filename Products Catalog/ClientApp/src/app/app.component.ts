import {Component, OnInit} from '@angular/core';

declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    $('#sideMenu.sidebar').first().sidebar('attach events', '#toggleSideBar');

  }
}
