var DealerLocator = function(context) {
	this.context = $(context);
	this.breakpoint = this.context.data("breakpoint");
	moment.locale(globalVar.language);
	this.now = 	moment();

	if (this.breakpoint == "mobile"){ this.breakpoint = 640 }
	if (this.breakpoint == "tablet"){ this.breakpoint = 768 }
	if (this.breakpoint == "desktop"){ this.breakpoint = 1024 }

	this.events();
	this.init();
};

DealerLocator.prototype.events = function(){
	var self = this;
	events.on('changeBreakpoint', function(data){
		//Do something on Change Breakpoint
	});
};

DealerLocator.prototype.init = function() {
	var self = this;
	inputAnimated(self.context.find(".input__animated input"));
	self.createMap(self.context.find(".map-container"));
	self.inputAutocomplete();
	self.eventListeners();
};

DealerLocator.prototype.createMap = function(mapContainer) {
	var options = this.context.data("map"),
		initLat = typeof(options.initialLat) !== "undefined" ? options.initialLat : 0,
		initLng = typeof(options.initialLng) !== "undefined" ? options.initialLng : 0,
		initZoom = typeof(options.initialZoom) !== "undefined" ? options.initialZoom : 4,
		defaultStyle = [{
			"featureType": "all", 
			"stylers": [{
				"saturation": -80
			}]
		}];

 	this.map = new google.maps.Map(mapContainer.get(0), {
		center: new google.maps.LatLng(initLat, initLng),
		zoom: initZoom,
		panControl : false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: false,
		overviewMapControl: false,
		rotateControl: false,
		scaleControl: true,
		streetViewControl: false,
		scrollwheel: false,
		mapTypeControl: false,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_RIGHT
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE
			//position: google.maps.ControlPosition.BOTTOM_RIGHT
		},
		styles: defaultStyle
	});
};

DealerLocator.prototype.inputAutocomplete = function() {
	var self = this,
		landingTextBox = this.context.find(".overlay .search-box input"),
		countryCode = globalVar.countryCode,
		blurTimeout;

	this.autoCompleter = new google.maps.places.Autocomplete(landingTextBox.get(0), {
		componentRestrictions: {country: countryCode},
		types: ['geocode']
	});

	google.maps.event.addListener(this.autoCompleter, 'place_changed', function() {
		clearTimeout(blurTimeout);
		var place = self.autoCompleter.getPlace();
		if (place.geometry !== undefined) {
			self.updateMyLocation(place.geometry.location.lat(), place.geometry.location.lng(), place.formatted_address);
			self.requestDealers();
		}
		else {
			var suggestions = $(".pac-item");
			if (suggestions.length) {
				suggestions = suggestions.eq(0);
				var suggestionsQuery = $.trim(suggestions.find(".pac-item-query").text()),
					toBeLocated = $.trim(suggestions.text());
					if ((suggestionsQuery != "") && (suggestionsQuery != toBeLocated))
						toBeLocated = toBeLocated.replace(suggestionsQuery, suggestionsQuery + ", ");
					locateAndSearch(toBeLocated);
					landingTextBox.val(toBeLocated);
			}
			else {
				checkZips(landingTextBox.val(), dealerLabels.errors_noLocationFound); // Oggetto solo name e niente lista: errore di non trovato
			}
		}
	});

	landingTextBox.on("blur", function(event) {
		clearTimeout(blurTimeout);
		blurTimeout = setTimeout(function() {
			var suggestions = $(".pac-item");
			if (suggestions.length) {
				suggestions = suggestions.eq(0);
				var suggestionsQuery = $.trim(suggestions.find(".pac-item-query").text()),
					toBeLocated = $.trim(suggestions.text());
				if ((suggestionsQuery != "") && (suggestionsQuery != toBeLocated))
					toBeLocated = toBeLocated.replace(suggestionsQuery, suggestionsQuery + ", ");
				self.locateAndSearch(toBeLocated);
				landingTextBox.val(toBeLocated);
			}
			else {
				var ssVal = $.trim(landingTextBox.val());
				if (ssVal != "") { // se la stringa è vuota o uguale al placeholder si ignora il click
					self.locateAndSearchFirstSuggestion(ssVal); // checkZips(ssVal, labels.noLocationFound); // cliccato search: stringa della textbox non valida, non si cerca niente e si dà errore
				}
			}
		}, 200);
	});
};

DealerLocator.prototype.eventListeners = function() {
	var self = this;

	self.context.on("click touchstart", ".map-container .marker", self.highlightMaker);
	self.context.on("click", ".results__cards .card__container", function() {
		var i = 0,
			defaultCenteringZoom = 15,
			_this = $(this),
			dealerIndex = parseInt($.trim(_this.find(".dealer--data .dealer--data__marker").text())),
			dealerMarker = null;

		$('.map-container .marker.selected, .card__container.selected').removeClass('selected');
		_this.addClass('selected');
		var markerClicked = $('.map-container .marker').filter(function() { 
			return $(this).attr("data-pos") == dealerIndex; 
		});

		markerClicked.addClass("selected");
		for (i = 0; i < self.validDealers.length; i++) { // Hiding the not-selected markers
			if (self.validDealers[i].index == dealerIndex) {
				dealerMarker = self.validDealers[i].marker;
				dealerMarker.setMap(self.map);
			}
		}
		self.centerOn(dealerMarker.getPosition(), defaultCenteringZoom); // Centering on the selected position
	});

	self.dealerTypes = self.dealersArray = [];
	self.context.on("click", ".filter-box input[type=checkbox]", function() {
		if (myLocationMarker != null) {
			var selected = [];
			$('.filter-box input[type=checkbox]:checked').each(function() {
   				 selected.push($(this).val());
			});
			self.filterDealersAndFitMap(selected);
		}
	}).find(".filter-box input[type=checkbox]").each(function() {
		self.dealerTypes.push(this.value);
		self.dealersArray[this.value] = [];
	});

	self.context.on("click", ".card__container .dealer--more__info", function() {
		var _this = $(this),
			dealerIndex = parseInt($.trim(_this.closest(".card__container").find(".dealer--data .dealer--data__marker").text()));
		//console.log(dealerIndex);
		self.setDealerDetails(dealerIndex);
		self.context.find(".dealer--additionalInfo").addClass("visible");
	});
	self.context.on("click", ".dealer--additionalInfo .btn-backList", function() {
		self.context.find(".dealer--additionalInfo").removeClass("visible");
	});
};

