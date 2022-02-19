import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Customer, Representative } from 'src/app/customer';
import { CustomerService } from 'src/app/customerservice';
import { FirebaseService } from '../core/header/services/firebaseservice';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
  providers:[MessageService],
  encapsulation: ViewEncapsulation.None
})
export class AutoresComponent implements OnInit {
  customers: Customer[] = [];

  selectedCustomers: Customer[] = [];

  representatives: Representative[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];


    constructor(private customerService: CustomerService, private _firebaseService : FirebaseService,
      private messageService: MessageService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers = customers;
            this.loading = false;

        });

        this.getAutores();
    }

    autores: any[] = []
    lista: any;

    getAutores() {
       this._firebaseService.getAutores().subscribe(res =>{
         this.autores = []
        res.forEach(( element : any) => {
          this.autores.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        
        this.getLibros();
       })
       
    }

    libros: any [] = []
    getLibros() {
      this._firebaseService.getLibros().subscribe(res =>{
        this.libros = []
        res.forEach((element : any)=>{
          this.libros.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data() 
          })
        })
        this.librosxautor();
      })
    }

    librosxautor(){
      
      this.libros = this.libros.map(libro => {

        const autor = this.autores.find(autor => autor.id == libro.idautor);

        return {
          ...libro,
          nombreAutor: autor.nombre
        }

      })

    }
    displayModal = false;
    idLibro:any;
    openModal(id:string){
      this.displayModal = true;
      this.idLibro=id;
    }

    eliminarLibro(){
      this._firebaseService.eliminarLibro(this.idLibro).then(()=>{
        this.displayModal = false;
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Se elimino libro.'});
      }).catch(error=>{
        console.log(error);
      })
    }



}
