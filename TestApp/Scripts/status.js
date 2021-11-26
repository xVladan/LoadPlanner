$(document).ready(() => {

    insertDataIntoTable();
});


function insertDataIntoTable() {
    var status = new DevExpress.data.DataSource({
        key: 'Id',
        load: function () {
            var d = new $.Deferred();

            $.ajax({
                type: "GET",
                url: "/Status/GetStatus",
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
                url: "/Status/AddStatus",
                type: "POST",
                data: JSON.stringify({ statusData: values }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        update: function (key, values) {
            let statusArray = status.items();
            let editedStatus = statusArray.find(item => item.Id === key)
            editedStatus = {
                ...editedStatus,
                Status: values.Status ? values.Status : editedStatus.Status,
                Description: values.Description ? values.Description : editedStatus.Description,
                Color: values.Color ? values.Color : editedStatus.Color
            }
            $.ajax({
                url: "/Status/EditStatus",
                type: "POST",
                data: JSON.stringify(editedStatus),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        remove: function (key) {
            $.ajax({
                url: "/Status/DeleteStatus",
                type: "POST",
                data: JSON.stringify({ Id: key }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        }
    });

    $("#dataGrid").dxDataGrid({
        dataSource: status,
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
                title: "Status Info",
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
                                dataField: "Status",
                                colSpan: 2,
                            },
                            {
                                dataField: "Color",
                                colSpan: 2,
                            },
                            {
                                dataField: "Description",
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
                dataField: "Status",
                width: "25%",
                dataType: "text",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Status must be minimum length 2 and maximum length 15 characters.',
                    min: 2,
                    max: 15,
                }]
            },
            {
                dataField: "Color",
                width: "25%",
                dataType: "text",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Color must be minimum length 4 and maximum length 15 characters.',
                    min: 4,
                    max: 15,
                }]
            },
            {
                dataField: "Description",
                width: "20%",
                dataType: "text",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Description must be less than 30 characters.',
                    min: 0,
                    max: 30,
                }]
            }
        ],

    });


}