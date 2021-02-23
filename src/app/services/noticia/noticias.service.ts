import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MedioResponse, NoticiaResponse, RespuestaTopHeadLines, Medio, NoticasFecha, UserResponse, User } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';

import { Observable, timer } from 'rxjs';
import { flatMap, map } from "rxjs/operators";
import { DataLocalService } from '../dataLocal/data-local.service';

const TIME_INTERVAL = 300000; 
const apiKey=environment.apikey;
// const apiUrl=environment.apiUlr;

const Url=environment.ApiUrl;
const headers= new HttpHeaders({
  'X-Api-key':apiKey
})
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  pages=0;
  medioActual=0;
  categoriaPage=0;

  constructor( private http:HttpClient,private datal:DataLocalService) {
    
    if (datal.usuario) {
     
    //  this.recargar();
    }
     
   }



  private ejecutarQuery<T>(query:string,params?){
    query=Url + query;
    return this.http.get<T>(query,{headers,params:params});
  }

  private ejecutarQueryP<T>(query:string,params?){
    query=Url + query;
    return this.http.post<T>(query,params);
  }

  getTopHeadLines(){
    this.pages++;
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.pages}`);
  }

  getNoticias(){
    this.pages++;
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
    //  this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true`);
    // return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.pages}`);

       
   return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.pages}&usuario=${this.datal.usuario.usuario_id}`);
  
  
     
    //  return  timer(0, TIME_INTERVAL).pipe(
    //   map(()=>{
    //     return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true&usuario=${this.datal.usuario.usuario_id}`).pipe(
    //       flatMap(()=>{
    //       return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.pages}&usuario=${this.datal.usuario.usuario_id}`);
    //       })
    //     )
    //   })
    //  );
  }



  getNoticiasAntiguas(ultimoId){
    this.pages++;  
   return   this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true&ultimoid=${ultimoId}&usuario=${this.datal.usuario.usuario_id}`).pipe(
         flatMap(()=>{
         return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.pages}&usuario=${this.datal.usuario.usuario_id}`)
         })
       )
     
  }

  async recargar(){
    await this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true&usuario=${this.datal.usuario.usuario_id}&pag=${this.pages}`).
    subscribe(resp=>{
      console.log(resp)
    }) 
  
  }

  getMedios(){
    this.pages++;
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
    return this.ejecutarQuery<MedioResponse>(`/medio/medios?usuario=${this.datal.usuario.usuario_id}`);
  }

  getSearchMedio(termino:string){
   
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
    return this.ejecutarQuery<Medio[]>(`/medio/buscar?medio=${termino}`);
  }


  getNoticiasMedio( medio :number,ultimoId?:number){
    if (this.medioActual===medio) {
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.medioActual=medio;
    }
    if (ultimoId) {
      return   this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true&ultimoid=${ultimoId}&medio=${medio}&usuario=${this.datal.usuario.usuario_id}`).pipe(
        flatMap(()=>{
          return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.categoriaPage}&medio=${medio}&usuario=${this.datal.usuario.usuario_id}`);
        })
      );
      
    } else {
    return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.categoriaPage}&medio=${medio}&usuario=${this.datal.usuario.usuario_id}`);
      
    }
  
  }


  guargarMedio(medio:Medio){
     
     return this.ejecutarQuery<Medio>(`/medio/guardar?usuario=${this.datal.usuario.usuario_id}`,medio);
  }

 

  getNoticiasFecha(fechaIn,fechaF,medio?,tipo?){
    let params = new HttpParams()
    .set('inicio', fechaIn).
    set('fin',fechaF).
    set('medio',medio).
    set('tipo',tipo);
    return this.ejecutarQuery<NoticasFecha>(`/noticias/reporte`,params);
  }


  eliminarMedio(medio){
     return this.ejecutarQuery<MedioResponse>(`/medio/eliminar?usuario=${this.datal.usuario.usuario_id}&medio=${medio}`);
  }

//?LOS METODOS PARA LOGIN Y REGISTRO
  login(nick,passsword){
    let params = {
    usuario:nick ,
    clave:passsword,
    }
    return this.ejecutarQueryP<UserResponse>(`/users/login`,params);
  }

  register(user){
    
    return this.ejecutarQueryP<UserResponse>(`/users/register`,user);
  }
}
