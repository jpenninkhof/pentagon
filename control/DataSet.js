sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
	"use strict";

	var DataSet = Element.extend("com.penninkhof.pentagon.control.DataSet", { metadata : {
		properties: {
            "fillColor": { type: "string", defaultValue: "rgba(102,45,145,.1)" },
            "strokeColor": { type: "string", defaultValue: "rgba(102,45,145,1)" },
            "pointColor": { type: "string", defaultValue: "rgba(220,220,220,1)" },
            "pointStrokeColor": { type: "string", defaultValue: "#fff" },
		},
		defaultAggregation : "data",
		aggregations: {
            "data": { type: "com.penninkhof.pentagon.control.Value", multiple: true, bindable: "bindable" }
		}
	}});

	return DataSet;

});