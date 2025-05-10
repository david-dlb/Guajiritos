import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  imports: [ MatPaginatorModule ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export default class PaginatorComponent {
  @Output() pageChange = new EventEmitter<{ pageIndex: number}>();
  // Cuando cambie la página, emite el evento
  last: number = 0
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;


  private _hasElement: boolean = false;

  @Input() 
  set hasElement(value: boolean) {
    this._hasElement = value;
    this.onHasElementChange(); // Llamamos la función cuando cambia
  }

  get hasElement(): boolean {
    return this._hasElement;
  }

  onHasElementChange() {
    if (this._hasElement == false) {
      console.log("hola")
      this.pageIndex = -1
      console.log(this.last)
    }
    console.log('El valor de hasElement cambió:', this.hasElement);
    // Aquí puedes ejecutar tu lógica
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(this.pageIndex, "cambio")
    this.last = this.pageIndex
    this.pageChange.emit({ pageIndex: this.pageIndex });
  }
 
}
