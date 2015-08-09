var storeOpen = false;  
var names = ['Item 1', 'Item 2', 'Item 3'];
var prices = [1, 2, 3];
var cps = [0.1, 0.2, 0.3];
var description = ['desc1', 'desc2', 'desc3'];

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            code = $('#input').html();
            var parts = getParts(code); //parts is like command -modifier arguments
            console.log(parts);
            if(parts[0] === 'cookie'){
                if(parts[1] === 'add'){
                    if(parts[2] !== ''){
                        if($.inArray(parts[2], JSON.parse(localStorage.getItem('variableNames'))) === -1){
                            addCookie(parts[2]);
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + localStorage.getItem('cookies'));
                            $('#input').html('');
                        } else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ Sorry, bud, no two cookies can be alike.');
                            $('#input').html('');
                        }
                    }
                } else if(parts[1] === 'view'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + localStorage.getItem('cookies'));
                    $('#input').html('');
                } else if(parts[1] === 'cps'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + localStorage.getItem('cps'));
                    $('#input').html('');
                } else {
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ My cookie does not understand.');
                    $('#input').html('');
                }
            } else if(parts[0] === 'store'){
                switch(parts[1]){ //switch case for modifier
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
                        if(storeOpen){
                            var c = getCookies();
                            console.log(parts[2]);
                            switch(parts[2]){
                                case names[0].toLowerCase():
                                    if(prices[0] <= c){
                                        subtractCookie(prices[0]);
                                        addCPS(cps[0]);
                                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + names[0] + ' has been purchased.');
                                        $('#input').html('');
                                    } else {
                                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ You don\'t have enough cookies. Sorry, bruh!');
                                        $('#input').html('');
                                    }
                                    break;
                                case names[1].toLowerCase():
                                    if(prices[1] <= c){
                                        subtractCookie(prices[1]);
                                        addCPS(cps[1]);
                                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + names[1] + ' has been purchased.');
                                        $('#input').html('');
                                    } else {
                                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ You don\'t have enough cookies. Sorry, bruh!');
                                        $('#input').html('');
                                    }
                                    break;
                                case names[2].toLowerCase():
                                    if(prices[2] <= c){
                                        subtractCookie(prices[2]);
                                        addCPS(cps[2]);
                                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + names[2] + ' has been purchased.');
                                        $('#input').html('');
                                    } else {
                                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ You don\'t have enough cookies. Sorry, bruh!');
                                        $('#input').html('');
                                    }
                                    break;
                                default:
                                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ Out of stock.');
                                    $('#input').html('');
                                    break;
                                    
                            }
                        } else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ You have to go into the store first.');
                            $('#input').html('');
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
    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ You dun messed up A-aron.');
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


function subtractCookie(num){
    var cookies = JSON.parse(localStorage.getItem('cookies'));
    cookies -= num;
    localStorage.setItem('cookies', JSON.stringify(cookies));
}
    

function getCookies(){
    return JSON.parse(localStorage.getItem('cookies'));
}

    
function addCPS(add){
    var cps = JSON.parse(localStorage.getItem('cps'));
    cps += add;
    localStorage.setItem('cps', JSON.stringify(cps));
}
    

function getParts(code){
    var command = code.substring(0, code.indexOf(' '));
    var modifier = '';
    if(code.indexOf(' ') === code.lastIndexOf(' ')){
        modifier = code.substring(code.indexOf('-') + 1, code.length);
    } else {
        modifier = code.substring(code.indexOf('-') + 1, code.indexOf(' ', code.indexOf(' ') + 1));
    }
    if(code.indexOf(' ', code.indexOf('-')) !== -1){
        var argument = code.substring(code.indexOf(' ', code.indexOf(' ') + 1) + 1);
        return [command.toLowerCase().trim(), modifier.toLowerCase().trim(), argument.toLowerCase().trim()];
    }
    return [command.toLowerCase().trim(), modifier.toLowerCase().trim(),''];
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