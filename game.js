var storeOpen = false;  

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            code = $('#input').html();
            var parts = getParts(code); //parts is like command -modifier arguments
            console.log(parts);
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
                switch(parts[1]){
                    case 'open':
                        if(!storeOpen){
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ Store is open. Welcome to Mick and Border.');
                            $('#input').html('');
                        }  else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ Please stop opening the door.');
                            $('#input').html('');
                        }
                        storeOpen = true;
                        break;
                    case 'close':
                        if(storeOpen){
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ Bye-bye.');
                            $('#input').html('');
                        }  else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ It\'s a pull door.');
                            $('#input').html('');
                        }
                        storeOpen = false;
                        break;
                    case 'buy':
                        switch(parts[2]){

                        }
                        break;
                    default:
                        reset(code);
                        break;
                }
            } else {
                reset(code);
            }
        }
    }
});

function reset(code){
    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ Hm, I think we messed up.');
    $('#input').html('');
}


function addCookie(name){
    var variableNames = JSON.parse(localStorage.getItem('variableNames'));
    variableNames.push(name);
    localStorage.setItem('variableNames', JSON.stringify(variableNames));
    var cookies = JSON.parse(localStorage.getItem('cookies'));
    cookies += 1;
    localStorage.setItem('cookies', JSON.stringify(cookies));
}


function getParts(code){
    var command = code.substring(0, code.indexOf(' '));
    var modifier = '';
    if(code.indexOf(' ') === code.lastIndexOf(' ')){
        modifier = code.substring(code.indexOf('-') + 1, code.length);
    } else {
        modifier = code.substring(code.indexOf('-') + 1, code.lastIndexOf(' '));
    }
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
        localStorage.setItem('cookies',JSON.stringify(0));   
    }
    if(!localStorage.getItem('cps')){
        localStorage.setItem('cps',JSON.stringify(0));   
    }
    if(!localStorage.getItem('variableNames')){
        localStorage.setItem('variableNames',JSON.stringify([]));   
    }
});