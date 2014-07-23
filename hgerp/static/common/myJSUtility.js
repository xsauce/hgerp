MyJSUtility = {};
//MyJSUtility.ClearInputFile = function (fileControl) {
//    fileControl.outerHTML = fileControl.outerHTML;
//}
MyJSUtility.JsonStrConvertDate = function(d) {
    var r = null;
    if (d != null) {
        if (d.indexOf("Date") != -1) {
            d = eval("new " + d.replace(/\//g, ""));
            r = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }
    }
    return r;
}
MyJSUtility.HtmlDecode = function(str) {
    var t = document.createElement("div");
    t.innerHTML = str;
    return t.innerText || t.textContent;
}
MyJSUtility.HtmlEncode = function(str) {
    var t = document.createElement("div");
    t.textContent ? t.textContent = str : t.innerText = str;
    return t.innerHTML;
}
MyJSUtility.SetPrintPage = function() {
    var HKEY_Root = "HKEY_CURRENT_USER";
    var HKEY_Path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
    var regWsh = null;
    try {
        regWsh = new ActiveXObject("WScript.Shell");
    } catch (e) {
        alert("不能获取Wscript.Shell对象");
    }
    this.PageMargin = function(top, right, bottom, left) {
        try {
            var HKEY_Key = "margin_top";
            regWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, top.toString());
            HKEY_Key = "margin_right";
            regWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, right.toString());
            HKEY_Key = "margin_bottom";
            regWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, bottom.toString());
            HKEY_Key = "margin_left";
            regWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, left.toString());
        } catch (e) {
            alert("不能设置页边距");
        }
    };
    this.PageHeaderTail = function(headerText, footerText) {
        try {
            var HKEY_Key = "header";
            regWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, headerText);
            HKEY_Key = "footer";
            regWsh.RegWrite(HKEY_Root + HKEY_Path + HKEY_Key, footerText);
        } catch (e) {
            alert("不能将设置页眉页脚设置为空");
        }
    };
};
MyJSUtility.LoadJS = function(jsUrl) {
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = jsUrl;
    oHead.appendChild(oScript);
};
MyJSUtility.FileOpening = function() {
    var _this = window;
    this.Do = function(fileId, filePath, openFileUrl) {
        var fileSort = filePath.substring(filePath.lastIndexOf('.') + 1);
        if (fileSort.toLowerCase() == "dwg") {
            if (typeof(_this.iframe) == "undefined") {
                var iframe = document.createElement("iframe");
                _this.iframe = iframe;
                document.body.appendChild(_this.iframe);
            }
            _this.iframe.src = filePath;
            _this.iframe.style.display = "none";
        } else {
            //pdf
            window.open(openFileUrl, fileId.toString() + "Open", "", false);
        }
    }
};

