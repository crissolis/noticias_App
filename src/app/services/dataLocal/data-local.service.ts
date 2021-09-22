import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {  Noticia, User } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
/**
 * Servicio encargado de manejar el localStorage
 */
@Injectable({
  providedIn: 'root'
})

export class DataLocalService {

   noticias:Noticia[]=[];
   usuario:User;

  constructor(private storage: Storage,public router:Router) {
    // this.getUsuario();
   }

   /**
    * funcion encargada de guardar las noticias en una lista de favoritos localmente  
    * @param {Noticia} noticia un objeto de tipo noticia
    */
  guardarNoticias(noticia:Noticia){
    const existe=this.noticias.find(noti=>noti.id===noticia.id);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos',this.noticias);
    }

  
  }

  async cargarFavoritos(noticias:Noticia[]){
  //  const favoritos =await this.storage.get('favoritos');
  //  if (favoritos) {
  //   this.noticias=favoritos;   
  //  }
  // this.noticiasService.getFavorito().subscribe(resp=>{
    this.noticias=noticias;
  // });
  this.storage.set('favoritos',this.noticias);
  }

  /**
   * @ignore
   * @param noticia 
   */
  borrarNoticia(noticia:Noticia){
   this.noticias= this.noticias.filter(noti=>noti.id!==noticia.id);
    // console.log(this.noticias);
    this.storage.set('favoritos',this.noticias);
  }

  /**funcion encargada de guardar localmente la referencia del usuario
   * 
   * @param {User} usuario un objeto de tipo usuario
   */
 async guardarUsuario(usuario:User){ 
    let user= await this.storage.set('usuario',JSON.stringify(usuario));
      this.usuario=usuario;
}

/**
 * funcion encargada de regresar el usurio guardado localemente en un formato json
 * @async 
 * @returns {Promise}
 */
async getUsuario(): Promise<any>{ 
  this.usuario=await this.storage.get('usuario');
  if (this.usuario) {
  // console.log(this.usuario)
    this.usuario= JSON.parse(await this.storage.get('usuario'));
  }

  // console.log(this.usuario)
}

/**
 * funcion encargada de borrar al usuario del locaStore y navegar al home
 */
logout(){
  this.usuario=null;
  this.storage.remove('usuario');
  this.router.navigate(['/home']);
}

/**
 * funcion encargada de verificar si hay un usuario logeado
 * @returns {boolean}
 */
 estaLogeado(): boolean{
  // console.log("qqqqqqqqqs")
  return (this.usuario)?true:false;
}
 
/**
 * funcion que verifica si una noticia ya existe en la lista de favoritos
 * @param {Noticia} noticiaN 
 * @returns {boolean}
 */
enFavorito(noticiaN?:Noticia): boolean{
  let exist=this.noticias.find(noticia=>noticia.id===noticiaN.id);
  // console.log(exist)
  if (exist) {
    return true;
  } else {
    return false;
  }
}
}
