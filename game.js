var storeOpen = false;  
var names = ['Notepad', 
			 'More Goats (and RAM)',
			 'Chrome Dev Tools',
			 'Git Up and Dance',
			 'Tux',
			 'Quicksort',
			 'JQuery',
			 'Caffeine',
			 'Richard Stallman',
			 'Stack Overflow'];
var prices = [8,
			  64,
			  512,
			  2048,
			  131072,
			  1048576,
			  134217728,
			  1073741824,
			  17179869184,
			  1099511627776];
var cps = [.125,
		   4,
		   16,
		   64,
		   256,
		   4096,
		   1048576,
		   67108864,
		   268435456,
		   127438953472];

var description = ['What more could you ask for?',
				   'Old McDonald(Knuth) had a farm...',
				   'console.log(\'what a tool\')',
				   'git commit -m "edm"',
				   'rm -rf /',
				   'So fast it makes up for Java',
				   '#money',
				   'Gee, talk about <i>hyper</i>text markup language',
				   '"It\'s stupidity. It\'s worse than stupidity: it\'s cookie clicker without any clicking."',
				   'Hell yeah'];
var errors = ["error: You dun messed up A-aron.",
              "error: Your syntax is like Avatar: The Last Airbender Movie. You thought it would work.",
              "error: Your syntax is like this project. We thought it would work, too.",
              "error: You need help. No actually, help.",
              "error: You just healthcare.gov'd."]
var CPS = 0;
var history = ['up arrow\'s fun, huh?'];
var ptInHistory = 0;

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            code = $('#input').html();
            var parts = getParts(code); //parts is like command -modifier arguments
            if(parts[0] === 'cookie'){
                if(parts[1] === 'add'){
                    if(parts[2] !== ''){
                        if($.inArray(parts[2], JSON.parse(localStorage.getItem('variableNames'))) === -1){
                            addCookie(parts[2]);
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + localStorage.getItem('cookies'));
                            history.push($('#input').html());
                            $('#input').html('');
                        } else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Sorry, bud, no two cookies can be alike.');
                            history.push($('#input').html());
                            $('#input').html('');
                        }
                    } else {
                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Add nothing, huh? You REALLY want to break this huh. >:(');
                        history.push($('#input').html());
                        $('#input').html('');
                    }
                } else if(parts[1] === 'view'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + Math.round(JSON.parse(localStorage.getItem('cookies'))));
                    history.push($('#input').html());
                    $('#input').html('');
                } else if(parts[1] === 'cps'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + localStorage.getItem('cps'));
                    history.push($('#input').html());
                    $('#input').html('');
                } else {
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> My cookie does not understand.');
                    history.push($('#input').html());
                    $('#input').html('');
                }
            } else if(parts[0] === 'store'){
                switch(parts[1]){ //switch case for modifier
                    case 'open':
                        if(!storeOpen){
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Store is open. Welcome to Mick and Border.');
                            history.push($('#input').html());
                            $('#input').html('');
                        }  else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Please stop opening the door.');
                            history.push($('#input').html());
                            $('#input').html('');
                        }
                        printStoreItems();
                        storeOpen = true;
                        break;
                    case 'close':
                        if(storeOpen){
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Bye-bye.');
                            history.push($('#input').html());
                            $('#input').html('');
                        }  else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> It\'s a pull door.');
                            history.push($('#input').html());
                            $('#input').html('');
                        }
                        storeOpen = false;
                        break;
                    case 'buy':
                        if(storeOpen){
                            var c = getCookies();
                            var buy = false;
                            for(var i = 0; i < names.length; i++){
                            	if(names[i].toLowerCase() == parts[2]){
                        			buy = true;
                            		if(prices[i] <= c){
                            			subtractCookie(prices[i]);
                            			addCPS(cps[i])
                            			$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + names[i] + ' has been purchased.');
                        				history.push($('#input').html()); 
                                        $('#input').html('');
                            		}
                            		else {
                            			$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> You don\'t have enough cookies. Sorry, bruh!');
                            			history.push($('#input').html());
                                        $('#input').html('');
                            		}
                            	}
                            }
                            if(!buy){
	                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Out of stock.');
	                            history.push($('#input').html());                    
                                $('#input').html('');
                            }
                        } else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> You have to go into the store first.');
                            history.push($('#input').html());
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
    } else if(ev.keyCode == 38){ //up arrow
        
    } else if(ev.keyCode == 40){ //down arrow
        
    }
});

function printStoreItems(){
    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html());
    for(var cnt = 0; cnt < names.length; cnt++){
        $('#screen').html($('#screen').html() + '<br><span style="color: #349ADB">' + names[cnt] + '</span><br> - ' + prices[cnt] + ' cookies | ' + cps[cnt] + ' cps | ' + description[cnt]);
    }
}

function reset(code){
    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + errors[Math.floor(Math.random() * errors.length)]);
    history.push($('#input').html());                         
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


function addCookies(amount){
    var cookies = JSON.parse(localStorage.getItem('cookies'));
    cookies += amount;
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
    CPS = cps;
    localStorage.setItem('cps', JSON.stringify(cps));
}
    

function getParts(code){
    var command = '';
    if(code.indexOf(' ') != -1){
        command = code.substring(0, code.indexOf(' '));
    } else {
        command = code;
        return [command.toLowerCase().trim(), '', ''];
    }
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
    CPS = JSON.parse(localStorage.getItem('cps'));
    setInterval(function() {
        addCookies(CPS);
    }, 3000);
});