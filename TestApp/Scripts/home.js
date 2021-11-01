$(document).ready(() => {

    insertDataIntoTable();
});


function insertDataIntoTable() {
    var jobs = new DevExpress.data.DataSource({
        key: 'Id',
        load: function () {
            var d = new $.Deferred();

            $.ajax({
                type: "GET",
                url: "/Home/GetJobs",
                contentType: "application/json; charset=utf-8",
                data: "{}",
                dataType: "json",
                success: (data) => {
                    d.resolve(data)
                },
                error: (data) => {
                    d.reject(data);
                }
            });
            return d.promise();
        },
        insert: function (values) {
            console.log(values);
            $.ajax({
                url: "/Home/AddJob",
                type: "POST",
                data: JSON.stringify({ jobData: values }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        update: function (key, values) {
            let jobArray = jobs.items();
            let editedJob = jobArray.find(item => item.Id === key)
            editedJob = {
                ...editedDock,
                LoadNo: values.LoadNo ? values.LoadNo : editedJob.LoadNo,
                TransportStatusId: values.TransportStatusId ? values.TransportStatusId : editedJob.TransportStatusId,
                CustomerId: values.CustomerId ? values.CustomerId : editedJob.CustomerId,
                DockId: values.DockId ? values.DockId : editedJob.DockId,
                NoOfPallets: values.NoOfPallets ? values.NoOfPallets : editedJob.NoOfPallets,
                LoadType: values.LoadType ? values.LoadType : editedJob.LoadType,
                ArrivalTime: values.ArrivalTime ? values.ArrivalTime : editedJob.ArrivalTime,
                DockOn: values.DockOn ? values.DockOn : editedJob.DockOn,
                DockOff: values.DockOff ? values.DockOff : editedJob.DockOff,
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

    function statusDropData() {
        let d = new $.Deferred();
        const lookupStatusSource = {
            store: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: function () {
                    return $.ajax({
                        url: "/Status/StatusDropdown",
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
        return lookupStatusSource;
    };

    $("#scheduler").dxScheduler({
        timeZone: "Europe/Belgrade",
        dataSource: jobs,
        views: [
            {
                type: "day",
                maxAppointmentsPerCell: 1,
            },
            {
                type: "timelineDay",
            },
        ],
        currentView: "day",
        currentDate: new Date(),
        startDayHour: 8,
        endDayHour: 19,
        showAllDayPanel: false,
        height: 600,
        groups: ["Id"],
        editing: {
            allowAdding: true,
            allowDeleting: true,
            allowUpdating: true,
            allowResizing: true,
            allowDragging: true,
        },
        resources: [
            {
                dataSource: jobs,
                fieldExpr: "CustomerId",
                label: "Customer"
            },
        ],

        onAppointmentFormOpening: function (jobs) {
            console.log(jobs);
            var form = jobs.form,
                jobInfo = getJobById(jobs.appointmentData.CustomerId) || {},
                startDate = jobs.appointmentData.startDate;

            form.option("items", [{
                label: {
                    text: "Movie"
                },
                editorType: "dxSelectBox",
                dataField: "CustomerId",
                editorOptions: {
                    items: jobs,
                    displayExpr: "text",
                    valueExpr: "Id",
                    onValueChanged: function (args) {
                        jobInfo = getJobById(args.value);

                        form.updateData("customer", jobInfo.customerDropData);
                        form.updateData("endDate", new Date(startDate.getTime() + 60 * 1000 * jobInfo.duration));
                    }
                },
            }, {
                label: {
                    text: "Customer"
                },
                name: "CustomerId",
                editorType: "dxTextBox",
                editorOptions: {
                    value: jobInfo.customerDropData,
                    readOnly: true
                }
            }, {
                dataField: "startDate",
                editorType: "dxDateBox",
                editorOptions: {
                    width: "100%",
                    type: "datetime",
                    onValueChanged: function (args) {
                        startDate = args.value;

                        form.updateData("endDate", new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
                    }
                }
            }, {
                name: "endDate",
                dataField: "endDate",
                editorType: "dxDateBox",
                editorOptions: {
                    width: "100%",
                    type: "datetime",
                    readOnly: true
                }
            },
            ]);
        }




        //onAppointmentAdded: function (e) {
        //    showToast("Added", e.appointmentData.text, "success");
        //},
        //onAppointmentUpdated: function (e) {
        //    showToast("Updated", e.appointmentData.text, "info");
        //},
        //onAppointmentDeleted: function (e) {
        //    showToast("Deleted", e.appointmentData.text, "warning");
        //},
    }).dxScheduler("instance");


}