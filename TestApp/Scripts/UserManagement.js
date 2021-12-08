$(document).ready(() => {
    getAllUsers();
});

function getAllUsers() {
    let usersDataSource = new DevExpress.data.DataSource({
        key: "Id",
        load: function () {
            var d = new $.Deferred();

            $.ajax({
                type: "GET",
                url: "/UserManagement/GetUsers",
                contentType: "application/json",
                data: "{}",
                success: (data) => {
                    d.resolve(data);
                },
                error: (data) => {
                    d.reject(data);
                }
            });
            return d.promise();
        },
        insert: function (values) {
            let testActive = values.isActive;

            let arrToSend = {
                ...values,
                isActive: testActive == undefined ? true : values.isActive
            }
            $.ajax({
                async: false,
                url: "/Account/SaveUser",
                type: "POST",
                data: JSON.stringify({ model: arrToSend }),
                contentType: 'application/json; charset=utf-8',
            });
        },
        update: function (key, values) {
            const users = usersDataSource.items();
            let editedUser = users.find(user => user.Id === key);
            editedUser = {
               ...editedUser,
                Id: key,
                FirstName: values.FirstName ? values.FirstName : editedUser.FirstName,
                LastName: values.LastName ? values.LastName : editedUser.LastName,
                City: values.City ? values.City : editedUser.City,
                Country: values.Country ? values.Country : editedUser.Country,
                Address: values.Address ? values.Address : editedUser.Address,
                Email: values.Email ? values.Email : editedUser.Email,
                Password: values.Password ? values.Password : editedUser.Password,
                Phone: values.Phone ? values.Phone : editedUser.Phone,
                Role: values.RoleId ? values.RoleId : editedUser.RoleId,
                RoleId: values.RoleId ? values.RoleId : editedUser.RoleId,
                isActive: values.isActive ? values.isActive : editedUser.isActive
            }
            $.ajax({
                async: false,
                url: "/UserManagement/EditUser",
                type: "POST",
                data: JSON.stringify(editedUser),
                contentType: 'application/json; charset=utf-8',
                processData: false,
            });
            return false;

        },
        remove: function (key) {
            $.ajax({
                async: false,
                url: "/UserManagement/DeleteUser",
                type: "POST",
                data: JSON.stringify({ Id: key }),
                contentType: 'application/json; charset=utf-8',
                processData: false,
            });
            return false;
        }
    });
    function rolesDropdownData() {
        let d = new $.Deferred();
        const lookupRolesSource = {
            store: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: function () {
                    return $.ajax({
                        url: "/UserManagement/RoleDropdown",
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
        return lookupRolesSource;
    }

    $("#usersGrid").dxDataGrid({
        dataSource: usersDataSource,
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
        columnAutoWidth: true,
        editing: {
            refreshMode: "full",
            mode: "popup",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            popup: {
                title: "User",
                showTitle: true,
                width: 500,
            },
            form: {
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
                        dataField: "Password",
                        colSpan: 2,
                    },
                    {
                        dataField: "Address",
                        colSpan: 2,
                    },
                    {
                        dataField: "Country",
                        colSpan: 2,
                    },
                    {
                        dataField: "City",
                        colSpan: 2
                    },
                    {
                        dataField: "Email",
                        colSpan: 2,
                    },
                    {
                        dataField: "Phone",
                        colSpan: 2,
                    },
                    {
                        dataField: "Role",
                        colSpan: 2,
                    },
                    {
                        dataField: "isActive",
                        colSpan: 2
                    }
                ]
            },
        },
        onEditorPreparing: function (e) {
            if (e.dataField === "Password" && e.parentType === "dataRow") {
                e.editorOptions.mode = 'password';
            }
        },
        columns: [
            {
                dataField: "FirstName",
                caption: "First Name",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field First Name must be minimum length 2 and maximum length 25 characters.',
                    min: 2,
                    max: 25,
                }]
            },
            {
                dataField: "LastName",
                caption: "Last Name",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Last Name must be minimum length 2 and maximum length 25 characters.',
                    min: 2,
                    max: 25,
                }]
            },
            {
                dataField: "Address",
                caption: "Address",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Address must be minimum length 2 and maximum length 25 characters.',
                    min: 2,
                    max: 25,
                }]
            },
            {
                dataField: "Country",
                caption: "Country",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Country must be minimum length 2 and maximum length 25 characters.',
                    min: 2,
                    max: 25,
                }]
            },
            {
                dataField: "City",
                caption: "City",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field City must be minimum length 2 and maximum length 25 characters.',
                    min: 2,
                    max: 25,
                }]
            },
            {
                dataField: "Email",
                caption: "Email",
                validationRules: [{
                    type: 'email',
                    message: 'The field Email must be minimum length 4 and maximum length 25 characters.',
                    min: 4,
                    max: 25,
                }]
            },
            {
                dataField: "Password",
                caption: "Password",
                visible: false,
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Password must include upprecases, numbers and special characters. Length must be minimum 6 and maximum 33 characters.',
                    min: 6,
                    max: 33,
                }],
                allowEditing: {
                    formItem: {
                        visible: true
                    }
                },
            },
            {
                dataField: "Phone",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Phone must be minimum length 4 and maximum length 22 characters.',
                    min: 4,
                    max: 22,
                }]
            },
            {
                dataField: "RoleId",
                dataType: "string",
                caption: "Role",
                allowEditing: {
                   formItem: {
                        visible: true
                    }
                },
                validationRules: [{
                    type: 'required',
                }],
                lookup: {
                    dataSource: rolesDropdownData(),
                    valueExpr:"Id",
                    displayExpr: "Name"
                        }
            },
             
            {
                dataField: "isActive",
                caption: "Is Active",
                value: true
            },
        ],
    }).dxDataGrid("instance");
}