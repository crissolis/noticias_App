import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticia/noticias.service';
import { RespuestaTopHeadLines, Article, Noticia } from '../../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias:Noticia[]=[];
  darkMode: boolean = true;
  constructor(private noticiasService:NoticiasService,private dataL:DataLocalService,
    private toastController: ToastController) {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // this.darkMode = prefersDark.matches;
  }

  ngOnInit(){
 this.cargarNoticias();
  }

  loadData(event){
  this.cargarNoticiasAnt(event);
  }

  async cargarNoticias(event?){
    this.noticias=[];
    this.noticiasService.recargar().subscribe(()=>{   
    this.noticiasService.pages=0;
    // console.log(this.noticiasService.pages=0)
    this.noticiasService.getNoticias().subscribe(datos=>{
      //  console.log(datos);
   
      if (datos.noticias.length===0) {
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      
      datos.noticias.forEach(not => {
      let n= this.noticias.find(notic=>notic.id===not.id);
        if (n) {
          return;
        }else{
          this.noticias.push( not );
        }
      });

      // console.log(this.noticias)
      if (event) {
        event.target.complete();
      }
    
    });
    } );
    
  }

  

  cargarNoticiasAnt(event?){
    // console.log(this.noticias)
    let id=this.noticias[this.noticias.length - 1].id;
    this.noticiasService.getNoticiasAntiguas(id).subscribe(datos=>{
      // console.log(datos);
      if (datos.noticias.length===0) {
        event.target.disabled=true;
        event.target.complete();
        return;
      }
      
      datos.noticias.forEach(not => {
      let n= this.noticias.find(notic=>notic.id===not.id);
        if (n) {
          return;
        }else{
          this.noticias.push( not );
        }
      });

      // console.log(this.noticias)
      if (event) {
        event.target.complete();
      }
   
     
    });
  }


  change() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
     }

   
     async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: 'Desea salir?',
        color:'danger',
        // message: 'Click to Close',
        position: 'top',
        animated:true,
        buttons: [
          {
            side: 'start',
            icon: 'exit',
            text: 'Salir',
            handler: () => {
             this.dataL.logout();
            }
          }, {
            text: 'cancelar',
            role: 'cancel',
            handler: () => {
              // console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
     

     
}
