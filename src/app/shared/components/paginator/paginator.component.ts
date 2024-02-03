import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit{
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() limit: number;

  @Output() pageChanged = new EventEmitter<number>();

  pages: number[]; // Array de números de 1 até totalPages

  constructor() {}

  ngOnInit(): void {
    console.log(this.totalPages);
    //const pagesCount = Math.ceil(this.totalPages / this.limit);
    this.pages = this.range(1, this.totalPages);
  }

  onPageChange(pageNumber: number): void {
    this.pageChanged.emit(pageNumber);
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((num) => num + start);
  }
}
