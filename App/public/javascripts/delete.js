
$(document).ready(function() {

    $('.delr').click(function() {

    	$('#toDel').val($(this).attr('rel'));
    	$('#sendForm').submit();
    });

});