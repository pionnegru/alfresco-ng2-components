
import {describe, expect, it, inject} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {Ng2AlfrescoMetadataComponent} from '../src/ng2-alfresco-metadata.component';

describe('Basic Example test ng2-alfresco-metadata', () => {
  it('Test hello world', inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      .createAsync(Ng2AlfrescoMetadataComponent)
      .then((fixture) => {
        let element = fixture.nativeElement;
        expect(element.querySelector('h1')).toBeDefined();
        expect(element.getElementsByTagName('h1')[0].innerHTML).toEqual('Hello World Angular 2 ng2-alfresco-metadata');
      });
  }));
});
