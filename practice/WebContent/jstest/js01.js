/**
 * 
 */
function addClick(){
	var btn=document.getElementById('link1');
	btn.onclick=stop;
}

function ff(){
	var elem01 = document.getElementById('foo');
	elem01.innerHTML = 'fffffffff<br/>fffffff';
	var elem = document.createElement('div');
	var text = document.createTextNode('a new div');
	document.body.appendChild(elem);
	elem.appendChild(text);
	var comment = document.createComment('a new comment');
	document.body.insertBefore(comment, elem);
}

function stop(){
	   return false; 
}