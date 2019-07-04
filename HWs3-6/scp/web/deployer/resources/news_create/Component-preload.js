jQuery.sap.registerPreloadedModules({version:"2.0",name:"news_create/Component-preload",modules:{"news_create/Component.js":'sap.ui.define(["sap/ui/core/UIComponent"],function(t){"use strict";return t.extend("news_create.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments),this.getRouter().initialize()}})});',"news_create/controller/BaseController.js":'sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("news_create.controller.BaseController",{getApp:function(){return this.getView().getParent()}})});',"news_create/controller/Master.controller.js":'sap.ui.define(["news_create/controller/BaseController","sap/ui/model/json/JSONModel","sap/m/MessageBox"],function(e,t){"use strict";return e.extend("news_create.controller.Main",{onInit:function(){this.host="/api",this.oDataModel=new t({toCategory:{}}),this.getView().setModel(this.oDataModel,"data")},onSave:function(){var e=this.oDataModel.getData();this.getApp().setBusy(!0),jQuery.ajax({type:"POST",url:this.host+"/news",dataType:"json",contentType:"application/json",data:JSON.stringify(e),success:function(e){sap.m.MessageBox.success("News Created"),this.oDataModel.setData(e),this.getApp().setBusy(!1)}.bind(this),error:function(e){this.getApp().setBusy(!1),jQuery.sap.log.error(e),sap.m.MessageBox.error("Creating failed")}.bind(this)})},onCancel:function(){this.oDataModel.setData()}})});',"news_create/view/App.view.xml":'<mvc:View\n\txmlns="sap.m"\n\txmlns:mvc="sap.ui.core.mvc"\n\tdisplayBlock="true"><App id="app" busyIndicatorDelay="0"/></mvc:View>',"news_create/view/Master.view.xml":'<mvc:View\n    xmlns:mvc="sap.ui.core.mvc"\n    xmlns="sap.m"\n    xmlns:f="sap.ui.layout.form"\n    xmlns:core="sap.ui.core"\n    controllerName="news_create.controller.Master"><Page showHeader="false"><f:SimpleForm\n            title="News Create"\n            editable="true"\n            layout="ResponsiveGridLayout"\n            labelSpanXL="12" labelSpanL="12" labelSpanM="12"\n            labelSpanS="12" adjustLabelSpan="false" emptySpanXL="0" emptySpanL="0" emptySpanM="0"\n            emptySpanS="0" columnsXL="3" columnsL="3" columnsM="3" singleContainerFullSize="false"><f:content><core:Title text="News" /><VBox><Label text="{i18n>nid}"/><Input value="{data>/nid}" enabled="false"/><Label text="{i18n>Header}" /><Input maxLength="50" value="{data>/Header}"/></VBox><core:Title text="Category" /><VBox><Label text="{i18n>cid}"/><Input value="{data>/toCategory/cid}"/><Label text="{i18n>name}"/><Input value="{data>/toCategory/name}"/><Label text="{i18n>description}"/><Input value="{data>/toCategory/description}"/></VBox></f:content></f:SimpleForm><footer><OverflowToolbar visible="{config>/isEdit}"><ToolbarSpacer/><Button type="Accept" text="{i18n>Save}" press="onSave"><layoutData><OverflowToolbarLayoutData priority="NeverOverflow"/></layoutData></Button><Button type="Reject" text="{i18n>Cancel}" press="onCancel"><layoutData><OverflowToolbarLayoutData priority="NeverOverflow"/></layoutData></Button></OverflowToolbar></footer></Page></mvc:View>\n',"news_create/manifest.json":'{"_version":"1.8.0","sap.app":{"id":"news_create","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","sourceTemplate":{"id":"html5moduletemplates.basicSAPUI5ApplicationProjectModule","version":"1.40.12"},"crossNavigation":{"inbounds":{"intent1":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"news_create","action":"manage"}}},"dataSources":{"odata":{"uri":"../api/odata/","type":"OData","settings":{"odataVersion":"4.0"}},"local_odata":{"uri":"http://localhost:3000/odata/","type":"OData","settings":{"odataVersion":"4.0"}}}},"sap.platform.cf":{"oAuthScopes":["HiMTA!t15233.himta.view","HiMTA!t15233.himta.edit"]},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true},"supportedThemes":["sap_hcb","sap_belize"]},"sap.ui5":{"rootView":{"viewName":"news_create.view.App","type":"XML"},"dependencies":{"minUI5Version":"1.60.1","libs":{"sap.ui.core":{},"sap.m":{},"sap.ui.layout":{},"sap.ushell":{},"sap.collaboration":{},"sap.ui.comp":{},"sap.uxap":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"news_create.i18n.i18n"}}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","controlId":"app","controlAggregation":"pages","viewPath":"news_create.view","bypassed":{"target":"NotFound"}},"routes":[{"pattern":"","name":"master","target":"Master"}],"targets":{"Master":{"viewType":"XML","viewName":"Master"}}}}}'}});