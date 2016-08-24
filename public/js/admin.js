$(function () {
    $('.del').click(function (e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);

        $.ajax({
            type: 'DELETE',
            url: '/admin/control/delete?id=' + id
        })
        .done(function (results) {
            if (results.success) {
                if (tr.length > 0) {
                    tr.remove();
                }
            }
        })
    });
});
$('#douban').blur(function(){
    var douban = $(this);
    var id = douban.val();
    if(id){
    $.ajax({
        url: 'http://api.douban.com/v2/movie/subject/' + id,
        cache: true,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: function(data){
            console.log(data);
            $('#inputTitle').val(data.title);
            $('#inputDoctor').val(data.directors[0].name);
            $('#inputCountry').val(data.countries[0]);
            $('#inputLanguage').val(data.countries[0]);
            $('#inputPoster').val(data.images.large);
            $('#inputYear').val(data.year);
            $('#inputSummary').val(data.summary);
        }
    })
}
})