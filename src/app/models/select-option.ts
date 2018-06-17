export interface ISelectOption<T> {
  label: string;
  value: T;
}

export class SelectOption implements ISelectOption<any> {
  label: string;
  value;
  constructor(label: string, value) {
    this.label = label;
    this.value = value;
  }
}
