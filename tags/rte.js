riot.tag("rte",'<div id="content-container" class="content-container"><div id="editor-wrapper" class="editor-wrapper"><div id="formatting-container" class="formatting-container"><div class="row"><select title="Size" class="ql-size"><option value="10px">Small</option><option value="13px" selected>Normal</option><option value="18px">Large</option><option value="32px">Huge</option></select><select title="Text Color" class="ql-color"><option value="rgb(0, 0, 0)" selected style="background: rgba(0, 0, 0, 0.5);">Black</option><option value="rgb(255, 0, 0)" style="background: rgba(255, 0, 0, 0.5);">Red</option><option value="rgb(0, 0, 255)" style="background: rgba(0, 0, 255, 0.5);">Blue</option><option value="rgb(11, 106, 11)" style="background: rgba(11, 106, 11, 0.5);">Lime</option><option value="rgb(0, 128, 128)" style="background: rgba(0, 128, 128, 0.5);">Teal</option><option value="rgb(255, 0, 255)" style="background: rgba(255, 0, 255, 0.5);">Magenta</option><option value="rgb(180, 180, 7)" style="background: rgba(180, 180, 7, 0.5);">Yellow</option></select><select title="Text Alignment" class="ql-align"><option value="left" selected>Left</option><option value="center">Center</option><option value="right">Right</option><option value="justify">Justify</option></select></div><div class="row"><button title="Bold" style="font-weight: bold" class="ql-format-button ql-bold">Bold</button><button title="Italic" style="font-style: italic" class="ql-format-button ql-italic">Italic</button><button title="Underline" style="text-decoration : underline" class="ql-format-button ql-underline">Under</button></div></div><div id="editor-container" class="editor-container"></div></div></div>',function(t){this.on("mount",function(){var t=new Quill("#editor-container",{modules:{toolbar:"#formatting-container"}});t.setHTML(contactModel.content),t.on("text-change",window.utils.debounce(function(t,o){var e=this.getHTML();contactModel.editContent(e)},300))})});