import { IElectroValvulas } from "./electrovalvulas.interface";
import { IMediciones } from "./mediciones.interface";
import { IRiegos } from "./riegos.interface";

export interface IResponse<T>{
    success:boolean;
    message?:string;
    data:T
}

export interface IBundle{
    mediciones:Array<IMediciones>;
    riegos:Array<IRiegos>;
    electroValvulas:Array<IElectroValvulas>;
}