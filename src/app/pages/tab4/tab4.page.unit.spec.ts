import { NoticiasService } from 'src/app/services/noticia/noticias.service';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { Storage } from '@ionic/storage';
import { MedioResponse, NoticasFecha, NoticiaResponse, Medio } from '../../interfaces/interfaces';
import { from } from 'rxjs';
import { Tab4Page } from './tab4.page';
import { IonSearchbar } from '@ionic/angular';



describe('Pruebas unitarias: Medios', () => {

    let componente: Tab4Page;
     const storage=new Storage(null ,null);
     const dataLocalService=new DataLocalService(storage,null);
    const servicio = new NoticiasService(null,dataLocalService);
    

    beforeAll(async () => {
        
        // const noticias:NoticasFecha={ 
        //     cantidad:1,
        //     mesagge:"correcto",
        //     status:"200",
        //     noticias:[{id:'1',fecha_creacion:new Date(),
        //     contenido:'ddddd',media_url:'www',porcentaje:0.00,medio_id:1,activo:true,medio_name:'noticia',nombre:'ccccc'},
        //            ]  }
        
        dataLocalService.usuario={activo:true,apellido:"solis",correo:"dddd",nick:"cristopher",nombre:"cris",password:"xxxxx",usuario_id:1}
        const medio:MedioResponse={ 
            message:"todos los medio",
            status:"200",
            resp:[{medio_id:1,medio_name:"medio1",nombre:"nombre"}]
               
           }
      
        spyOn( servicio, 'getMedios' ).and.callFake( () => {

            // return  new Observable().subscribe(resp=>{
                return from([medio]);
          
        });
     
        componente = new Tab4Page(servicio);
        
      
    });



    it('Init: Debe de cargar los medios del usuario',async () => {

        
        // console.log(componente.noticias)
        expect( componente.medios.length ).toBeGreaterThanOrEqual(1);

    });


})