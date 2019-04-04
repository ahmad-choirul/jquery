var CapLoader = function(context, fn){
	this.capField = $(context).find(".js-cap-control input");
	this.callback = fn;
	this.observe();
};
CapLoader.prototype.observe = function(){
	this.capField.on("blur", $.proxy(this.callLoading, this));
};
CapLoader.prototype.callLoading = function(){
	if(typeof this.callback == "function"){
		this.callback.call(null, this)
	}
};
// configuratore per template
var Journey = function(context, fn){

	this.containerJourney = $(context);
	this.steps = $(context).find("step");
	this.stepOptions = {};
	this.options = {};
	this.callback = fn;
	this.popolateSteps();

	// $.extend(this.options, this.stepOptions);

	// 	numstep: 1,
	// 	steps: {
	// 		1: {
	// 			validation: "??",
	// 			display: "visibile"	
	// 		},
	// 		2: {
	// 			validation: "??",
	// 			display: "hidden"	
	// 		},
	// 		3: {
	// 			validation: "??",
	// 			display: "hidden"	
	// 		}
	// 	}
	// }
};
Journey.prototype.popolateSteps = function(){
	this.steps.each(function(i,el){
		console.log(i,el)
	});
};
Journey.prototype.extendOptions = function(){
	this.stepOptions.numSteps = this.steps.length;
};


var journey = new Journey(".tab-content[data-tab='informazioni']");
var loader = new CapLoader(".tab-content[data-tab='informazioni']");
// loader


var FormAccordion = function(btn){
	this.button = $(btn);
	this.field = this.button.parent(".input-inline");
	this.accordion = this.field.next(".accordion-form");
};
FormAccordion.prototype.observe = function(){
	this.button.on("click", $.proxy(this.toggle , this))
};
FormAccordion.prototype.toggle = function(){
	if( this.accordion.hasClass("js-close") ){
		this.accordion.slideDown(250, function(){
			$(this).removeClass("js-close");
		});
	}else{
		this.accordion.slideUp(250, function(){
			$(this).addClass("js-close");
		});
	}
};

// init
$(".btn--link").each(function(){
	var formAccordion = new FormAccordion(this);
});
$(".dealers__inner").owlCarousel({
	items: 4
})
;