MyJSUtility.ClearInputFile = function(objFile) {
    objFile.outerHTML = objFile.outerHTML;
};
MyJSUtility.WebRoot = function() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
};
//适合yyyy-mm-dd hh:mm:ss
MyJSUtility.StrToDate = function(s, mode) {
    var date = null;
    var convertYYYYMMDDHHMMSS = function(str) {
        var date = null;
        if (str.indexOf(":") > 0) {
            var dt = s.split(" ");
            var d = dt[0].split("-");
            var t = dt[1].split(":");
            date = new Date(d[0], d[1], d[2], t[0], t[1], t[2]);
        }
        return date;
    };
    var convertYYYYMMDD = function(str) {
        var date = null;
        if (str.indexOf("-") > 0) {
            var d = str.split("-");
            date = new Date(d[0], d[1], d[2]);
        }
        return date;
    };
    switch (mode) {
        case "yyyy-mm-dd hh:mm:ss":
            date = convertYYYYMMDDHHMMSS(s);
            break;
        case "yyyy-mm-dd":
            date = convertYYYYMMDD(s);
            break;
        default:
            break;
    }
    return date;
};
MyJSUtility.Clone = function(obj) {
    var objClone;
    if (obj.constructor == Object) {
        objClone = new obj.constructor();
    } else {
        objClone = new obj.constructor(obj.valueOf());
    }
    for (var key in obj) {
        if (objClone[key] != obj[key]) {
            if (typeof(obj[key]) == "object") {
                objClone[key] = this.Clone(obj[key]);
            } else {
                objClone[key] = obj[key];
            }
        }
    }
    objClone.toString = obj.toString;
    objClone.valueOf = obj.valueOf;
    return objClone;
};
MyJSUtility.DelArray = function(array, n) {
    if (n < 0) {
        return array;
    } else {
        return array.slice(0, n).concat(array.slice(n + 1, array.length));
    }
};
MyJSUtility.UploadFileCheck = {
    CheckType: function(ftypes, fname) {
        var flag = false;
        var ft = fname.slice(fname.lastIndexOf(".") + 1);
        for (var i in ftypes) {
            if (ft == ftypes[i]) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    CheckFileSize: function(limitSize, f) {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        f = fso.GetFile(files);
        if (f.size > 1024 * 1024 * limitSize) {
            alert("文件大小不能超过" + limitSize + "M");
        }
    }
};
MyJSUtility.FormIsEdited = function(form) {
    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var type = element.type;
        if (type == "checkbox" || type == "radio") {
            if (element.checked != element.defaultChecked) {
                return true;
            }
        } else if (type == "hidden" || type == "password" ||
            type == "text" || type == "textarea") {
            if (element.value != element.defaultValue) {
                return true;
            }
        } else if (type == "select-one" || type == "select-multiple") {
            for (var j = 0; j < element.options.length; j++) {
                if (element.options[j].selected !=
                    element.options[j].defaultSelected) {
                    return true;
                }
            }
        }
    }
    return false;
};
MyJSUtility.RemoveByIndex = function(arr, index) {
    arr.splice(index, 1);
};
MyJSUtility.RemoveByValue = function(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
};
MyJSUtility.RemoveDuplicate = function(arr) {
    var temp = {};
    for (var i = 0; i < arr.length; i++)
        temp[arr[i]] = true;

    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
};
//<div id="your fileListId">
//     <div><a href="javascript:void(0)" onclick="openFile">fileIndex</a><a class="mydelete" href="javascript:void(0)"></a></div>
//     <div>....</div>
//     <div>...</div>
//</div>
MyJSUtility.fileList = function(options) {
    var defaults = {
        listObj: {},
        count: 1,
        canDel: true,
        serverDelUrl: "",
        openFile: null //参数:fileId,filePath
    };
    var _this = this;
    var newItem = function(fileId, filePath, fileIndex) {
        var d = $("<div/>").appendTo(fileList);
        var afile = $("<a/>").attr({
            "fileid": fileId,
            "href": "javascript:void(0)",
            "filePath": filePath,
            "fileId": fileId
        })
            .click(function() {
                opts.openFile(fileId, filePath);
            }).html(fileIndex).appendTo(d);
        if (opts.canDel) {
            var delImg = $("<a/>").attr({
                "class": "mydelete",
                "href": "javascript:void(0)"
            })
                .unbind("click").bind("click", function() {
                    _this.DeleteFile(this);
                }).appendTo(d);
        }
    }
    this.DeleteFile = function(e) {
        var fc = $(e).prev();
        var delUrl = opts.serverDelUrl;
        var fileObj = {
            fileId: fc.attr("fileId"),
            filePath: fc.attr("filePath"),
            fileIndex: fc.html()
        };
        if (delUrl != "") {
            $.messager.progress({
                text: "正在删除"
            });
            $.post(delUrl, fileObj, function(r) {
                if (r.success) {
                    $.messager.alert("消息", "删除成功");
                    $.messager.progress('close');
                    delFile(e);
                } else {
                    $.messager.alert("错误", r.error);
                }
            }, "json");
        } else {
            delFile(e);
        }
    }
    var delFile = function(e) {
        var fileItem = $(e).parent()[0];
        fileList[0].removeChild(fileItem);
    };
    var changeItem = function(fileId, fileIndex, filePath, fileList, itemIndex) {
        var a = fileList.children().eq(itemIndex).find("a");
        a.attr({
            "fileId": fileId,
            "filePath": filePath
        }).html(fileIndex).unbind("click").bind("click", function() {
            opts.openFile(fileId, filePath);
        });
    };
    this.clear = function() {
        fileList.empty();
    };
    this.getFileInfoObj = function() {
        var r = [];
        fileList.children().each(function() {
            var i = this;
            var a = i.childNodes[0];
            var fo = {
                FileId: a.getAttribute("fileId"),
                FilePath: a.getAttribute("filePath"),
                FileIndex: a.innerText
            };
            r.push(fo);
        });
        return r;
    }
    this.addFile = function(fileId, filePath, fileIndex) {
        var currentCount = fileList.children().length;
        if (opts.count == 1) {
            if (currentCount == 0) {
                newItem(fileId, filePath, fileIndex);
            } else {
                changeItem(fileId, fileIndex, filePath, fileList, 0);
            }
        } else {
            if (currentCount < opts.count) {
                newItem(fileId, filePath, fileIndex);
            } else {
                $.messager.alert("消息", "文件数量不能超过" + count + "个");
            }
        }
    };
    this.setOpts = function(options) {
        opts = $.extend({}, defaults, options);
    };
    var opts = $.extend({}, defaults, options);
    var fileList = opts.listObj;
};
//对easyui datagrid设置，能够客户端分页和排序
MyJSUtility.SetCustomPagerAndSortGridForEasyui = function(options) {
    var defaults = {
        gridId: "",
        pageSize: 20,
        pageList: [20, 40, 60],
        sortFunc: function(sort, order) {}
    };
    var opts;
    var setOpts = function(options) {
        opts = $.extend({}, defaults, options);
    }
    var pagerFilter = function(data) {
        if (typeof data.length == 'number' && typeof data.splice == 'function') { // is array
            data = {
                total: data.length,
                rows: data
            }
        }
        var dg = $(this);
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
            onSelectPage: function(pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                pager.pagination('refresh', {
                    pageNumber: pageNum,
                    pageSize: pageSize
                });
                dg.datagrid('loadData', data);
            }
        });
        if (!data.originalRows) {
            data.originalRows = (data.rows);
        }
        var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
        var end = start + parseInt(opts.pageSize);
        if (parseInt(data.total) > 0) {
            data.rows = (data.originalRows.slice(start, end));
        }
        return data;
    }
    setOpts(options);
    $("#" + opts.gridId).datagrid({
        pagination: true,
        loadFilter: pagerFilter,
        pageSize: opts.pageSize,
        pageList: opts.pageList,
        onSortColumn: opts.sortFunc
    });
};

