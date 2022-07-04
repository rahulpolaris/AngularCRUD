import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appInputnumber]',
})
export class InputnumberDirective implements OnInit {
  // @HostBinding('value') inputValue!: string
  @HostListener('keypress', ['$event']) OnKeyPress(e: any):boolean {
    if (
      this.numberRowKeyCodes.includes(e.keyCode) ) {
      console.log('element key pressed', e);
      console.log('num input  detected',e.target.value);
      if(e.target.value.length > 9)
      {
        return false
      }
      
    } else {
      return false
    }
    return true
  }

  numberRowKeyCodes: number[] = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
  numpadKeyCodes: number[] = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
  constructor(private inputElement: ElementRef, renderer: Renderer2) {}
  ngOnInit() {
    console.log(this.inputElement.nativeElement);
    // const nativeEle : HTMLInputElement  = this.inputElement.nativeElement
    // nativeEle.setAttribute('value','9582558296')
    // nativeEle.addEventListener('input')
  }
}
