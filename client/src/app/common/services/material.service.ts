import {ElementRef, Injectable} from "@angular/core";

declare var M: any;

export interface MaterialInstance {
  open?(): void;

  close?(): void;

  destroy?(): void;
}

@Injectable({providedIn: "root"})
export class MaterialService {
  static toast(message: string) {
    M.toast({html: message});
  }

  static initializeFloatingButton(elRef: ElementRef) {
    M.FloatingActionButton.init(elRef.nativeElement);
  }

  static initModal(elRef: ElementRef): MaterialInstance {
    return M.Modal.init(elRef.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }
}
