/**
 * @Events
 */ 
namespace('notes.slide.events').TRANSITION_END = "ui.navigation.events.TRANSITION_END";

/**
 * @Static Var
 */ 
namespace('notes.slide').CURRENT_MODE = "";

/**
 * Slide directive used to display and transitions slide
 * Used in Angular.js Advanced Design Patterns and Best Practices
 *
 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
var SlideDirective = BaseController.extend({//Extending base controller in this specific project, you should create a base directive instead.

	_notifications:null,
	_elm:null,

   	/**
     * @override
     */  
	init:function($scope,$elm,notifications){
		this._notifications = notifications;
		this._elm = $elm;
		this._super($scope);

		//setInitialClass
		if(notes.slide.CURRENT_MODE==ui.navigation.events.PREVIOUS){
			this._elm.addClass('past');
		}else{
			this._elm.addClass('future');
		}


		//Delay transition by 1ms to let browser set past or future styles
		setTimeout(function(){
			this._elm.removeClass('future');
			this._elm.removeClass('past');
			this._elm.addClass('present');
			this._elm.addClass('transition');
		}.bind(this),1);
	},


	/**
     * @override
     */ 
	defineListeners:function(){
		this._notifications.addEventListener(ui.navigation.events.PREVIOUS,this._handleNavigationEvents.bind(this));
		this._notifications.addEventListener(ui.navigation.events.NEXT,this._handleNavigationEvents.bind(this));
	},


	/**
     * @override
     */ 
	defineScope:function(){
		//Useless... for demo purpose
		this.$scope.instance="SlideDirective";
	},


	/**
     * Triggered when a navigation directive event
     * is sent by the Notification service.
     * @param {string} reference of the original event type
     */ 
	_handleNavigationEvents:function(type){
		switch(type){
			case ui.navigation.events.NEXT:
				this._elm.removeClass('present').addClass('past');
				break;
			case ui.navigation.events.PREVIOUS:
				this._elm.removeClass('present').addClass('future');
				break;			
		}

		notes.slide.CURRENT_MODE = type;

		this._elm.on('webkitTransitionEnd.slide',this._handleTransitionEnd.bind(this));
		this._elm.on('msTransitionEnd.slide',this._handleTransitionEnd.bind(this));
		this._elm.on('oTransitionEnd.slide',this._handleTransitionEnd.bind(this));
		this._elm.on('transitionend.slide',this._handleTransitionEnd.bind(this));
	},


	/**
     * Triggered when the user click on the forward
     * button or when KeyboardEvent.RIGHT_ARROW is fired
     * @param {object} reference of the transition end event
     */ 
	_handleTransitionEnd:function(event){
		this._elm.off('webkitTransitionEnd');
		this._elm.off('msTransitionEnd');
		this._elm.off('oTransitionEnd');
		this._elm.off('transitionend');

		this._notifications.notify(notes.slide.events.TRANSITION_END);
	},


	/**
     * @override
     */ 
	destroy:function(event){
		this._elm.off('webkitTransitionEnd');
		this._elm.off('msTransitionEnd');
		this._elm.off('oTransitionEnd');
		this._elm.off('transitionend');
		this._notifications.removeEventListener(ui.navigation.events.PREVIOUS,this._handleNavigationEvents);
		this._notifications.removeEventListener(ui.navigation.events.NEXT,this._handleNavigationEvents);
	}
})


/**
 * Set Angular directive base on the class above,
 * this gives us a lot more flexibility and permits
 * inheritance over Directives. Hovever this is only recommanded
 * in specific cases, usually composition is better.
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
angular.module('notes.slide',[])
	.directive('slide',['Notifications',function(Notifications){
		return {
			restrict:'C',
			isolate:true,
			link: function($scope,$elm,$attrs){
				new SlideDirective($scope,$elm,Notifications);
			},
			scope:true
		}
	}])