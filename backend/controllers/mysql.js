const mysql=require("mysql");
const util=require("util");
const moment=require("moment");

const dataConnection={
    host:"localhost",
    user:"cesaraul",
    password:"900327Mysql",
    database:"dam"
}

const dispositivosTable='dispositivos';
const electroValvulasTable='electrovalvulas';
const logRiegosTable='log_riegos';
const medicionesTable='mediciones';

const client=mysql.createConnection(dataConnection);

class DataBase{
    constructor(){
        this.query=null;
    }

    getConnection=()=>{
        client.connect((error)=>{
            if(!error){
                console.log("La base de datos está conectada");
            }else{
                console.error(error)
                throw error;
            }
        })
    }

    setQuery=()=>{
        this.query=util.promisify(client.query).bind(client);
    }

    getDispositivos=async()=>{
        const queryString=`SELECT * FROM ${dispositivosTable}`;
        try {
            const results= await this.query(queryString);
            return {success:true, data:results};
        } catch (error) {
            console.error(error);
            return {success:false, data:[], message:"No se pudo obtener los datos de los dispositivos"};
        }
    }

    /**
     * 
     * @param {{dispositivoId:number}} dispositivo 
     */
    getMeasure=async(dispositivo)=>{
        const id=dispositivo.dispositivoId;
        const queryString=`SELECT * FROM ${medicionesTable} WHERE dispositivoId=${id}`;
        try {
            const results= await this.query(queryString);
            return {success:true,data:results};
        } catch (error) {
            console.error(error);
            return {success:false, data:[], message:"No se pudo obtener las mediciones para el dispositivo"};
        }
    }
    /**
     * 
     * @param {{electroValvulaId:number}} electroValvula 
     * @returns 
     */
    getElectroValvula=async(electroValvula)=>{
        const id=electroValvula.electroValvulaId;
        const queryString=`SELECT * FROM ${electroValvulasTable} WHERE electrovalvulaId=${id}`;
        try {
            const results= await this.query(queryString);
            return {success:true,data:results};
        } catch (error) {
            console.error(error);
            return {success:false, data:[], message:"No se pudo obtener la electro válvula"};
        } 
    }
    /**
     * @param {{electroValvulaId:number}} electroValvula
     */
    getRiegos= async(electroValvula)=>{
        const id=electroValvula.electroValvulaId;
        const queryString=`SELECT * FROM ${logRiegosTable} WHERE electrovalvulaId=${id}`;
        try {
            const results= await this.query(queryString);
            return {success:true,data:results};
        } catch (error) {
            console.error(error);
            return {success:false, data:[], message:"No se pudo obtener los logs de riegos para la electroválvula"};
        }
    }
    /**
     * @param {{
     * electroValvulaId:number,
     * apertura:number
     * }} electroValvula
     */
    addRiego=async(electroValvula)=>{
        const fecha=moment().format("YYYY-MM-DD HH:mm:ss");
        const queryString=`INSERT INTO ${logRiegosTable} (apertura,fecha,electrovalvulaId) VALUES (${electroValvula.apertura},"${fecha}",${electroValvula.electroValvulaId})`;
        try {
           await this.query(queryString);
            return {success:true,data:[],message:"Se guardó con éxito"};
        } catch (error) {
            console.error(error);
            return {success:false, data:[], message:"No se pudo agregar el log de riego para la electroválvula"};
        } 
    }

    /**
     * 
     * @param {{
     * valor:number,
     * dispositivoId:number
     * }} measure 
     */
    addMeasure=async(measure)=>{
        const fecha=moment().format("YYYY-MM-DD HH:mm:ss");
        const queryString=`INSERT INTO ${medicionesTable} (fecha,valor,dispositivoId) 
        VALUES ("${fecha}",${measure.valor},${measure.dispositivoId})`;
        try {
            await this.query(queryString);
             return {success:true,data:[],message:"Se guardó con éxito"};
         } catch (error) {
             console.error(error);
             return {success:false, data:[], message:"No se pudo agregar"};
         } 
    }



}

module.exports=DataBase;