DealerLocator.prototype.centerOn = function (position, zoom) { // position is a google.maps.LatLng object, zoom is an integer - if zoom is undefined, it's not modified
	this.setCenter(position);
	// map.panTo(position);
	if (zoom !== undefined && zoom != this.map.getZoom())
		this.map.setZoom(zoom);
};

DealerLocator.prototype.setCenter = function (latlng, canvas, zoom) { // Zoom isn't mandatory
	var pnt,
		map = this.map;

	if (zoom === undefined)
		if (map != null)
			zoom = map.getZoom();
		else
			zoom = defaultCenteringZoom;

	map.setZoom(zoom);
	zoom = Math.pow(2, zoom);

	if (map != null) {
		tempMap = map;
		pnt = map.getProjection().fromLatLngToPoint(latlng);
	}
	else
		pnt = tempMap.getProjection().fromLatLngToPoint(latlng);
	
	if (canvas === undefined)
		canvas = {left:0, right:0, top:0, bottom:0};
	if (canvas.top === undefined)
		canvas.top = 0;
	if (canvas.bottom === undefined)
		canvas.bottom = 0;
	if (canvas.left === undefined)
		canvas.left = 0;
	if (canvas.right === undefined)
		canvas.right = 0;

	map.panTo(map.getProjection().fromPointToLatLng(
		new google.maps.Point(pnt.x + (canvas.right-canvas.left)/2/zoom, pnt.y + (canvas.bottom-canvas.top)/2/zoom))
	);
};

DealerLocator.prototype.filterDealersAndFitMap = function (typeArray) {
	/* Type is an array filled with "DEALER", "ORGANIZED", "GARAGE", "BODYSHOP", "QUATTROC" or combinations of these */
	var minLong = (myLocationMarker ? myLocationMarker.getPosition().lng() : 200),
		minLat = (myLocationMarker ? myLocationMarker.getPosition().lat() : 100),
		maxLong = (myLocationMarker ? myLocationMarker.getPosition().lng() : -200),
		maxLat = (myLocationMarker ? myLocationMarker.getPosition().lat() : -100),
		i = 0,
		self = this,
		firstFoundDistance = 0,
		lat, long; // distance of the first dealer of that type found in metres
		
	var filtered = [];
	// var results = JSLINQ(self.allDealers).Where(function(item) { 
	// 	return (item["DEALER"].VALUE == selected.DEALER && item["ORGANIZED"].VALUE == selected.ORGANIZED && item["GARAGE"].VALUE == selected.GARAGE && item["BODYSHOP"].VALUE == selected.BODYSHOP && item["QUATTROC"].VALUE == selected.QUATTROC)
	// 	//return (item[typeArray[type]].VALUE == 1)
	// });
	var results = JSLINQ(self.allDealers).Where(function(item) {
   		var ret = true,
    		typeIndex = typeArray.length;
   			while(typeIndex-- && ret)
    	if (item.SERVICES[typeArray[typeIndex]] === undefined)
     		ret = false;
   		return ret;
 	 });

	filtered = results.items;

	var currentDistance,
		searchMore = true;

	console.log(filtered, filtered.length);
	/* dealers are NOT considered for zoom adaptation if their ratio is higher than maxDealersRatio AND the absolute difference is higher than maxDealerDistancefromFirst km */
	
	for (i = 0; i < filtered.length; i++) {
		filtered[i].marker.setMap(self.map);
		filtered[i].index = i+1;
		$(filtered[i].marker.content).find("span").text(i+1);
		$(filtered[i].marker.content).attr("data-pos", i+1);
		if (searchMore) {
			currentDistance = Math.round(parseFloat(filtered[i].DISTANCE)/1000);
			if (!firstFoundDistance)
				firstFoundDistance = (currentDistance ? currentDistance : 0.1);
			if ((currentDistance / firstFoundDistance) < self.maxDealersRatio || (currentDistance - firstFoundDistance) < self.maxDealerDistancefromFirst) {
				long = filtered[i].marker.getPosition().lng();
				lat = filtered[i].marker.getPosition().lat();
				if (minLong > long) minLong = long;
				if (minLat > lat) minLat = lat;
				if (maxLong < long) maxLong = long;
				if (maxLat < lat) maxLat = lat;
			}
			else 
				searchMore = false;
		}
	}
	var diff = self.arrayDiff(self.allDealers, filtered);
	console.log(diff, diff.length)
	for (i = 0; i < diff.length; i++)
		diff[i].marker.setMap(null);
	
	if (firstFoundDistance) {
		self.map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(minLat, minLong), new google.maps.LatLng(maxLat, maxLong)));
	}
	else
		self.centerOn(new google.maps.LatLng(minLat, minLong), self.context.data("map").initialZoom);
	self.createResultList(filtered);
};

