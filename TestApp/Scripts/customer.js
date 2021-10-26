$(document).ready(() => {

    insertDataIntoTable();
});


function insertDataIntoTable() {
    var customer = new DevExpress.data.DataSource({
        key: 'Id',
        load: function () {
            var d = new $.Deferred();

            $.ajax({
                type: "GET",
                url: "/Customer/GetCustomers",
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
            $.ajax({
                url: "/Customer/AddCustomer",
                type: "POST",
                data: JSON.stringify({ customerData: values }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        update: function (key, values) {
            let customerArray = customer.items();
            let editedCustomer = customerArray.find(item => item.Id === key)
            editedCustomer = {
                ...editedCustomer,
                FirstName: values.FirstName ? values.FirstName : editedCustomer.FirstName,
                LastName: values.LastName ? values.LastName : editedCustomer.LastName,
                Address: values.Address ? values.Address : editedCustomer.Address,
                City: values.City ? values.City : editedCustomer.City,
                Country: values.Country ? values.Country : editedCustomer.Country,
                Phone: values.Phone ? values.Phone : editedCustomer.Phone,
                isActive: values.isActive ? values.isActive : editedCustomer.isActive,
            }
            $.ajax({
                url: "/Customer/EditCustomer",
                type: "POST",
                data: JSON.stringify(editedCustomer),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        },
        remove: function (key) {
            $.ajax({
                url: "/Customer/DeleteCustomer",
                type: "POST",
                data: JSON.stringify({ Id: key }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
        }
    });

    $("#dataGrid").dxDataGrid({
        dataSource: customer,
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
                title: "Customer Info",
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
                                dataField: "FirstName",
                                colSpan: 2,
                            },
                            {
                                dataField: "LastName",
                                colSpan: 2,
                            },
                            {
                                dataField: "Address",
                                colSpan: 2,
                            },
                            {
                                dataField: "City",
                                colSpan: 2,
                            },
                            {
                                dataField: "Country",
                                colSpan: 2,
                            },
                            {
                                dataField: "Phone",
                                colSpan: 2,
                            },
                            {
                                dataField: "isActive",
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
                dataField: "FirstName",
                width: "15%",
                dataType: "text",
            },
            {
                dataField: "LastName",
                width: "15%",
                dataType: "text",
            },
            {
                dataField: "Address",
                width: "15%",
                dataType: "text",
            },
            {
                dataField: "City",
                width: "15%",
                dataType: "text",
            },
            {
                dataField: "Country",
                width: "15%",
                dataType: "text",
            },
            {
                dataField: "Phone",
                width: "15%",
                dataType: "text",
            },
            {
                dataField: "isActive",
                width: "8%",
                dataType: "boolean",
            },
        ],
    });

}