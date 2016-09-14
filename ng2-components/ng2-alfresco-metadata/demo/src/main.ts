
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Ng2AlfrescoMetadataComponent } from 'ng2-alfresco-metadata';

@Component({
    selector: 'metadata-demo',
    template: `
        <ng2-alfresco-metadata
            [nodeId]="1"
            class="mdl-cell mdl-cell--8-col">
        </ng2-alfresco-metadata>
    `,
    directives: [Ng2AlfrescoMetadataComponent]
})
class MyDemoApp {
    constructor() {
        // console.log('constructor');
    }
}
bootstrap(MyDemoApp, [
    Ng2AlfrescoMetadataComponent
]);
