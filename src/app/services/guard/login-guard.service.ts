import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataLocalService } from '../dataLocal/data-local.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private dataLocalService:DataLocalService,public router:Router) { }
  
  async canActivate() {

  let res= await this.dataLocalService.getUsuario().then(()=>{
      if (this.dataLocalService.usuario) {
        // this.router.navigate(['/login/tabs/tab1']);
        return true;
      }else{
        this.router.navigate(['/home']);
          return false;
      }
    });

return res;
   }

    // if (this.dataLocalService.estaLogeado()) {
    //   // this.router.navigate(['/login/tabs/tab1']);
    //   console.log("wwww")
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   console.log("wwww")
    //   return false;
    // }
 
  
}
