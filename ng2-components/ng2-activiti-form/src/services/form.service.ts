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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AlfrescoAuthenticationService, AlfrescoSettingsService} from 'ng2-alfresco-core';
import {FormValues} from './../components/widgets/core/index';
import {ExternalContent} from '../components/widgets/core/external-content';
import {ExternalContentLink} from '../components/widgets/core/external-content-link';

import {Http, Response, RequestOptions, Headers} from '@angular/http';
@Injectable()
export class FormService {

    static UNKNOWN_ERROR_MESSAGE: string = 'Unknown error';
    static GENERIC_ERROR_MESSAGE: string = 'Server error';

    constructor(private authService: AlfrescoAuthenticationService,
                private alfrescoSettingsService: AlfrescoSettingsService, private http: Http) {
    }

    getProcessDefinitions(): Observable<any> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.processApi.getProcessDefinitions({}))
            .map(this.toJsonArray)
            .catch(this.handleError);
    }

    getTasks(): Observable<any> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.taskApi.listTasks({}))
            .map(this.toJsonArray)
            .catch(this.handleError);
    }

    getTask(taskId: string): Observable<any> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.taskApi.getTask(taskId))
            .map(this.toJson)
            .catch(this.handleError);
    }

    saveTaskForm(taskId: string, formValues: FormValues): Observable<any> {
        let body = JSON.stringify({values: formValues});

        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.taskApi.saveTaskForm(taskId, body))
            .catch(this.handleError);
    }

    /**
     * Complete Task Form
     * @param taskId Task Id
     * @param formValues Form Values
     * @param outcome Form Outcome
     * @returns {any}
     */
    completeTaskForm(taskId: string, formValues: FormValues, outcome?: string): Observable<any> {
        let data: any = {values: formValues};
        if (outcome) {
            data.outcome = outcome;
        }
        let body = JSON.stringify(data);

        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.taskApi.completeTaskForm(taskId, body))
            .catch(this.handleError);
    }

    getTaskForm(taskId: string): Observable<any> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.taskApi.getTaskForm(taskId))
            .map(this.toJson)
            .catch(this.handleError);
    }

    getFormDefinitionById(formId: string): Observable<any> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.editorApi.getForm(formId))
            .map(this.toJson)
            .catch(this.handleError);
    }

    /**
     * Returns form definition ID by a given name.
     * @param name
     * @returns {Promise<T>|Promise<ErrorObservable>}
     */
    getFormDefinitionByName(name: string): Observable<any> {
        let opts = {
            'filter': 'myReusableForms',
            'filterText': name,
            'modelType': 2
        };

        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.modelsApi.getModels(opts))
            .map(this.getFormId)
            .catch(this.handleError);
    }

    /**
     * Returns a list of child nodes below the specified folder
     *
     * @param accountId
     * @param nodeId
     * @returns {null}
     */
    getAlfrescoNodes(accountId: string, nodeId: string): Observable<[ExternalContent]> {
        let accountPath = accountId.replace('-', '/');
        let headers = new Headers();
        headers.append('Authorization', this.authService.getTicketBpm());
        return this.http.get(
                `${this.alfrescoSettingsService.bpmHost}/activiti-app/` +
                `app/rest/integration/${accountPath}/folders/${nodeId}/content`,
            new RequestOptions({
                headers: headers,
                withCredentials: true
            }))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Returns a list of child nodes below the specified folder
     *
     * @param accountId
     * @param node
     * @param siteId
     * @returns {null}
     */
    linkAlfrescoNode(accountId: string, node: ExternalContent, siteId: string): Observable<ExternalContentLink> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authService.getTicketBpm());
        return this.http.post(
            `${this.alfrescoSettingsService.bpmHost}/activiti-app/app/rest/content`,
            JSON.stringify({
                link: true,
                name: node.title,
                simpleType: node.simpleType,
                source: accountId,
                sourceId: node.id + '@' + siteId
            }),
            new RequestOptions({
                headers: headers,
                withCredentials: true
            }))
            .map(this.extractBody)
            .catch(this.handleError);
    }

    private extractBody(res: Response) {
        let body = res.json();
        return body || { };
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    getFormId(res: any) {
        let result = null;

        if (res && res.data && res.data.length > 0) {
            result = res.data[0].id;
        }

        return result;
    }

    toJson(res: any) {
        if (res) {
            return res || {};
        }
        return {};
    }

    toJsonArray(res: any) {
        if (res) {
            return res.data || [];
        }
        return [];
    }

    handleError(error: any): Observable<any> {
        let errMsg = FormService.UNKNOWN_ERROR_MESSAGE;
        if (error) {
            errMsg = (error.message) ? error.message :
                error.status ? `${error.status} - ${error.statusText}` : FormService.GENERIC_ERROR_MESSAGE;
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
