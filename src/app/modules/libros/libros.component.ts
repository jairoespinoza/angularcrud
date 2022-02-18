
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../core/header/services/firebaseservice';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class LibrosComponent implements OnInit {
  

  createAutor: FormGroup;
  createLibro: FormGroup;

  constructor(private fb : FormBuilder, private _firebaseservice : FirebaseService,
    private messageService: MessageService, private firestore: AngularFirestore) {
    this.createAutor = this.fb.group({
      nombre: ['',Validators.required],
      genero: ['',Validators.required]
    })

    this.createLibro = this.fb.group({
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      idautor: ['',Validators.required],
      publicado: [false,Validators.required],
      anio: ['',Validators.required],
      fecharegistro: ['']
    })

   }
  checked: boolean = false;
  autoResize: boolean = true;

  ngOnInit(): void {
  }

  displayModal: boolean = false;

  showDialog() {
      this.displayModal = true;
  }

  agregarAutor() {
    if(this.createAutor.invalid)
    {
      this.messageService.add({severity:'warn', summary: 'Aviso', detail: 'Campos incompletos'});
      return;
    }
    const autor: any ={
      nombre : this.createAutor.value.nombre,
      genero: this.createAutor.value.genero
    }

    this._firebaseservice.agregarAutor(autor).then(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Se registro autor.'});
      this.displayModal = false;
    }).catch(error=>{
      console.log(error);
    })
  }

  cerrarAutor(){
    this.displayModal = false;
    this.createAutor.reset();
  }

  agregaLibro(){
    if(this.createLibro.invalid){
      this.messageService.add({severity:'warn', summary: 'Aviso', detail: 'Campos incompletos'});
      return;
    }

    let fecharegistro = new Date();

    const libro: any={
      titulo: this.createLibro.value.titulo,
      descripcion: this.createLibro.value.descripcion,
      idautor: this.createLibro.value.idautor,
      publicado: this.createLibro.value.publicado,
      anio: this.createLibro.value.anio,
      fecharegistro: moment(fecharegistro).format('YYYY-MM-DD')
    }
    this._firebaseservice.agregarLibro(libro).then(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Se registro libro.'});
      this.createLibro.reset();
    }).catch(error=>{
      console.log(error);
    })
  }

  lstAutores : any[] = []





  cancelarLibro(){
    this.createLibro.reset();
  }
}
