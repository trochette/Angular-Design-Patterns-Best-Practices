/**
 * Notes controller for basic keynote like presentation.
 * Used in Angular.js Advanced Design Patterns and Best Practices
 *
 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */

var NotesController = BaseController.extend({

	_notifications:null,
	_notesModel:null,
	

    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */  
	init:function($scope,NotesModel,Notifications,$route){
		this._notifications = Notifications;
		this._notesModel = NotesModel;
		this._super($scope)
		this._notesModel.loadSlides();
	},

	/**
     *@Override
     */ 
	defineListeners:function(){
		this._super();
		this._notifications.addEventListener(notes.slide.events.TRANSITION_END,this._handleSlideTransition.bind(this));
		this._notifications.addEventListener(ui.navigation.events.PREVIOUS,this._handleNavigationEvents.bind(this));
		this._notifications.addEventListener(ui.navigation.events.NEXT,this._handleNavigationEvents.bind(this));
	},

	/**
     *@Override
     */ 
	defineScope:function(){
		//Useless... for demo purpose
		this.$scope.instance="NotesController";
	},


	/**
     * Triggered when slide directive transition is over
     * @param {string} reference of the original event type
     */ 
	_handleSlideTransition:function(event){
		this._notesModel.showCurrentSlide();

		//Apply scoping change
		this.$scope.$apply();
	},


	/**
     * Triggered when a navigation directive event
     * is sent by the Notification service.
     * @param {string} reference of the original event type
     */ 
	_handleNavigationEvents:function(event){
		switch(event){
			case ui.navigation.events.NEXT:
				this._notesModel.nextSlide();
				break;
			case ui.navigation.events.PREVIOUS:
				this._notesModel.previousSlide();
				break;			
		}
	},


	/**
     *@Override
     */ 
	destroy:function(){
		this._notifications.removeEventListener(notes.slide.events.TRANSITION_END,this._handleTransitionEnd.bind(this));
		this._notifications.removeEventListener(ui.navigation.events.PREVIOUS,this._handleNavigationEvents.bind(this));
		this._notifications.removeEventListener(ui.navigation.events.NEXT,this._handleNavigationEvents.bind(this));
	}
})


NotesController.$inject = ['$scope','NotesModel','Notifications','$route'];