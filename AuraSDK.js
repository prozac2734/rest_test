// JavaScript source code

// Registering Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
}

function AuraSDK() {
    var uri;
}

function showLoading(show){

	if(show){
		document.getElementById("over").style.display = "block";
		document.getElementById("layout").style.display = "block";
	}
	else
	{
		document.getElementById("over").style.display = "none";
		document.getElementById("layout").style.display = "none";
	}
}

 function openwin(obj) {
   
    OpenWindow=window.open("", "newwin", "height=500, width=500,toolbar=no,scrollbars="+scroll+",menubar=no");
   
    OpenWindow.document.write("<TITLE>List</TITLE>")
   
    OpenWindow.document.write("<BODY BGCOLOR=#ffffff>")
   
    OpenWindow.document.write("<h1 style=\"color:rgb(255, 0, 0);\">Connect device</h1>")
    
	var keys = [];
	for(var k in obj) keys.push(k);
	var i;
	for(i = 0; i < keys.length -1; i++){
		OpenWindow.document.write("<p>" + keys[i] +"</p>")
		OpenWindow.document.write("<ul>")
		OpenWindow.document.write("<li> width = "+ obj[keys[i]].width +"</li>")
		OpenWindow.document.write("<li> height = "+ obj[keys[i]].height +"</li>")
		OpenWindow.document.write("<li> count = "+ obj[keys[i]].count +"</li>")
		OpenWindow.document.write("</ul>")
	}
    OpenWindow.document.write("</BODY>")
   
    OpenWindow.document.write("</HTML>")
   
    OpenWindow.document.close()
   
}

 function openxywin(obj) {
   
    OpenWindow=window.open("", "newwin", "height=500, width=500,toolbar=no,scrollbars="+scroll+",menubar=no");
   
    OpenWindow.document.write("<TITLE>List</TITLE>")
   
    OpenWindow.document.write("<BODY BGCOLOR=#ffffff>")
   
    OpenWindow.document.write("<h1 style=\"color:rgb(255, 0, 0);\">Connect device</h1>")
    
	var keys = [];
	for(var k in obj) keys.push(k);
	var i;
	for(i = 0; i < keys.length -1; i++){
		OpenWindow.document.write("<p>" + keys[i] +"</p>")
		OpenWindow.document.write("<ul>")
		OpenWindow.document.write("<li> x = "+ obj[keys[i]].x + ", y = "+ obj[keys[i]].y + "</li>")
		OpenWindow.document.write("</ul>")
	}
    OpenWindow.document.write("</BODY>")
   
    OpenWindow.document.write("</HTML>")
   
    OpenWindow.document.close()
   
}

 function openfailwin() {
   
    OpenWindow=window.open("", "newwin", "height=500, width=500,toolbar=no,scrollbars="+scroll+",menubar=no");
   
    OpenWindow.document.write("<TITLE>List</TITLE>")
   
    OpenWindow.document.write("<BODY BGCOLOR=#ffffff>")
   
    OpenWindow.document.write("<h1 style=\"color:rgb(255, 0, 0);\">SDK not init</h1>")
    
    OpenWindow.document.write("</BODY>")
   
    OpenWindow.document.write("</HTML>")
   
    OpenWindow.document.close()
   
}

function urldecode(str) {
   return decodeURIComponent(str);
}

function getRootPath() {
	var curPageUrl = window.document.location.href;
	var rootPath = curPageUrl.split("///");
	var rootPath1 = rootPath[1].split("AuraSDKSample");
	return urldecode(rootPath1[0]);
}