DealerLocator.prototype.locateAndSearchFirstSuggestion = function(string) {
	if (string != "") {
		new google.maps.places.AutocompleteService().getPlacePredictions({
			input: string,
			componentRestrictions: {country: this.countryCode},
			types: ['geocode']
		}, function (predictions, status) {
			/* Possible status
			INVALID_REQUEST - This request was invalid.
			OK - The response contains a valid result.
			OVER_QUERY_LIMIT - The application has gone over its request quota.
			REQUEST_DENIED - The application is not allowed to use the PlacesService.
			UNKNOWN_ERROR - The PlacesService request could not be processed due to a server error. The request may succeed if you try again.
			ZERO_RESULTS - No result was found for this request
			*/
			switch (status) {
				case google.maps.places.PlacesServiceStatus.OK:
					break;
				case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
					checkZips(string, labels.errors.noResultsFromGoogleGeocoder);
					break;
				case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
					showError(labels.errors.unknownGoogleError);
					break;
				case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
					showError(labels.errors.overQuotaGoogleError);
			}
		});
	}
};

DealerLocator.prototype.locateAndSearch = function(searchString) {
	var myLocationMarker,
		self = this;
	if (searchString != "") {
		new google.maps.Geocoder().geocode({address: searchString, region: this.countryCode}, function(results, status) {
			/*
			* Possibile status:
			* ERROR - There was a problem contacting the Google servers.
			* INVALID_REQUEST - This GeocoderRequest was invalid.
			* OK - The response contains a valid GeocoderResponse.
			* OVER_QUERY_LIMIT - The webpage has gone over the requests limit in too short a period of time.
			* REQUEST_DENIED - The webpage is not allowed to use the geocoder.
			* UNKNOWN_ERROR - A geocoding request could not be processed due to a server error. The request may succeed if you try again.
			* ZERO_RESULTS - No result was found for this GeocoderRequest.
			*/
		switch (status) {
			case google.maps.GeocoderStatus.OK:
				if (results.length) {
					var request = true;
					if (myLocationMarker && Math.floor(myLocationMarker.position.lat()*1000000) == Math.floor(results[0].geometry.location.lat()*1000000))
						request = false;
					self.updateMyLocation(results[0].geometry.location.lat(), results[0].geometry.location.lng(), searchString);
					if (request)
						self.requestDealers();
				}
				break;
			case google.maps.GeocoderStatus.ZERO_RESULTS:
				checkZips(searchString, labels.errors.noResultsFromGoogleGeocoder);
				break;
			case google.maps.GeocoderStatus.UNKNOWN_ERROR:
				showError(labels.errors.unknownGoogleError);
				break;
			case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
				showError(labels.errors.overQuotaGoogleError);
				break;
			case google.maps.GeocoderStatus.ERROR:
				showError(labels.errors.contactingGoogleError);
			};
		});
	}
};

DealerLocator.prototype.updateMyLocation = function (lat, lng, titleString) {
	//currentLocationString = titleString;
	var self = this;
	if (self.myLocationMarker)
		myLocationMarker.setMap(null);
	myLocationMarker = new google.maps.Marker ({
		position: new google.maps.LatLng(lat, lng),
		map: self.map,
		title: titleString
	});
};

DealerLocator.prototype.requestDealers = function () {
	/*var selectedFilters = this.context.find(".filter-box"),
		j = selectedFilters.length,
		temp = [];

		while(j--)
			temp[j] = selectedTypeFilters.eq(j).data("code");
		selectedTypeFilters = temp;
		delete temp;*/
	var self = this,
		marketCode = globalVar.marketCode,
		DLbaseUrl = globalVar.DLbaseUrl;

	self.validDealers = [];
	self.allDealers = [];
	self.dealerCard = self.createDealerCardTemplate();
	self.resultsResponse = self.context.find(".results__response");

	var data = {
		"mkt": marketCode,
		"brand": globalVar.brandCode,
		"rad": 100,
		"dlr": 1,
		"org": 1,
		"gar": 1,
		"bds": 1,
		"4c": 1,
		"func": "finddealerxml",
		"x": myLocationMarker.getPosition().lng(),
		"y": myLocationMarker.getPosition().lat()
	};
	self.dataSection = self.context.find(".results__cards");

	self.showLoader();
	console.log(data);
	$.ajax(DLbaseUrl, {
		jsonp:"jsonp",
		dataType:"jsonp",
		timeout	: 30000,
		data: data,
		success: function (data) {
			self.context.addClass("js-overlay-close");
			landingTextBox = self.context.find(".overlay .search-box");
			$(".console .search-box--inner").replaceWith(landingTextBox);
			self.removeLoader();
			self.dataSection.children().empty();
			//var selectedType = filtersContainer.find("input[type=checkbox]:checked").val();
			self.clearOverlays();
			if (!data.results)
				data.results = [];
			self.drawResults(data);
		},
		error: function() {
			showError (dealerLabels.errors_errorRetrievingDealers);
		}
	});
};

