import { Component, OnInit, Input } from '@angular/core';
import { Article, Noticia } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias:Noticia[]=[];
  @Input() enFavoritos=false;
  constructor() { }

  ngOnInit() {}

}
