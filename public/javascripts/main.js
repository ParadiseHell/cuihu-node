/**
 * Created by ChengTao on 2016-09-17.
 */
function deleteItem() {
    $('.caption').find('p a.left').click(function () {
        $("#delete").modal('show');
        $("#delete").find('a.left').click(function () {
            $("#delete").modal('hide');
            var url = $('.caption').find('p a.right').attr("href").split('=');
            url = url[url.length - 1];
            console.log(url);
            $.get('/delete?id='+url,function (data) {
                if(data != null){
                    console.log(data);
                    console.log(typeof (data));
                    console.log(data.data);
                    showMessage(data.message,data.isSuccess);
                }
            });
        });
        $("#delete").find('a.right').click(function () {
            $("#delete").modal('hide');
        });
    });
}

function showMessage(str,isSuccess) {
    $("#mesage").find('div.modal-content p.message').html(str);
    $("#mesage").modal('show');
    setTimeout(function () {
        $("#mesage").modal('hide');
        if(isSuccess){
            window.location.href = '/';
        }
    },1000);
}
deleteItem();