DealerLocator.prototype.drawResults = function (data, selectedType) {
	console.log(data)
	/* selectedType may be "DEALER", "ORGANIZED", "GARAGE" or "BODYSHOP", or combinations of these */
	var dealer,
		self = this,
		minLong = (myLocationMarker ? myLocationMarker.getPosition().lng() : 200),
		minLat = (myLocationMarker ? myLocationMarker.getPosition().lat() : 100),
		maxLong = (myLocationMarker ? myLocationMarker.getPosition().lng() : -200),
		maxLat = (myLocationMarker ? myLocationMarker.getPosition().lat() : -100),
		marker,
		dealerType = "",
		firstFoundDistance = 0, // distance of the first dealer of that type found in metres
		currentDistance,
		searchMore = true,
		index;
	
		// DEALER: Concessionari
		// GARAGE: Officine
		// ORGANIZED: Organizzati
		// BODYSHOP: Carrozzerie
	self.maxDealerDistancefromFirst = 6;
	self.maxDealersRatio = 1.2;
	

	var currentDealer, _this, thisType, thisDealer;
	if (data.results.length > 0)
		self.pushDealer(self.dealerTypes, data.results[0], 0);
	for (var i = 1; i < data.results.length; i++) {
		currentDealer = data.results[i];
		var j = 0, 
			found = false;
		while (j < self.allDealers.length && !found) {
			_this = self.allDealers[j];
			if (_this.SITECODE == currentDealer.SITECODE && _this.SINCOM == currentDealer.SINCOM) {
				for (var z = 0; z < self.dealerTypes.length; z++) {
					thisType = self.dealerTypes[z];
					if (currentDealer[thisType]) {
						_this.SERVICES[thisType] = {
							TEL_1 : $.trim(currentDealer.TEL_1),
							TEL_2 : $.trim(currentDealer.TEL_2),
							ACTIVITY : currentDealer.ACTIVITY,
							EMAIL : $.trim(currentDealer.EMAIL),
							FAX : $.trim(currentDealer.FAX),
							RESPONSIBI: $.trim(currentDealer.RESPONSIBI)
						}
						self.dealersArray[thisType].push(self.allDealers[index])
					}
				};
				found = true;
			}
			j++;
		}
		if (!found)
			self.pushDealer(self.dealerTypes, currentDealer, j);
			// google.maps.event.addListener(marker, 'click', function() // Complementare a $(".goBack").on("click"). Nasconde tutti i marker che non sono quello cliccato e ridimensiona la mappa, centrandola su quello scelto. Salva i dati di posizione per ripristinarli quando si clicca back
			// {
			// 	markerClickHandler(this);
			// });
			//dealerTypes.forEach() = "DEALER";
			//dealerType = getFilter(dealerType);
				/* self.dealersArray[dealerType]
					.push({
						index : i+1,
						marker : marker,
						ACTIVITY : dealer.ACTIVITY,
						COMPANYNAM : $.trim(dealer.COMPANYNAM),
						ADDRESS : $.trim(dealer.ADDRESS),
						ZIPCODE : $.trim(dealer.ZIPCODE),
						TOWN : $.trim(dealer.TOWN),
						PROVINCE : $.trim(dealer.PROVINCE),
						TEL_1 : $.trim(dealer.TEL_1),
						TEL_2 : $.trim(dealer.TEL_2),
						EMAIL : $.trim(dealer.EMAIL),
						FAX : $.trim(dealer.FAX),
						CAMPER : dealer.CAMPER,
						DISTANCE : dealer.DISTANCE,
						WEBSITE : $.trim(dealer.WEBSITE),
						SINCOM : $.trim(dealer.SINCOM),
						SITECODE : $.trim(dealer.SITECODE)
						}); */
			// self.allDealers.push({
			// 	index : i+1,
			// 	marker : marker,
			// 	ACTIVITY : dealer.ACTIVITY,
			// 	COMPANYNAM : $.trim(dealer.COMPANYNAM),
			// 	ADDRESS : $.trim(dealer.ADDRESS).toLowerCase(),
			// 	ZIPCODE : $.trim(dealer.ZIPCODE),
			// 	TOWN : $.trim(dealer.TOWN).toLowerCase(),
			// 	PROVINCE : $.trim(dealer.PROVINCE),
			// 	TEL_1 : $.trim(dealer.TEL_1),
			// 	TEL_2 : $.trim(dealer.TEL_2),
			// 	EMAIL : $.trim(dealer.EMAIL),
			// 	FAX : $.trim(dealer.FAX),
			// 	CAMPER : dealer.CAMPER,
			// 	DISTANCE : dealer.DISTANCE,
			// 	WEBSITE : $.trim(dealer.WEBSITE),
			// 	SINCOM : $.trim(dealer.SINCOM),
			// 	SITECODE : $.trim(dealer.SITECODE)
			// });
		if (searchMore) { /* dealers are NOT considered for zoom adaptation if their ratio is higher than maxDealersRatio AND the absolute difference is higher than maxDealerDistancefromFirst km */
			currentDistance = Math.round(parseFloat(currentDealer.DISTANCE)/100)/10;
			//console.log(firstFoundDistance);
			if (!firstFoundDistance)
				firstFoundDistance = (currentDistance?currentDistance:0.1);
			if ((currentDistance / firstFoundDistance) < self.maxDealersRatio || (currentDistance - firstFoundDistance) < self.maxDealerDistancefromFirst) {
				//if(NearestDealersCount < maxNearestDealersCount)
				if (minLong > currentDealer.XCOORD) minLong = currentDealer.XCOORD;
				if (minLat > currentDealer.YCOORD) minLat = currentDealer.YCOORD;
				if (maxLong < currentDealer.XCOORD) maxLong = currentDealer.XCOORD;
				if (maxLat < currentDealer.YCOORD) maxLat = currentDealer.YCOORD;
			}
			else
				searchMore = false;
				//NearestDealersCount++;
		}
	}
	console.log("DEALER", self.dealersArray["DEALER"].length)
	console.log("ORGANIZED", self.dealersArray["ORGANIZED"].length)
	console.log("GARAGE", self.dealersArray["GARAGE"].length)
	console.log("BODYSHOP", self.dealersArray["BODYSHOP"].length)
	console.log("QUATTROC", self.dealersArray["QUATTROC"].length)
	//console.log(self.allDealers, self.allDealers.length)
	self.createResultList(self.allDealers);
	// if (NearestDealersCount)
	if (firstFoundDistance) {
		//var html = '<div class="results__response"><span class="results__found">' + self.allDealers.length +'</span><span>' + dealerLabels.results_found + '</span></div>';
		//self.dataSection.prepend(html);
		self.dataSection.parent().fadeIn();
		self.map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(minLat, minLong), new google.maps.LatLng(maxLat, maxLong)));		
	}
	else {
		if (self.myLocationMarker)
			self.centerOn(new google.maps.LatLng(myLocationMarker.getPosition().lat(), myLocationMarker.getPosition().lng()), self.context.data("map").initialZoom);
		showError(dealerLabels.error_noDealerFound);
	}
};

