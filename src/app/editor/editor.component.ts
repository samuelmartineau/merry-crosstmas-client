import { Component, OnInit } from '@angular/core';
import * as Quill from 'quill';

const SizeStyle = Quill.import('attributors/style/size');
Quill.register(SizeStyle, true);
const AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true);

@Component({  
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    const quill = new Quill('.editor__container', {
      modules: {
        toolbar: '.editor__toolbar'
      },
      theme: 'snow'
    });
    quill.on('text-change', function (delta, oldDelta, source) {
      if (source == 'api') {
        console.log("An API call triggered this change.");
      } else if (source == 'user') {
        console.log("A user action triggered this change.", quill.root.innerHTML);
      }
    });
  }

}
