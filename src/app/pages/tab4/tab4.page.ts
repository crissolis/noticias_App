import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';
import { Medio } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  medios:Medio[]=[];
  constructor(private noticiasService:NoticiasService) {
    this.cargarMedios();
   }

  ngOnInit() {
    
  }

  cargarMedios(event?){
    this.medios=[];
     this.noticiasService.getMedios().subscribe(medio=>{
       medio.resp.forEach(m=>{
         this.medios.push(m);
       })
     });
     console.log(this.medios)
  }
 
 
  Buscar(parametro){
    console.log(parametro)
    let v:string=parametro.value;
    console.log(v)
    if (v.length>0) {
      this.medios=[];
      this.noticiasService.getSearchMedio(v).subscribe(medio=>{
        medio.forEach(m=>{
          this.medios.push(m);
        })
      });
      console.log(this.medios)
    }else{
      this.cargarMedios();
    }
 
  }
}
