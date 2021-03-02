export interface RespuestaTopHeadLines {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  
  export interface Article {
    source: Source;
    author?: string;
    title: string;
    description?: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    content?: string;
  }
  
  export interface Source {
    id?: string;
    name: string;
  }



  export  interface NoticiaResponse {
  status: string;
  message?: string;
  noticias: Noticia[];
}



export interface Noticia {
  id: string;
  fecha_creacion: Date;
  contenido: string;
  noticia_url?: string;
  media_url: string;
  porcentaje: number;
  medio_id: number;
  activo: boolean;
  medio_name: string;
  nombre: string;
  location?: string;
  description?: string;
}


export interface MedioResponse {
  status: string;
  message: string;
  resp: Medio[];
}


export interface Medio {
  medio_id: number;
  medio_name: string;
  activo?: boolean;
  nombre: string;
  location?: string;
  description?: string;
  url?: string;
  imagen_url?: any;
  banner_url?: any;
}


export interface NoticasFecha {
  mesagge: string;
  status: string;
  cantidad: number;
  noticias: Noticia[];
}


export interface UserResponse {
  status: string;
  message: string;
  user: User[];
}

export interface User {
  usuario_id: number;
  activo: boolean;
  apellido: string;
  correo: string;
  nick: string;
  nombre: string;
  password: string;
}








