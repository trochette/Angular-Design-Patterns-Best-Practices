/**
 * @Events
 */ 
namespace('ui.navigation.events').PREVIOUS = "ui.navigation.events.PREVIOUS";
/**
 * @Events
 */ 
namespace('ui.navigation.events').NEXT = "ui.navigation.events.NEXT";

/**
 * Navigation Directive for basic keynote like presentation.
 * Handle all navigation events from mouse and keyboard
 * Used in Angular.js Advanced Design Patterns and Best Practices
 *
 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
var NavigationDirective = BaseController.extend({
	_notifications:null,

   	/**
     * @override
     */  
	init:function(scope,notifications){
		this._super(scope);
		this._notifications = notifications;
	},


	/**
     * @override
     */ 
	defineListeners:function(){
		$(window).on('keydown.navigation',this._handleKeyBoardEvent.bind(this));
	},


	/**
     * @override
     */ 
	defineScope:function(){
		//Useless... for demo purpose
		this.$scope.instance="NavigationDirective";

		//Bind scope to class function since they are fired by both.
		this.$scope.nextPage = this.nextPage.bind(this);		
		this.$scope.previousPage = this.previousPage.bind(this);
	},


	/**
     * Triggered when the user click on the backward
     * button or when KeyboardEvent.LEFT_ARROW is fired
     */ 
	previousPage:function(){
		this._notifications.notify(ui.navigation.events.PREVIOUS);
	},


	/**
     * Triggered when the user click on the forward
     * button or when KeyboardEvent.RIGHT_ARROW is fired
     */ 
	nextPage:function(){
		this._notifications.notify(ui.navigation.events.NEXT);
	},


	/**
     * Triggered when the user press a key
     * watch for left and right arrow keycoode
     * @param {object} event triggered by keydown
     */ 
	_handleKeyBoardEvent:function(event){
		switch(event.keyCode){
			case 37:
				this.previousPage();
				break;
			case 39:
				this.nextPage();
				break;
		}
	}
})


/**
 * Set Angular directive base on the class above,
 * this gives us a lot more flexibility and permits
 * inheritance over Directives this this is not recommanded,
 * with directive composition is better.
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
angular.module('navigation',[])
	.directive('navigation',['Notifications',function(Notifications){

		return {
			restrict:'A',
			isolate:true,
			link: function($scope,$elm,$attrs){
				new NavigationDirective($scope,Notifications);
			},
			scope:true
		}
	}])