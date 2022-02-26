export class Post {
  /*
    Los comentarios y las valoraciones de los posts serán tablas separadas
  */
  id?:number;
  titulo:string;
  mensaje:string;
  publicada:number;
  usuario_id:number;
  nombre?:string;
}
