$(document).ready(() => {

    insertDataIntoTable();

});

var onprepind = 0;
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
            return false;
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
            return false;
        },
        remove: function (key) {
            $.ajax({
                url: "/Status/DeleteStatus",
                type: "POST",
                data: JSON.stringify({ Id: key }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
            });
            return false;
        }
    });


    $("#dataGrid").dxDataGrid({
        dataSource: status,
        keyExpr: 'id',
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
            form:{
               
                items:[
                    {
                        itemType: "group",
                        colCount: 2,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "Status",
                                colSpan: 2,
                            },
                            //{
                            //    dataField: "Color",
                            //  //  editorType: "dxColorBox",
                            //    editorType: {
                            //        type: "dxColorBox",
                            //        value:"#f05b41",
                            //    },
                               
                            //},
                            {
                                dataField: "Color",
                                editorType: "dxColorBox",
                                editorName: "dxColorBox",
                                colSpan: 2,
                                //formItem: {
                                //    colSpan: 2,
                                //    editorType: 'ColorBox',
                                //    editorOptions: {
                                //        height: 100,
                                //        value:'#f0acdd'
                                //    }
                                //},
                            }
                            ,
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
                      //formItem: {
                      //    colSpan: 2,
                      //    editorType: 'ColorBox',
                      //    editorOptions: {
                      //        height: 100,
                      //        value: '#f0acdd'
                      //    }
                      //},

                editorType: "dxColorBox",
                editorName: "dxColorBox",
                validationRules: [{
                    type: 'stringLength',
                    message: 'The field Color must be minimum length 2 and maximum length 15 characters.',
                    min: 2,
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
       
        onEditorPreparing(e) {
            onprepind = 0;
            if (onprepind < 1) {
                let a = document.querySelectorAll('.dx-texteditor-input');//dx-datagrid-edit-form-item ''' dx-texteditor-container

                $(a).each(function (el, it) {
                    let tmp = it.id;
                    if (tmp.includes('Color')) {
                        //change type to color box
                        it.type = 'color';
                        //it.value = '#000000';
                        it.style.width = '150px';
                        it.style.height = '35px';
                        it.style.marginLeft = '400px';
                        it.innerText = it.value;

                        it.addEventListener('change', function () {
                            colorInpWrapp.innerText = it.value;
                         //   this.value = colorInpWrapp.innerText;
                        });


                        //////creating inp;
                        let parentColorInpWrapp = $(it).parent();

                        let colorInpWrapp = document.createElement('div');
                        colorInpWrapp.style.width = '200px';
                        colorInpWrapp.style.height = '34px';
                        colorInpWrapp.style.position = 'absolute';
                        colorInpWrapp.style.top = '7px';
                        colorInpWrapp.style.left = '10px';

                    //    colorInpWrapp.innerText = it.value;


                        //appending to the parent
                        parentColorInpWrapp.append(colorInpWrapp);

                        ////change type to color box
                        //it.type = 'color';
                        //it.addEventListener('change', function () {
                        //    colorInpWrapp.innerHTML = it.value;
                        //});
                        //it.style.width = '150px';
                        //it.style.height = '35px';
                        //it.style.marginLeft = '412px';

                    }
                })
                onprepind++;

            }          
        },

    });
 }