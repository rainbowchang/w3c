/**
 * 
 */

window.onload = function(){ 
// 解析 XML 文档 , 得到 xml 文档的 china 根节点 
	var xmlDocument = parseXml("cities.xml"); 
	var chinaNode = xmlDocument.childNodes[1]; 
// 为 id="province" 的 select 节点添加 onchange 事件 , 获取选择的省的 value 
	var provinceNode = document.getElementById("province"); 
	provinceNode.onchange = function(){ 
// ** 清空 provice 节点出 <option value="..."> 请选择 ...</option> 的所有子节点 ** 
		var cityNode = document.getElementById("city"); 
// cityNodeOptionNodes 数组时活动的 , 所以需要从后向前清 
		var cityNodeOptionNodes = cityNode.getElementsByTagName("option"); 
		var length = cityNodeOptionNodes.length; 
		for(var i = length - 1; i > 0; i--){ 
			cityNode.removeChild(cityNodeOptionNodes[i]); 
		} 
		var provinceValue = this.value; 
// 用 provinceValue 去 xml 文档中获取对应的 province 节点 
		var provinceNodeInXmlFile = xmlDocument.selectSingleNode("china/province[@name='" + provinceValue + "']"); 
// 获取 3 provinceNodeInXmlFile 的所有 city 子节点的文本值 : cityValue 
		var cityNodesInXmlFile = provinceNodeInXmlFile.getElementsByTagName("city"); 
		for (var i = 0; i < cityNodesInXmlFile.length; i++) { 
			var cityNodeInXmlFile = cityNodesInXmlFile[i]; 
			var cityValue = cityNodeInXmlFile.firstChild.nodeValue; 
// 利用 得到的文本值创建 option 节点 : <option value='cityValue'>cityValue</option> 
			var optionNode = document.createElement("option"); 
			optionNode.setAttribute("value", cityValue); 
			var optionNodeTextNode = document.createTextNode(cityValue); 
			optionNode.appendChild(optionNodeTextNode); 
// 把创建好的 option 节点添加到 id="city" 的 select 节点中 
			cityNode.appendChild(optionNode); 
		} 
	}; 
// 解析 xml 文件的函数 
function parseXml(fileName){ 
//IE 内核的浏览器 
	if (window.ActiveXObject) { 
// 创建 DOM 解析器 
		var doc = new ActiveXObject("Microsoft.XMLDOM"); 
		doc.async = "false"; 
// 加载 XML 文档 , 获取 XML 文档对象 
		doc.load(fileName); 
		return doc; 
} 
//Mozilla 浏览器 
	else 
		if (window.DOMParser) { 
// 创建 DOM 解析器 
			var p = new DOMParser(); 
// 创建 DOM 解析器 
			return p.parseFromString(fileName, "text/xml"); 
		} 
		else { 
			return false; 
		} 
	} 
}