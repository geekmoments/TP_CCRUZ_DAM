import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable,map, concat, takeLast } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDispositivos } from '../interfaces/dispositivos.interface';
import { IElectroValvulas } from '../interfaces/electrovalvulas.interface';
import { IMediciones } from '../interfaces/mediciones.interface';
import { IBundle, IResponse } from '../interfaces/response.interface';
import { IRiegos } from '../interfaces/riegos.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url=environment.URL_BASE_PATH;
  constructor(private readonly http:HttpClient) { }

  public getDevices():Observable<IResponse<Array<IDispositivos>>>{
    return this.http.get<IResponse<Array<IDispositivos>>>(`${this.url}/getdispositivos`)
  }

  public getBundle(dispositivoId:number, electroValvulaId:number):Observable<IBundle>{
    return forkJoin({
      mediciones:this.getMeasure(dispositivoId),
      electroValvulas:this.getElectroValvula(electroValvulaId),
      riegos:this.getRiegos(electroValvulaId)
      
    })
  }

  public getMeasure(dispositivoId:number):Observable<Array<IMediciones>>{
    return this.http.post<IResponse<Array<IMediciones>>>(`${this.url}/getmeasure`,{dispositivoId:dispositivoId})
    .pipe(
      map<IResponse<Array<IMediciones>>,Array<IMediciones>>(res=>res.data)
    )
  }

  private getRiegos(electroValvulaId:number):Observable<Array<IRiegos>>{
    return this.http.post<IResponse<Array<IRiegos>>>(`${this.url}/getriego`,{electroValvulaId})
    .pipe(
      map<IResponse<Array<IRiegos>>,Array<IRiegos>>(res=>res.data)
    )
  }

  private getElectroValvula(electroValvulaId:number):Observable<Array<IElectroValvulas>>{
    return this.http.post<IResponse<Array<IElectroValvulas>>>(`${this.url}/getelectrovalvula`,{electroValvulaId})
    .pipe(
      map<IResponse<Array<IElectroValvulas>>,Array<IElectroValvulas>>(res=>res.data)
    )
  }

  public addRiego(electroValvulaId:number,apertura:number):Observable<boolean>{
    return this.http.post<IResponse<Array<string>>>(`${this.url}/addriego`,{electroValvulaId,apertura})
    .pipe(
      map(x=>x.success)
    )
  }

  public closeRiego(electroValvulaId:number,apertura:number,valor:number,dispositivoId:number):Observable<boolean>{
    return concat(
      this.addRiego(electroValvulaId,apertura),
      this.addMeasure(valor,dispositivoId)
    )
    .pipe(
      takeLast(1)
    )
  }

  public addMeasure(valor:number,dispositivoId:number):Observable<boolean>{
    return this.http.post<IResponse<Array<string>>>(`${this.url}/addmeasure`,{valor,dispositivoId})
    .pipe(
      map(x=>x.success)
    )

  }

}
