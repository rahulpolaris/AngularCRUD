import { Directive ,OnInit,ElementRef,AfterContentInit} from '@angular/core';

@Directive({
  selector: '[appDobFormatter]'
})
export class DobFormatterDirective {

  constructor(private dateRowElement: ElementRef) { }
  ngOnInit(){
  //  const empDob = new Date(this.dateRowElement.nativeElement.innerText)
  //  console.log(this.dateRowElement.nativeElement.innerText)
}
ngAfterContentInit(){
  const empDob = new Date(this.dateRowElement.nativeElement.innerText)
  console.log(this.dateRowElement.nativeElement.innerText)
   const date = empDob.getUTCDate()
   const month = empDob.getUTCMonth()
   const year = empDob.getFullYear()
   const formattedDateString = `${date}-${month+1}-${year}`
   console.log(empDob)
   this.dateRowElement.nativeElement.innerText = formattedDateString
  
  }

}
