
import { from, Observable } from 'rxjs';
import { Tab1Page } from './tab1.page';
import { NoticiasService } from '../../services/noticia/noticias.service';
import { NoticiaResponse } from '../../interfaces/interfaces';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { Storage } from '@ionic/storage';



describe('Pruebas unitarias: Noticias generales', () => {

    let componente: Tab1Page;
    const storage=new Storage(null ,null);
    const dataLocalService=new DataLocalService(storage,null);
    const servicio = new NoticiasService(null,dataLocalService);
  

    beforeAll( () => {
        dataLocalService.usuario={activo:true,apellido:"solis",correo:"dddd",nick:"cristopher",nombre:"cris",password:"xxxxx",usuario_id:1}
        componente = new Tab1Page(servicio,null,null);
    });


    it('Init: Debe de cargar las noticias generales',async () => {

        const noticias:NoticiaResponse={ 
            status:'200',
            noticias:[{id:'1',fecha_creacion:new Date(),
            contenido:'ddddd',media_url:'www',porcentaje:0.00,medio_id:1,activo:true,medio_name:'noticia',nombre:'ccccc'},
            {id:'2',fecha_creacion:new Date(),
            contenido:'ddddd',media_url:'www',porcentaje:0.00,medio_id:1,activo:true,medio_name:'noticia',nombre:'ccccc'}]
        }
 
        spyOn( servicio, 'getNoticias' ).and.callFake( () => {

            // return  new Observable().subscribe(resp=>{
                return from([noticias]);
          
        });

     
       componente.ngOnInit();

        // console.log(componente.noticias)
        expect( componente.noticias.length ).toBeGreaterThan(0);

    });


    it('Se debe cargar mas noticias cuando se desplacen hacia habajo',async ()=>{

        const noticiasAnt:NoticiaResponse={
            status:'200',
            noticias:[{id:'3',fecha_creacion:new Date(),
            contenido:'ddddd',media_url:'www',porcentaje:0.00,medio_id:1,activo:true,medio_name:'noticia',nombre:'ccccc'}]
        }  

        spyOn( servicio, 'getNoticiasAntiguas').and.callFake( () => {

            // return  new Observable().subscribe(resp=>{
                return from([noticiasAnt]);    
        });

                
        console.log(componente.noticias)
        componente.cargarNoticiasAnt();

        expect( componente.noticias.length ).toBeGreaterThan(1);
    });

    // it('Si no hay mas noticias no se cargan más',async ()=>{

    //     const noticiasAnt:NoticiaResponse={
    //         status:'200',
    //         noticias:[ ]  }  

    //     spyOn( servicio, 'getNoticiasAntiguas').and.callFake( () => {

    //         // return  new Observable().subscribe(resp=>{
    //             return from([noticiasAnt]);    
    //     });

       
    //     componente.cargarNoticiasAnt();

    //     expect( componente.noticias.length ).toEqual(3);
    // });
});