DealerLocator.prototype.pushDealer = function(dealerTypes, currentDealer, index) {
	var self = this;
	var marker = new RichMarker ({
		position: (new google.maps.LatLng(currentDealer.YCOORD, currentDealer.XCOORD)),
		map: self.map,
		draggable: false,
		shadow: false,
		content: self.getMarkerHTML(index+1, index+1) // (String.fromCharCode(65+i),dealer.DEALER, dealer.ORGANIZED, dealer.GARAGE, dealer.BODYSHOP)
	});
	self.allDealers.push({
		index : index+1,
		marker : marker,
		SINCOM : $.trim(currentDealer.SINCOM),
		SITECODE : $.trim(currentDealer.SITECODE),
		DISTANCE : currentDealer.DISTANCE,
		COMPANYNAM : $.trim(currentDealer.COMPANYNAM),
		ADDRESS : $.trim(currentDealer.ADDRESS).toLowerCase(),
		ZIPCODE : $.trim(currentDealer.ZIPCODE),
		TOWN : $.trim(currentDealer.TOWN).toLowerCase(),
		PROVINCE : $.trim(currentDealer.PROVINCE),
		WEBSITE : $.trim(currentDealer.WEBSITE),
		SERVICES: {}
		/*DEALER : {
			VALUE: 0
		},
		GARAGE: { 
			VALUE: 0
		},
		BODYSHOP: { 
			VALUE: 0
		},
		ORGANIZED: { 
			VALUE: 0
		},
		QUATTROC: {
			VALUE: 0
		}*/
	});
	for (var z = 0; z < dealerTypes.length; z++) {
		thisType = dealerTypes[z];
		if (currentDealer[thisType]) {
			thisDealer = self.allDealers[index];
			thisDealer.SERVICES[thisType] = {
				TEL_1 : $.trim(currentDealer.TEL_1),
				TEL_2 : $.trim(currentDealer.TEL_2),
				ACTIVITY : currentDealer.ACTIVITY,
				EMAIL : $.trim(currentDealer.EMAIL),
				FAX : $.trim(currentDealer.FAX),
				RESPONSIBI: $.trim(currentDealer.RESPONSIBI)
			}
			self.dealersArray[thisType].push(self.allDealers[index])
		}
	};
};

DealerLocator.prototype.createDealerAdditionalInfo = function() {
	var detailHtml = '<div class="dealer--additionalInfo">';
	
	detailHtml += 	'<div class="btn-backList">';
	detailHtml += 		'<span>' + dealerLabels.results_back + '</span>';
	detailHtml += 	'</div>';
	detailHtml +=	'<div class="dealer--data">';
	detailHtml +=		'<p>';
	detailHtml +=			'<strong class="dealer--data__marker"></strong>. &nbsp;';
	detailHtml +=			'<strong class="dealer--data__name"></strong>';
	detailHtml +=		'</p>';
	detailHtml +=		'<p>';
	detailHtml +=			'<span class="dealer--data__address"></span>';
	detailHtml +=			'<br>';
	detailHtml +=			'<span class="dealer--data__city"></span>';
	detailHtml +=		'</p>';
	detailHtml +=		'<div class="dealer--more">';
	detailHtml +=			'<a href="#" class="dealer--more__directions" target="_blank">' + dealerLabels.card_direction + '</a>';
	detailHtml +=		'</div>';
	detailHtml +=	'</div>';
	detailHtml += 	'<div class="dealer--additionalInfo__contacts">';
	detailHtml += 		'<span>' + dealerLabels.card_contact + '</span>';
	detailHtml += 	'</div>';
	detailHtml += 	'<div class="dealer--additionalInfo__website">';
	detailHtml += 		'<a href="#" target="_blank">' + dealerLabels.card_website + '</a>';
	detailHtml += 	'</div>';
	detailHtml += 	'<div class="dealer--timetable">';
	//detailHtml += 		self.getTimetableTable(currentDealer);
	detailHtml += 	'</div>';
	detailHtml += 	'<div class="dealer--additionalInfo__stock">';
	detailHtml +=		'<a href="#" target="_blank">' + dealerLabels.card_stock + '</a>';
	detailHtml += 	'</div>';
	detailHtml += '</div>';
	
	this.context.find(".results .results__cards").append(detailHtml);
}

