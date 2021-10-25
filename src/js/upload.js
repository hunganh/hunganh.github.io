$(document).ready(function () {
    var type = $("input[name='uploadFile']:checked").val();
    loadAllFile(type);
    $("#uploadJsonFile").click(function () {
        type = $("input[name='uploadFile']:checked").val();
        if (type) {
            var password = prompt("Please enter the password");
            if (password != null) {
                var fd = new FormData();
                var files = $('#fileData')[0].files[0];
                if (files === undefined) {
                    alert("Vui lòng chọn file.");
                    return;
                }
                fd.append('file', files);
                var loadingHTML = getLoadingHTML();
                $("#showFilesData").prepend(loadingHTML);
                $.ajax({
                    url: `${UPLOAD_DATA_URL}/${password}/${type}/`,
                    type: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        loadAllFile(type);
                        alert(response.message);
                    },
                });
            } else {
                alert("You do not have permission to access!");
            }
        }
    });
});

function refreshFileData() {
    var type = $("input[name='uploadFile']:checked").val();
    loadAllFile(type);
}

function loadAllFile(type) {
    var loadingHTML = getLoadingHTML();
    $("#showFilesData").html(loadingHTML);
    setTimeout(() => {
        $.ajax({
            url: `${FILES_DATA_URL}/${type}/`,
            async: false,
            dataType: "json"
        }).done(function (result) {
            var res = `<div class="card-body">
                            <table class="table table-bordered table-responsive">
                                <thead class="table-light">
                                    <th>File Name</th><th>URL</th>
                                </thead><tbody>`;
            if (result && result.length > 0) {
                result.forEach(element => {
                    res += ` <tr>
                                <td>${element.name}</td>
                                <td><a href="${element.url}" target="_blank">${element.url}</a></td>
                            </tr>`;
                });
            }
            res += `</tbody></table></div>`;
            $("#showFilesData").html(res);
        }).fail(function (jqXHR, textStatus, error) {
            $("#showFilesData").html("");
            alert("Upload data fail!");
        });
    }, 200);
}

function getFileContentType(type) {
    loadAllFile(type.value);
}