import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article, Noticia, User } from '../../interfaces/interfaces';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

   noticias:Noticia[]=[];
   usuario:User;

  constructor(private storage: Storage,public router:Router) {
    // this.getUsuario();
   }

  guardarNoticias(noticia:Noticia){
    const existe=this.noticias.find(noti=>noti.id===noticia.id);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos',this.noticias);
    }

  
  }

  async cargarFavoritos(){
   const favoritos =await this.storage.get('favoritos');
   if (favoritos) {
    this.noticias=favoritos;   
   }
  
  }

  borrarNoticia(noticia:Noticia){
   this.noticias= this.noticias.filter( noti=>{
      noti.id!==noticia.id
    });
    this.storage.set('favoritos',this.noticias);
  }

 guardarUsuario(usuario:User){ 
      this.storage.set('usuario',JSON.stringify(usuario));
      this.usuario=usuario;
}

async getUsuario(){ 
  this.usuario=JSON.parse(await this.storage.get('usuario'));
  console.log(this.usuario)
}

logout(){
  this.usuario=null;
  this.storage.remove('usuario');
  this.router.navigate(['/home']);
}

 estaLogeado(){
  console.log("qqqqqqqqqs")
  return (this.usuario)?true:false;
}
}
