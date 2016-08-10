sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("com.penninkhof.pentagon.controller.Main", {

		onInit: function() {
			this.getView().setModel(new JSONModel({
				dataset1: [
					{ value: 4 },
					{ value: 3 },
					{ value: 2 },
					{ value: 1.5 },
					{ value: 3 }
				],
				dataset2: [
					{ value: 3 },
					{ value: 3 },
					{ value: 3 },
					{ value: 3 },
					{ value: 3 }
				],
				options: {
					scaleOverride: false,
					scaleStartValue: 0,
					scaleSteps: 5,
					scaleStepWidth: 1
				}
			}));
		}

	});

});
