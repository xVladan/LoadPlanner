$(document).ready(() => {
    var allJobs = [];
    var customers = [];
    var docks = [];
    var statuses = [];

    //prevent pushing to array same data more than once
    var onFormOpening = 0;

    function dockDropData() {
        let d = new $.Deferred();
        const lookupDockSource = {
            store: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: function () {
                    return $.ajax({
                        url: "/Dock/DockDropdown",
                        type: "GET",
                        data: "{}",
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: (data) => {
                            d.resolve(data);
                        },
                        error: (data) => {
                            d.reject(data);
                        }
                    });
                }
            }),
            sort: "text"
        }
        return lookupDockSource;
    };

    function statusesData() {
        let d = new $.Deferred();
        const lookupDockSource = {
            store: new DevExpress.data.CustomStore({
                key: "Id",
                loadMode: "raw",
                load: function () {
                    return $.ajax({
                        url: "/Status/GetStatus",
                        type: "GET",
                        data: "{}",
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: (data) => {
                            $(data).each(function (el, item) {
                                statuses.push(item);
                            });
                            d.resolve(data);
                        },
                        error: (data) => {
                            d.reject(data);
                        }
                    });
                }
            }),
            sort: "text"
        }
        return lookupDockSource;
    };

    function customerDropData() {
        let d = new $.Deferred();
        const lookupCustomerSource = {
            store: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: function () {
                    return $.ajax({
                        url: "/Customer/CustomerDropdown",
                        type: "GET",
                        data: "{}",
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: (data) => {
                            console.log(data);
                            d.resolve(data);
                        },
                        error: (data) => {
                            d.reject(data);
                        }
                    });
                }
            }),
            sort: "text"
        }
        return lookupCustomerSource;
    };



    var jobs = new DevExpress.data.DataSource({
        key: 'Id',
        load: function () {
            var d = new $.Deferred();

            $.ajax({
                type: "GET",
                url: "/Home/GetJobs",
                contenttype: "application/json; charset=utf-8",
                data: "{}",
                datatype: "json",
                success: (data) => {
                    d.resolve(data)
                   // window.location.reload();
                },
                error: (data) => {
                    d.reject(data);
                }
            });
          //  window.location.reload();

            return d.promise();
        },
        insert: function (values) {
        
            let arrtosend = {
                LoadNo: values.LoadNo,
                TransportStatusId: values.TransportStatusId ? values.TransportStatusId : 1,
                CustomerId: values.CustomerId ? values.CustomerId : 1,
                DockId: values.DockId,
                NoOfPallets: values.NoOfPallets,
                LoadType: values.LoadType,
                ArrivalTime: values.startDate,
                startDate: values.startDate,
                endDate: values.endDate
            };

            $.ajax({
                url: "/Home/AddJob",
                type: "POST",
                data: JSON.stringify({ jobData: arrtosend }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
           
        },
        update: function (key, values) {
            let jobArray = jobs.items();
            let editedJob = jobArray.find(item => item.Id === key)
            editedJob = {
                ...editedJob,
                LoadNo: values.LoadNo ? values.LoadNo : editedJob.LoadNo,
                TransportStatusId: values.TransportStatusId ? values.TransportStatusId : editedJob.TransportStatusId,
                CustomerId: values.CustomerId ? values.CustomerId : editedJob.CustomerId,
                DockId: values.DockId ? values.DockId : editedJob.DockId,
                NoOfPallets: values.NoOfPallets ? values.NoOfPallets : editedJob.NoOfPallets,
                LoadType: values.LoadType ? values.LoadType : editedJob.LoadType,
                ArrivalTime: values.ArrivalTime ? values.ArrivalTime : editedJob.ArrivalTime,
                startDate: values.startDate ? values.startDate : editedJob.startDate,
                endDate: values.endDate ? values.endDate : editedJob.endDate,
            }
            $.ajax({
                url: "/Home/EditJob",
                type: "POST",
                data: JSON.stringify(editedJob),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        remove: function (key) {
            $.ajax({
                url: "/Home/DeleteJob",
                type: "POST",
                data: JSON.stringify({ Id: key }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        }
    });


    $(() => {
        $('#scheduler').dxScheduler({
            timeZone: 'Europe/Berlin',
            dataSource: jobs,
            views: [{
                type: "day",
                maxAppointmentPerCell: 1,
                startDayHour: 0,
                endDayHour: 24
            },
                "timelineDay"
            ],
            currentView: 'day',
            showAllDayPanel: false,
            groups: ['DockId'],
            showAllDayPanel: true,
            currentDate: new Date(),
            height: 800,
            resources: [
                {
                    dataSource: dockDropData(),
                    fieldExpr: "DockId",
                    label: "Dock"

                },
                {
                    dataSource: customerDropData(),
                    fieldExpr: "CustomerId",
                    label: "Customer"
                },
                {
                    dataSource: statusesData(),
                    fieldExpr: "TransportStatusId",
                    displayExpr:"Status",
                    colorExpr: "Color",
                    valueExpr: "Id",
                    label: "Status",
                    useColorAsDefault: true,
                },
                
            ],
            onAppointmentFormCreated(data) {
                const { form } = data;
                let formItems = form.option("items");

                //array without empty items
                let myArr = [];

                formItems.map(x => {
                    if (x.itemType == "empty") {

                    } else {
                          myArr.push(x);
                    }
                });

                //filtered myArr - without subject and description input
                let filteredArr = [];
                myArr.map(c => {
                    if (c.label.text == "Subject" || c.label.text == "Description" || c.label.text == "Repeat") {

                    } else {
                        filteredArr.push(c);
                    }
                });

                if (onFormOpening == 0) {
                    filteredArr.push(
                        {
                            label: {
                                text: 'Load Type',
                            },
                            name: 'LoadType',
                            editorType: 'dxTextBox',
                            type: 'required',
                            validationRules: [{
                                type: 'required',
                                message: 'Load Type is required',
                            }],
                        },
                        {
                            label: {
                                text: 'Load No',
                            },
                            name: 'LoadNo',
                            editorType: 'dxNumberBox',
                            validationRules: [{
                                type: 'required',
                                message: 'Load No is required',
                            }],
                        },
                        {
                            label: {
                                text: 'No Of Pallets',
                            },
                            name: 'NoOfPallets',
                            editorType: 'dxNumberBox',
                            validationRules: [{
                                type: 'required',
                                message: 'No Of Palletes is required',
                            }],
                        },
                       
                    );
                }

                form.option({
                    items: filteredArr
                });
                onFormOpening = onFormOpening + 1;
              
            },
            appointmentTemplate(model) {
                return $(`${"<div class='showtime-preview'>"
                    + '<div>'}</div>`
                    + `<div>Status: <br/><strong>${model.statusName}</strong>` + '<br/>'
                    + `<div>Load No: <br/><strong>${model.LoadNo}</strong><br/>`
                    + `<div>Customer: <br/><strong>${model.CustomerName}</strong><br/>`
                   + '</div>');
            },
            appointmentTooltipTemplate(model) {
                var dock = model.DockNum;
                var derivedDockNo = dock.substr(dock.length - 1);//grabbing number from dockname
              
                return "<div class=\'movie-tooltip\'><div class=\'movie-info\'>" +
                            "<div class=\'movie-title\'>Load No: " + model.LoadNo + "</div>" +
                            "<div class=\'movie-title\'>Status: " + model.statusName + "</div>"+
                            "<div class=\'movie-title\'>Customer: " + model.CustomerName + "</div>"+
                            "<div class=\'movie-title\'>Dock: " + derivedDockNo  + "</div>"+
                            "<div class=\'movie-title\'>No Pallets: " + model.NoOfPallets + "</div>" +
                            "<div class=\'movie-title\'>Load Type: " + model.LoadType + "</div>" +
                            "<div class=\'movie-title\'>Arrival Time: " + model.startDate + "</div>" +
                            "<div class=\'movie-title\'>Dock On: " + model.startDate + "</div>" +
                            "<div class=\'movie-title\'>Dock Off: " + model.endDate + "</div>" +
                    "</div></div>";
            },
   
        }).dxScheduler('instance');
    });
});
