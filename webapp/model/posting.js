var breakd, oModel, eqi;
var ci_attach1, base64_marker, baseval = [],
	ci_obj1, ci_att1 = [];
var notnum, reportname, descrip1;
sap.ui.define(["sap/ui/base/Object",
	"sap/ui/model/odata/ODataModel",
	"sap/m/MessageBox"

], function (Object, ODataModel, MessageBox) {
	"use strict";
	return Object.extend("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.model.posting", {
		constructor: function (oParentView) {
			this._oParentView = oParentView;
		},

		checkDone: function () {
			breakd = "X";
			eqi = sap.ui.core.Fragment.byId("techfragment", "equip").getSelectedKey();

			//	alert(this.eqpCh);
			var text = this._oParentView.byId("text").getValue();
			var descrip = this._oParentView.byId("descript").getValue();
			//	alert(text);
			var arrayOfItems = [];
			var message = true;
			var func1 = this._oParentView.byId("productInput").getValue();
			var SplitTotalFoot = func1.split("/")
			var func = SplitTotalFoot[0];
			console.log("act_valu1 :", func)

			var notif = this._oParentView.byId("notifif4").getSelectedKey();
			var prio = this._oParentView.byId("prio12").getSelectedKey();
			var name = this._oParentView.byId("report").getValue();
			var tech = this._oParentView.byId("productInput").getSelectedKey();
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			today = yyyy + '-' + mm + '-' + dd + 'T' + '00' + ':' + '00' + ':' + '00';
			//	alert(today);
			var reqsta = this._oParentView.byId("startdate").getValue();
			//	alert(reqsta)
			var yy1 = reqsta.slice(6, 10);

			var mm1 = reqsta.slice(3, 5);

			var dat1 = reqsta.slice(0, 2);

			var reqir_star = yy1 + '-' + mm1 + '-' + dat1 + 'T' + '00' + ':' + '00' + ':' + '00';
			//	alert(reqir_star)

			var reqend = this._oParentView.byId("enddate").getValue();
			//	alert(reqend);

			var yy2 = reqend.slice(6, 10);
			var mm2 = reqend.slice(3, 5);
			var dat2 = reqend.slice(0, 2);
			var reqir_end = yy2 + '-' + mm2 + '-' + dat2 + 'T' + '00' + ':' + '00' + ':' + '00';
			//	alert(reqir_end)

			/*	var breakdown  = this._oParentView.byId("breakdown").getChecked();
				alert(breakdown);*/

			var tableid = this._oParentView.byId("idProductsTable");
			var eqpChg = this._oParentView.byId("equiptInp").getValue();
			//	alert(eqpChg)
			var that = this;
			sap.m.MessageBox.show(
				"Do you want to create notification ?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirmation Message",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						// notify user
						if (oAction == "YES") {
							var tablelength = tableid.getItems().length;
							console.log("TableLenth :", tablelength);
							for (var i = 0; i < tablelength; i++) {
								var rows = tableid.getItems()[i];
								var object = rows.getCells()[0].getText();
								var objectcode = rows.getCells()[1].getText();
								var damage = rows.getCells()[2].getText();
								var damagecode = rows.getCells()[3].getText();
								var cause = rows.getCells()[4].getText();
								var causecode = rows.getCells()[5].getText();

								var obj = {
									"ImNotifType": " ",
									"Refobjectkey": " ",
									"ItemSortNo": "0001",
									"Descript": text,
									"DCodegrp": object,
									"DCode": objectcode,
									"DlCodegrp": damage,
									"DlCode": damagecode,
									"Assembly": "T-FS101",
									"AssemblyExternal": " ",
									"AssemblyGuid": " ",
									"AssemblyVersion": " ",
									"StartPoint": " ",
									"EndPoint": " ",
									"LinearLength": " ",
									"LinearUnit": " ",
									"LinearUnitIso": " ",
									"FirstOffsetTypeCode": " ",
									"FirstOffsetValue": " ",
									"FirstOffsetUnit": " ",
									"FirstOffsetUnitIso": " ",
									"SecondOffsetTypeCode": " ",
									"SecondOffsetValue": " ",
									"SecondOffsetUnit": " ",
									"SecondOffsetUnitIso": " ",
									"Equipment": eqi,
									"FunctLoc": " ",
									"MarkerStartPoint": " ",
									"MarkerDistanceStartPoint": " ",
									"MarkerEndPoint": " ",
									"MarkerDistanceEndPoint": " ",
									"MarkerDistanceUnit": " ",
									"MarkerDistanceUnitIso": " "
								};

								console.log("obj", obj);

								arrayOfItems.push(obj);

							}

							var oModel3 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/", true);
							var postdata = {
								"NotifNo": " ",
								"Equipment": eqi,
								"FunctLoc": func,
								"Priority": prio,
								"Desstdate": today,
								"Desenddate": today,
								"ShortText": descrip,
								"SysStatus": " ",
								"PmWkctr": "",
								"UserSt": " ",
								"Userstatus": " ",
								"Planplant": "",
								"Maintroom": " ",
								"Plsectn": " ",
								"Maintloc": "",
								"Breakdown": breakd,
								"Strmlfndate": reqir_star,
								"Endmlfndate": reqir_end,
								"Strmlfntime": "PT08H00M00S",
								"Endmlfntime": "PT08H00M00S",
								"Unit": " ",
								"Plangroup": "",
								"Maintplant": "",
								"Reportedby": name,
								"PersonResponsible": " ",
								"NotifType": notif,
								"CreatedBy": "",
								"Notiftime": "PT08H00M00S",
								"NotifDate": today,
								"Abcindic": " ",
								"Sortfield": " ",
								"BusArea": " ",
								"CoArea": " ",
								"Costcenter": " ",
								"WbsElement": " ",
								"Type": " ",
								"Message": " ",
								"LongText": text,
								ToItems: arrayOfItems,
							};
							console.log(postdata);
							var sPath = "/NotificationCreatHeaderSet";
							oModel3.create(sPath, postdata, {
								success: function (oData, oResponse) {
									console.log(oData, "oData123");
									var msg1 = oData.Message;
									notnum = msg1.slice(13, 21);
									reportname = postdata.Reportedby;
									descrip1 = postdata.descrip;
									//	that.DMS();
									var typ = oData.Type;
									//	alert(typ)
									console.log(typ, "type");
									if (typ == "S") {
										jQuery.sap.require("sap.m.MessageBox");
										sap.m.MessageBox.confirm(msg1, {
											icon: sap.m.MessageBox.Icon.SUCCESS,
											title: "Success",
											actions: [sap.m.MessageBox.Action.OK],
											onClose: function (oAction) {
												if (oAction == "OK") {

													ci_att1 = that._oParentView.byId("UploadCollection").getItems().length;

													if (ci_att1 == '0') {

														window.location.reload();
													} else {

														that.DMS();

													}
												}
											}.bind(this)
										});
										message = false;
									} else {
										sap.m.MessageBox.warning(msg1, {
											icon: sap.m.MessageBox.Icon.WARNING,
											title: "Warning",
											actions: [sap.m.MessageBox.Action.OK],

											onClose: function (oAction) {
												if (oAction == "OK") {
													arrayOfItems = [];
												}
											}.bind(this)
										});
										message = false;
									}
							}
							});
						}
					}
				});
		},
		posting: function () {
			var type = this._oParentView.byId("notifif4").getSelectedKey();
			if (type === 'M2') {
				this.checkDone();
			} else {
				var eqi = sap.ui.core.Fragment.byId("techfragment", "equip").getSelectedKey();
				this._oParentView.byId("equiptInp").setValue(eqi);
				this.eqpCh = eqi;
				var text = this._oParentView.byId("text").getValue();
				var descrip = this._oParentView.byId("descript").getValue();
				//	alert(text);
				var arrayOfItems = [];
				var message = true;
				var func1 = this._oParentView.byId("productInput").getValue();
				var SplitTotalFoot = func1.split("/")
				var func = SplitTotalFoot[0];
				console.log("act_valu1 :", func)
				var notif = this._oParentView.byId("notifif4").getSelectedKey();
				var prio = this._oParentView.byId("prio12").getSelectedKey();
				var name = this._oParentView.byId("report").getValue();
				var tech = this._oParentView.byId("productInput").getSelectedKey();
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
				var yyyy = today.getFullYear();
				today = yyyy + '-' + mm + '-' + dd + 'T' + '00' + ':' + '00' + ':' + '00';
				//	alert(today);
				var reqsta = this._oParentView.byId("startdate").getValue();
				//	alert(reqsta)
				var yy1 = reqsta.slice(6, 10);
				var mm1 = reqsta.slice(3, 5);
				var dat1 = reqsta.slice(0, 2);
				var reqir_star = yy1 + '-' + mm1 + '-' + dat1 + 'T' + '00' + ':' + '00' + ':' + '00';
				//	alert(reqir_star)
				var reqend = this._oParentView.byId("enddate").getValue();
				//	alert(reqend);
				var yy2 = reqend.slice(6, 10);
				var mm2 = reqend.slice(3, 5);
				var dat2 = reqend.slice(0, 2);
				var reqir_end = yy2 + '-' + mm2 + '-' + dat2 + 'T' + '00' + ':' + '00' + ':' + '00';
				//	alert(reqir_end)

				/*	var breakdown  = this._oParentView.byId("breakdown").getChecked();
					alert(breakdown);*/

				var tableid = this._oParentView.byId("idProductsTable");
				var that = this;
				//	that.onStartUpload();
				//var eqpChg = this._oParentView.byId("equiptInp").getValue();
				sap.m.MessageBox.show(
					"Do you want to create notification ?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Confirmation Message",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function (oAction) {
							// notify user
							if (oAction == "YES") {
								var tablelength = tableid.getItems().length;
								console.log("TableLenth :", tablelength);
								for (var i = 0; i < tablelength; i++) {
									var rows = tableid.getItems()[i];
									var object = rows.getCells()[0].getText();
									var objectcode = rows.getCells()[1].getText();
									var damage = rows.getCells()[2].getText();
									var damagecode = rows.getCells()[3].getText();
									var cause = rows.getCells()[4].getText();
									var causecode = rows.getCells()[5].getText();

									var obj = {
										"ImNotifType": " ",
										"Refobjectkey": " ",
										"ItemSortNo": "0001",
										"Descript": text,
										"DCodegrp": object,
										"DCode": objectcode,
										"DlCodegrp": damage,
										"DlCode": damagecode,
										"Assembly": "T-FS101",
										"AssemblyExternal": " ",
										"AssemblyGuid": " ",
										"AssemblyVersion": " ",
										"StartPoint": " ",
										"EndPoint": " ",
										"LinearLength": " ",
										"LinearUnit": " ",
										"LinearUnitIso": " ",
										"FirstOffsetTypeCode": " ",
										"FirstOffsetValue": " ",
										"FirstOffsetUnit": " ",
										"FirstOffsetUnitIso": " ",
										"SecondOffsetTypeCode": " ",
										"SecondOffsetValue": " ",
										"SecondOffsetUnit": " ",
										"SecondOffsetUnitIso": " ",
										"Equipment": eqi,
										"FunctLoc": " ",
										"MarkerStartPoint": " ",
										"MarkerDistanceStartPoint": " ",
										"MarkerEndPoint": " ",
										"MarkerDistanceEndPoint": " ",
										"MarkerDistanceUnit": " ",
										"MarkerDistanceUnitIso": " "
									};

									console.log("obj", obj);

									arrayOfItems.push(obj);

								}

								var oModel3 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/", true);
								var postdata = {
									"NotifNo": " ",
									"Equipment": eqi,
									"FunctLoc": func,
									"Priority": prio,
									"Desstdate": today,
									"Desenddate": today,
									"ShortText": descrip,
									"SysStatus": " ",
									"PmWkctr": "",
									"UserSt": " ",
									"Userstatus": " ",
									"Planplant": "",
									"Maintroom": " ",
									"Plsectn": " ",
									"Maintloc": "",
									"Breakdown": breakd,
									"Strmlfndate": reqir_star,
									"Endmlfndate": reqir_end,
									"Strmlfntime": "PT08H00M00S",
									"Endmlfntime": "PT08H00M00S",
									"Unit": " ",
									"Plangroup": "",
									"Maintplant": "",
									"Reportedby": name,
									"PersonResponsible": " ",
									"NotifType": notif,
									"CreatedBy": "",
									"Notiftime": "PT08H00M00S",
									"NotifDate": today,
									"Abcindic": " ",
									"Sortfield": " ",
									"BusArea": " ",
									"CoArea": " ",
									"Costcenter": " ",
									"WbsElement": " ",
									"Type": " ",
									"Message": " ",
									"LongText": text,
									ToItems: arrayOfItems,
								};
								console.log(postdata);

								var sPath = "/NotificationCreatHeaderSet";
								oModel3.create(sPath, postdata, {
									success: function (oData, oResponse) {
										console.log(oData, "oData123");
										var msg1 = oData.Message;
										notnum = msg1.slice(13, 21);
										reportname = postdata.Reportedby;
										descrip1 = postdata.descrip;

										console.log("mes", msg1)
										var typ = oData.Type;
										console.log(typ, "type");
										if (typ == "S") {
											jQuery.sap.require("sap.m.MessageBox");
											sap.m.MessageBox.confirm(msg1, {
												icon: sap.m.MessageBox.Icon.SUCCESS,
												title: "Success",
												actions: [sap.m.MessageBox.Action.OK],
												onClose: function (oAction) {
													if (oAction == "OK") {
														ci_att1 = this._oParentView.byId("UploadCollection").getItems().length;

														if (ci_att1 == '0') {
															window.location.reload();
														} else {
															that.DMS();
														}
													}
												}.bind(that)
											});
											message = false;
										} else {
											sap.m.MessageBox.warning(msg1, {
												icon: sap.m.MessageBox.Icon.WARNING,
												title: "Warning",
												actions: [sap.m.MessageBox.Action.OK],

												onClose: function (oAction) {

													if (oAction == "OK") {
														arrayOfItems = [];

													}
												}.bind(that)

											});
											message = false;

										}

									}
								});

							}
						}
					});

			}
		},
		/*			test1: function () {
					alert("SMD")
					 ci_att1 = this._oParentView.getModel("oGlobalModel").getProperty("/ci_att1");
					console.log("Array",ci_att1 );
					},*/

		DMS: function () {
			//	alert("SMD")

			ci_att1 = this._oParentView.getModel("oGlobalModel").getProperty("/ci_att1");
			console.log("Array", ci_att1);
			var oUploadCollection = this._oParentView.byId("UploadCollection");

			var arr1 = [];
			var arrp = [];
			var count = ci_att1.length;
			console.log("count :", count);

			for (var i = 0; i < count; i++) {
				var dmsdata = {
					"DocType": ci_att1[i].Ext,
					"FileName": ci_att1[i].Name,
					"Base64": ci_att1[i].Base64

				};
				arr1.push(dmsdata);
			}
			var obj = {
				"d": {
					"ProcessName": "Notification",
					"Description": descrip1,
					"Username": reportname,
					"NotificationNo": notnum,
					"To_DMSItems": arr1,
				}
			};
			arrp.push(obj);

			console.log(obj);
			var oModel1 = new ODataModel("/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/", true);
			var sPath = "/DMS_HeaderSet";

			oModel1.create(sPath, obj, {
				success: function (oData, oResponse) {
					console.log(oData);
					var msg = oData.ReturnMessage;
					var typ = oData.ReturnType;
					console.log(typ, "type");
					if (typ == "S") {
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.confirm(msg, {
							icon: sap.m.MessageBox.Icon.SUCCESS,
							title: "Success",
							actions: [sap.m.MessageBox.Action.OK],
							onClose: function (oAction) {
								if (oAction == "OK") {
									window.location.reload();
								}
							}
						});

					} else {
						sap.m.MessageBox.warning(msg, {
							icon: sap.m.MessageBox.Icon.WARNING,
							title: "Warning",
							actions: [sap.m.MessageBox.Action.OK],

							onClose: function (oAction) {

								if (oAction == "OK") {
									window.location.reload();

								}
							}

						});

					}

				}
			});

		},

	});

});