// import { TestBed, ComponentFixture } from '@angular/core/testing';

import { Router } from "@angular/router";
import { DataLocalService } from "src/app/services/dataLocal/data-local.service";
import { NoticiasService } from "src/app/services/noticia/noticias.service";
import { LoginPage } from "./login.page";
import { Storage } from '@ionic/storage';

// import { HttpClientModule } from '@angular/common/http';
// import { LoginPage } from './login.page';
// import { NoticiasService } from '../../services/noticia/noticias.service';
// import { Tab1PageRoutingModule } from '../tab1/tab1-routing.module';
// import { IonicStorageModule } from '@ionic/storage';
// import { ChartsModule } from 'ng2-charts';

// import { RouterTestingModule } from '@angular/router/testing';
// import { IonicModule } from '@ionic/angular';
// import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
// import { forwardRef } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { UserResponse } from '../../interfaces/interfaces';
import { from } from "rxjs";
import { FormBuilder, NgForm, Validators } from "@angular/forms";


// describe('Login Page Prueba de integración', () => {

//     let component: LoginPage;
//     let fixture: ComponentFixture<LoginPage>;

 
//     beforeEach( () => {

//         TestBed.configureTestingModule({
//             declarations: [ LoginPage ],
//             providers: [ NoticiasService ],
//             imports: [ IonicModule.forRoot(),
//                  RouterTestingModule,
//                  IonicStorageModule.forRoot({
//                     name: '__mydb',
//                     driverOrder: ['localstorage']
//                   }),
//                   FormsModule,
//                 HttpClientModule,
//                  ]
//         });

//         fixture = TestBed.createComponent( LoginPage );
//         component = fixture.componentInstance;
//     });

//         it('Debe de crearse el componente', () => {
//             expect( component ).toBeTruthy();
//         });
    
      
    
  

//     });


// describe('Pruebas unitarias: Notcias generales', () => {

//     let componente: LoginPage;
//     let router:Router;
//     router = jasmine.createSpyObj("Router", ["navigate"]);
//     const storage=new Storage(null ,null);
//     const dataLocalService=new DataLocalService(storage,router);
//     const servicio = new NoticiasService(null,dataLocalService);
//     let form=new NgForm([],[]);
  
//     beforeAll( () => {
//         router = jasmine.createSpyObj("Router", ["navigate"]);
//         componente = new LoginPage(router,servicio,dataLocalService,null);
//     });

//     it('El nicl es incorrecto',async () => {

//         const user:UserResponse={ 
//            message:"Error el usuario no existe",
//            status:'400',
//            user:[]
//         }
 
//         // spyOn( servicio, 'login' ).and.callFake( () => {

//         //     // return  new Observable().subscribe(resp=>{
//         //         return from([user]);
          
//         // });

     
//        componente.ingresar(form);

//         // console.log(componente.noticias)
//         expect( componente.ingresar(form) ).toBeNaN();

//     });
// })