DealerLocator.prototype.createResultList = function(arrayData) {
	var self = this,
		i = arrayData.length,
		card;

	self.validDealers = arrayData;
	self.dataSection.empty();
		
	if (i) {
		while (i) {
			card = self.getDealerCard(--i);
			self.dataSection.prepend(card);
		}
		var html = '<div class="results__response"><span class="results__found">' + self.validDealers.length +'</span><span>' + dealerLabels.results_found + '</span></div>';
		self.dataSection.prepend(html);
	}
	self.createDealerAdditionalInfo();
};

DealerLocator.prototype.createDealerCardTemplate = function() {
	var html = '<div class="col-12 card__container">';
		html +=		'<div class="dealer--distance">';
		html += 		'<i class="ico sn-place"></i>' + dealerLabels.results_from + ' &nbsp;';
		html +=			'<span class="dealer--distance__value"></span>';
		html += 		' &nbsp;' + dealerLabels.results_unit;
		html +=		'</div>';
		html +=		'<div class="dealer--data">';
		html +=			'<p>';
		html +=				'<strong class="dealer--data__marker"></strong>. &nbsp;';
		html +=				'<strong class="dealer--data__name"></strong>';
		html +=			'</p>';
		html +=			'<p>';
		html +=				'<span class="dealer--data__address"></span>';
		html +=				'<br>';
		html +=				'<span class="dealer--data__city"></span>';
		html +=			'</p>';
		// html +=			'<p>';
		// html +=				'<span>';
		// html +=					dealerLabels.details_phone+':&nbsp;';
		// html +=				'</span>';
		// html +=				'<a class="dealer-phone" href="tel:">';
		// html +=					'<span></span>';
		// html +=				'</a>';
		// html +=				'<br>';
		// html +=				'<span>';
		// html +=					dealerLabels.details_fax+':&nbsp;';
		// html +=				'</span>';
		// html +=				'<a class="dealer-fax" href="tel:">';
		// html +=					'<span></span>';
		// html +=				'</a>';
		// html +=				'<br>';
		// html +=				'<a class="dealer-email" href="#">';
		// html +=					'<span></span>';
		// html +=				'</a>';
		// html +=			'</p>';
		html +=			'<p>';
		html +=				'<span class="dealer--data__opentime"></span>';
		html +=			'</p>';
		html +=		'</div>';
		html +=		'<div class="dealer--more">';
		html +=			'<div class="col-6">';
		html +=				'<a href="#" class="dealer--more__directions" target="_blank">' + dealerLabels.card_direction + '</a>';
		html +=			'</div>';
		html +=			'<div class="col-6">';
		html +=				'<span class="dealer--more__info">' + dealerLabels.card_info + '</span>';
		html +=			'</div>';
		html +=		'</div>';
		html +=	'</div>';
	return $(html);
};

DealerLocator.prototype.setDealerDetails = function(index) {
	var self = this,
		currentDealer = self.validDealers[index-1];

	var additionalInfo = self.context.find(".results .dealer--additionalInfo");
	additionalInfo.find(".dealer--timetable").html(self.getTimetableTable(currentDealer));
	additionalInfo.find(".dealer--data__marker").text(index);
	additionalInfo.find(".dealer--data__name").text(currentDealer.COMPANYNAM);
	additionalInfo.find(".dealer--data__address").text(currentDealer.ADDRESS);

	if (self.verifiedPresence(currentDealer.ADDRESS2))
		additionalInfo.find(".dealer--data__address").append("<br> " + currentDealer.ADDRESS2);
	if (self.verifiedPresence(currentDealer.ADDRESS3))
		additionalInfo.find(".dealer--data__address").append("<br> " + currentDealer.ADDRESS3);
	if ((currentDealer.TOWN !== undefined) && (currentDealer.TOWN !== null))
		additionalInfo.find(".dealer--data__city").text((currentDealer.ZIPCODE ? (currentDealer.ZIPCODE + " ") : "") + currentDealer.TOWN);
	else
		additionalInfo.find(".dealer--data__city").parent().remove();

	if (self.verifiedPresence(currentDealer.WEBSITE))
		additionalInfo.find(".dealer--additionalInfo__website a").attr("href", currentDealer.WEBSITE);
	else
		additionalInfo.find(".dealer--additionalInfo__website").remove();

	additionalInfo.find(".dealer--more__directions").attr("href", self.setGMapsExternalURL(myLocationMarker.get("title"), currentDealer.marker.position.lat() + "," + currentDealer.marker.position.lng()));
	//INSERIRE LINK STOCK LOCATOR PARAMETRIZZATO CORRETTAMENTE
	additionalInfo.find(".dealer--additionalInfo__stock a").attr("href", "#");
	//card.find(".dealer--data__opentime").html(self.getTimetableTodayStatus(currentDealer));
	//additionalInfo.addClass("visible");
	//card.append(detailHtml);
	//return card;
};

DealerLocator.prototype.getTimetableTodayStatus = function(currentDealer) {
	var html = "",
		self = this;
	for (serv in currentDealer.SERVICES) {
		var service = currentDealer.SERVICES[serv];
		if (service.ACTIVITY !== undefined) {
			html += '<div class="service__name">' + dealerLabels.businessHours_hours + ' ' + serv.toLowerCase();;
			for (act in service.ACTIVITY) {
				/*var opentimeArray = [];
				var activity = service.ACTIVITY[act];
				for (opentime in activity) {
					opentimeArray.push([opentime, activity[opentime]]);
					//console.log(opentime, activity[opentime]);
				}
				opentimeArray.sort(function(a, b) {
					return ((a[0] >= b[0]) ? 1 : -1);
				});
				for (var index = 1; index < opentimeArray.length; index++) {
					tableHtml += self.getTimetableRow(opentimeArray[index][1]);
				}*/
				html += self.getTimetableRow(service.ACTIVITY[act].OPENTIME1, true);
			}
			html += '</div>';
		}
	}
	return html;
};

