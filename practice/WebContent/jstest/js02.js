/**
 * 
 */

/**
 * 
 */

var HTML = "";
var space = "";
var blank = "  ";
function getSubject()
{
    var xmlDoc;
    if(window.ActiveXObject)
    {
     //获得操作的xml文件的对象
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = false;
        xmlDoc.load("tree.xml");
        if(xmlDoc == null)
        {
          alert('您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!');
          window.location.href='/Index.aspx';
          return;
        }
    }else{
    	 if (window.DOMParser)
    	 {
    		 var parser=new DOMParser();
    	     xmlDoc=parser.parseFromString("tree.xml","text/xml");
    		 alert('sss2');
    	 }
    }
 //解析xml文件，判断是否出错
    alert('sss3');
    if(xmlDoc.parseError.errorCode != 0)
    {
       alert('sss4');
       alert(xmlDoc.parseError.reason);
       return;
    }

 //获得根接点
    var nodes = xmlDoc.documentElement.childNodes;
 //得到根接点下共有子接点个数，并循环
    for(var i=0; i<nodes.length; i++)
    {
   //如果接点名为 tree
      if(nodes(i).nodeName == "tree")
      {
        readTree(nodes(i));
      }
   //如果接点名为 node
      else if(nodes(i).nodeName == "node")
      {
        readNode(nodes(i));
      }
    }
    //删除对象
    delete(xmlDoc);
    //显示HTML
    window.show.innerHTML = HTML;
    return;
}
//读Tree节点
function readTree(cI)
{
    var nodes = cI.childNodes;
    var menuHTML = space;
    menuHTML += blank;
 //得到超级链接
    menuHTML += "<a href='";
 //如果该节点的连接属性不为空，则连接
    if(cI.selectNodes("link")(0).text != "")
    {
       menuHTML += cI.selectNodes("link")(0).text;
    }
 //否则为空链接
    else
    {
       menuHTML += "#";
    }
 //目标
    if(cI.selectNodes("target")(0).text != "")
 {
       menuHTML += " target='"+cI.selectNodes("target")(0).text;
       menuHTML += "'";
    }
 //点击菜单事件，调用divshow(vid)函数
    menuHTML += " onclick=javascript:divshow('"+cI.getAttribute("id")+"');";
 //得到节点标题
    menuHTML += " title='";
    menuHTML += cI.selectNodes("title")(0).text;
 //结束
    menuHTML += "'>";
    //得到节点的正文
    menuHTML += cI.selectNodes("text")(0).text;
    menuHTML += "</a><br>\n";
 //将menuHTML设置添加到HTML字符串
    HTML += menuHTML;
 //得到该节点的属性值<span 
    HTML += "<div id='"+cI.getAttribute("id")+"' style='display:none'>\n";
    for(var i=0; i<nodes.length; i++)
    {
       var tempImg = "";
       tempImg += blank;
       if(nodes(i).nodeName == "tree")
       {
         space += tempImg;
         readTree(nodes(i));
         space = "";
       }
       else if(nodes(i).nodeName == "node")
       {
         space += tempImg;
         readNode(nodes(i));
       }
    }
    HTML += "</div>\n";
    return;
}
//读Node节点
function readNode(cI)
{
   var nodeHTML = space;
   nodeHTML += blank;
   //设置超级链接
   nodeHTML += "<a href='";
   //得到连接地址
   nodeHTML += cI.selectNodes("link")(0).text;
   //目标
   if(cI.selectNodes("target")(0).text != "")
      nodeHTML += "' target='"+cI.selectNodes("target")(0).text;
   //得到节点标题
   nodeHTML += "' title='";
   nodeHTML += cI.selectNodes("title")(0).text;
   //结束
   nodeHTML += "'>";
   //得到节点的正文
   nodeHTML += cI.selectNodes("text")(0).text;
   nodeHTML += "</a><br>\n";
   HTML += nodeHTML;
   //HTML += "<div id='"+cI.getAttribute("id")+"'>";
   space = "";
   return;
}
//操作对象的显示还是隐藏效果
function divshow(vid)
{
  if(document.all[vid].style.display == "none")
  {
    document.all[vid].style.display = "block";
  }
  else
  {
    document.all[vid].style.display = "none";
  }
  return;
}