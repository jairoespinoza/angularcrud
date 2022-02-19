
import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FirebaseService } from '../core/header/services/firebaseservice';
import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class LibrosComponent implements OnInit {
  
  titulo= 'Nuevo Libro';
  createAutor: FormGroup;
  createLibro: FormGroup;

  id: string | null;

  constructor(private fb : FormBuilder, private _firebaseservice : FirebaseService,private router: Router,
    private messageService: MessageService, private firestore: AngularFirestore,private aRoute : ActivatedRoute) {
    this.createAutor = this.fb.group({
      nombre: ['',Validators.required],
      genero: ['',Validators.required]
    })

    this.createLibro = this.fb.group({
      titulo: ['',Validators.required],
      descripcion: ['',Validators.required],
      autor: ['',Validators.required],
      publicado: [false],
      anio: ['',Validators.required],
      fecharegistro: ['']
    })

    this.id = this.aRoute.snapshot.paramMap.get('id');

   }

  checked: boolean = false;
  autoResize: boolean = true;

  ngOnInit(): void {
    this.getAutores();
    this.cargarLibro();
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
      idautor: this.createLibro.value.autor.id,
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

  getAutores() {
    this._firebaseservice.getAutores().subscribe(res =>{
      this.lstAutores = []
     res.forEach(( element : any) => {
       this.lstAutores.push({
         id: element.payload.doc.id,
         ...element.payload.doc.data()
       })
     });
    })
 }


 filteredCountries: any[] = [];
 filterCountry(event :any) {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered : any[] = [];
  let query = event.query;

  
  for(let i = 0; i < this.lstAutores.length; i++) {
      let autores = this.lstAutores[i];
      if (autores.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(autores);
      }
  }
  this.filteredCountries = filtered;
}

cargarLibro() {
  
  if(this.id !== null){
    this.titulo = "Editar Libro"
    this._firebaseservice.getLibro(this.id).subscribe(data=>{
      console.log(data.payload.data())
      this.createLibro.setValue({
        anio: data.payload.data()['anio'],
        descripcion: data.payload.data()['descripcion'],
        publicado: data.payload.data()['publicado'],
        titulo: data.payload.data()['titulo'],
        fecharegistro : '',
        autor: ''
      })
    })
  }
}

agregarxeditarLibro(){
  if(this.createLibro.invalid){
    this.messageService.add({severity:'warn', summary: 'Aviso', detail: 'Campos incompletos'});
    return;
  }

  if(this.id === null){
    this.agregaLibro();
  }
  else{
    this.editarLibro(this.id);
  }
}

editarLibro(id:string){
  let fecharegistro = new Date;
  const libro: any={
    titulo: this.createLibro.value.titulo,
    descripcion: this.createLibro.value.descripcion,
    idautor: this.createLibro.value.autor.id,
    publicado: this.createLibro.value.publicado,
    anio: this.createLibro.value.anio,
    fecharegistro: moment(fecharegistro).format('YYYY-MM-DD')
  }
  this._firebaseservice.editarLibro(id,libro).then(()=>{
    this.messageService.add({severity:'success', summary: 'Exito', detail: 'Se edito libro.'});
    this.createLibro.reset();
  }).catch(error=>{
    console.log(error)
  });
}

  cancelarLibro(){
    this.createLibro.reset();
    this.router.navigate([''])
  }
}
