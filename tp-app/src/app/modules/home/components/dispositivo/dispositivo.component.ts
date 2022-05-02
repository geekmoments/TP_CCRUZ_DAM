import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { IMediciones, IMedicionNavigate } from 'src/app/shared/interfaces/mediciones.interface';
import * as Highcharts from 'highcharts';
import { IBundle } from 'src/app/shared/interfaces/response.interface';
import { ApiService } from 'src/app/shared/services/api.service';
import { subscribeOn } from 'rxjs';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.scss']
})
export class DispositivoComponent implements OnInit {
  private navigation?: Navigation | null;
  public data?:IBundle;
  public verMediciones!:boolean;
  public verRiegos!:boolean;
  public myChart:any;
  public chartOptions:any;
  public dispoId!:number;
  public lastMedicion!:IMediciones;
  public electroValvula!:string;
  public disableMedicion!:boolean;
  public medicionValue!:number;
  public isLoading!:boolean;


  constructor(
    private readonly router:Router,
    private readonly apiService:ApiService
  ) {
    this.navigation=this.router.getCurrentNavigation();
    if(!this.navigation?.extras?.state){
      this.router.navigate([''])};
  }

  ngOnInit(): void {
    this.verMediciones=false;
    this.verRiegos=false;
    this.disableMedicion=true;
    this.isLoading=false;
    this.data=this.navigation?.extras.state?
      this.navigation.extras.state['value']:null;
    if(this.data){
      console.log(this.data)
      this.dispoId=this.getDispositivoId(this.data.mediciones);
      this.lastMedicion=this.getLastMeasure(this.data.mediciones);
      this.electroValvula=this.data.electroValvulas[0].nombre;
      this.generarChart(+this.lastMedicion.valor);
    }

  }
  private getLastMeasure(data:Array<IMediciones>):IMediciones{
    const x=data.map(d=>d.medicionId);
    const y=Math.max(...x);
    return data.find(d=>d.medicionId==y)!

  }

  private getDispositivoId(data:Array<IMediciones>):number{
    return data.map(x=>x.dispositivoId)[0]
  }


  private generarChart(valor:number){
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: 'Sensor N° '+ this.dispoId.toString()
        }

        ,credits:{enabled:false}


        ,pane: {
            startAngle: -150,
            endAngle: 150
        }
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,

    series: [{
        name: 'kPA',
        data: [valor],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  private refreshData(){
      this.apiService.getBundle(this.dispoId,this.data?.electroValvulas[0].electrovalvulaId!)
      .subscribe(result=>{
        this.data=result;
      })
  }


  public onInsert(dispositivoId:number):void{
    console.log(dispositivoId);
  }
  public onVerMediciones():void{
    this.verMediciones=true;
  }
  public onVerRiegos():void{
    this.verRiegos = true;
  }

  public onCerrarRiegos():void{
    this.verRiegos = false;
  }

  public onCerrarMediciones():void{
    this.verMediciones=false;
  }

  public onAbrirValvula():void{
      this.disableMedicion=false;
      this.apiService.addRiego(this.data?.electroValvulas[0].electrovalvulaId!,1)
      .subscribe((result:boolean)=>{
        if(result){
          alert("Se guardó el log de apertura con éxito")
        }else{
          alert("No se pudo guardar el log de apertura")
        }
      })
  }

  public onCerrarValvula():void{
    console.log(this.medicionValue)
    this.disableMedicion=true;
    this.isLoading=true;
    const medicion=this.medicionValue?this.medicionValue:0;
    this.apiService.closeRiego(
      this.data?.electroValvulas[0].electrovalvulaId!,
      0,
      medicion,
      this.dispoId
      )
    .subscribe((result:boolean)=>{
      if(result){
        this.refreshData();
      }
      this.isLoading=false;
    })
  }



}
