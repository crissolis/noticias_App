import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MedioResponse, NoticiaResponse, RespuestaTopHeadLines, Medio, NoticasFecha, UserResponse, User, Noticia } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment';

import { Observable, timer } from 'rxjs';
import { flatMap, map } from "rxjs/operators";
import { DataLocalService } from '../dataLocal/data-local.service';

const TIME_INTERVAL = 300000; 
/**
 * @constant {string} apiKey contiene llave de coneccion a la api
 */
const apiKey=environment.apikey;
/**
 * @constant {string} Url contiene la url de de coneccion a la api
 */
const Url=environment.ApiUrl;

const headers= new HttpHeaders({
  'X-Api-key':apiKey
});


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


/**
 * funcion encargada de ejecutar las llamadas de tipo GET a la api rest 
 * @param {string} query cadena de coneccion 
 * @param {any} params parametros que se necesiten 
 * @returns {Observable}
 */
  private ejecutarQuery<T>(query:string,params?:any): Observable<T>{
    query=Url + query;
    return this.http.get<T>(query,{headers,params:params});
  }

  /**
 * funcion encargada de ejecutar las llamadas de tipo POST a la api rest 
 * @param {string} query cadena de coneccion 
 * @param {any} params parametros que se necesiten 
 * @returns {Observable}
 */
  private ejecutarQueryP<T>(query:string,params?:any): Observable<T>{
    query=Url + query;
    return this.http.post<T>(query,params);
  }

