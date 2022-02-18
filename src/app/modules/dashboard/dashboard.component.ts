import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  value2 :number= 25; 

  constructor(private firestore : AngularFirestore) { }

  ngOnInit(): void {
    this.listaLibrosAnio();
  }
  
  lstAnios:Array<any> = [];
  listaLibrosAnio(){
    this.firestore.collection('libros').valueChanges()
    .subscribe( (res : any)  =>{
      let anios
      for (let index = 0; index < res.length; index++) {
        if(res[index].anio != null){
         anios = res[index].anio;
        }
        this.lstAnios.push(anios)
      }
      console.log(this.lstAnios)
    })
  }

  dias = ['Mon', 'Tue', 'Wed', 'Fri', 'Sat', 'Sun']

  options:EChartsOption = {
    xAxis: {
      type: 'category',
      data: this.dias
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
