import { Component, OnInit, Input } from '@angular/core';
import { Article, Noticia } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Noticia;
  @Input() enFavoritos;
  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocaleService:DataLocalService,
    private toastController: ToastController,
    private platform: Platform,

    ) { }

  ngOnInit() {
    console.log(this.enFavoritos);
  }

  abrirNoticia(){
    if (this.noticia.noticia_url) {
    const browser = this.iab.create(this.noticia.noticia_url,'_system');   
    }else{
     
      var enlace=this.toUrl(this.noticia.contenido);
      console.log(enlace)
    const browser = this.iab.create(enlace[0],'_system');

    }
  }

 async lanzarMenu(noticia?:Noticia){
 
  let guardarBorrarBtn;

  let exist=this.dataLocaleService.noticias.find(noticia=>noticia.id===noticia.id)

    if (exist) {
      guardarBorrarBtn= {
        text: 'Quitar de favorito',
        icon: 'trash',
        cssClass:' action-dark', 
        handler: () => {
          console.log('Borrar');
          this.enFavoritos=false;
        this.dataLocaleService.borrarNoticia(this.noticia);
        this.presentToast("Noticia eliminada");
        
        }
      }
    }
    else {
             guardarBorrarBtn= {
              text: 'Favorito',
              icon: 'heart',
              cssClass:' action-dark', 
              handler: () => {
                console.log('Favorite clicked');
              this.dataLocaleService.guardarNoticias(this.noticia);
              this.enFavoritos=true;
              this.presentToast("Se agrego a favoritos");
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
          this.compartirNoticia();
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

  compartirNoticia(){

    if (this.platform.is("cordova")) {
      this.socialSharing.share(this.noticia.nombre,
        this.noticia.contenido,'',this.noticia.noticia_url);
    }else{
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.nombre,
          text: this.noticia.contenido,
          url: this.noticia.noticia_url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.log("nell");
      }
    }
  
  }

   toTex(texto):string { 
    const regex = /https:/gi;
    let l=  texto.search(regex);
    if (l!=undefined) {
      let txf =texto.slice(0,(l-2));
      // console.log(txf);
      return txf;
    }
    return texto;
} 

toUrl(texto):string[] { 
  const regex = /https:/gi;
  var arrayDeCadenas=[];
  let l=  texto.search(regex);
  if (l!=undefined) {
    let txf =texto.slice(l);
   arrayDeCadenas = txf.split(" ");
    return arrayDeCadenas;
  }
  return arrayDeCadenas;
} 


abrirEnlaces(enlace){
  const browser = this.iab.create(enlace,'_system');
}

retornarIcon(porcentaje:number){
  // if (porcentaje===0) {
  //   return "../assets/img/esceptico.png";
  // }else if (porcentaje>0.07) {
  //   return "../assets/img/feliz.png";
  // } else if (porcentaje<=-0.0099){
  //   return "../assets/img/triste.png";
  // }else{
  //   return "../assets/img/esceptico.png";
  // }

  if(porcentaje > -0.05 && porcentaje < 0.05) {
    return "../assets/img/esceptico.png";
}else if(porcentaje > 0.05){
  return "../assets/img/feliz.png";
}else if(porcentaje < 0){
  return "../assets/img/triste.png";
}

 }

 
}
