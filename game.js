var javaTemplate = 'Cookie ~=new Cookie();';

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            if($('#input').html().indexOf('store') === 0){
                
            } else if($('#input').html().indexOf('cookie') === 0){
                
            } else {
                
            }
            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: cannot find symbol');
            $('#input').html('');
        }
    }
});

function getHTML(code){
    
}

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);

$(document).ready(function(){
    if(!localStorage.getItem('variableNames')){
        localStorage.setItem('variableNames',JSON.stringify([]));   
    }
});