DealerLocator.prototype.checkDealerOpen = function(opentime) {
	var date = opentime.DATE,
		now = this.now,
		// morningFrom = opentime.MORNING_FROM !== undefined ? opentime.MORNING_FROM : false,
		// morningTo = opentime.MORNING_TO !== undefined ? opentime.MORNING_TO : false,
		// afternoonFrom = opentime.AFTERNOON_FROM !== undefined ? opentime.AFTERNOON_FROM : false,
		// afternoonTo = opentime.AFTERNOON_TO !== undefined ? opentime.AFTERNOON_TO : false,

		isOpenMorning = false,
		isOpenAfternoon = false,
		isOpenAllDay = false;

		if (opentime.MORNING_FROM !== undefined && opentime.MORNING_TO !== undefined ) {
			isOpenMorning = moment(now).isBetween(moment(date + " " + opentime.MORNING_FROM), moment(date + " " + opentime.MORNING_TO));
		}
		if (opentime.AFTERNOON_FROM !== undefined && opentime.AFTERNOON_TO !== undefined ) {
			isOpenAfternoon = moment(now).isBetween(moment(date + " " + opentime.AFTERNOON_FROM), moment(date + " " + opentime.AFTERNOON_TO));
		}
		else if (opentime.MORNING_FROM !== undefined && opentime.AFTERNOON_TO !== undefined ) { // Orario continuato
			isOpenAllDay = moment(now).isBetween(moment(date + " " + opentime.MORNING_FROM), moment(date + " " + opentime.AFTERNOON_TO));
		}	
	//console.log(isOpenMorning || isOpenAfternoon || isOpenAllDay)
	return (isOpenMorning || isOpenAfternoon || isOpenAllDay);
}

DealerLocator.prototype.getTimetableTable = function(currentDealer) {
	var tableHtml = "",
		self = this;
	for (serv in currentDealer.SERVICES) {
		var service = currentDealer.SERVICES[serv];
		if (service.ACTIVITY !== undefined) {
			tableHtml += '<div class="service__name">' + dealerLabels.businessHours_hours + ' ' + serv.toLowerCase();
			for (act in service.ACTIVITY) {
				var opentimeArray = [];
				var activity = service.ACTIVITY[act];
				for (opentime in activity) {
					opentimeArray.push([opentime, activity[opentime]]);
					//console.log(opentime, activity[opentime]);
				}
				opentimeArray.sort(function(a, b) {
					return ((a[0] >= b[0]) ? 1 : -1);
				});
				for (var index = 1; index < opentimeArray.length; index++) {
					tableHtml += self.getTimetableRow(opentimeArray[index][1], false);
				}
			}
			tableHtml += '</div>';
		}
	}
	return tableHtml;
}

DealerLocator.prototype.getTimetableRow = function(opentime, checkIfOpen) {
	var self = this,
		noMorningFrom = (opentime.MORNING_FROM === undefined),
		noMorningTo = (opentime.MORNING_TO === undefined),
		noAfternoonFrom = (opentime.AFTERNOON_FROM === undefined),
		noAfternoonTo = (opentime.AFTERNOON_TO === undefined);
		rowHtml = "";

	if (checkIfOpen)
		rowHtml += '<p class="opentime ' + (self.checkDealerOpen(opentime) == true ? 'dealer--open' : 'dealer--closed') + '">';
	else
		rowHtml = '<p class="opentime">';
	
	rowHtml += '<span>' + moment(opentime.DATE, 'YYYYMMDD', true).format('ddd DD MMM') + ': </span>';
	if (!(noMorningFrom && noAfternoonTo && noAfternoonFrom && noMorningTo)) { // If there is no time for the day
		rowHtml += '<span>';
		if (!noMorningFrom)
			rowHtml += opentime.MORNING_FROM.replace(/(\d{2})(?!:)/,"$1:") + " - ";
		if (!noMorningTo)
			rowHtml += opentime.MORNING_TO.replace(/(\d{2})(?!:)/,"$1:") + "</span>";
		if (!noAfternoonFrom) {
			rowHtml += "<span class='opentime--cong'> " + dealerLabels.businessHours_cong + " </span>";
			rowHtml += "<span>" + opentime.AFTERNOON_FROM.replace(/(\d{2})(?!:)/,"$1:") + " - ";
		}
		if (!noAfternoonTo)
			rowHtml += opentime.AFTERNOON_TO.replace(/(\d{2})(?!:)/,"$1:") + '</span>';
	}
	else
		rowHtml += '<span>' + dealerLabels.businessHours_closed + ' </span>';
	rowHtml += '</p>';

	return rowHtml;
}

