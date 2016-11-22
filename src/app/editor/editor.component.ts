import { Component } from '@angular/core';
import * as Quill from 'quill';
import {EditorService} from '../editor.service';

const SizeStyle = Quill.import('attributors/style/size');
Quill.register(SizeStyle, true);
const AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true);

@Component({  
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  quill;

  constructor(private _editorService:EditorService) {}

  onUpdate(delta, oldDelta, source) {
      if (source == 'user') {
        this._editorService.set(this.quill.root.innerHTML);
      }
    }

  ngAfterContentInit() {
    this.quill = new Quill('.editor__container', {
      modules: {
        toolbar: '.editor__toolbar'
      },
      theme: 'snow'
    });
    this._editorService.set(this.quill.root.innerHTML);
    this.quill.on('text-change', this.onUpdate.bind(this));
  }
}
