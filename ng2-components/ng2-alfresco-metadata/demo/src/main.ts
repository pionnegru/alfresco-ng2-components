
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Ng2AlfrescoMetadataComponent } from 'ng2-alfresco-metadata';

@Component({
  selector: 'my-app',
  template: `<ng2-alfresco-metadata></ng2-alfresco-metadata>`,
  directives: [Ng2AlfrescoMetadataComponent]
})
class MyDemoApp {
  constructor() {
    console.log('constructor');
  }
}
bootstrap(MyDemoApp, [
  Ng2AlfrescoMetadataComponent
]);
