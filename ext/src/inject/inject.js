chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      // alert("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------

			addMindfulness();
    }
  }, 10);
});

function addMindfulness(){
	console.log("addMindfulness");

	var parentNode = document.getElementById("add-to-cart-button").parentNode.parentNode.parentNode;
	parentNode.innerHTML += "\
	<div id='mndfl-wrapper'>\
		<div id='mndfl-loaded' style='color: #888; text-align: center; font-style: italic;'>Mindfulness loaded.</div>\
	</div>\
	";

	document.getElementById("add-to-cart-button").onclick = function(purchaseEvent) {
		console.log("clicked 'add to cart' button");
		injectHTMLOverlay();
		return false;
	};
}

function injectHTMLOverlay(){
	document.getElementById("mndfl-wrapper").innerHTML = "\
		<div id='mndfl-confirm' style='font-size: 2em; text-color: #333; line-height: 1.4em;'>\
			<div>Are you sure you want to buy this product?</div>\
			<div>\
				<span><a href='#' id='mndfl-buy'>Buy!</a></span>\
				or \
				<span><a href='https://www.youtube.com/watch?v=SPNltn7QgoE' target='_blank'>Not now</a></span>\
			</div>\
			<div>&nbsp;</div>\
		</div>\
		";
		document.getElementById('mndfl-buy').onclick = function(e){
			mndfl_buy();
		}
}

function mndfl_buy(){
	document.getElementById("add-to-cart-button").onclick = null;
	document.getElementById("add-to-cart-button").click();
}
