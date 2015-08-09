var javaCookieTemplate = 'Cookie ~=new Cookie();';
var javaStoreTemplate = 'store.~(~);'

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
			var code = $('#input').html();
			code = code.replace(' =','=').replace('= ','=');
			//check if varName is possible
			var varName = code.substring(javaCookieTemplate.indexOf('~'), code.indexOf(javaCookieTemplate[javaCookieTemplate.indexOf('~') + 1]));
			if(!varName){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: cannot find symbol');
				$('#input').html('');
				return;
			}
			if(!varName[0].match(/[A-Za-z$_]/)){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: not a statement');
				$('#input').html('');
				return;
			}
			var correctCode = javaCookieTemplate.replace('~', varName);
			if(correctCode != code){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: \';\' expected');
				$('#input').html('');
				return;
			}
			$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html());
			$('#input').html('');
        }
    }
});

function checkStore(){
	var code = $('#input').html();
	var func = code.substring(javaCookieTemplate.indexOf('~'), code.indexOf(javaCookieTemplate[javaCookieTemplate.indexOf('~') + 1]));
	if(!func){
		$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: cannot find symbol');
		$('#input').html('');
		return;
	}
	if(!func[0].match(/[A-Za-z$_]/)){
		$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: not a statement');
		$('#input').html('');
		return;
	}

	

}

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);
