$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            code = $('#input').html();
            var parts = getParts(code); //parts is like command -modifier arguments
            if(parts[0] === 'cookie'){
                if(parts[1] === 'add'){
                    if(parts[2] !== ''){
                        addCookie(parts[2]);
                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + localStorage.getItem('cookies'));
                        $('#input').html('');
                    }
                } else if(parts[1] === 'view'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + localStorage.getItem('cookies'));
                    $('#input').html('');
                } else if(parts[1] === 'cps'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + localStorage.getItem('cps'));
                    $('#input').html('');
                }
            } else if(parts[0] === 'store'){
                
            } else {
                
            }
        }
    }
});


function addCookie(name){
    var variableNames = JSON.parse(localStorage.getItem('variableNames'));
    variableNames.push(name);
    localStorage.setItem('variableNames', JSON.stringify(variableNames));
    var cookies = localStorage.getItem('cookies');
    cookies += 1;
    localStorage.setItem('cookies', cookies);
}


function getParts(code){
    var command = code.substring(0, code.indexOf(' '));
    var modifier = code.substring(code.indexOf('-') + 1, code.lastIndexOf(' '));
    if(code.indexOf(' ', code.indexOf('-')) !== -1){
        var argument = code.substring(code.lastIndexOf(' ') + 1);
        return [command.toLowerCase(), modifier.toLowerCase(), argument.toLowerCase()];
    }
    return [command.toLowerCase(), modifier.toLowerCase(),''];
}

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);

$(document).ready(function(){
    if(!localStorage.getItem('cookies')){
        localStorage.setItem('cookies',0);   
    }
    if(!localStorage.getItem('cps')){
        localStorage.setItem('cps',0);   
    }
    if(!localStorage.getItem('variableNames')){
        localStorage.setItem('variableNames',JSON.stringify([]));   
    }
});