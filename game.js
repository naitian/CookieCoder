$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            $('#screen').html($('#screen').html() + '<br>' + $('#input').html());
            $('#input').html('');
        }
    }
});

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);