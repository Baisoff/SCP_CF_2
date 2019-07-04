sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("news_display.controller.BaseController", {
        getApp: function () {
            return this.getView().getParent();
        }
    });
});
