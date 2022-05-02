export interface IMediciones{
  medicionId:number;
  fecha:string;
  valor:string;
  dispositivoId:number;
}

export interface IMedicionNavigate{
  mediciones:Array<IMediciones>;
  dispositivoId:number;
  lastMedicion?:IMediciones;
}
