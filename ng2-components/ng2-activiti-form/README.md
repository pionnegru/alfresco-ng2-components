# Alfresco Bpm Form component for Angular 2

## Prerequisites

Before you start using this development framework, make sure you have installed all required software and done all the 
necessary configuration, see this [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/PREREQUISITES.md).

## Install

```sh
npm install --save ng2-activiti-form
```

### Dependencies

You must separately install the following libraries for your application:
 
- [ng2-translate](https://github.com/ocombe/ng2-translate)
- [ng2-alfresco-core](https://www.npmjs.com/package/ng2-alfresco-core)

```sh
npm install --save ng2-translate ng2-alfresco-core
```

#### Material Design Lite

The style of this component is based on [material design](https://getmdl.io/), so if you want to visualize it correctly you have to add the material
design dependency to your project:

```sh
npm install --save material-design-icons material-design-lite
```

Also make sure you include these dependencies in your `index.html` file:

```html
<!-- Google Material Design Lite -->
<link rel="stylesheet" href="node_modules/material-design-lite/material.min.css">
<script src="node_modules/material-design-lite/material.min.js"></script>
<link rel="stylesheet" href="node_modules/material-design-icons/iconfont/material-icons.css">
```

## Basic usage examples

### Display form instance by task id

```html
<activiti-form 
    [taskId]="selectedTask?.id">
</activiti-form>
```

For an existing Task both form and values will be fetched and displayed.

### Display form definition by form id

```html
<activiti-form 
    [formId]="selectedFormDefinition?.id"
    [data]="customData">
</activiti-form>
```

Only form definition will be fetched

### Display form definition by form name

```html
<activiti-form 
    [formName]="selectedFormDefinition?.name"
    [data]="customData">
</activiti-form>
```

## Configuration

### Properties

The recommended set of properties can be found in the following table:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| taskId | string |  | Task id to fetch corresponding form and values. |
| formId | string | | The id of the form definition to load and display with custom values. |
| formName | string | | Name of hte form definition to load and display with custom values. |
| data | `FormValues` | | Custom form values map to be used with the rendered form. |
| showTitle | boolean | true | Toggle rendering of the form title. |
| showCompleteButton | boolean | true | Toggle rendering of the `Complete` outcome button. |
| showSaveButton | boolean | true | Toggle rendering of the `Save` outcome button. |
| readOnly | boolean | false | Toggle readonly state of the form. Enforces all form widgets render readonly if enabled. |
| showRefreshButton | boolean | true | Toggle rendering of the `Refresh` button. |

#### Advanced properties
 
 The following properties are for complex customisation purposes:
 
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| form | `FormModel` | | Underlying form model instance. |
| debugMode | boolean | false | Toggle debug mode, allows displaying additional data for development and debugging purposes. |

### Events

| Name | Description |
| --- | --- |
| formLoaded | Invoked when form is loaded or reloaded. |
| formSaved | Invoked when form is submitted with `Save` or custom outcomes.  |
| formCompleted | Invoked when form is submitted with `Complete` outcome.  |

All `form*` events recieve an instance of the `FormModel` as event argument for ease of development:

**MyView.component.html**
```html
<activiti-form 
    [taskId]="selectedTask?.id"
    formSaved="onFormSaved($event)">
</activiti-form>
```

**MyView.component.ts**
```ts
onFormSaved(form: FormModel) {
    console.log(form);
}
```

## Build from sources

Alternatively you can build component from sources with the following commands:

```sh
npm install
npm run build
```

### Build the files and keep watching for changes

```sh
$ npm run build:w
```
    
### Running unit tests

```sh
npm test
```

### Running unit tests in browser

```sh
npm test-browser
```

This task rebuilds all the code, runs tslint, license checks and other quality check tools 
before performing unit testing. 

### Code coverage

```sh
npm run coverage
```