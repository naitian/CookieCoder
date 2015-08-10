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
              "error: You need help. No actually, 'help'.",
              "error: You just healthcare.gov'd.",
              "error: \"No Child Left Behind\" A+ for effort.",
              "error: ...About as good as my German accent.",
              "error: What's missing from 'Like I food'? That's right. Syntax.",
              "error: If there was a sin tax for your missing syntax, I'd be as rich as Donald Trump thinks he is.",
              "error: Did it hurt when you fell from heaven...hit your keyboard, and clicked enter?",
              "error: Up syntax is messed your.",
              "error: Retry. Your cat stepped on your keyboard.",
              "error: Did you mean: überprüfen Sie die Schreibweise?",
              "error: That was special.",
              "error: ...sigh...",
              "error: I appreciate your creativity, but not really. Type 'help' if you need help.",
              "error: Lo siento, solamente hablo Inglés y Español. No entiendo Griego.",
              "error: Are you from Tennessee? 'cause you have ten phalanges I see. So, use them correctly.",
              "error: Just type 'clear' and no one will ever know you typed that.",
              "error: I thought I was going to make it through today. Maybe, tomorrow.",
              "error: I thought Rick Perry was bad with words...",
              "error: Maybe I'll be nice for a change. I really appreciate you checking me out and all, but I just don't think we have a connection."
             ]
var CPS = 0;
var historyCode = ['']
var ptInHistory = 0;

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
            historyCode[0] = $('#input').html();
            historyCode.reverse();
            historyCode.push('');
            historyCode.reverse();
            code = $('#input').html();
            var parts = getParts(code); //parts is like command -modifier arguments
            console.log(parts[0]);
            if(parts[0] === 'cookie'){
                if(parts[1] === 'add'){
                    if(parts[2] !== ''){
                        if($.inArray(parts[2], JSON.parse(localStorage.getItem('variableNames'))) === -1){
                            addCookie(parts[2]);
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + Math.floor(JSON.parse(localStorage.getItem('cookies'))));

                            $('#input').html('');
                        } else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Sorry, bud, no two cookies can be alike.');

                            $('#input').html('');
                        }
                    } else {
                        $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Add nothing, huh? You REALLY want to break this huh. >:(');
                        
                        $('#input').html('');
                    }
                } else if(parts[1] === 'view'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + Math.floor(JSON.parse(localStorage.getItem('cookies'))));
                    
                    $('#input').html('');
                } else if(parts[1] === 'cps'){
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + localStorage.getItem('cps'));
                    
                    $('#input').html('');
                } else {
                    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> My cookie does not understand.');
                    
                    $('#input').html('');
                }
            } else if(parts[0] === 'store'){
                switch(parts[1]){ //switch case for modifier
                    case 'open':
                        if(!storeOpen){
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Store is open. Welcome to Mick and Border.');

                            $('#input').html('');
                        }  else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Please stop opening the door.');

                            $('#input').html('');
                        }
                        printStoreItems();
                        storeOpen = true;
                        break;
                    case 'close':
                        if(storeOpen){
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Bye-bye.');

                            $('#input').html('');
                        }  else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> It\'s a pull door.');

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
                        				 
                                        $('#input').html('');
                            		}
                            		else {
                            			$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> You don\'t have enough cookies. Sorry, bruh!');
                            			
                                        $('#input').html('');
                            		}
                            	}
                            }
                            if(!buy){
	                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> Out of stock.');
	                    
                                $('#input').html('');
                            }
                        } else {
                            $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> You have to go into the store first.');

                            $('#input').html('');
                        }
                        break;
                    default:
                        reset(code);
                        break;
                }
            } else if(parts[0] === 'help') {
            	$('#input').html('');
    			$('#screen').html($('#screen').html() + '<br>$ help<br><span style="color: #349ADB">checkout how many cookies you have:</span><br>&nbsp;&nbsp;cookie -view' +
    													'<br><span style="color: #349ADB">add more cookies:</span><br>&nbsp;&nbsp;cookie -add [name]' + 
    													'<br><span style="color: #349ADB">open up the store:</span><br>&nbsp;&nbsp;store -open' + 
    													'<br><span style="color: #349ADB">go shopping:</span><br>&nbsp;&nbsp;store -buy [itemname]' + 
    													'<br><span style="color: #349ADB">close up shop:</span><br>&nbsp;&nbsp;store -close' +
    													'<br><span style="color: #349ADB">learn who made this game:</span><br>&nbsp;&nbsp;credits' +
    													'<br><span style="color: #349ADB">reset:</span><br>&nbsp;&nbsp;reset -actually you should contemplate resetting everything');
    			$('#input').html('');
        	} else if(parts[0] === 'clear') {
        		$('#input').html('');
    			$('#screen').html('');
        	} else if(parts[0] === 'credits') { 

    			$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br><span style="color: #349ADB">Naitian Zhou</span> and <span style="color: #349ADB">David Zhao</span><br>Pilot DC 2015<br>Special thanks to Microsoft, Stack Overflow, and the small child who ran around a lot<br>Making it look awesome credits to Naitian Zhou');

                if(JSON.parse(localStorage.getItem('credits'))){
                    $('#screen').html($('#screen').html() + '<br><br>Ok, it was nice the first time.');
                } else {
                    $('#screen').html($('#screen').html() + '<br><br>BY THE WAY, here\'s 50000 cookies for being awesome'); 
                    localStorage.setItem('credits', JSON.stringify(true));  
                    addCookies(50000);        
                }
        		$('#input').html('');
            } else if(parts[0] === 'reset') {
                if(parts[1] === 'actually'){
                    if(parts[2] === 'you should contemplate resetting everything'){
                        localStorage.setItem('cookies', JSON.stringify(0));
                        localStorage.setItem('variableNames', JSON.stringify([]));
                        localStorage.setItem('cps', JSON.stringify(0));
                        CPS = JSON.parse(localStorage.getItem('cps'));      
                        $('#screen').html('Welp, it was your choice. Or maybe it was your friend\'s choice. Either way, everything\'s gone.'); 
                        $('#input').html(''); 
                    }
                }
            } else {
                reset(code);
            }
        }
        ptInHistory = 0;
    } else if(ev.keyCode == 38){ //up arrow
        if(ptInHistory === 0){
            historyCode[0] = $('#input').html();
        }
        ptInHistory += 1;
        if(ptInHistory == historyCode.length){
            ptInHistory = historyCode.length - 1;
        } else {
            ev.preventDefault();
        }
        $('#input').html(historyCode[ptInHistory]);
    } else if(ev.keyCode == 40){ //down arrow
        console.log('down');
        ptInHistory -= 1;
        if(ptInHistory < 0){
            ptInHistory = 0;
        } else {
            ev.preventDefault();
        }
        $('#input').html(historyCode[ptInHistory]);
        console.log(ptInHistory)
    }
});

function printStoreItems(){
    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html());
    for(var cnt = 0; cnt < names.length; cnt++){
        $('#screen').html($('#screen').html() + '<br><span style="color: #349ADB">' + names[cnt] + '</span><br>&nbsp;&nbsp;' + prices[cnt] + ' cookies | ' + cps[cnt] + ' cps | ' + description[cnt]);
    }
}

function reset(code){
    $('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br> ' + errors[Math.floor(Math.random() * errors.length)]);    
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
    if(!localStorage.getItem('credits')){
        localStorage.setItem('credits', JSON.stringify(false));   
    }
    CPS = JSON.parse(localStorage.getItem('cps'));
    CPSInterval = setInterval(function() {
        addCookies(CPS);
    }, 3000);
});