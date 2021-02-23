import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';


import { Tab1Page } from './tab1.page';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { NoticiaResponse, User } from '../../interfaces/interfaces';
import { from } from 'rxjs';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppModule } from '../../app.module';

describe('prueba de intefración :Noticias generales ', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
//   const dataLocalService=new DataLocalService(storage,null);
//   const servicio = new NoticiasService(null,dataLocalService);
  let noticiaS:NoticiasService;
  let valueServiceSpy: jasmine.SpyObj<DataLocalService>;

  const noticias:NoticiaResponse={ 
    status:'200',
    noticias:[{id:'1',fecha_creacion:new Date(),
    contenido:'ddddd',media_url:'www',porcentaje:0.00,medio_id:1,activo:true,medio_name:'noticia',nombre:'ccccc'},
    {id:'2',fecha_creacion:new Date(),
    contenido:'ddddd',media_url:'www',porcentaje:0.00,medio_id:1,activo:true,medio_name:'noticia',nombre:'ccccc'}]
}


  beforeEach(async(() => {
    let spyData = jasmine.createSpyObj('DataLocalService', {usuario:{usuario_id:1} });
    let noticiaS = jasmine.createSpyObj('NoticiasService', ['getNoticias']);

    
    noticiaS.getNoticias.and.callFake(()=> {
        return from([noticias]);
    });

    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      providers: [  { provide: NoticiasService, useValue: noticiaS } ,
         { provide: DataLocalService, useValue: spyData }],
      imports: [IonicModule.forRoot(), 
        IonicStorageModule.forRoot({
                                name: '__mydb',
                                driverOrder: ['localstorage']
                              }),
        HttpClientModule,
        RouterTestingModule,   
        ComponentsModule,
        AppModule ,
        ExploreContainerComponentModule]
    }).compileComponents();

   
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
