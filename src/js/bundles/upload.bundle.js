/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/upload.js":
/*!**************************!*\
  !*** ./src/js/upload.js ***!
  \**************************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", function(e) {\r\n    var type = $(\"input[name='uploadFile']:checked\").val();\r\n    window.uploadJS.loadAllFile(type);\r\n    $(\"#uploadJsonFile\").click(function () {\r\n        type = $(\"input[name='uploadFile']:checked\").val();\r\n        if (type) {\r\n            var password = prompt(\"Please enter the password\");\r\n            if (password != null) {\r\n                var fd = new FormData();\r\n                var files = $('#fileData')[0].files[0];\r\n                if (files === undefined) {\r\n                    alert(\"Vui lòng chọn file.\");\r\n                    return;\r\n                }\r\n                fd.append('file', files);\r\n                var loadingHTML = window.commonJS.getLoadingHTML();\r\n                $(\"#showFilesData\").prepend(loadingHTML);\r\n                $.ajax({\r\n                    url: `${window.apiUrlDefined.UPLOAD_DATA_URL}/${password}/${type}/`,\r\n                    type: 'post',\r\n                    data: fd,\r\n                    contentType: false,\r\n                    processData: false,\r\n                    success: function (response) {\r\n                        window.uploadJS.loadAllFile(type);\r\n                        alert(response.message);\r\n                    },\r\n                });\r\n            } else {\r\n                alert(\"You do not have permission to access!\");\r\n            }\r\n        }\r\n    });\r\n});\r\n\r\nwindow.uploadJS = {\r\n    refreshFileData : function () {\r\n        var type = $(\"input[name='uploadFile']:checked\").val();\r\n        window.uploadJS.loadAllFile(type);\r\n    },\r\n    \r\n    loadAllFile : function (type) {\r\n        var loadingHTML = window.commonJS.getLoadingHTML();\r\n        $(\"#showFilesData\").html(loadingHTML);\r\n        setTimeout(() => {\r\n            $.ajax({\r\n                url: `${window.apiUrlDefined.FILES_DATA_URL}/${type}/`,\r\n                async: false,\r\n                dataType: \"json\"\r\n            }).done(function (result) {\r\n                var res = `<div class=\"card-body\">\r\n                                <table class=\"table table-bordered table-responsive\">\r\n                                    <thead class=\"table-light\">\r\n                                        <th>File Name</th><th>URL</th>\r\n                                    </thead><tbody>`;\r\n                if (result && result.length > 0) {\r\n                    result.forEach(element => {\r\n                        res += ` <tr>\r\n                                    <td>${element.name}</td>\r\n                                    <td><a href=\"${element.url}\" target=\"_blank\">${element.url}</a></td>\r\n                                </tr>`;\r\n                    });\r\n                }\r\n                res += `</tbody></table></div>`;\r\n                $(\"#showFilesData\").html(res);\r\n            }).fail(function (jqXHR, textStatus, error) {\r\n                $(\"#showFilesData\").html(\"\");\r\n                alert(\"Upload data fail!\");\r\n            });\r\n        }, 200);\r\n    },\r\n    \r\n    getFileContentType : function (type) {\r\n        window.uploadJS.loadAllFile(type.value);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/upload.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/upload.js"]();
/******/ 	
/******/ })()
;