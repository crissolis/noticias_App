import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from 'src/app/services/dataLocal/data-local.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor( private datalocal:DataLocalService,private router:Router) {
 
  }

  ngOnInit() {
    // this.datalocal.getUsuario().then(()=>{
    //   if (this.datalocal.usuario) {
    //    this.router.navigate(['/login/tabs/tab1']);
    //   }
    //  });
  }
}
