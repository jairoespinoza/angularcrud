import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EChartsOption } from 'echarts';
import { FirebaseService } from '../core/header/services/firebaseservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cantidadPublicado : any ;
  cantidadAutor: any;
  mergeOptions: any;

  constructor(private firestore : AngularFirestore, private _firebaseservice: FirebaseService) { }

  ngOnInit(): void {
    this.listaLibrosAnio();
    this.cantidadPublicados();
    this.cantidadAutores();
  }

  libros : any[] = []
  cantidadPublicados() {

    this._firebaseservice.getLibros().subscribe(res =>{
      this.libros = []
      res.forEach((libro : any)=>{
        this.libros.push({
          id: libro.payload.doc.id,
          ...libro.payload.doc.data() 
        })
      })
      this.cantidadPublicado = this.libros.filter(libro => libro.publicado).length;
    })
  }

  autores : any[] = []
  cantidadAutores() {

    this._firebaseservice.getAutores().subscribe(res =>{
      this.autores = []
      res.forEach((autor : any)=>{
        this.autores.push({
          id: autor.payload.doc.id,
          ...autor.payload.doc.data() 
        })
      })
      
      this.cantidadAutor = this.autores.filter(autor => autor).length;
    })
  }


  
  lstAnios:Array<any> = []; 
  lstCantidadLibros: Array<any> = [];
  listaLibrosAnio(){
    this.firestore.collection('libros').valueChanges()
    .subscribe( (res : any)  =>{
      
      res.forEach((libro : any) => {
        const anio = libro.anio;

        const anioEncontrado = this.lstAnios.findIndex(anioEnArreglo => anioEnArreglo == anio);

        if(anioEncontrado == -1) {
          this.lstAnios.push(anio);
          this.lstCantidadLibros[this.lstAnios.length - 1] = 1;
        } else {
          const cantidadLibros = this.lstCantidadLibros[anioEncontrado];

          this.lstCantidadLibros[anioEncontrado] = cantidadLibros + 1;
        }
      });

      this.mergeOptions = { xAxis: [{ data : this.lstAnios }], series: [{data: this.lstCantidadLibros}] };
    })
  }



  options:EChartsOption = {
    xAxis: {
      type: 'category',
      data: this.lstAnios
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 600
        , 70, 110, 500],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  

}
