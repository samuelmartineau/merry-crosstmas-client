rte
  #content-container.content-container
    #editor-wrapper.editor-wrapper
      #formatting-container.formatting-container
        select.ql-size(title='Size')
          option(value='10px') Small
          option(value='13px', selected) Normal
          option(value='18px') Large
          option(value='32px') Huge
        select.ql-color(title='Text Color')
          option(value='rgb(0, 0, 0)' selected style="background: rgba(0, 0, 0, 0.5);") Black
          option(value='rgb(255, 0, 0)' style="background: rgba(255, 0, 0, 0.5);") Red
          option(value='rgb(0, 0, 255)' style="background: rgba(0, 0, 255, 0.5);") Blue
          option(value='rgb(11, 106, 11)' style="background: rgba(11, 106, 11, 0.5);") Lime
          option(value='rgb(0, 128, 128)' style="background: rgba(0, 128, 128, 0.5);") Teal
          option(value='rgb(255, 0, 255)' style="background: rgba(255, 0, 255, 0.5);") Magenta
          option(value='rgb(180, 180, 7)' style="background: rgba(180, 180, 7, 0.5);") Yellow
        select.ql-align(title='Text Alignment')
          option(value='left', selected) Left
          option(value='center') Center
          option(value='right') Right
          option(value='justify') Justify
        button.ql-format-button.ql-bold(title='Bold') Bold
        button.ql-format-button.ql-italic(title='Italic') Italic
        button.ql-format-button.ql-underline(title='Underline') Under
      #editor-container.editor-container
        div(style='text-align: center;')
          span(style='font-size: 18px;') Hello!!!
        div(style='text-align: center;')
          br
        div
          | Do you remember our conversation? We decided to set up a Santa gift exchange between friends with a budget of
          b 20$
        div
          br
        div You have to find a gift for $friend$, good luck :)
        div
          br
        div See you at the end of the year

  script.
    this.on('mount', function(){
      var quill = new Quill('#editor-container', {
        modules: { toolbar: '#formatting-container' }
      });
      quill.on('selection-change', function(range) {
        console.log('selection-change', range)
      });
      quill.on('text-change', function(delta, source) {
        console.log('text-change', delta, source)
      });
    })
