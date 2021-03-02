import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medio } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';

@Component({
  selector: 'app-medios',
  templateUrl: './medios.component.html',
  styleUrls: ['./medios.component.scss'],
})
export class MediosComponent implements OnInit {

  @Input() medios:Medio[];
  @Output() actualizar = new EventEmitter();

  // @Input() enFavoritos;
  mediosU:Medio[]=[];

  constructor(
    private iab: InAppBrowser,
    private noticiasService:NoticiasService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) { 
   
  }

  ngOnInit() {
    this.mediosU=[];
    this.noticiasService.getMedios().subscribe(medio=>{
      medio.resp.forEach(m=>{
     this.mediosU.push(m);
       console.log(m)
      })
    });
 
    console.log(this.medios);
  }

  
  abrirEnlaces(enlace){
    const browser = this.iab.create(enlace,'_system');
  }

  async lanzarMenu(medio?:Medio){
 
    let guardarBorrarBtn;
    let medioEn:Medio;

    console.log(this.mediosU)
    console.log(this.medios)

  medioEn=this.mediosU.find(m=>m.medio_id===medio.medio_id);



      if (medioEn) {
        guardarBorrarBtn= {
          text: 'Quitar de Medios',
          icon: 'trash',
          cssClass:' action-dark', 
          handler: () => {
            console.log('Borrar');
            medio.activo=false;
           this.noticiasService.eliminarMedio(medio.medio_id).subscribe(res=>{
             console.log(res)
            this.presentToast("medio Eliminado");
            this.ngOnInit();
            this.actualizar.emit("actualizar");
            // window.location.reload();  
           });
          // 
          
          }
        }
      }
      else {
               guardarBorrarBtn= {
                text: 'Agregar',
                icon: 'heart',
                cssClass:' action-dark', 
                handler: () => {
                  console.log('Favorite clicked');
                medio.activo=true;
                this.noticiasService.guargarMedio(medio).subscribe(resp=>{
                  this.presentToast("Se agrego el medio");
                  this.ngOnInit();
                  this.actualizar.emit("actualizar");
                  // window.location.reload();  
                });
                // this.presentToast("Se agrego a favoritos");
                }
          }
  }
  
   
      const actionSheet = await this.actionSheetController.create({
        header: 'Opciones',
        cssClass: 'my-custom-class',
        buttons: [ {
          text: 'Compartir',
          icon: 'share',
          cssClass:' action-dark',
          handler: () => {
            console.log('Share clicked');
            // this.compartirNoticia();
          }
         }, 
          guardarBorrarBtn
        //   text: 'Favorito',
        //   icon: 'heart',
        //   cssClass:' action-dark', 
        //   handler: () => {
        //     console.log('Favorite clicked');
        //    this.dataLocaleService.guardarNoticias(this.noticia);
        //   }
        
        , {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
           cssClass:' action-dark',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
  

    async presentToast(message:string) {
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();
    }
}
