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

import { FormWidgetModel } from './form-widget.model';
import { ContainerModel } from './container.model';
import { FormModel } from './form.model';

export class TabModel extends FormWidgetModel {

    id: string;
    title: string;
    visibilityCondition: any;

    fields: ContainerModel[] = [];

    hasContent(): boolean {
        return this.fields && this.fields.length > 0;
    }

    constructor(form: FormModel, json?: any) {
        super(form, json);

        if (json) {
            this.id = json.id;
            this.title = json.title;
            this.visibilityCondition = json.visibilityCondition;
        }
    }
}
