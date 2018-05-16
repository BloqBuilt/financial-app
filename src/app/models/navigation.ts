
export interface INavigation {
  icon: string,
  label: string,
  url: string
}

export class Navigation implements INavigation {
  icon: string;
  label: string;
  url: string;
  constructor(icon: string, label: string, url: string) {
    this.icon = icon;
    this.label = label;
    this.url = url;
  }
}