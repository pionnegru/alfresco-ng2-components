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

import {Injectable}     from '@angular/core';
import {Observable}     from 'rxjs/Observable';

import {AlfrescoAuthenticationService} from 'ng2-alfresco-core';

@Injectable()
export class MetadataService {

    constructor(public authService: AlfrescoAuthenticationService) {}

    /**
     * Retrive all node file info
     * @returns {Observable<any>}
     */
    getNodeMetadata(nodeId: string): Observable<Object> {
        return Observable.forkJoin([
                this.getNodeComments(nodeId),
                this.getNodeTags(nodeId),
                this.getNodeInfo(nodeId)
            ])
            .map((result) => ({
                comments: result[0],
                tags: result[1],
                info: result[2]
            }))
            .catch(this.handleError);
    }

    public getNodeComments(nodeId: string): Observable<Object> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().core.commentsApi.getComments(nodeId));
    }

    public getNodeTags(nodeId: string): Observable<Object> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().core.tagsApi.getNodeTags(nodeId));
    }

    public getNodeInfo(nodeId: string): Observable<Object> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().nodes.getNodeInfo(nodeId));
    }

    public test(nodeId: string): any {
        return Observable.fromPromise(this.authService.getAlfrescoApi().core.commentsApi.addComment(nodeId, [
            {content: 'HAHAHHAHAHA'}
         ]));
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
