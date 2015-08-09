var javaTemplate = 'Cookie ~=new Cookie();';

$(document).keydown(function(ev){
    if(ev.keyCode == 13){
        if($('#input').html() !== ''){
			var code = $('#input').html();
			code = code.replace(' =','=').replace('= ','=');
			//check if varName is possible
			var varName = code.substring(javaTemplate.indexOf('~'), code.indexOf(javaTemplate[javaTemplate.indexOf('~') + 1]));
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
            //Check if varName has already been used
            pastVariableNames = JSON.parse(localStorage.getItem('variableNames'));
            if($.inArray(varName, pastVariableNames) !== -1){
				$('#screen').html($('#screen').html() + '<br>$ ' + $('#input').html() + '<br>$ ' + 'error: variable name already used');
				$('#input').html('');
				return;
            }
            
            //Store variable name
            pastVariableNames.push(varName);
            localStorage.setItem('variableNames', JSON.stringify(pastVariableNames));
            
			var correctCode = javaTemplate.replace('~', varName);
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

var terminalFocus = function(){
    $('#input').focus();
};

$(document).click(terminalFocus);

$(document).ready(function(){
    if(!localStorage.getItem('variableNames')){
        localStorage.setItem('variableNames',JSON.stringify([]));   
    }
});