DealerLocator.prototype.getDealerCard = function (index) { // Index spans from 1 to dealers number
	var self = this,
		returnCard = self.dealerCard.clone(),
		currentDealer = self.validDealers[index];
	//returnCard.find(".dealer-distance").after("&nbsp;" + (currentDealers.Header.Unit !== undefined ? currentDealers.Header.Unit : "km"));
	returnCard.find(".dealer--data__marker").text(index+1);
	returnCard.find(".dealer--data__name").text(currentDealer.COMPANYNAM);
	returnCard.find(".dealer--distance__value").text(parseFloat((currentDealer.DISTANCE/1000).toFixed(2)));
	returnCard.find(".dealer--data__address").text(currentDealer.ADDRESS);

		if (self.verifiedPresence(currentDealer.ADDRESS2))
			returnCard.find(".dealer--data__address").append("<br> " + currentDealer.ADDRESS2);

		if (self.verifiedPresence(currentDealer.ADDRESS3))
			returnCard.find(".dealer--data__address").append("<br> " + currentDealer.ADDRESS3);
		if((currentDealer.TOWN!==undefined) && (currentDealer.TOWN!==null))
			returnCard.find(".dealer--data__city").text((currentDealer.ZIPCODE ? (currentDealer.ZIPCODE + " ") : "") + currentDealer.TOWN);
		else
			returnCard.find(".dealer--data__city").parent().remove();

		if((currentDealer.TEL_1!==undefined) && (currentDealer.TEL_1!==null))
			returnCard.find(".dealer-phone").attr("href","tel:" + currentDealer.TEL_1).find("span").text(currentDealer.TEL_1);
		else
			returnCard.find(".dealer-phone").prev().remove().next().remove();

		if (self.verifiedPresence(currentDealer.FAX))
			returnCard.find(".dealer-fax").attr("href","tel:" + currentDealer.FAX).find("span").text(currentDealer.FAX);
		else
			returnCard.find(".dealer-fax").hide().prev('span').hide().prev('br').hide();

		if(self.verifiedPresence(currentDealer.EMAIL))
			returnCard.find(".dealer-email").attr("href","mailto:" + currentDealer.EMAIL).find("span").text(currentDealer.EMAIL);
		else
			returnCard.find(".dealer-email").hide().prev('br').hide();
		returnCard.find(".dealer--more__directions").attr("href", self.setGMapsExternalURL(myLocationMarker.get("title"), currentDealer.marker.position.lat() + "," + currentDealer.marker.position.lng()));

	returnCard.find(".dealer--data__opentime").html(self.getTimetableTodayStatus(currentDealer));
	//self.setDealerDetails(currentDealer, returnCard);
	return returnCard;
};

DealerLocator.prototype.getMarkerHTML = function (label, pos) {
	var div = document.createElement("div"),
		span = document.createElement("span");
	div.setAttribute("class","marker");
	div.setAttribute("data-pos", pos);
	span.appendChild(document.createTextNode(label));
	div.appendChild(span);
	return div;
};

DealerLocator.prototype.highlightMaker = function() {
	var self = this;
	if(!$(this).hasClass('selected')) {
		var _this = $(this),
		markerId = _this.find('span').text();

		//resetto gli elementi selezionati:
		$(".map-container .marker.selected, .card__container.selected").removeClass('selected');
		//seleziono il marker e il dettaglio:
		_this.addClass('selected');
		$('.card__container').eq(markerId-1).addClass('selected');
		//scroll dei risultati:
		$('.results__cards').animate({
			scrollTop: $('.results__cards').scrollTop() + $('.card__container.selected').position().top}, 'slow');
	}
};

DealerLocator.prototype.getFilter = function (type) {
	/* Returns the generic radio button filter which contains the selected type.
	Type may be "DEALER", "ORGANIZED", "GARAGE" or "BODYSHOP"*/
	var i2,
		found = false,
		string = "";
	for (var i = 0; !found && (i < dealerFilterTypes.length); i++) {
		for (i2 = 0; !found && (i2 < dealerFilterTypes[i].split.length); i2++) {
			if (dealerFilterTypes[i].split[i2] == type) {
				string = dealerFilterTypes[i].string;
				found = true;
			}
		}
	}
	return string;
};

DealerLocator.prototype.showLoader = function() {
	$('<div class="velina-white loading"></div>')
		.insertAfter(".dealerlocator .console");
};

DealerLocator.prototype.removeLoader = function() {
	$('.velina-white.loading').remove();
};

DealerLocator.prototype.clearOverlays = function() {
	for (var i = 0; i < this.validDealers.length; i++)
		this.validDealers[i].marker.setMap(null);
	var i = 0;
	/*for (var attr in this.dealersArray) {
		for (i = 0; i < this.dealersArray[attr].length; i++)
			this.dealersArray[attr][i].marker.setMap(null);
			this.dealersArray[attr] = [];
		}*/
	this.allDealers = [];
};

DealerLocator.prototype.verifiedPresence = function(value) {
	return ((value !== undefined) && (value !== null));
};

DealerLocator.prototype.setGMapsExternalURL = function (sourceString, destinationString) {
	return "https://www.google.com/maps?" + (sourceString ? "saddr=" + encodeURI(sourceString) + "&" : "") + "daddr=" + destinationString + "&f=d";
};

DealerLocator.prototype.arrayDiff = function(a, b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

function inputAnimated(elements) {
	elements.each(function() {
		var _this = $(this);
	//in case the input is already filled..
		if (_this.val() !== ''){
			_this.next().addClass("input--filled");
		}
	//events:
		_this.on('focus', onInputFocus);
		_this.on('blur', onInputBlur);
	});
}

function onInputFocus(ev) {
	$(ev.target).next().addClass('input--filled');
}

function onInputBlur(ev) {
	target = $(ev.target);
	if (target.val() === '') {
		target.next().removeClass('input--filled');
	}
}

var dealer = new DealerLocator($(".dealer-container"));
//$(window).on("resize",function() { $(".map-container").height(window.outerHeight-$(".navigation").outerHeight()-$(".console").outerHeight()) }).trigger("resize");
