import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ContatoPage } from './contato.page';
import { ContatoPageRoutingModule } from './contato-routing.module';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContatoPageRoutingModule
    
  ],
  declarations: [ContatoPage]
})
export class ContatoPageModule {}
