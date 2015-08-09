var javaTemplate = 'Cookie ~=new Cookie();';

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
			var code = $('#input').html();
			code = code.replace(' =','=').replace('= ','=');
			//check if varName is possible
			var varName = code.substring(javaTemplate.indexOf('~'), code.indexOf(javaTemplate[javaTemplate.indexOf('~') + 1]));
			if(!varName){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'Syntax Error');
				$('#input').html('');
				return;
			}
			if(!varName[0].match(/[A-Za-z$_]/)){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'Variable name invalid');
				$('#input').html('');
				return;
			}
			var correctCode = javaTemplate.replace('~', varName);
			if(correctCode != code){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'Syntax Error');
				$('#input').html('');
				return;
			}
			$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html());
			$('#input').html('');
        }
    }
});

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);
