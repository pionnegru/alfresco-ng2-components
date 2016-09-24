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
       console.log('some test calls');
       //  this.metadataService.getNodeMetadata(nodeId)
       //      .subscribe((result: Object) => {
       //          console.log('I all the results! ', result);
       //      });

       // this.metadataService.getNodeTags(nodeId)
       //      .subscribe((result: Object) => {
       //          console.log('I am the TAGS result! ', result);
       //      });

       // this.metadataService.test(nodeId)
       //      .subscribe((result: Object) => {
       //          console.log('test result! ', result);
       //      });
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
