$(document).ready(() => {

    insertDataIntoTable();
});


function insertDataIntoTable() {
    var dock = new DevExpress.data.DataSource({
        key: 'Id',
        load: function () {
            var d = new $.Deferred();

            $.ajax({
                type: "GET",
                url: "/Dock/GetDocks",
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
                url: "/Dock/AddDock",
                type: "POST",
                data: JSON.stringify({ dockData: values }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        update: function (key, values) {
            let dockArray = dock.items();
            let editedDock = dockArray.find(item => item.Id === key)
            editedDock = {
                ...editedDock,
                DockName: values.DockName ? values.DockName : editedDock.DockName,
            }
            $.ajax({
                url: "/Dock/EditDock",
                type: "POST",
                data: JSON.stringify(editedDock),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        remove: function (key) {
            $.ajax({
                url: "/Dock/DeleteDock",
                type: "POST",
                data: JSON.stringify({ Id: key }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        }
    });

    $("#dataGrid").dxDataGrid({
        dataSource: dock,
        showBorders: true,
        paging: {
            pageSize: 10
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 50, 100],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true
        },
        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            popup: {
                title: "Dock Info",
                showTitle: true,
                width: 700,
                height: 525,
            },
            form: {
                items: [
                    {
                        itemType: "group",
                        colCount: 2,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DockName",
                                colSpan: 2,
                            },
                        ]
                    },
                ]
            },
        },
        columns: [
            {
                dataField: "Id",
                caption: "Number",
                width: "6%",
                dataType: "text",
                visible: false,
                allowEditing: false,
                formItem: {
                    visible: false
                }
            },
            {
                dataField: "DockName",
                width: "15%",
                dataType: "text",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Dock Name must be a string with minimum length 2 a maximum length of 10.',
                    min: 2,
                    max: 10,
                }]
            },
        ],
    });

}