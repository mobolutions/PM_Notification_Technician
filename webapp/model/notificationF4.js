sap.ui.define(["sap/ui/base/Object",
	"sap/ui/model/odata/ODataModel"
], function (Object, ODataModel) {
	"use strict";
	return Object.extend("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.model.notificationF4", {
			constructor: function (oParentView) {
			this._oParentView = oParentView;
		},
		NotificatioF4: function () {
				var sPath = "/NotifTypeF4Set";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
				var ocont = this;
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var c4Model = new sap.ui.model.json.JSONModel();
						c4Model.setData(oData);
						var t5 = ocont._oParentView.byId("notifif4");
						t5.setModel(c4Model);
						var vescombo = ocont._oParentView.byId("notifif4");
						var oItems = new sap.ui.core.ListItem({
							key: "",
							text: "{Key} {Text}"
						});
						vescombo.bindAggregation("items", {
							path: '/results',
							template: oItems
						});

					},
				});
		
		}

	});

});