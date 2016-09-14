import { Component, Input, OnInit } from '@angular/core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'ng2-alfresco-metadata',
    templateUrl: './ng2-alfresco-metadata.component.html'
})
export class Ng2AlfrescoMetadataComponent implements OnInit {
    @Input() nodeId: number;
    loaded: boolean = false;

    constructor() {
        console.log('Is it me?', this);
    }

    ngOnInit() {
        setTimeout(() => {
            this.loaded = true;
        }, 1000);
    }

    get isSomething():boolean {
        return false;
    }

    get isSomethingElse():boolean {
        return !this.isSomething;
    }
}
