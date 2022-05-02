import { Component, OnInit } from '@angular/core';
import { LoadersCSS } from 'ngx-loaders-css';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loader: LoadersCSS = 'ball-pulse';
  bgColor = 'white';
  color = '#1654D8';
  constructor() { }

  ngOnInit(): void {
  }

}
