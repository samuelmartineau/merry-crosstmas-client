import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EditorComponent } from './editor/editor.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contact/contact.component';
import { ActionsComponent } from './actions/actions.component';

import { ContactService } from './contact.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditorComponent,
    InstructionsComponent,
    ContactsComponent,
    ContactComponent,
    ActionsComponent,
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