AuraSDK.prototype = {
    init: function () {
		showLoading(true);
        var request = new XMLHttpRequest();
        request.open("POST", "http://127.0.0.1:27339/AuraSDK", true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
            "category": "GameEvent",
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
				showLoading(false);
            }
        }
    },
    uninit: function () {
        var request = new XMLHttpRequest();
        request.open("DELETE", "http://127.0.0.1:27339/AuraSDK", true);

        request.setRequestHeader("content-type", "application/json");
		
        request.send(null);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
				result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
    },
	sdkinit: function () {
		showLoading(true);
        var request = new XMLHttpRequest();
        request.open("POST", "http://127.0.0.1:27339/AuraSDK", true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
            "category": "SDK",
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
				showLoading(false);
            }
        }
    },
    listdevice: function () {
        var request = new XMLHttpRequest();
        request.open("GET", "http://127.0.0.1:27339/AuraSDK/AuraDevice", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(null);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
				var obj = JSON.parse(request.responseText);
				var result = obj["result"];
				if (parseInt(result, 10) == 0)
				{
					//console.log(Object.keys(obj));
					openwin(obj);				
				}
				else
				{
					openfailwin();
				}
			}
        }
    },
	queryLayout: function () {
        var request = new XMLHttpRequest();

        request.open("GET", "http://127.0.0.1:27339/AuraSDK/NB_Keyboard/layout", true);

        request.setRequestHeader("content-type", "application/json");

        request.send(null);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
				var obj = JSON.parse(request.responseText);
				var result = obj["result"];
				if (parseInt(result, 10) == 0)
				{
					//console.log(Object.keys(obj));
					openxywin(obj);				
				}
				else
				{
					openfailwin();
				}
			}
        }
    },
	setallcolor: function () {
        var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/AuraDevice";
        request.open("PUT", path, true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
			"data": [
				{
					"device": "NB_Keyboard",
					"range": "all",
					"color": "65280",
					"apply": "true"
				},
				{
					"device": "Mouse",
					"range": "all",
					"color": "65280",
					"apply": "false"
				},
			]
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
    },
    apply: function () {
        var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/AuraDevice";
        request.open("PUT", path, true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
			"data": [
				{
					"device": "NB_Keyboard",
					"apply": "true"
				},
				{
					"device": "Mouse",
					"apply": "true"
				},
			]
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
    },
    setCustomkey: function () {
        var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/AuraDevice";
        request.open("PUT", path, true);

        request.setRequestHeader("content-type", "application/json");

        var data = JSON.stringify({
			"data": [
				{
					"device": "NB_Keyboard",
					"range": "custom",
					"x": "4",
					"y": "4",
					"color": "255",
					"apply": "true"
				},
				{
					"device": "Mouse",
					"range": "custom",
					"x": "0",
					"y": "0",
					"color": "255",
					"apply": "false"
				},
				{
					"device": "NB_Keyboard",
					"range": "custom",
					"keycode": ["59", "60"],
					"color": "255",
					"apply": "false"
				},
			]
        });

        request.send(data);

        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
    },
	stopanimation: function (device) {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/" + device + "/animation";
		request.open("DELETE", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		request.send(null);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
    },
	sendEvent: function (name) {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event";
		const myobject = { event: name }
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify(myobject);

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	bindHealthEvent: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/bind_event";

		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify({
            "event": "Health",
        });

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	bindhotkeyEvent: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/bind_event";
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify({
            "event": "Hotkey",
			"hotkey_data": [
				{
					"keycode": ["36", "38"],
					"color": "-1"
				},
				{
					"keycode": ["37"],
					"color": "-1"
				},
			]
        });

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	UpdateEvent: function (name, parameter) {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event";
		const myobject = { event: name, health_data: parameter }
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify(myobject);

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	hotkeyEvent_flash: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event";

		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify({
            "event": "Hotkey",
			"hotkey_data": [
				{
					"keycode": ["36", "38"],
					"color": "255",
					"behavior": "flashing"
				},
				{
					"keycode": ["37"],
					"color": "16711680",
					"behavior": "flashing"
				},
			]
        });

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	hotkeyEvent_nonflash: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event";

		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify({
            "event": "Hotkey",
			"hotkey_data": [
				{
					"keycode": ["36", "38"],
					"color": "65280",
				},
				{
					"keycode": ["37"],
					"color": "16711680",
				},
			]
        });

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	register_loopEvent: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/register_event";
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var content = {
            "event": "circle",
			"type": "Loop",
			"data": "",
        };

		content.data = getRootPath() + "colorful.gif";
		
		var data = JSON.stringify(content)
        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	send_registerloopEvent: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event";
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify({
            "event": "circle",
        });

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	register_oneshotEvent: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/register_event";
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var content = {
            "event": "ripple",
			"type": "Oneshot",
			"data": "",
        };

		content.data = getRootPath() + "Ripple-1s-200px.gif";
		
		var data = JSON.stringify(content)
        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	send_registeroneshotEvent: function () {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event";
		request.open("POST", path, true);

		request.setRequestHeader("content-type", "application/json");
		
		var data = JSON.stringify({
            "event": "ripple",
        });

        request.send(data);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
	delete_Event: function (name) {
		var request = new XMLHttpRequest();
		var path =  "http://127.0.0.1:27339/AuraSDK/Event/" + name;
		request.open("DELETE", path, true);

		request.setRequestHeader("content-type", "application/json");
		
        request.send(null);
		
		request.onreadystatechange = function () {
            if (request.readyState == 4) {
                result = JSON.parse(request.responseText)["result"];
                console.log(result);
            }
        }
	},
}