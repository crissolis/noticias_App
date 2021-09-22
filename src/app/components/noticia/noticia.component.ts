import { Component, OnInit, Input } from '@angular/core';
import { Article, Noticia } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { ToastController } from '@ionic/angular';
import { NoticiasService } from '../../services/noticia/noticias.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia:Noticia;
  @Input() enFavoritos;
  favorito:string="";

  notIcons=[
    { id:1,
      class:"iconoPorN",
      icon:"../assets/img/triste.png",
    },
    {
      id:2,
      class:"iconoPorEs",
      icon:"../assets/img/esceptico.png",
    },
     {
      id:3,
      class:"iconoPorP",
      icon:"../assets/img/feliz.png",
    }
  ]

  constructor(private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    public dataLocaleService:DataLocalService,
    private toastController: ToastController,
    private platform: Platform,
    private noticiaService: NoticiasService,
    ) { }

  ngOnInit() {
    // console.log(this.enFavoritos);
  }

  abrirNoticia(){
    if (this.noticia.noticia_url) {
    const browser = this.iab.create(this.noticia.noticia_url,'_system');   
    }else{
     
      var enlace=this.toUrl(this.noticia.contenido);
      // console.log(enlace)
    const browser = this.iab.create(enlace[0],'_system');

    }
  }


 async lanzarMenu(noticiaN?:Noticia){
 
  let guardarBorrarBtn;

   let exist=this.dataLocaleService.noticias.find(noticia=>noticia.id===noticiaN.id)
  // let exist=this.dataLocaleService.enFavorito(noticia);
  // console.log(exist)
    if (exist) { 
      guardarBorrarBtn= {
        text: 'Quitar de favorito',
        icon: 'trash',
        cssClass:' action-dark', 
        handler: () => {
          // console.log('Borrar');
          this.enFavoritos=false;
          this.noticiaService.eliminarFavorito(noticiaN).subscribe(res=>{
            this.dataLocaleService.borrarNoticia(noticiaN);
            // console.log(res);
          });
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
                // console.log('Favorite clicked');
              this.noticiaService.guardarFavorito(noticiaN).subscribe(res=>{
                this.dataLocaleService.guardarNoticias(noticiaN);
                // console.log(res);
              });
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
          // console.log('Share clicked');
          this.compartirNoticia();
        }
       }, 
        guardarBorrarBtn
      
      , {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
         cssClass:' action-dark',
        handler: () => {
          // console.log('Cancel clicked');
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
          title: this.noticia.medio_name,
          text: this.noticia.contenido,
          url: this.noticia.noticia_url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        // console.log("nell");
      }
    }
  
  }

   toTex(texto):string { 
    //  console.log(texto);
    const regex = /https:/gi;
    let l=  texto.search(regex);
    if (l!=undefined) {
      let txf =texto.slice(0,(l-1));
      // console.log(txf);
      return txf;
    }
    return texto;
} 

toUrl(texto):string[] { 
  const regex = /https:/gi;
  var arrayDeCadenas=[];
  var Enlaces=[];
  let l=  texto.search(regex);
  if (l!=undefined) {
    let txf =texto.slice(l);
   arrayDeCadenas = txf.split(" ");
  }

  arrayDeCadenas.forEach((element:String) => {
    if (element.includes('https') && !element.includes('...')) {
      Enlaces.push(element);
    }
  });
  return Enlaces;
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

  let icon={};
  if(porcentaje >= -0.05 && porcentaje <= 0.05) {
    icon=this.notIcons.find(ni=>ni.id===2);
}else if(porcentaje > 0.05){
  icon=this.notIcons.find(ni=>ni.id===3);
}else if(porcentaje < 0){
  icon=this.notIcons.find(ni=>ni.id===1);
}

return icon;

 }

 
}
