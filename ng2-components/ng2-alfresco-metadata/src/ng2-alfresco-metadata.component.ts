import { Component, Input, OnInit } from '@angular/core';
// import { AlfrescoMdlTabsDirective } from 'ng2-alfresco-core';

import { MetadataService } from './ng2-alfresco-metadata.service';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'ng2-alfresco-metadata',
    templateUrl: './ng2-alfresco-metadata.component.html',
    styleUrls: ['./ng2-alfresco-metadata.component.css'],
    providers: [MetadataService]
})
export class Ng2AlfrescoMetadataComponent implements OnInit {
    @Input()
    nodeId: string;
    loaded: boolean = false;

    constructor(private metadataService: MetadataService) {
        console.log('Is it me?', this);
        this.test('20bbfc2e-a6d8-4a9a-8ae3-e6404cfdcd25');
    }

    test(nodeId: string) {
      this.metadataService.getNodeComments(nodeId)
        .subscribe(
          (response: Object) => console.log('comments', response),
          (response: Error) => console.log('there was an error')
        );

       this.metadataService.getNodeTags(nodeId)
         .subscribe(
           (response: Object) => console.log('tags', response),
           (response: Error) => console.log('there was an error')
         );
     }

    ngOnInit() {
        setTimeout(() => {
            this.loaded = true;
        }, 1000);
    }

    get isSomething(): boolean {
        return false;
    }

    get isSomethingElse(): boolean {
        return !this.isSomething;
    }
}
