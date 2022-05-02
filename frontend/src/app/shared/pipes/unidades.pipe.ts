import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidades'
})
export class UnidadesPipe implements PipeTransform {

  transform(valor:string): string {
    return valor +' KPA';
  }

}
