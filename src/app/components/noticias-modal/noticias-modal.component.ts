import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medio, Noticia } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';

@Component({
  selector: 'app-noticias-modal',
  templateUrl: './noticias-modal.component.html',
  styleUrls: ['./noticias-modal.component.scss'],
})
export class NoticiasModalComponent implements OnInit {

  noticias:Noticia[]=[];
  categorias:Medio[]=[];
  categoria=0;
  constructor( private noticiasService:NoticiasService,private modalController: ModalController) {
    noticiasService.getMedios().subscribe(med=>{
      this.categorias=med.resp;
      this.cargarNoticiasCateg(this.categorias[0].medio_id);
    });
  
  }

  ngOnInit() {}
  cargarNoticiasCateg(categoria:number,event?){
    console.log(categoria);
    
      if (this.categoria!==categoria) {
        this.noticias=[];
      }
      this.categoria=categoria;

      if (event) {
       let id=this.noticias[this.noticias.length - 1].id;
        this.noticiasService.getNoticiasMedio(categoria,Number(id)).subscribe(datos=>{
      
        datos.noticias.forEach(not => {
          let n= this.noticias.find(notic=>notic.id===not.id);
            if (n) {
              return;
            }else{
              this.noticias.push( not );
            }
          });
  
        // this.noticias.push( ...datos.noticias );
        if (datos.noticias.length===0) {
          event.target.disabled=true;
          event.target.complete();
          return;
        }
        if (event) {
          console.log(this.noticias)
          event.target.complete();
        }
       })
      
       }else{
        this.noticiasService.getNoticiasMedio(categoria).subscribe(datos=>{
      
          datos.noticias.forEach(not => {
            let n= this.noticias.find(notic=>notic.id===not.id);
              if (n) {
                return;
              }else{
                this.noticias.push( not );
              }
            });
    
          // this.noticias.push( ...datos.noticias );
          if (datos.noticias.length===0) {
            event.target.disabled=true;
            event.target.complete();
            return;
          }
          if (event) {
            event.target.complete();
          }
        });
       }

  
  }

  loadData(event){
   this.cargarNoticiasCateg(this.categoria,event);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    window.location.reload();  //*ver mas luego
  }
}
