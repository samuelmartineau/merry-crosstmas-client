import { Injectable } from '@angular/core';

@Injectable()
export class EditorService {
  private html: string;

  constructor() { }

  set(content:string) {
    this.html = content;
  }

  get(): string {
    return this.html;
  }

}
