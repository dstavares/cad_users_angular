import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomElementSchemaRegistry } from '@angular/compiler';

import { User } from './models/user';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user = {} as User;
  users: User[];


  constructor(private service: AppService) {
    this.users = [];
  }


  ngOnInit() {
    this.getUsuarios();

  }

  // Chama o serviço para obter todos os carros
  getUsuarios(){
    this.service.getUsuarios().subscribe((users: User[]) => {
      this.users = users;
    });
  }


  //Salva ou atualiza usuario
  saveUsario(form: NgForm) {
    if (this.user.id !== undefined) {
      this.service.updateUsuario(this.user).subscribe(() => {
        this.cleanForm(form);
        this.getUsuarios();
      });
    } else {
      this.service.saveUsuario(this.user).subscribe(() => {
        this.cleanForm(form);
        this.getUsuarios();
      });
    }
  }

  //deleta usuario
  deleteUsuario(user: User){
    this.service.deleteUsuario(user).subscribe(() => {
      this.getUsuarios();
    });
  }

    // copia o usuario para ser editado.
    editUsurio(user: User) {
      this.user = { ...user };
      this.getUsuarios();
    }

  // Limpa formulário
  cleanForm(form: NgForm) {
    this.getUsuarios();
    form.resetForm();
    //user = {} as User;
    }

}
