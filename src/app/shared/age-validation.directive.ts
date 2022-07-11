import { Directive, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appAgeValidation]',
})
export class AgeValidationDirective implements OnInit {
  numberRowKeyCodes: number[] = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

  @HostListener('keypress', ['$event']) onAgePress(e:any): boolean {
    if (this.numberRowKeyCodes.includes(e.keyCode)) {
      if(e.target.value.length > 2)
      {
        return false
      }    
      
      return true;
    }
    else {
      return false
    }

    // return true;
  }
  constructor() {}
  ngOnInit(): void {}
}
