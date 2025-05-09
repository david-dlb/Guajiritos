import { Component, EventEmitter, Output } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  imports: [ MatPaginatorModule ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export default class PaginatorComponent {
  @Output() pageChange = new EventEmitter<{ pageIndex: number}>();

  // Cuando cambie la página, emite el evento
  onPageChange(event: any) {
    this.pageChange.emit({ pageIndex: event.pageIndex });
  }
}
