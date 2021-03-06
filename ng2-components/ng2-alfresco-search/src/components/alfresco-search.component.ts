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

import { Component, EventEmitter, Input, Output, Optional, OnChanges, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { AlfrescoSearchService } from './../services/alfresco-search.service';
import { AlfrescoThumbnailService } from './../services/alfresco-thumbnail.service';
import { AlfrescoPipeTranslate, AlfrescoTranslationService } from 'ng2-alfresco-core';

declare let __moduleName: string;

@Component({
    moduleId: __moduleName,
    selector: 'alfresco-search',
    styles: [`
        :host .mdl-data-table caption {
            margin: 0 0 16px 0;
            text-align: left;
        }
        :host .mdl-data-table td {
            max-width: 0;
            white-space: nowrap;
        }
        :host .mdl-data-table td.col-mimetype-icon {
            width: 24px;
        }
        :host .col-display-name {
            min-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `],
    templateUrl: './alfresco-search.component.html',
    providers: [AlfrescoSearchService],
    pipes: [AlfrescoPipeTranslate]
})
export class AlfrescoSearchComponent implements OnChanges, OnInit {

    baseComponentPath = __moduleName.replace('/components/alfresco-search.component.js', '');

    @Input()
    searchTerm: string = '';

    @Output()
    preview: EventEmitter<any> = new EventEmitter();

    results: any;

    errorMessage;

    route: any[] = [];

    constructor(private _alfrescoSearchService: AlfrescoSearchService,
                private translate: AlfrescoTranslationService,
                private _alfrescoThumbnailService: AlfrescoThumbnailService,
                @Optional() params: RouteParams) {

        if (translate !== null) {
            translate.addTranslationFolder('node_modules/ng2-alfresco-search/dist/src');
        }

        this.results = null;
        if (params) {
            this.searchTerm = params.get('q');
        }
    }

    ngOnInit(): void {
        this.displaySearchResults(this.searchTerm);
    }

    ngOnChanges(changes): void {
        this.displaySearchResults(this.searchTerm);
    }

    /**
     * Gets thumbnail URL for the given document node.
     * @param node Node to get URL for.
     * @returns {string} URL address.
     */
    getMimeTypeIcon(node: any): string {
        if (node.entry.content && node.entry.content.mimeType) {
            let icon = this._alfrescoThumbnailService.getMimeTypeIcon(node.entry.content.mimeType);
            return `${this.baseComponentPath}/img/${icon}`;
        }
    }

    /**
     * Gets thumbnail message key for the given document node, which can be used to look up alt text
     * @param node Node to get URL for.
     * @returns {string} URL address.
     */
    getMimeTypeKey(node: any): string {
        if (node.entry.content && node.entry.content.mimeType) {
            return 'SEARCH.ICONS.' + this._alfrescoThumbnailService.getMimeTypeKey(node.entry.content.mimeType);
        } else {
            return '';
        }
    }

    /**
     * Loads and displays search results
     * @param searchTerm Search query entered by user
     */
    public displaySearchResults(searchTerm): void {
        if (searchTerm !== null) {
            this._alfrescoSearchService
                .getLiveSearchResults(searchTerm)
                .subscribe(
                    results => {
                        this.results = results.list.entries;
                        this.errorMessage = null;
                    },
                    error => {
                        this.results = null;
                        this.errorMessage = <any>error;
                    }
                );
        }
    }

    onItemClick(node, event?: Event): void {
        if (event) {
            event.preventDefault();
        }
        if (node && node.entry) {
            if (node.entry.isFile) {
                this.preview.emit({
                    value: node
                });
            }
        }
    }

}
