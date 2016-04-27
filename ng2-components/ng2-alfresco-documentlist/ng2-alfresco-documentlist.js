System.register(['./src/document-list.component', './src/document-list-actions.component', './src/document-action.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var document_list_component_1, document_list_actions_component_1, document_action_component_1;
    var DOCUMENT_LIST_DIRECTIVES;
    var exportedNames_1 = {
        'DOCUMENT_LIST_DIRECTIVES': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (document_list_component_1_1) {
                document_list_component_1 = document_list_component_1_1;
                exportStar_1(document_list_component_1_1);
            },
            function (document_list_actions_component_1_1) {
                document_list_actions_component_1 = document_list_actions_component_1_1;
                exportStar_1(document_list_actions_component_1_1);
            },
            function (document_action_component_1_1) {
                document_action_component_1 = document_action_component_1_1;
                exportStar_1(document_action_component_1_1);
            }],
        execute: function() {
            exports_1("default",{
                directives: [document_list_component_1.DocumentList, document_list_actions_component_1.DocumentListActions, document_action_component_1.DocumentAction],
                providers: []
            });
            exports_1("DOCUMENT_LIST_DIRECTIVES", DOCUMENT_LIST_DIRECTIVES = [
                document_list_component_1.DocumentList,
                document_list_actions_component_1.DocumentListActions,
                document_action_component_1.DocumentAction
            ]);
        }
    }
});
//# sourceMappingURL=ng2-alfresco-documentlist.js.map