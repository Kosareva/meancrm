import {MaterialInstance} from "../services/material.service";

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
  setDate?: (date: Date) => void;
  gotoDate?: (date: Date) => void;
}
