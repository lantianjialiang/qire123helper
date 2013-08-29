var Qire123Helper = {
  onLoad: function() {
    // initialization code
    var contextMenu = document.getElementById("contentAreaContextMenu");
	if (contextMenu) {
		contextMenu.addEventListener("popupshowing", Qire123Helper.showOrHideItems, false);
	}
  },

  onMenuItemCommand: function() {
    Qire123Helper.copyToClip();
  },
  
  copyToClip: function() {
	var pageContext = window.content.document.defaultView.wrappedJSObject
	//alert(pageContext.pp_play)
	var allList = pageContext.pp_play;
	if(allList === undefined) {
		alert("Please make sure page is load complete or in qire playing page.")
		return;
	}
	
	var arr_url = decodeURIComponent(allList).split("$$$");
	var i =0;
	var j = 0;
	var text = ""
	for(i = 0; i < arr_url.length; i ++) {
		var urls = arr_url[i].split("+++");
		var url = "";
		var index = -1;
		for(j = 0; j < urls.length; j ++) {
			url = urls[j].split("++")[1];
			index = url.indexOf("bdhd");
			if(index == 0) {
				text = text + url + "\n";
			}
		}
	}
	
	//alert(text)
	const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                                   .getService(Components.interfaces.nsIClipboardHelper);
	gClipboardHelper.copyString(text);
  },
  
  showOrHideItems: function() {
	var show = document.getElementById("qire123helper.context.menu");
	//alert(window.content.location);
	var locationStr = window.content.location.toString();
	var index = locationStr.indexOf("http://www.qire123.com/videos/");
	//alert(index);
	if(index == 0) {
		//alert("show it");
		show.hidden = false;
	} else {
		//alert("hide it");
		show.hidden = true;
	}
  }
};

window.addEventListener("load", function(e) { Qire123Helper.onLoad(e); }, false); 
