import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produtos } from 'src/app/model/produto.model';
import { BancoServiceService } from 'src/app/servico/banco-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  routerId = null;
  produto: any = {};

  constructor(
    //Essa ferramenta serve para capturar a rota (caminho) que estiver ativo
    private activatedRoute: ActivatedRoute,
    private banco: BancoServiceService
  ) { }

  ngOnInit() {
    this.routerId = this.activatedRoute.snapshot.params['id'];

    if(this.routerId) {
      //tras o item do banco de dados
      this.banco.getOneItem(this.routerId).subscribe(caixa => {this.produto= caixa});
    }
  }

}
