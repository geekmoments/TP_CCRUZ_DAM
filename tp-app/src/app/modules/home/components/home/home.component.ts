import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IDispositivos } from 'src/app/shared/interfaces/dispositivos.interface';
import { IBundle, IResponse } from 'src/app/shared/interfaces/response.interface';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {
  private unSubscribe$: Subject<void>;
  private navigationExtras!:NavigationExtras;

  public dispositivos?:Array<IDispositivos>;
  public errorMessage?:string;


  constructor(
    private readonly apiService:ApiService,
    private readonly router:Router
    ) {
    this.unSubscribe$= new Subject();
    this.navigationExtras ={state:{value:null}};
  }

  ngOnInit(): void {
    this.apiService.getDevices()
    .pipe(takeUntil(this.unSubscribe$))
    .subscribe((result:IResponse<Array<IDispositivos>>)=>{
      if(result.success){
        this.dispositivos=result.data;
      }else{
        this.errorMessage=result.message;
      }
    });
  }

  ngOnDestroy(): void {
     this.unSubscribe$.next();
     this.unSubscribe$.complete();
  }



  public onGoToDispositivo(dispositivoId:number,electroValvulaId:number){
    this.apiService.getBundle(dispositivoId,electroValvulaId)
    .subscribe((result:IBundle)=>{
      this.navigationExtras.state!['value']=result
      this.router.navigate(['dispositivo'],this.navigationExtras);
    })
  }

}
