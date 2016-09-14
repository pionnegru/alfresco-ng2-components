/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import {
    ALFRESCO_CORE_PROVIDERS,
    AlfrescoSettingsService,
    AlfrescoAuthenticationService,
    AlfrescoPipeTranslate,
    AlfrescoTranslationService,
    CONTEXT_MENU_DIRECTIVES
} from 'ng2-alfresco-core';

import {
    DOCUMENT_LIST_DIRECTIVES,
    DOCUMENT_LIST_PROVIDERS,
    DocumentActionsService
} from 'ng2-alfresco-documentlist';

import {
    Ng2AlfrescoMetadataComponent
} from 'ng2-alfresco-metadata';

@Component({
    selector: 'metadata-demo',
    styles: [':host > .container {padding: 10px}'],
    directives: [
        DOCUMENT_LIST_DIRECTIVES,
        CONTEXT_MENU_DIRECTIVES,
        Ng2AlfrescoMetadataComponent
    ],
    providers: [DOCUMENT_LIST_PROVIDERS],
    pipes: [AlfrescoPipeTranslate],
    template: `
        <div *ngIf="authenticated">
            <alfresco-document-list
                    #documentList
                    [currentFolderPath]="currentPath"
                    [contextMenuActions]="true"
                    [contentActions]="true"
                    [multiselect]="true"
                    (folderChange)="onFolderChanged($event)">
                <content-columns>
                    <content-column key="$thumbnail" type="image"></content-column>
                    <content-column
                            title="{{'DOCUMENT_LIST.COLUMNS.DISPLAY_NAME' | translate}}"
                            key="name"
                            sortable="true"
                            class="full-width ellipsis-cell">
                    </content-column>
                    <content-column
                            title="{{'DOCUMENT_LIST.COLUMNS.CREATED_BY' | translate}}"
                            key="createdByUser.displayName"
                            sortable="true"
                            class="desktop-only">
                    </content-column>
                    <content-column
                            title="{{'DOCUMENT_LIST.COLUMNS.CREATED_ON' | translate}}"
                            key="createdAt"
                            type="date"
                            format="medium"
                            sortable="true"
                            class="desktop-only">
                    </content-column>
                </content-columns>
                <content-actions>
                    <!-- folder actions -->
                    <content-action
                        target="folder"
                        title="{{'DOCUMENT_LIST.ACTIONS.VIEW_DETAILS' | translate}}"
                        (execute)="viewDetails($event)">
                    </content-action>
                    <content-action
                            target="folder"
                            title="{{'DOCUMENT_LIST.ACTIONS.FOLDER.CUSTOM' | translate}}"
                            (execute)="myFolderAction1($event)">
                    </content-action>
                    <content-action
                            target="folder"
                            title="{{'DOCUMENT_LIST.ACTIONS.FOLDER.DELETE' | translate}}"
                            handler="delete">
                    </content-action>

                    <!-- document actions -->
                    <content-action
                            target="document"
                            title="{{'DOCUMENT_LIST.ACTIONS.DOCUMENT.DOWNLOAD' | translate}}"
                            handler="download">
                    </content-action>
                    <content-action
                            target="document"
                            title="{{'DOCUMENT_LIST.ACTIONS.DOCUMENT.SYSTEM_2' | translate}}"
                            handler="system2">
                    </content-action>
                    <content-action
                            target="document"
                            title="{{'DOCUMENT_LIST.ACTIONS.DOCUMENT.CUSTOM' | translate}}"
                            (execute)="myCustomAction1($event)">
                    </content-action>
                    <content-action
                            target="document"
                            title="{{'DOCUMENT_LIST.ACTIONS.DOCUMENT.DELETE' | translate}}"
                            handler="delete">
                    </content-action>
                </content-actions>
            </alfresco-document-list>
            <ng2-alfresco-metadata></ng2-alfresco-metadata>
            <context-menu-holder></context-menu-holder>
            <button (click)="documentList.reload()">Reload</button>
        </div>
    `
})
class MetadataDemo implements OnInit {

    currentPath: string = '/';
    authenticated: boolean;

    ecmHost: string = 'http://localhost:8080/';

    ticket: string;

    constructor(
        private authService: AlfrescoAuthenticationService,
        private settingsService: AlfrescoSettingsService,
        translation: AlfrescoTranslationService,
        private documentActions: DocumentActionsService
    ) {
        settingsService.ecmHost = this.ecmHost;
        settingsService.setProviders('ECM');

        if (this.authService.getTicketEcm()) {
            this.ticket = this.authService.getTicketEcm();
        }

        translation.addTranslationFolder();
        documentActions.setHandler('my-handler', this.myDocumentActionHandler.bind(this));
    }

    public updateTicket(): void {
        localStorage.setItem('ticket-ECM', this.ticket);
    }

    public updateHost(): void {
        this.settingsService.ecmHost = this.ecmHost;
        this.login();
    }

    ngOnInit() {
        this.login();
    }

    myDocumentActionHandler() {
        window.alert('my custom action handler');
    }

    myCustomAction1(event) {
        let entry = event.value.entry;
        alert(`Custom document action for ${entry.name}`);
    }

    myFolderAction1(event) {
        let entry = event.value.entry;
        alert(`Custom folder action for ${entry.name}`);
    }

    login() {
        this.authService.login('admin', 'admin').subscribe(
            ticket => {
                this.ticket = this.authService.getTicketEcm();
                this.authenticated = true;
            },
            error => {
                console.log(error);
                this.authenticated = false;
            });
    }

    onFolderChanged(event?: any) {
        if (event) {
            this.currentPath = event.path;
        }
    }

    viewDetails(event) {
        console.log(event);
    }
}

bootstrap(MetadataDemo, [
    HTTP_PROVIDERS,
    ALFRESCO_CORE_PROVIDERS
]);
