$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        $('#screen').html($('#screen').html() + '<br>' + $('#input').html());
        $('#input').html('');
    }
});

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);