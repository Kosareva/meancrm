import {ElementRef, Injectable} from "@angular/core";
import {MaterialDatepicker} from "../types/MaterialDatepicker";

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

  static initDatepicker(elRef: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(elRef.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose
    });
  }

  static initModal(elRef: ElementRef): MaterialInstance {
    return M.Modal.init(elRef.nativeElement);
  }

  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }
}
