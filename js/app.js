
$(document).ready(function() {
	
	//SHOW-HIDE "ABOUT" OVERLAY
	$('#about').click(function(){
		$('.overlay').fadeIn(600);
	});

	$('.overlay-close').click(function(){
		$('.overlay').fadeOut(600);
	});

	//GENERATES SEARCH TERM FOR EACH CATEGORY
	$(function() {
		var searchTerms = ["Vintage Road Bicycle", "Road Bicycle clothing", "Road Bicycle art", "Road Bicycle accessories"];
		var clearMain = function(){
			$(".main").html("");
		}
    	
    	$('#general').click(function (event) {
	    	clearMain();
			event.preventDefault();
	        var term = searchTerms[0];
	        getRequest(term);
    	});

    	$('#clothing').click(function (event) {
	    	clearMain();
	        event.preventDefault();
	        var term = searchTerms[1];
	        getRequest(term);
    	});

    	$('#art').click(function (event) {
	    	clearMain();
	        event.preventDefault();
	        var term = searchTerms[2];
	        getRequest(term);
    	});

    	$('#accessories').click(function (event) {
	    	clearMain();
	        event.preventDefault();
	        var term = searchTerms[3];
	        getRequest(term);
    	});
	});

	//SENDS REQUEST TO ETSY API AND APPENDS RESULTS
	function getRequest(term) {
	    var key = "jjwegsuimkoaidweq9ev4d5p";
	    var url = "https://openapi.etsy.com/v2/listings/active.js?keywords=" + term + "&limit=21&includes=Images:1&api_key=" + key;

	    $.ajax({
			url: url,
			dataType: "jsonp",
			type: "GET",
		})

		.done(function(data){
			//For each...
			$.each(data.results, function(i, item) {
				var results = showResults(item);
				$('header p').hide();
				$('.main').append(results).fadeIn(300);
			});
		});
	}

	//FORMATS REQUESTED DATA INTO .STORE-ITEM
	function showResults(item) {

		var listingBlock = $('.templates .store-item').clone(); // .templates had to be selected before 21 would show up??

		var itemImage = listingBlock.find('.item-img');
		itemImage.attr('src', item.Images[0].url_170x135);

		var listingTitle = listingBlock.find('.title');
		listingTitle.text(item.title);

		var listingLink = listingBlock.find('.listing');
		listingLink.attr('href', item.url);

		var listingPrice = listingBlock.find('.price');
		listingPrice.text(item.price + " " + item.currency_code);

		return listingBlock;
	}
});