import {ElementRef, Injectable} from "@angular/core";

declare var M: any;

@Injectable({providedIn: "root"})
export class MaterialService {
  static toast(message: string) {
    M.toast({html: message});
  }

  static initializeFloatingButton(elRef: ElementRef) {
    M.FloatingActionButton.init(elRef.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }
}
