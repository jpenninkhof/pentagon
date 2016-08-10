sap.ui.define([
	"sap/ui/core/Control",
	"com/penninkhof/pentagon/control/DataSet",
	"com/penninkhof/pentagon/control/Chart"
], function (Control, DataSet, ChartJS) {
	"use strict";

	var Pentagon = Control.extend("com.penninkhof.pentagon.control.Pentagon", {

		metadata : {

			properties : {
                "width": {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "auto"
                },
                "height": {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "20em"
                },
				"scaleOverride": {
					type: "boolean",
					defaultValue: false
				},
				"scaleStartValue": {
					type: "int",
					defaultValue: 0
				},
				"scaleSteps": {
					type: "int",
					defaultValue: 1
				},
				"scaleStepWidth": {
					type: "int",
					defaultValue: 1
				},
			},

			aggregations : {
                "axes": { type: "sap.ui.core.Item", multiple: true, bindable: "bindable" },
                "dataSets": { type: "com.penninkhof.pentagon.control.DataSet", multiple: true, bindable: "bindable" }
			},

			events : {
			}

		},

		init: function () {
		},

		onAfterRendering: function() {
			var radarData = {
                labels : [ ],
                datasets : [ ]
            };
            jQuery.each(this.getAggregation("axes"), function(itmidx, item) {
            	radarData.labels.push(item.getText());
            });

            jQuery.each(this.getAggregation("dataSets"), function(dsidx, dataSet) {
            	var data = [];
            	jQuery.each(dataSet.getAggregation("data"), function(validx, value) {
            		data.push(value.getValue());
            	});
            	radarData.datasets.push({
            		fillColor: dataSet.getProperty("fillColor"),
            		strokeColor: dataSet.getProperty("strokeColor"),
            		pointColor: dataSet.getProperty("pointColor"),
            		pointStrokeColor: dataSet.getProperty("pointStrokeColor"),
                    data: data
            	});
            });
			var context = this.getDomRef().childNodes[0].getContext("2d");
            this.chart = new Chart(context).Radar(radarData, this._getRadarOptions());
		},

		renderer: function (rm, control) {
			rm.write("<div");
			rm.writeControlData(control);
			rm.writeClasses();
			rm.write(">");
			rm.write("<canvas");
			rm.writeAttribute("id", control.getId() + "--canvas");
			rm.writeAttribute("width", control.getWidth());
			rm.writeAttribute("height", control.getHeight());
			rm.write("/>");
			rm.write("</div>");
		}

	});

	Pentagon.prototype.update = function() {
		var that = this;
		if (this.chart) {
			jQuery.extend(this.chart.options, this._getRadarOptions());
            jQuery.each(this.getAggregation("dataSets"), function(dsidx, dataSet) {
            	jQuery.each(dataSet.getAggregation("data"), function(validx, value) {
            		that.chart.datasets[dsidx].points[validx].value = value.getValue();
            	});
            });
			this.chart.update();
		}
	};

	Pentagon.prototype._getRadarOptions = function() {
		return {
			scaleOverride : this.getProperty("scaleOverride"),
			scaleSteps : this.getProperty("scaleSteps"),
			scaleStepWidth : this.getProperty("scaleStepWidth"),
			scaleStartValue : this.getProperty("scaleStartValue"),
		}
	};

	Pentagon.prototype.setScaleOverride = function(value) {
		this.setProperty("scaleOverride", value, true);
		this.update();
	};

	Pentagon.prototype.setScaleStartValue = function(value) {
		this.setProperty("scaleStartValue", Number(value), true);
		this.update();
	};

	Pentagon.prototype.setSccaleSteps = function(value) {
		this.setProperty("scaleSteps", Number(value), true);
		this.update();
	};

	Pentagon.prototype.setScaleStepWidth = function(value) {
		this.setProperty("scaleStepWidth", Number(value), true);
		this.update();
	};

	return Pentagon;


}, /* bExport= */ true);
