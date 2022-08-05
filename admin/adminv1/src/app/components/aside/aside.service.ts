import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsideService {

    isToggled: Boolean = true;
    //False = fecha toggled True = abre toggled
    toggled: String = '';

    constructor(){}

    onClickToggle(){
        if(this.isToggled === true){
          this.toggled = 'toggled';
          this.isToggled = false;
          return;
        }
    
        if(this.isToggled === false){
          this.toggled = '';
          this.isToggled = true;
          return;
        }
    }

}