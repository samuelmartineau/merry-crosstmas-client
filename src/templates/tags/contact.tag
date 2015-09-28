contact
  .card
    h1 {this.title}
    .md-input
      input(type="text" required value='{this.title}')
      span.highlight
      span.bar
      label Name
    .md-input
      input(type="mail" required value='{this.mail}')
      span.highlight
      span.bar
      label Mail

  script.
    this.on('update', function(){
      if (this.parent.id > 2) {
        window.smoothScroll(this.root, 500);
      }
    })
