/**
 * @Event
 */ 
namespace('notes.events').SLIDES_LOADED = "ActivityModel.SLIDES_LOADED";


/**
 * Notes model, store informations about
 * slides in the application

 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
var NotesModel = EventDispatcher.extend({
	
	//Injected by the provider
	_routes:null,
	_location:null,
	_notesService:null,

	//Class Properties
	_currentSlide:0,
	_slides:null,


	/**
	* Start loading slides via load slide service
 	*/ 
	loadSlides:function(){
		this._notesService.loadSlides()
			.then(this._handleLoadSlidesSuccess.bind(this),this._handleLoadSlidesError.bind(this));
	},


	/**
     * Change current slide to previous one
     */ 
	nextSlide:function(){
		if(this._currentSlide<this._slides.length-1){
			this._currentSlide++;
		}else{
			this._currentSlide = 0;
		}
	},


	/**
     * Change current slide to previous one
     */ 
	previousSlide:function(){
		if(this._currentSlide>0){
			this._currentSlide--;
		}else{
			this._currentSlide = this._slides.length-1;
		}
	},


	/**
     * Change current application routes
     * to display next slide.
     * @param {error} 
     */ 
	showCurrentSlide:function(){
		this._location.path(this._slides[this._currentSlide].path).replace();
	},


	/**
     * Triggered when the user press a key
     * watch for left and right arrow keycoode
     * @param {object} result object returned from the server
     */ 
	_handleLoadSlidesSuccess:function(result){
		this._slides = result.data.slides;
		this._processRoutes();
	},


	/**
     * Triggered when the user press a key
     * watch for left and right arrow keycoode
     * @param {error} 
     */ 
	_handleLoadSlidesError:function(error){
		console.warn('NotesModel : Slide loading error')
	},


	/**
     * Process resulted data and add routes
     * in the application.
     * @param {error} 
     */ 
	_processRoutes:function(){
		var routeProvider = window.routeProvider;
		var slides = this._slides;

		//Loop all slide and add them to the routeProvider
		for(var i=0; i<slides.length; i++){
			routeProvider.when(slides[i].path, {templateUrl: slides[i].templateUrl, controller:eval(slides[i].controller)});
			if(slides[i].path == window.startHash){
				this._currentSlide = i;
			}
		}
		this._routes.reload();
		if(window.startHash)this._location.path(window.startHash).replace();
	}
});



/**
 * Activity model, provider since all activities
 * in the application use the same model
 *
 * @author tommy[followed by the usual sign]julo.ca
 */
(function (){

	var NotesModelProvider = Class.extend({

		instance: new NotesModel(),

		/**
    	 * Initialize and configure ActivtyModel
    	 * @return UserModel
     	*/ 
		$get:['$location','$route','NotesService',function($location,$route,NotesService){
			this.instance._routes = $route;
			this.instance._location = $location;
			this.instance._notesService = NotesService;
			return this.instance;
		}]
	})

	angular.module('notes.NotesModel',[])
		.provider('NotesModel',NotesModelProvider);
}());