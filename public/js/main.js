$(document).ready(function() {
    $('.removeBook').click(function() {
        var deleteID = $(this).data('id');
        // alert(deleteID);
        $.ajax({
            url: '/manage/books/delete/' + deleteID,
            method: 'DELETE'
        });

        window.location.replace('/manage/books');
    });
});