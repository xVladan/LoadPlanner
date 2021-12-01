$(document).ready(() => {
    var allJobs = [];
    var customers = [];
    var docks = [];
    var statuses = [];
    const URL = 'https:////localhost:44324';

    //input Cubic disabled popup
    var result = 0;

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
                },
                error: (data) => {
                    d.reject(data);
                }
            });
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
                endDate: values.endDate,
                Height: values.Height,
                Width: values.Width,
                Depth: values.Depth,
                Notes: values.Notes == null ? "" : values.Notes

            };
            $.ajax({
                url: "/Home/AddJob",
                type: "POST",
                data: JSON.stringify({ jobData: arrtosend }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: (data) => {
                    console.log(data);
                }
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
                Height: values.Height ? values.Height : editedJob.Height,
                Width: values.Width ? values.Width : editedJob.Width,
                Depth: values.Depth ? values.Depth : editedJob.Depth,
                Notes: values.Notes == null ? "" : values.Notes
            }
            $.ajax({
                url: "/Home/EditJob",
                type: "POST",
                data: JSON.stringify(editedJob),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: (data) => {
                    console.log(data);
                }
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
            showAllDayPanel: false,
            currentDate: new Date(),
            width: 1250,
            height: 770,
            stateStoring: {
                enabled: true,
                type: 'localStorage',
                storageKey: 'storage',
            },
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
                    displayExpr: "Status",
                    colorExpr: "Color",
                    valueExpr: "Id",
                    label: "Status",
                    useColorAsDefault: true,
                },

            ],
            editing: {
                refreshMode: 'full',
                mode: 'cell',
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                allowDragging: true
            },
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
                    if (c.label.text == "Subject" || c.label.text == "Description" || c.label.text == "Repeat" || c.label.text == "All day") {

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
                        {
                            label: {
                                text: 'Height',
                            },
                            cssClass: "height-item",
                            name: 'Height',
                            editorType: 'dxNumberBox',
                            validationRules: [{
                                type: 'required',
                                message: 'Height is required',
                            }],
                            editorOptions: {
                                
                                onValueChanged: function (e) {
                                    let value = e.value;                            

                                    //width inp digg
                                    let width = $('.width-item').children()[1]
                                    let widthInner1 = $(width).children()[0];
                                    let widthInner2 = $(widthInner1).children()[1];
                                    let widthInner3 = $(widthInner2).children()[0];

                                    //width-inp
                                    let widthInp = $(widthInner3).val();
                 
                                    //depth inp digg
                                    let depth = $('.depth-item').children()[1]
                                    let depthInner1 = $(depth).children()[0];
                                    let depthInner2 = $(depthInner1).children()[1];
                                    let depthInner3 = $(depthInner2).children()[0];

                                    //depth-inp
                                    let depthInp = $(depthInner3).val();
                              

                                    //cubic inp dig
                                    let cubRes = $('.cubic-item').children()[1]
                                    let cubResInner1 = $(cubRes).children()[0];
                                    let cubResInner2 = $(cubResInner1).children()[1];
                                    let cubResInner3 = $(cubResInner2).children()[0];

                                    //depth-inp
                                    let cubResInp = cubResInner3;


                                   result = value * widthInp * depthInp;
                                    cubResInp.placeholder = result;
                       
                                }
                            },
                        },
                        {
                            label: {
                                text: 'Width',
                            },
                            cssClass: "width-item",
                            name: 'Width',
                            editorType: 'dxNumberBox',
                            validationRules: [{
                                type: 'required',
                                message: 'Width is required',
                            }],
                            editorOptions: {
                                onValueChanged: function (e) {
                                    let value = e.value;

                                    //height inp digg
                                    let height = $('.height-item').children()[1]
                                    let heightInner1 = $(height).children()[0];
                                    let heightInner2 = $(heightInner1).children()[1];
                                    let heightInner3 = $(heightInner2).children()[0];

                                    //height-inp
                                    let heightInp = $(heightInner3).val();

                                    //depth inp digg
                                    let depth = $('.depth-item').children()[1]
                                    let depthInner1 = $(depth).children()[0];
                                    let depthInner2 = $(depthInner1).children()[1];
                                    let depthInner3 = $(depthInner2).children()[0];

                                    //depth-inp
                                    let depthInp = $(depthInner3).val();


                                    //cubic inp dig
                                    let cubRes = $('.cubic-item').children()[1]
                                    let cubResInner1 = $(cubRes).children()[0];
                                    let cubResInner2 = $(cubResInner1).children()[1];
                                    let cubResInner3 = $(cubResInner2).children()[0];

                                    //depth-inp
                                    let cubResInp = cubResInner3;


                                    result = value * heightInp * depthInp;
                                    cubResInp.placeholder = result;

                                }
                            },
                        },
                        {
                            label: {
                                text: 'Depth',
                            },
                            cssClass: "depth-item",
                            name: 'Depth',
                            editorType: 'dxNumberBox',
                            validationRules: [{
                                type: 'required',
                                message: 'Depth is required',
                            }],
                            editorOptions: {
                                onValueChanged: function (e) {
                                    let value = e.value;

                                    //width inp digg
                                    let width = $('.width-item').children()[1]
                                    let widthInner1 = $(width).children()[0];
                                    let widthInner2 = $(widthInner1).children()[1];
                                    let widthInner3 = $(widthInner2).children()[0];

                                    //width-inp
                                    let widthInp = $(widthInner3).val();

                                    //height inp digg
                                    let height = $('.height-item').children()[1]
                                    let heightInner1 = $(height).children()[0];
                                    let heightInner2 = $(heightInner1).children()[1];
                                    let heightInner3 = $(heightInner2).children()[0];

                                    //height-inp
                                    let heightInp = $(heightInner3).val();

                                    //cubic inp dig
                                    let cubRes = $('.cubic-item').children()[1]
                                    let cubResInner1 = $(cubRes).children()[0];
                                    let cubResInner2 = $(cubResInner1).children()[1];
                                    let cubResInner3 = $(cubResInner2).children()[0];

                                    //depth-inp
                                    let cubResInp = cubResInner3;

                                    result = value * heightInp * widthInp;
                                    cubResInp.placeholder = result;


                                }
                            },
                        },
                        {
                            label: {
                                text: 'Cubic',
                            },
                            cssClass: "cubic-item",
                            name: 'Cubic',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                readOnly: true
                               
                            },

                        },
                        {
                            label: {
                                text: 'Notes',
                            },
                            name: 'Notes',
                            editorType: 'dxTextArea',
                        },

                    );
                }

                form.option({
                    items: filteredArr,
                });



              
                onFormOpening = onFormOpening + 1;

            },
            appointmentTemplate(model) {
                return $(`${"<div class='showtime-preview'>"
                    + '<div>'}</div>`
                    + `<div>Status: <br/><strong>${model.statusName}</strong>` + '<br/>'
                    + `<div>Load No: <br/><strong>${model.LoadNo}</strong><br/>`
                    + `<div>Customer: <br/><strong>${model.CustomerName}</strong><br/>`
                    + `<div>Notes: <br/><strong>${model.Notes}</strong><br/>`
                    + '</div>');
            },
            appointmentTooltipTemplate(model) {
                var dock = model.DockNum;
                var derivedDockNo = dock.substr(dock.length - 1);//grabbing number from dockname

                return "<div class=\'movie-tooltip\'><div class=\'movie-info\'>" +
                    "<div class=\'movie-title\'>Load No: " + model.LoadNo + "</div>" +
                    "<div class=\'movie-title\'>Status: " + model.statusName + "</div>" +
                    "<div class=\'movie-title\'>Customer: " + model.CustomerName + "</div>" +
                    "<div class=\'movie-title\'>Dock: " + derivedDockNo + "</div>" +
                    "<div class=\'movie-title\'>No Pallets: " + model.NoOfPallets + "</div>" +
                    "<div class=\'movie-title\'>Load Type: " + model.LoadType + "</div>" +
                    "<div class=\'movie-title\'>Arrival Time: " + model.startDate + "</div>" +
                    "<div class=\'movie-title\'>Dock On: " + model.startDate + "</div>" +
                    "<div class=\'movie-title\'>Dock Off: " + model.endDate + "</div>" +
                    "<div class=\'movie-title\'>Notes: " + model.Notes + "</div>" +
                    "<button onclick='deleteFunc(" + model.Id + ");' class='movie-title btn btn-danger d-flex align-items-center'> <i class='bi bi-trash-fill mb-1' ></i>  <span class='ml-1'>Delete</span></buttton>" +//<i class="bi bi-trash-fill"></i>
                    "</div></div>";
            },        
        }).dxScheduler('instance');
    });
});

function deleteFunc(id) {
    //$.ajax({
    //    url: "/Home/DeleteJob",
    //    type: "POST",
    //    data: JSON.stringify({ Id: id }),
    //    dataType: 'json',
    //    contentType: 'application/json; charset=utf-8',
    //});
    //window.location.reload();
    return sendRequest(`${URL}/Home//DeleteJob`, 'DELETE', {
        id,
    });
}


///////////////////////////////////////////////////

//remove(key) {
//    return sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
//        key,
//    });
//},
/*const URL = 'https:////localhost:44324';*/


function sendRequest(url, method = 'POST', data) {
    const d = $.Deferred();

  //  logRequest(method, url, data);

    $.ajax(url, {
        method,
        data,
        cache: false,
        xhrFields: { withCredentials: true },
    }).done((result) => {
        d.resolve(method === 'GET' ? result.data : result);
    }).fail((xhr) => {
        d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
    });

    return d.promise();
}

function logRequest(method, url, data) {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const logList = $('#requests ul');
    const time = DevExpress.localization.formatDate(new Date(), 'HH:mm:ss');
    const newItem = $('<li>').text([time, method, url.slice(URL.length), args].join(' '));

    logList.prepend(newItem);
}