function loading(opts) {
    var defaults = {
        imgUrl: "",
        parent: ""
    };
    this.setOpts = function(options) {
        opts = $.extend({}, defaults, options);
    };
    var opts = $.extend({}, defaults, options);
}
MyJSUtility.ICRUDTable = function (options) {
    var _this = this;
    var serverUrl = "";
    _this.grid = null;
    _this.editFm = null;
    _this.editLg = null;
    _this.queryPanel = null;
    _this.importLg = null;
    _this.importFm = null;

    var defaults = {
        tableName: "默认名称",
        gridId: "Grid",
        editLgId: "EditLg",
        importUrl: "ImportDate",
        importLgId: "ImportLg",
        createUrl: "AddOne",
        retrieveUrl: "GetList",
        updateUrl: "ModifyOne",
        deleteUrl: "DeleteOne",
        datePK: "",
        queryPanelId: "QueryPanel",
        pageSize: 20,
        pageList: [20, 40, 60],
        bindDateFunc: function (row) {
            _this.editFm.form('load', row);
        },
        beforeNew: function () { },
        beforeModify: function (data) { },
        beforeRemove: function (data) { },
        validateRule: function () { },
        sortRule: function (a, b) {
            if (order == "asc") {
                return a[sort] > b[sort] ? 1 : -1;
            }
            if (order == "desc") {
                return a[sort] > b[sort] ? -1 : 1;
            }
        },
        filterRule: function (data) { }
    };
    var opts;
    var setOpts = function (options) {
        opts = $.extend({}, defaults, options);
        setControl();
    };
    var setControl = function () {
        _this.grid = $("#" + opts.gridId);
        _this.editLg = $("#" + opts.editLgId);
        _this.editFm = _this.editLg.find("form");
        _this.queryPanel = $("#" + opts.queryPanelId);
        _this.importLg = $("#" + opts.importLgId);
        _this.importFm = _this.importLg.find("form");
    }
    var gridSortFunc = function () {
        var d = _this.grid.datagrid("getData");
        var arr = d.originalRows;
        if (arr != "") {
            arr = arr.sort(opts.sortRule);
            _this.grid.datagrid("loadData", arr);
        }
    };
    var loadData = function (reload) {
        var condition = {};
        _this.queryPanel.find("input,select").each(function () {
            if (this.query) {
                condition[this.query] = $(this).val();
            }
        });
        $.post(opts.retrieveUrl, condition, function (data) {
            if (data != null) {
                opts.filterRule(data);
                if (reload) {
                    currenPage = _this.grid.datagrid("options").pageNumber;
                }
                else {
                    currenPage = 1;
                }
                _this.grid.datagrid({ data: data, pageNumber: currenPage });
            }
        }, "json");
    };
    _this.LoadData = function (reload) {
        loadData(reload);
    }
    _this.NewRow = function () {
        opts.beforeNew();
        _this.editLg.dialog('open').dialog('setTitle', '新增' + opts.tableName);
        _this.editFm.form('clear');
        serverUrl = opts.createUrl;
    };
    _this.ModifyRow = function () {
        var row = _this.grid.datagrid('getSelected');
        if (row) {
            opts.beforeModify(row);
            _this.editLg.dialog('open').dialog('setTitle', '修改' + opts.tableName);
            opts.bindDateFunc(row);
            serverUrl = opts.updateUrl;
        }
    };
    _this.RemoveRow = function () {
        var row = _this.grid.datagrid('getSelected');
        if (row) {
            opts.beforeRemove(row);
            $.messager.confirm('删除一条', '确定删除？', function (r) {
                if (r) {
                    var del = {};
                    del[opts.datePK] = row[opts.datePK];
                    $.post(opts.deleteUrl, del, function (result) {
                        if (result.success) {
                            $.messager.alert("消息", "删除成功");
                            loadData(true);
                        } else {
                            $.messager.alert('错误', result.errorMsg);
                        }
                    }, 'json');
                }
            });
        }
    };
    _this.SaveRow = function () {
        _this.editFm.form('submit', {
            url: serverUrl,
            onSubmit: function () {
                return opts.validateRule() && $(this).form('validate');
            },
            success: function (result) {
                result = eval('(' + result + ')');
                if (result.errorMsg) {
                    $.messager.alert("错误", result.errorMsg);
                } else {
                    _this.editLg.dialog('close');
                    loadData(true);
                    $.messager.alert("消息", "操作成功");
                }
            }
        });
    };
    _this.Search = function () {
        loadData();
    };
    _this.ClearCondition = function () {
        _this.queryPanel.find('input,select').each(function () {
            this.value = "";
        });
    };
    _this.SubmitImportData = function () {
        _this.importFm.form('submit', {
            url: opts.importUrl,
            onSubmit: function () {
                if ($(this).form('validate')) {
                    var fileName = _this.importFm.find("input[type='file']")[0].value;
                    var lastDotIndex = fileName.lastIndexOf('.');
                    var fileSort = fileName.substr(lastDotIndex + 1);
                    if (fileSort != "xlsx") {
                        $.messager.alert('错误', "上传文件必须是Excel2007");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            success: function (result) {
                result = eval('(' + result + ')');
                if (result.errorMsg) {
                    var m = result.errorMsg;
                    m = m.replace(/;/g, "<br/>");
                    $.messager.alert("错误", m);
                } else {
                    _this.importLg.window('close');
                    $.messager.alert("消息", "导入成功");
                    loadData();
                }
            }
        });
    };
    _this.OpenImportLg = function () {
        _this.importLg.dialog("open");
    };
    _this.Init = function () {
        MyJSUtility.SetCustomPagerAndSortGridForEasyui({
            gridId: opts.gridId,
            sortFunc: gridSortFunc,
            pageSize: opts.pageSize,
            pageList: opts.pageList
        });
        loadData();
    };
    setOpts(options);
};