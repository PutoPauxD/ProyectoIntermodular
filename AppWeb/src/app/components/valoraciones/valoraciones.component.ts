import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {
  @Input() rating: number;
  @Input() ra: number;
  @Output() ratingChanged = new EventEmitter<number>();
  constructor() {}
  restoreRating() {
      this.rating = this.ra;

  }

  setRating() {
    this.ratingChanged.emit(this.rating);
  }
  ngOnInit(): void {
    this.restoreRating();

  }

}
