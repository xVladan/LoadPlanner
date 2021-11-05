$(document).ready(() => {
    var allJobs = [];
    var customers = [];
    var docks = [];
    var statuses = [];

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
                        //    console.log("succ")
                         //   $(data).each(function (el, item) {
                         //       console.log(item);
                               /* docks.push(item);*/
                        //    })
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
       // console.log(docks)
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
                            console.log("succ");
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
        // console.log(docks)
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
                         //   console.log(data)
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
                    console.log(data)
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

            let arrtosend = {
                LoadNo: Math.ceil(Math.random() * 100) + 1,
                TransportStatusId: values.TransportStatusId,
                CustomerId: values.CustomerId,
                DockId: values.DockId,
                NoOfPallets: Math.ceil(Math.random() * 100) + 1,
                LoadType: values.text ? values.text :"load typle",
                ArrivalTime: values.startDate,
                startDate: values.startDate,
                endDate: values.endDate
            }
            console.log(arrtosend);
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
           // allowMultiple:true,
            currentDate: new Date(),
            height: 750,
            //adaptivityEnabled: true,
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
                    useColorAsDefault: true
                }
                
            ]
        }).dxScheduler('instance');
    });
});
