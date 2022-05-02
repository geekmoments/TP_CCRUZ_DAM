import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStyleCell]'
})
export class StyleCellDirective implements OnInit {
  @Input() measureValue!:number
  constructor(private elementRef:ElementRef<HTMLTableCellElement>) {

   }

   ngOnInit(): void {
       const x= this.elementRef.nativeElement;

       x.style.color="white";
       x.style.textAlign="center";
       if(this.measureValue==0){
        x.style.background="black";
       }else if(this.measureValue>0 && this.measureValue<=10){
         x.style.background="green";
       }else if(this.measureValue>10 && this.measureValue<=30){
        x.style.background="yellow";
        x.style.color="black";
       }else if(this.measureValue>30){
        x.style.background="red";

       }

       console.log(x)
   }

}