/**
 *@ignore
 */
  getTopHeadLines(){
    this.pages++;
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.pages}`);
  }

  /**
 * funcion que trae las noticias de la pagina principal
 * @returns {Observable<NoticiaResponse>}
 */
  getNoticias(): Observable<NoticiaResponse>{
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


/**
 * Funcion que trae las noticias mas antiguas segun el ultimo id 
 * @param  {any} ultimoId ultimo id de noticia traido 
 * @returns  {Observable<NoticiaResponse>}
 */
  getNoticiasAntiguas(ultimoId:any): Observable<NoticiaResponse>{
    this.pages++;  
   return   this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true&ultimoid=${ultimoId}&usuario=${this.datal.usuario.usuario_id}`).pipe(
         flatMap(()=>{
         return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.pages}&usuario=${this.datal.usuario.usuario_id}`)
         })
       )
     
  }

  /**
   * funcion que se encarga de volver a cargas las noticas del inicio
   * @returns  {Observable<NoticiaResponse>}
   */
   recargar(): Observable<NoticiaResponse>{
    return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=true&usuario=${this.datal.usuario.usuario_id}&pag=${this.pages}`);
  }

  /**
   * funcion encargada de traer los medios de un usuario y actualizarlos
   * @returns {Observable<MedioResponse>}
   */
  getMedios(): Observable<MedioResponse>{
    this.pages++;
    // console.log("ey medios")
    this.ejecutarQuery<MedioResponse>(`/medio/update?usuario=${this.datal.usuario.usuario_id}`).subscribe((resp)=>{
      console.log(resp);
      this.ejecutarQuery<MedioResponse>(`/medio/medios?usuario=${this.datal.usuario.usuario_id}`).subscribe(res=>{
        
      });

    });
    return this.ejecutarQuery<MedioResponse>(`/medio/medios?usuario=${this.datal.usuario.usuario_id}`);
  }

  /**
   * funcion encaegada de hacer la consulta de busqueda de medios segun el termino enviado
   * @param {string} termino parametro por el cual se buscara un medio
   * @returns {Observable<MedioResponse>}
   */
  // getSearchMedio(termino:string): Observable<MedioResponse>{
   
  //   // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
  //   return this.ejecutarQuery<MedioResponse>(`/medio/buscar?medio=${termino}`);
  // }
  getSearchMedio(termino:string): Observable<Medio[]>{
   
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=7490eb6283774faea78acce44f96e423`);
    return this.ejecutarQuery<Medio[]>(`/medio/buscar?medio=${termino}`);
  }



  /**
   * funcion encargada de traer las noticias segun el medio especificado y el ultimo id
   * @param {number} medio id del medio
   * @param {number} ultimoId ultimo id de noticia generado del medio 
   * @returns {Observable<NoticiaResponse>}
   */
  getNoticiasMedio( medio :number,ultimoId?:number): Observable<NoticiaResponse>{
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
      // console.log("else")
    return this.ejecutarQuery<NoticiaResponse>(`/noticias?consultar=false&pag=${this.categoriaPage}&medio=${medio}&usuario=${this.datal.usuario.usuario_id}`);
      
    }
  
  }

/**
 * funcion encargada de guardar  un medio
 * @param {Medio} medio un objeto de tipo medio
 * @returns {Observable<Medio>}
 */
  guargarMedio(medio:Medio): Observable<Medio>{
    //  console.log(medio); 
     return this.ejecutarQuery<Medio>(`/medio/guardar?usuario=${this.datal.usuario.usuario_id}`,medio);
  }

 
/**
 * funcion encargada de traer las noticias de un medio desde un rango de fechas predeterminado 
 * @param fechaIn fecha de inicio de la busqueda
 * @param fechaF fecha final de la busqueda
 * @param medio id del medio de busqueda
 * @param {string} tipo  tipo de busqueda ASC/DESC
 * @returns {Observable<NoticasFecha>}
 */
  getNoticiasFecha(fechaIn,fechaF,medio?,tipo?: string): Observable<NoticasFecha>{
    let params = new HttpParams()
    // .set('inicio', fechaIn).
    // set('fin',fechaF).
    .set('medio',medio).
    set('tipo',tipo);
    return this.ejecutarQuery<NoticasFecha>(`/noticias/reporte?inicio=${fechaIn}&fin=${fechaF}`,params);
  }

/**
 * funcionencargada de eliminar un medio de la lista de medios de un usuario
 * @param {number} medio id del medio
 * @returns {Observable<MedioResponse>}
 */
  eliminarMedio(medio:number): Observable<MedioResponse>{
     return this.ejecutarQuery<MedioResponse>(`/medio/eliminar?usuario=${this.datal.usuario.usuario_id}&medio=${medio}`);
  }

/**
 *funcion encargada de guardar una noticia en favoritos
 * @param {Noticia} noticia un objeto de tipo Noticia 
 * @returns {Observable<NoticiaResponse>}
 */
  guardarFavorito(noticia:Noticia): Observable<NoticiaResponse>{
    // console.log(noticia)
    return this.ejecutarQuery<NoticiaResponse>(`/noticias/favoritos/guardar?usuario=${this.datal.usuario.usuario_id}&noticia=${noticia.id}`);
  }

  /**
   *funcion encargada de eliminar una noticia en favoritos 
   * @param {Noticia} noticia un objeto de tipo Noticia 
   * @returns {Observable<NoticiaResponse>}
   */
  eliminarFavorito(noticia:Noticia): Observable<NoticiaResponse>{
    return this.ejecutarQuery<NoticiaResponse>(`/noticias/favoritos/eliminar?usuario=${this.datal.usuario.usuario_id}&noticia=${noticia.id}`);
  }

  /**
   * funcion encargada de traer todas las noticias que un usuario tenga agregada en favoritos
   * @returns {Observable<NoticiaResponse>}
   */
  getFavorito(): Observable<NoticiaResponse>{
    return this.ejecutarQuery<NoticiaResponse>(`/noticias/favoritos?usuario=${this.datal.usuario.usuario_id}`);
  }

//?LOS METODOS PARA LOGIN Y REGISTRO
/**
 * funcion encargada de ejecutar el login de un usuario
 * @param {string} nick nick del usuario
 * @param {string} passsword contraseña del usuario
 * @returns {Observable<UserResponse>}
 */
  login(nick: string,passsword: string): Observable<UserResponse>{

    let params = {
    usuario:nick ,
    clave:passsword,
    }
    return this.ejecutarQueryP<UserResponse>(`/users/login`,params);
  }

  /**
   * funcion encargada de registrar un usuario
   * @param {User} user un objeto de tipo User
   * @returns {Observable<UserResponse>}
   */
  register(user:User): Observable<UserResponse>{
    
    return this.ejecutarQueryP<UserResponse>(`/users/register`,user);
  }
}
