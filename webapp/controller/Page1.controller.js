var Quagga, cc_aDataj = [],
	oModelccd, cc_oTable, passarray = [],
	Palntarray = [],
	cc_aDat, comboo, NewPass, FinalMat, comboo1, damage, loca, equip;
var maps, tech, directionsDisplay, directionsService, map, google, PlantPath, table, arrayOfItems = [],
	combhusb,
	obj;
var arr2 = [],
	arr1 = [],
	arr3 = [],
	arr4 = [];
var Latitude1, Longitude1, Latitude2, Longitude2, newmap;
var fun_loc, prior, planplant, mainloca, plangrp, mainplant, reportby, notitype;
var lat1, lng1, llong1, geocoder1, marker4, directionsDisplay, directionsService, prio, oModel13;
var ci_attach1, base64_marker, baseval = [],
	ci_obj1, ci_att1 = [];

sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./Dialog3", "./Dialog2",
	"sap/ui/model/odata/ODataModel",
	"sap/m/MessageToast",
	"sap/m/UploadCollectionParameter",
	"./utilities",
	"sap/ui/core/routing/History",
	"com/sap/build/ba293bd41-us_1/mobileRequestMaintenanceV5B/model/notificationF4",
	"com/sap/build/ba293bd41-us_1/mobileRequestMaintenanceV5B/model/posting",
	"com/sap/build/ba293bd41-us_1/mobileRequestMaintenanceV5B/model/priority",
	"./QuickView1"
], function (BaseController, MessageBox, Dialog3, Dialog2, ODataModel, MessageToast, UploadCollectionParameter, Utilities, History,
	notificationF4,
	posting, priority, QuickView1) {
	"use strict";

	return BaseController.extend("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.controller.Page1", {
		handleRouteMatched: function (oEvent) {
			//****************reported by *********************//

			var cost = this.getView().byId("report");
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			oModel.read('/ReportedBySet', {
				//	filters: ofilters,
				success: function (oData, oResponse) {
					var ReportBy = oData.results[0].ReportBy;

					console.log("ReportBy:" + ReportBy)

					var dups = [];
					var arr = oData.results.filter(function (el) {
						if (dups.indexOf(el.ReportBy) == -1) {
							dups.push(el.ReportBy);
							return true;
						}
						return false;
					});
					var arr9 = {
						"arr9": arr
					};
					console.log("arr9:" + arr9);
					var oItems = new sap.ui.core.ListItem({
						key: "{ReportBy}",
						text: "{ReportBy}"
					});

					var oModel = new sap.ui.model.json.JSONModel(arr9);
					oModel.setSizeLimit(900);
					cost.setModel(oModel);
					cost.bindItems("/arr9", oItems);

				},

			});
		},
	
		addRow: function () {
			var a1 = sap.ui.core.Fragment.byId("tablefragment", "technical1").setValue("");
			var a2 = sap.ui.core.Fragment.byId("tablefragment", "objectcode").setValue("");
			var a3 = sap.ui.core.Fragment.byId("tablefragment", "damage").setValue("");
			var a4 = sap.ui.core.Fragment.byId("tablefragment", "damagecode").setValue("");
			var a5 = sap.ui.core.Fragment.byId("tablefragment", "cause").setValue("");
			var a6 = sap.ui.core.Fragment.byId("tablefragment", "causecode").setValue("");
			table.open();

		},
		tableok: function () {
			var a1 = sap.ui.core.Fragment.byId("tablefragment", "technical1").getValue();
			var a2 = sap.ui.core.Fragment.byId("tablefragment", "objectcode").getSelectedKey();
			var a3 = sap.ui.core.Fragment.byId("tablefragment", "damage").getValue();
			var a4 = sap.ui.core.Fragment.byId("tablefragment", "damagecode").getSelectedKey();
			var a5 = sap.ui.core.Fragment.byId("tablefragment", "cause").getValue();
			var a6 = sap.ui.core.Fragment.byId("tablefragment", "causecode").getSelectedKey();
			var that = this;
			 

				var obj = {
					object: a1,
					objectcode: a2,
					damage: a3,
					damagecode: a4,
					cause: a5,
					causecode: a6,

				};
				arr1.push(obj);
				arr2 = {
					"arr2": arr1
				};
				oModel13 = new sap.ui.model.json.JSONModel(arr2);
				var t1 = that.getView().byId("idProductsTable");
				t1.setModel(oModel13);
				var titems1 = new sap.m.ColumnListItem({
					cells: [new sap.m.Text({
							text: "{object}"
						}), new sap.m.Text({
							text: "{objectcode}"
						}), new sap.m.Text({
							text: "{damage}"
						}), new sap.m.Text({
							text: "{damagecode}"
						}), new sap.m.Text({
							text: "{cause}"
						}), new sap.m.Text({
							text: "{causecode}"
						}),
						new sap.m.Button({
							icon: "sap-icon://delete",
							text: "",
							press: function (oArg) {
								that.onDelCon(oArg);
							}
						})

					]
				});

				t1.bindItems("/arr2", titems1);
				table.close();
			
		},
		tech_change: function () {

			var Flcoc = sap.ui.core.Fragment.byId("techfragment", "functech").getSelectedKey();
			var t1 = sap.ui.core.Fragment.byId("techfragment", "technical_detail");
			var oFilters = [new sap.ui.model.Filter("FunctionalLocation", sap.ui.model.FilterOperator.EQ, Flcoc)];

			//			t1.setModel(oModel);

			var titems1 = new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
						text: "{FunctionalLocation}",

					}), new sap.m.Text({
						text: "{Text}"
					})

				]
			});

			//		t1.bindItems("/PoItemsGoods", titems1, null, oFilters);
			t1.bindItems({
				path: '/MasterF4HelpSet',
				parameters: {
					operationMode: "Default"
				},
				template: titems1,
				filters: oFilters
			});
			var sPath = "/EquipmentF4Set?$filter=FunctionalLocation eq '" + Flcoc + "'";
			var eModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			eModel.read(sPath, {

				success: function (oData, oResponse) {
					console.log("Equipment Data(based on FL):: ", oData);
				}
			});

		

		},
		onDelCon: function (oArg) {
			/*	var row = oEvent.getSource().getParent();
			row.getParent().removeItem(row);*/
			var tabellength = this.getView().byId("idProductsTable").getItems();
			var deleteRecord = oArg.getSource().getBindingContext().getObject();
			console.log(deleteRecord, "deleteRecord");
			for (var i = 0; i < arr1.length; i++) {
				if (arr1[i] == deleteRecord) {
					arr1.splice(i, 1); //removing 1 record from i th index.
					oModel13.refresh();
					break; //quit the loop
				}
			}

		},
			ci_handleDelete: function (oEvent) {
				var path = oEvent.getParameter('listItem').getBindingContext().getPath();
				var idx = parseInt(path.substring(path.lastIndexOf('/') + 1));
				var list_ID = sap.ui.getCore().byId(oEvent.getSource().sId);

				var Data = list_ID.getModel();

				var d = Data.getData();
				d.splice(idx, 1);
				Data.setData(d);
			},

		techok: function () {
			//	this.startbind();
			/*var plant = sap.ui.core.Fragment.byId("techfragment", "main").setValue("");
			var cost = sap.ui.core.Fragment.byId("techfragment", "cost").setValue("");
			var func = sap.ui.core.Fragment.byId("techfragment", "functech").setValue("");
			var equip = sap.ui.core.Fragment.byId("techfragment", "equip").setValue("");*/
			var tableid = sap.ui.core.Fragment.byId("techfragment", "technical_detail");
			var item = sap.ui.core.Fragment.byId("techfragment", "technical_detail").getSelectedItem();
			var tablelength = tableid.getSelectedItems().length;
			console.log("TableLenth :", tablelength);
			if (tablelength == '0'){
				var eqipcmb = sap.ui.core.Fragment.byId("techfragment", "equip").getSelectedKey();
				
				//alert(eqipcmb)
				var eqiitem = this.getView().byId("productInput").setValue(eqipcmb);
			}else{
			for (var i = 0; i < tablelength; i++) {
				var rows = tableid.getSelectedItems()[i];
				var item = rows.getCells()[0].getText();

				var desc = rows.getCells()[1].getText();

				var item1 = this.getView().byId("productInput").setValue(item + " / " + desc);
			var sPath = "/EquipmentF4Set?$filter=FunctionalLocation eq 'K1-B01-2'";
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			var ocont = this;
			oModel.read(sPath, {
				success: function (oData, oResponse) {
					var count = oData.results.length;
					console.log("oDataequp :", oData)
					var c4Model = new sap.ui.model.json.JSONModel();
					c4Model.setData(oData);
					var t5 = ocont.getView().byId("techok");
					t5.setModel(c4Model);
					var vescombo = ocont.getView().byId("equip");
					var oItems = new sap.ui.core.ListItem({
						key: "{EquipmentNo}",
						text: "{EquipmentNo}-{Text}"
					});
					vescombo.bindAggregation("items", {
						path: '/results',
						template: oItems

					});

				},

			});
			}
			}


			tech.close();

		},
		clearfilter: function () {
			var plant = sap.ui.core.Fragment.byId("techfragment", "main").setValue("");
			var cost = sap.ui.core.Fragment.byId("techfragment", "cost").setValue("");
			var func = sap.ui.core.Fragment.byId("techfragment", "functech").setValue("");
			var equip = sap.ui.core.Fragment.byId("techfragment", "equip").setValue("");
			sap.ui.core.Fragment.byId("techfragment", "technical_detail").destroyItems();

		},
		equichange: function () {
			var eqi = sap.ui.core.Fragment.byId("techfragment", "equip").getSelectedKey();
			var t1 = sap.ui.core.Fragment.byId("techfragment", "technical_detail");
			var oFilters = [new sap.ui.model.Filter("EquipmentNumber", sap.ui.model.FilterOperator.EQ, eqi)];

			//			t1.setModel(oModel);

			var titems1 = new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
						text: "{FunctionalLocation}",

					}), new sap.m.Text({
						text: "{Text}"
					})

				]
			});

			//		t1.bindItems("/PoItemsGoods", titems1, null, oFilters);
			t1.bindItems({
				path: '/MasterF4HelpSet',
				parameters: {
					operationMode: "Default"
				},
				template: titems1,
				filters: oFilters
			});

		},
		canceltecch: function () {
			sap.ui.core.Fragment.byId("techfragment", "technical_detail").destroyItems();
			tech.close();
		},

		priority1: function () {
			var oView = this.getView();
			prio = new priority(oView, this.getOwnerComponent());
			prio.priority();
		},

		_onSegmentedButtonItemPress: function (oEvent) {

			maps.open();
			var latlng = new google.maps.LatLng(33.088635, -96.807831);
			var latlng2 = new google.maps.LatLng(32.78306, -96.80667);

			this.initialized = true;
			this.geocoder = new google.maps.Geocoder();
			directionsDisplay = new google.maps.DirectionsRenderer;
			directionsService = new google.maps.DirectionsService;
			window.mapOptions = {
				center: latlng,
				zoom: 12
			};

			var map = new google.maps.Map(sap.ui.getCore().byId("map_canvas").getDomRef(), mapOptions);
			//	var map = new google.maps.Map(this.getView().byId("map_canvas").getDomRef(), mapOptions);
			//map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			directionsDisplay.setMap(map);
			directionsService.route({
					origin: latlng,
					destination: latlng2,
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				},
				function (response, status) {
					if (status == 'OK') {
						//	alert("pp")
						directionsDisplay.setDirections(response);

						var toast = "Distance: " + calcDistance(latlng, latlng2) + "Miles";

						//MessageToast.show(toast);

						var btnDis = sap.ui.getCore().byId("btnDis");

						btnDis.setText("Approx.Distance : " + calcDistance(latlng, latlng2) + " Miles")

						function calcDistance(latlng, latlng2) {

							return (google.maps.geometry.spherical.computeDistanceBetween(latlng, latlng2) / 100).toFixed(2);

						}

					} else {
						//alert("ii")
						console.log("response", response)
						console.log("status", status)

						//	window.alert('Directions request failed due to ' + status);
					}
				});

		},

		clo: function () {

			maps.close();
		},
		ok: function () {

			tech.close();

		},
		/*	_onFileUploaderChange: function () {
				var oFileuploader = this.byId("ci_fileUploader1");
				ci_attach1 = this.byId("UploadCollection");
				for (var i = 0; i < oFileuploader.getItems().length; i++) {
					var sFilename = oFileuploader.getValue()[i];
					console.log
						//	baseval = [" "," "," "," "," "];
					var file = jQuery.sap.domById(oFileuploader.getId() + "-fu").files[i];

					var base64_marker = 'data:' + file.type + ';base64,';

					var filename = sFilename.replace(/(\.[^/.]+)+$/, ""); // File Name
					console.log("filename : " + filename);
					var fileext = sFilename.slice((sFilename.lastIndexOf(".") - 1 >>> 0) + 2); // File Extension
					console.log("fileext : " + fileext);
					var sfileext = fileext.substring(0, 3);
					console.log("sfileext : " + sfileext);
					var tsfileext = sfileext.toUpperCase();
					console.log("tsfileext : " + tsfileext);
					if (file) {
						var reader = new FileReader();

						reader.onload = function (readerEvt) {
							var binaryString = readerEvt.target.result;
							var base64 = btoa(binaryString);
							console.log("base64 : " + base64);

							oFileuploader.setValue();
							baseval.push(base64);
							console.log(baseval);
							ci_obj1 = {
								Name: filename,
								Ext: tsfileext,
								Base64: base64
							};
							ci_att1.push(ci_obj1);

							console.log(ci_att1.length);
							var oModel = new sap.ui.model.json.JSONModel(ci_att1);
							console.log(ci_att1);
							console.log(ci_att1[0].Base64);
							ci_attach1.setModel(oModel);
							var oItems = new sap.m.ObjectListItem({
								icon: {
									path: "Ext",
									formatter: function (subject) {
										var lv = subject;
										if (lv === 'TXT') {
											return "sap-icon://document-text";
										} else if (lv === 'JPG' || lv === 'PNG' || lv === 'BMP') {
											return "sap-icon://attachment-photo";
										} else if (lv === 'PDF') {
											return "sap-icon://pdf-attachment";
										} else if (lv === 'DOC') {
											return "sap-icon://doc-attachment";
										} else if (lv === 'XLS') {
											return "sap-icon://excel-attachment";
										} else if (lv === 'MP3') {
											return "sap-icon://attachment-audio";
										} else if (lv === 'XLS') {
											return "sap-icon://excel-attachment";
										} else if (lv === 'PPT') {
											return "sap-icon://ppt-attachment";
										} else {
											return "sap-icon://document";
										}

									}
								},
								title: "{Name}.{Ext}",
								type: "Active",
							});
							ci_attach1.bindItems("/", oItems);

						};

					};

					reader.readAsBinaryString(file);

				}
			},*/
		_onFileUploaderChange: function () {
			var oFileuploader = this.getView().byId("ci_fileUploader1");
			ci_attach1 = this.getView().byId("UploadCollection");
			var len = oFileuploader.length;
			var sFilename = oFileuploader.getValue();

			//	baseval = [" "," "," "," "," "];
			var file = jQuery.sap.domById(oFileuploader.getId() + "-fu").files[0];

			var base64_marker = 'data:' + file.type + ';base64,';

			var filename = sFilename.replace(/(\.[^/.]+)+$/, ""); // File Name
			console.log("filename : " + filename);
			var fileext = sFilename.slice((sFilename.lastIndexOf(".") - 1 >>> 0) + 2); // File Extension
			console.log("fileext : " + fileext);
			var sfileext = fileext.substring(0, 3);
			console.log("sfileext : " + sfileext);
			var tsfileext = sfileext.toUpperCase();
			console.log("tsfileext : " + tsfileext);
			var that = this;
			if (file) {
				var reader = new FileReader();

				reader.onload = function (readerEvt) {
					var binaryString = readerEvt.target.result;
					var base64 = btoa(binaryString);
					console.log("base64 : " + base64);

					oFileuploader.setValue();
					baseval.push(base64);
					console.log(baseval);
					ci_obj1 = {
						Name: filename,
						Ext: tsfileext,
						Base64: base64
					};
					ci_att1.push(ci_obj1);

					console.log(ci_att1.length);
					var oModel = new sap.ui.model.json.JSONModel(ci_att1);
					console.log(ci_att1);
					console.log(ci_att1[0].Base64);
					ci_attach1.setModel(oModel);
					var oItems = new sap.m.ObjectListItem({
						icon: {
							path: "Ext",
							formatter: function (subject) {
								var lv = subject;
								if (lv === 'TXT') {
									return "sap-icon://document-text";
								} else if (lv === 'JPG' || lv === 'PNG' || lv === 'BMP') {
									return "sap-icon://attachment-photo";
								} else if (lv === 'PDF') {
									return "sap-icon://pdf-attachment";
								} else if (lv === 'DOC') {
									return "sap-icon://doc-attachment";
								} else if (lv === 'XLS') {
									return "sap-icon://excel-attachment";
								} else if (lv === 'MP3') {
									return "sap-icon://attachment-audio";
								} else if (lv === 'XLS') {
									return "sap-icon://excel-attachment";
								} else if (lv === 'PPT') {
									return "sap-icon://ppt-attachment";
								} else {
									return "sap-icon://document";
								}

							}
						},
						title: "{Name}.{Ext}",
						type: "Active",
					});
					ci_attach1.bindItems("/", oItems);
					that.getView().getModel("oGlobalModel").setProperty("/ci_att1", ci_att1);

					/*var	ci_att11 = that._oParentView.getModel("oGlobalModel").getProperty("/ci_att1");
			console.log(ci_att11,"array");*/

				};

			};

			reader.readAsBinaryString(file);

		},

		test1: function () {
			var oView = this.getView();
			var post = new posting(oView, this.getOwnerComponent());
			post.test1();
		},
		DMS: function () {
			//alert("SMD")
			var oUploadCollection = this.getView().byId("UploadCollection");
			console.log("oUploadCollection :", ci_att1);

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
					"Description": "Machine Damage",
					"Username": "David",
					"NotificationNo": "10004932",
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
					/*	var msg1 = oData.ReturnMessage;
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
													window.location.reload();
													
												}
											}.bind(that)
										});
										message = false;
									}*/

				}
			});

		},
		handleValueHelp: function () {

			var oCont = this;
			var cost = sap.ui.core.Fragment.byId("techfragment", "cost");
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			oModel.read('/CostCenterF4Set', {
				//	filters: ofilters,
				success: function (oData, oResponse) {
					var CostCenter = oData.results[0].CostCenter;
					var Description = oData.results[0].Description;

					console.log("CostCenter:" + CostCenter)
					console.log("Description:" + Description)
					var dups = [];
					var arr = oData.results.filter(function (el) {
						if (dups.indexOf(el.CostCenter) == -1) {
							dups.push(el.CostCenter);
							return true;
						} else if (dups.indexOf(el.Description) == -1) {
							dups.push(el.Description);
							return true;
						}
						return false;
					});
					var arr9 = {
						"arr9": arr
					};
					console.log("arr9:" + arr9);
					var oItems = new sap.ui.core.ListItem({
						key: "{CostCenter}",
						text: "{CostCenter}-{Description}"
					});

					var oModel = new sap.ui.model.json.JSONModel(arr9);
					oModel.setSizeLimit(1500);
					cost.setModel(oModel);
					cost.bindItems("/arr9", oItems);

				},

			});

			var equip = sap.ui.core.Fragment.byId("techfragment", "equip");
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			oModel.read('/EquipmentF4Set', {
				//	filters: ofilters,
				success: function (oData, oResponse) {
					var leng = oData.results.length;
					console.log("length", leng);
					var EquipmentNo = oData.results[0].EquipmentNo;
					var Text = oData.results[0].Text;

					console.log("CostCenter:" + EquipmentNo)
					console.log("Description:" + Text)
					var dups = [];
					var arr1 = oData.results.filter(function (el) {
						if (dups.indexOf(el.EquipmentNo) == -1) {
							dups.push(el.EquipmentNo);
							return true;
						} else if (dups.indexOf(el.Text) == -1) {
							dups.push(el.Text);
							return true;
						}
						return false;
					});
					var arr10 = {
						"arr10": arr1
					};
					console.log("arr10:" + arr10);
					var oItems = new sap.ui.core.ListItem({
						key: "{EquipmentNo}",
						text: "{EquipmentNo}-{Text}"
					});

					var oModel = new sap.ui.model.json.JSONModel(arr10);
					oModel.setSizeLimit(2545);
					equip.setModel(oModel);
					equip.bindItems("/arr10", oItems);

				},

			});

			var funloc = sap.ui.core.Fragment.byId("techfragment", "functech");
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			oModel.read('/MasterF4HelpSet', {
				//	filters: ofilters,
				success: function (oData, oResponse) {
					var leng = oData.results.length;
					console.log("length", leng);
					var FunctionalLocation = oData.results[0].FunctionalLocation;
					var Text = oData.results[0].Text;

					console.log("FunctionalLocation:" + FunctionalLocation)
					console.log("Description:" + Text)
					var dups = [];
					var arr3 = oData.results.filter(function (el) {
						if (dups.indexOf(el.FunctionalLocation) == -1) {
							dups.push(el.FunctionalLocation);
							return true;
						} else if (dups.indexOf(el.Text) == -1) {
							dups.push(el.Text);
							return true;
						}
						return false;
					});
					var arr11 = {
						"arr11": arr3
					};
					console.log("arr11:" + arr11);
					var oItems = new sap.ui.core.ListItem({
						key: "{FunctionalLocation}",
						text: "{FunctionalLocation}-{Text}"
					});

					var oModel = new sap.ui.model.json.JSONModel(arr11);
					oModel.setSizeLimit(5300);
					funloc.setModel(oModel);
					funloc.bindItems("/arr11", oItems);

				},

			});

			tech.open();

		},
		list: function () {
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show(
				"Do you want to Manage Notification?", {
					//	        icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Warning Message",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (oAction) {
						// notify user
						if (oAction == "YES") {
							//alert("clicked");
							sap.m.URLHelper.redirect(
								"https://managenotify-ba293bd41.dispatcher.us1.hana.ondemand.com/webapp/test/testFLPService.html?hc_reset#BUILD-prototype "
							);
							//window.location = "https:flpnwc-ba293bd41.dispatcher.us1.hana.ondemand.com/sites?siteId=2129522a-cfca-48cc-8961-c21762d0cb8b#Create_Notification_08032019-Display"
							//oRouter = sap.ui.core.UIComponent.getRouterFor(this);

							//oRouter.navTo("Login");

						} else(oAction == "NO");

						{
							//	alert("no actions")
						}
					}
				});

		},

		attachpost: function (oEvent) {
			var sUploadedFileName = oEvent.getParameter.fileName;
		//	alert(sUploadedFileName)
			setTimeout(function () {
				var oUploadCollection = this.byId("UploadCollection");

				for (var i = 0; i < oUploadCollection.getItems().length; i++) {
					if (oUploadCollection.getItems()[i].getFileName() === sUploadedFileName) {
						oUploadCollection.removeItem(oUploadCollection.getItems()[i]);
						break;
					}
				}

				// delay the success message in order to see other messages before
				MessageToast.show("Event uploadComplete triggered");
			}.bind(this), 8000);
		},
		onChange: function (oEvent) {
			var oUploadCollection = oEvent.getSource();
			// Header Token
			var oCustomerHeaderToken = new UploadCollectionParameter({
				name: "x-csrf-token",
				value: "securityTokenFromModel"
			});
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
			MessageToast.show("Event change triggered");
		},

		
		_onSegmentedButtonItemPress1: function () {

			var sDialogName = "Dialog2";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new Dialog2(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		_onButtonPress: function () {

			var sDialogName = "Dialog2";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];

			if (!oDialog) {
				oDialog = new Dialog2(this.getView());
				this.mDialogs[sDialogName] = oDialog;

				// For navigation.
				oDialog.setRouter(this.oRouter);
			}
			oDialog.open();

		},
		_onLinkPress: function () {

			var adata = [{
				name: "Please describe the problem?"
			}, {
				name: "When did the problem starts?"
			}, {
				name: "What did you do after identifying the problems?"
			}];
			var notes = "";
			for (var i = 0; i < adata.length; i++) {
				notes = notes + adata[i].name + "\n \n";
			}

			this.getView().byId("text").setValue(notes);

		},
		org: function () {
			var type = this.getView().byId("notifif4").getSelectedKey();

			if (type === "M2") {
				this.getView().byId("m2").setVisible(true);
			} else {
				this.getView().byId("m2").setVisible(false);
			}
			/*	this.cc_aDatad = [];
				//	var purcorg = this.getView().byId("purc").getValue();

				cc_aDataj = {

					pass12: FinalMat,
					Empty3: "",
					Empty4: "",
					Empty5: "",
					Empty6: "",
					Empty7: "",
					Empty8: "",

				};
				// PlantPath = Palntarray;
				this.cc_aDatad.push(cc_aDataj);
				cc_oTable = this.getView().byId("idProductsTable");
				oModelccd = new sap.ui.model.json.JSONModel();
				oModelccd.setData({
					// PlantBind: PlantPath,
					seamandata: this.cc_aDatad
				});
				cc_oTable.setModel(oModelccd);
			}*/

		},
		plant: function () {
			var plant = sap.ui.core.Fragment.byId("techfragment", "main").getSelectedKey();
			var t1 = sap.ui.core.Fragment.byId("techfragment", "technical_detail");
			var oFilters = [new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, plant)];

			//			t1.setModel(oModel);

			var titems1 = new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
						text: "{FunctionalLocation}",

					}), new sap.m.Text({
						text: "{Text}"
					})

				]
			});

			//		t1.bindItems("/PoItemsGoods", titems1, null, oFilters);
			t1.bindItems({
				path: '/MasterF4HelpSet',
				parameters: {
					operationMode: "Default"
				},
				template: titems1,
				filters: oFilters
			});

			/*	var plant = sap.ui.core.Fragment.byId("techfragment", "main").getSelectedKey();

				var sPath = "/MasterF4HelpSet?$filter=Plant eq '" + plant + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
				//	 var ocont = this;
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						console.log("oData :", oData)
						var c4Model = new sap.ui.model.json.JSONModel();
						c4Model.setData(oData);
						var t5 = sap.ui.core.Fragment.byId("techfragment", "functech");
						t5.setModel(c4Model);
						var vescombo = sap.ui.core.Fragment.byId("techfragment", "functech");
						var oItems = new sap.ui.core.ListItem({
							key: "{FunctionalLocation}",
							text: "{FunctionalLocation}"
						});
						vescombo.bindAggregation("items", {
							path: '/results',
							template: oItems

						});

					},
				});*/

		},
		pool: function (oEvent) {
			var grp = oEvent.getSource().getSelectedKey();
			//	alert(grp);
			var sPath = "/ObjectPartF4Set?$filter=CodeGroup eq '" + grp + "'";
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			var ocont = this;
			oModel.read(sPath, {
				success: function (oData, oResponse) {
					var count = oData.results.length;
					console.log("oData :", oData)
					var c4Model = new sap.ui.model.json.JSONModel();
					c4Model.setData(oData);
					var t5 = ocont.getView().byId("objcode");
					t5.setModel(c4Model);
					var vescombo = ocont.getView().byId("objcode");
					var oItems = new sap.ui.core.ListItem({
						key: "{PartOfObject}",
						text: "{PartOfObject}"
					});
					vescombo.bindAggregation("items", {
						path: '/results',
						template: oItems

					});

				},
			});

		},
		objcode: function () {

			var cost = sap.ui.core.Fragment.byId("techfragment", "cost").getSelectedKey();
			//	alert(cost)
			var t1 = sap.ui.core.Fragment.byId("techfragment", "technical_detail");
			var oFilters = [new sap.ui.model.Filter("CostCenter", sap.ui.model.FilterOperator.EQ, cost)];

			//			t1.setModel(oModel);

			var titems1 = new sap.m.ColumnListItem({
				cells: [new sap.m.Text({
						text: "{FunctionalLocation}",

					}), new sap.m.Text({
						text: "{Text}"
					})

				]
			});

			//		t1.bindItems("/PoItemsGoods", titems1, null, oFilters);
			t1.bindItems({
				path: '/MasterF4HelpSet',
				parameters: {
					operationMode: "Default"
				},
				template: titems1,
				filters: oFilters
			});

		},
		objcode11: function () {

			var object = sap.ui.core.Fragment.byId("tablefragment", "technical1").getValue();
			var sPath = "/ObjectPartF4Set?$filter=CodeGroup eq '" + object + "'";
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			var ocont = this;
			oModel.read(sPath, {
				success: function (oData, oResponse) {
					var count = oData.results.length;
					console.log("Count :", count)
					var c4Model = new sap.ui.model.json.JSONModel();
					c4Model.setData(oData);
					var t5 = sap.ui.core.Fragment.byId("tablefragment", "objectcode");
					t5.setModel(c4Model);
					var vescombo = sap.ui.core.Fragment.byId("tablefragment", "objectcode");
					var oItems = new sap.ui.core.ListItem({
						key: "{PartOfObject}",
						text: "{PartOfObject}-{CodeGroup}"
					});
					vescombo.bindAggregation("items", {
						path: '/results',
						template: oItems
					});
				},
			});
		},

		damage: function () {
			var damage = sap.ui.core.Fragment.byId("tablefragment", "damage").getValue();
			var sPath = "/DamageF4Set?$filter=Problem eq '" + damage + "'";
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			var ocont = this;
			oModel.read(sPath, {
				success: function (oData, oResponse) {
					var count = oData.results.length;
					console.log("Count :", count)
					var c4Model = new sap.ui.model.json.JSONModel();
					c4Model.setData(oData);
					var t5 = sap.ui.core.Fragment.byId("tablefragment", "damagecode");
					t5.setModel(c4Model);
					var vescombo = sap.ui.core.Fragment.byId("tablefragment", "damagecode");
					var oItems = new sap.ui.core.ListItem({
						key: "{DamageCode}",
						text: "{DamageCode}-{Problem}"
					});
					vescombo.bindAggregation("items", {
						path: '/results',
						template: oItems
					});
				},
			});

		},
		cause: function () {
			var cause = sap.ui.core.Fragment.byId("tablefragment", "cause").getValue();
			//	alert(cause)
			var sPath = "/CauseF4Set?$filter=cause eq '" + cause + "'";
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			var ocont = this;
			oModel.read(sPath, {
				success: function (oData, oResponse) {
					var count = oData.results.length;
					console.log("Count :", count)
					var c4Model = new sap.ui.model.json.JSONModel();
					c4Model.setData(oData);
					var t5 = sap.ui.core.Fragment.byId("tablefragment", "causecode");
					t5.setModel(c4Model);
					var vescombo = sap.ui.core.Fragment.byId("tablefragment", "causecode");
					var oItems = new sap.ui.core.ListItem({
						key: "{cause}",
						text: "{causecode}-{cause}"
					});
					vescombo.bindAggregation("items", {
						path: '/results',
						template: oItems
					});
				},
			});

		},
		_onTableDelete: function (oEvent) {

			var oSource = oEvent.getParameter("listItem");
			var oSourceBindingContext = oSource.getBindingContext();

			return new Promise(function (fnResolve, fnReject) {
				if (oSourceBindingContext) {
					var oModel = oSourceBindingContext.getModel();
					oModel.remove(oSourceBindingContext.getPath(), {
						success: function () {
							oModel.refresh();
							fnResolve();
						},
						error: function () {
							oModel.refresh();
							fnReject(new Error("remove failed"));
						}
					});
				} else {
					oSource.getParent().removeItem(oSource);
				}
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});
			/*	var deleteRecord = oArg.getSource().getBindingContext().getObject();
				for (var i = 0; i < this.cc_aDatad.length; i++) {
					if (this.cc_aDatad[i] == deleteRecord) {

						this.cc_aDatad.splice(i, 1); //removing 1 record from i th index.
						oModelccd.refresh();
						break; //quit the loop
					}
				}*/

		},
		_onUploadCollectionUploadComplete: function (oEvent) {

			var oFile = oEvent.getParameter("files")[0];
			var iStatus = oFile ? oFile.status : 500;
			var sResponseRaw = oFile ? oFile.responseRaw : "";
			var oSourceBindingContext = oEvent.getSource().getBindingContext();
			var sSourceEntityId = oSourceBindingContext ? oSourceBindingContext.getProperty("") : null;
			var oModel = this.getView().getModel();

			return new Promise(function (fnResolve, fnReject) {
				if (iStatus !== 200) {
					fnReject(new Error("Upload failed"));
				} else if (oModel.hasPendingChanges()) {
					fnReject(new Error("Please save your changes, first"));
				} else if (!sSourceEntityId) {
					fnReject(new Error("No source entity key"));
				} else {
					try {
						var oResponse = JSON.parse(sResponseRaw);
						var oNewEntityInstance = {};

						oNewEntityInstance[""] = oResponse["ID"];
						oNewEntityInstance[""] = sSourceEntityId;
						oModel.createEntry("", {
							properties: oNewEntityInstance
						});
						oModel.submitChanges({
							success: function (oResponse) {
								var oChangeResponse = oResponse.__batchResponses[0].__changeResponses[0];
								if (oChangeResponse && oChangeResponse.response) {
									oModel.resetChanges();
									fnReject(new Error(oChangeResponse.message));
								} else {
									oModel.refresh();
									fnResolve();
								}
							},
							error: function (oError) {
								fnReject(new Error(oError.message));
							}
						});
					} catch (err) {
						var message = typeof err === "string" ? err : err.message;
						fnReject(new Error("Error: " + message));
					}
				}
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		_onUploadCollectionChange: function (oEvent) {

			var oUploadCollection = oEvent.getSource();
			var aFiles = oEvent.getParameter('files');

			if (aFiles && aFiles.length) {
				var oFile = aFiles[0];
				var sFileName = oFile.name;

				var oDataModel = this.getView().getModel();
				if (oUploadCollection && sFileName && oDataModel) {
					var sXsrfToken = oDataModel.getSecurityToken();
					var oCsrfParameter = new sap.m.UploadCollectionParameter({
						name: "x-csrf-token",
						value: sXsrfToken
					});
					oUploadCollection.addHeaderParameter(oCsrfParameter);
					var oContentDispositionParameter = new sap.m.UploadCollectionParameter({
						name: "content-disposition",
						value: "inline; filename=\"" + encodeURIComponent(sFileName) + "\""
					});
					oUploadCollection.addHeaderParameter(oContentDispositionParameter);
				} else {
					throw new Error("Not enough information available");
				}
			}

		},
		_onUploadCollectionTypeMissmatch: function () {
			return new Promise(function (fnResolve) {
				sap.m.MessageBox.warning(
					"The file you are trying to upload does not have an authorized file type (JPEG, JPG, GIF, PNG, TXT, PDF, XLSX, DOCX, PPTX).", {
						title: "Invalid File Type",
						onClose: function () {
							fnResolve();
						}
					});
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err);
				}
			});

		},
		_onUploadCollectionFileSizeExceed: function () {
			return new Promise(function (fnResolve) {
				sap.m.MessageBox.warning("The file you are trying to upload is too large (10MB max).", {
					title: "File Too Large",
					onClose: function () {
						fnResolve();
					}
				});
			}).catch(function (err) {
				if (err !== undefined) {
					MessageBox.error(err);
				}
			});

		},
		save: function () {
			var oView = this.getView();
			var post = new posting(oView, this.getOwnerComponent());
			post.posting();

		},
		onScanForValue: function (oEvent) {
			if (!this._oScanDialog) {
				this._oScanDialog = new sap.m.Dialog({
					title: "Scan barcode",
					contentWidth: "640px",
					contentHeight: "480px",
					horizontalScrolling: false,
					verticalScrolling: false,
					stretchOnPhone: true,
					content: [new sap.ui.core.HTML({
						id: this.createId("scanContainer"),
						content: "<div />"
					})],
					endButton: new sap.m.Button({
						text: "Cancel",
						press: function (oEvent) {
							this._oScanDialog.close();
						}.bind(this)
					}),
					afterOpen: function () {
						// TODO: Investigate why Quagga.init needs to be called every time...possibly because DOM 
						// element is destroyed each time dialog is closed
						this._initQuagga(this.getView().byId("scanContainer").getDomRef()).done(function () {
							// Initialisation done, start Quagga
							Quagga.start();
						}).fail(function (oError) {
							// Failed to initialise, show message and close dialog...this should not happen as we have
							// already checked for camera device ni /model/models.js and hidden the scan button if none detected
							MessageBox.error(oError.message.length ? oError.message : ("Failed to initialise Quagga with reason code " + oError.name), {
								onClose: function () {
									this._oScanDialog.close();
								}.bind(this)
							});
						}.bind(this));
					}.bind(this),
					afterClose: function () {
						// Dialog closed, stop Quagga
						Quagga.stop();
					}
				});

				this.getView().addDependent(this._oScanDialog);
			}

			this._oScanDialog.open();
		},

		_initQuagga: function (oTarget) {
			var oDeferred = jQuery.Deferred();

			// Initialise Quagga plugin - see https://serratus.github.io/quaggaJS/#configobject for details
			Quagga.init({
				inputStream: {
					type: "LiveStream",
					target: oTarget,
					constraints: {
						width: {
							min: 640
						},
						height: {
							min: 480
						},
						facingMode: "environment"
					}
				},
				locator: {
					patchSize: "medium",
					halfSample: true
				},
				numOfWorkers: 2,
				frequency: 10,
				decoder: {
					readers: [
						"code_128_reader",
						"ean_reader",
						"ean_8_reader",
						"code_39_reader",
						"code_39_vin_reader",
						"codabar_reader",
						"upc_reader",
						"upc_e_reader",
						"i2of5_reader",
						"2of5_reader",
						"code_93_reader"
					],
					debug: {
						showCanvas: true,
						showPatches: true,
						showFoundPatches: true,
						showSkeleton: true,
						showLabels: true,
						showPatchLabels: true,
						showRemainingPatchLabels: true,
						boxFromPatches: {
							showTransformed: true,
							showTransformedBox: true,
							showBB: true
						}
					}
				},
				locate: true
			}, function (error) {
				if (error) {
					oDeferred.reject(error);
				} else {
					oDeferred.resolve();
				}
			});

			if (!this._bQuaggaEventHandlersAttached) {
				// Attach event handlers...

				Quagga.onProcessed(function (result) {
					var drawingCtx = Quagga.canvas.ctx.overlay,
						drawingCanvas = Quagga.canvas.dom.overlay;

					if (result) {
						// The following will attempt to draw boxes around detected barcodes
						if (result.boxes) {
							drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
							result.boxes.filter(function (box) {
								return box !== result.box;
							}).forEach(function (box) {
								Quagga.ImageDebug.drawPath(box, {
									x: 0,
									y: 1
								}, drawingCtx, {
									color: "green",
									lineWidth: 2
								});
							});
						}

						if (result.box) {
							Quagga.ImageDebug.drawPath(result.box, {
								x: 0,
								y: 1
							}, drawingCtx, {
								color: "#00F",
								lineWidth: 2
							});
						}

						if (result.codeResult && result.codeResult.code) {
							Quagga.ImageDebug.drawPath(result.line, {
								x: 'x',
								y: 'y'
							}, drawingCtx, {
								color: 'red',
								lineWidth: 3
							});
						}
					}
				}.bind(this));

				Quagga.onDetected(function (result) {
					// Barcode has been detected, value will be in result.codeResult.code. If requierd, validations can be done 
					// on result.codeResult.code to ensure the correct format/type of barcode value has been picked up

					// Set barcode value in input field
					this.getView().byId("productInput").setValue(result.codeResult.code);

					//	this.submit();
					// Close dialog
					this._oScanDialog.close();
				}.bind(this));

				// Set flag so that event handlers are only attached once...
				this._bQuaggaEventHandlersAttached = true;
			}

			return oDeferred.promise();
		},
		okmap: function () {
			maps.close();

		},

		location: function () {

			/*var cc = sap.ui.core.Fragment.byId("techfragment", "technical1").getValue();

			this.getView().byId("productInput").setValue(cc);*/
			tech.close();

		},
		equip: function () {
			var cc11 = sap.ui.core.Fragment.byId("techfragment", "equip").getValue();

			this.getView().byId("productInput").setValue(cc11);
			tech.close();
		},
		details: function (oEvent) {
			var sQuickviewName = "QuickView1";
			this.mQuickviews = this.mQuickviews || {};
			var oQuickview = this.mQuickviews[sQuickviewName];

			if (!oQuickview) {
				oQuickview = new QuickView1(this.getView());
				this.mQuickviews[sQuickviewName] = oQuickview;

				oQuickview.getControl().setPlacement("Right");

				// For navigation.
				oQuickview.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			var details = this.getView().byId("productInput").getValue();

			var SplitTotalFoot = details.split("/")
			var act_valu = SplitTotalFoot[0];
			console.log("act_valu :", act_valu)
				//var typ1e = this._oParentView.byId("prio").getValue();
				//	this.startbind();
			var sPath = "/FunctionalLocDetailsSet('" + act_valu + "')";
			console.log("PP", sPath);
			var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PM_APPS_IH_SRV/', true);
			var oController = this
			oModel.read(sPath, {
				success: function (oData, oResponse) {
					console.log("oData", oData);

					oController.byId("plant").setValue(oData.Planplant);
					oController.byId("descri").setValue(oData.Descript);
					oController.byId("plantgrp").setValue(oData.Plangroup);
					oController.byId("sales").setValue(oData.SalesOrg);
					oController.byId("dischanel").setValue(oData.Division);

					var oModel = oController.getView().getModel();
					oModel.setProperty(sPath, oData);

				},
			});

			oQuickview.open(oSource);

		},
		onInit: function () {

			maps = sap.ui.xmlfragment("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.fragments.map", this);
			this.getView().addDependent(maps);
			tech = sap.ui.xmlfragment("techfragment", "com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.fragments.tech", this);
			this.getView().addDependent(tech);
			loca = sap.ui.xmlfragment("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.fragments.location", this);
			//	this.loca = sap.ui.xmlfragment("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.fragments.location", this);
			this.getView().addDependent(loca);
			equip = sap.ui.xmlfragment("com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.fragments.equipment", this);
			this.getView().addDependent(equip);
			table = sap.ui.xmlfragment("tablefragment", "com.sap.build.ba293bd41-us_1.mobileRequestMaintenanceV5B.fragments.table", this);
			this.getView().addDependent(table);

			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);