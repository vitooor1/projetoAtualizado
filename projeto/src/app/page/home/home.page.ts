
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Produtos } from 'src/app/model/produto.model';
import { BancoServiceService } from 'src/app/servico/banco-service.service';
import { UtilityService } from 'src/app/servico/utility.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  produtosVariados: Produtos[] = [];
  constructor(

    private DataBase: BancoServiceService,

    //loadingController - Ferramento do carregando
    //private loadCtrl: LoadingController,

    //alertController - Ferramenta que cria um alert
    private alertCtrl: AlertController,

    //toastController - Criar uma mensagem
    //private toast: ToastController,

    private utilidades: UtilityService,

    private actionSheet: ActionSheetController


  ) { }


  ngOnInit() {
    //Carrega o método no inicio da página
    this.utilidades.carregando('carregando')
    //this.http.get<Produtos[]>().subscribe(results => this.produtosVariados = results)
    this.DataBase.getItem().subscribe(results => this.produtosVariados = results)
  }

  //Método do alertando

  async alertando() {
    const alert = this.alertCtrl.create({
      mode: 'ios', // mostra com o formato ios
      header: 'Cadastro de produtos',

      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'Informe o produto'
        },
        {
          name: 'qtd',
          type: 'text',
          placeholder: 'Informe a Quantidade'
        }
      ],
      buttons: [
        //botão de cancelar
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('CPF CANCELADO');
          }
        },
        //botão de cadastrar
        {
          text: 'Cadastrar',
          handler: (form) => {
            //Objeto que ira formar nosso item da lista.
            let item = {
              produtos: form.item,
              quantidade: form.qtd,
              //vai ser a variavel de controle do ngIf
              status: false

            };
            this.DataBase.postItem(item);
            //console.log(item);
            this.utilidades.toastando("Item Cadastrado", "middle", "success", 2000);
          }

        }
      ]
    });

    (await alert).present();


  }

  //Método do botão excluir
  deletar(id: number) {
    this.DataBase.deleteItem(id);

    //Chama a mensagem
    this.utilidades.toastando("Item Excluido", "middle", "danger", 2000);


    //atualiza a página

  }
  // método do actionsheet
  async actionMetod(item: Produtos) {
    const action = this.actionSheet.create({
      mode: 'ios',
      header: 'Selecione uma opção',
      buttons: [
        {
          text: item.status ? 'Desmarcar' : 'Marcar', // if ternário, feito em uma única linha
          icon: item.status ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            item.status = !item.status;
            this.DataBase.statusItem(item);
          }
        },
        {
          text: "Cancelar",
          handler: () => {
            this.utilidades.toastando('Cancelamos', "middle", "primary", 2000);
          }
        }
      ]
    }); (await action).present();
  }
}
