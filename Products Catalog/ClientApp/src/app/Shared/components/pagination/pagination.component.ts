import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {max} from "rxjs/operators";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() right: boolean;
  @Input() left: boolean;
  @Input() pagesNumber: number = 1;
  @Input() displayedPagesNumber: number = 1;
  public currentPage: number = 1;
  public pagesList: number[] = [];
  @Output() onPageChange = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    this.initPagesList();
  }

  initPagesList() {
    this.pagesList = [];
    if (this.pagesNumber > this.displayedPagesNumber)
      for (let i = Math.max(this.currentPage - 1, 2); i < Math.min(this.pagesNumber, this.currentPage + this.displayedPagesNumber - 2); i++) {
        this.pagesList.push(i);
      }
    else {
      for (let i = 2; i < this.pagesNumber - 1; i++) {
        this.pagesList.push(i);
      }
    }
  }

  changePage(page) {
    if (page < 1 || page > this.pagesNumber)
      return;
    this.currentPage = page;
    this.onPageChange.emit(this.currentPage);
    this.initPagesList();

  }


}
