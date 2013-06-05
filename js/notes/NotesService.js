/**
 * Notes service, bridge the gap between server and current application.
 * For this demo it only fetch mock but this could be quickly changed
 * for a RESTful api.
 * Used in Angular.js Advanced Design Patterns and Best Practices
 *
 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
var NoteService = Class.extend({

	LOAD_SLIDES_URL:'mocks/slides.json',

	/**
	 * Query server and returns us slideshow
	 * information.
	 * @return Service handler
 	 */ 
	loadSlides:function(){
		return this.$http.get(this.LOAD_SLIDES_URL);
	}
});



/**
 * Notes model provider since the application can
 * only handle one presentation at the same time.
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */
(function (){

	var NoteServiceProvider = Class.extend({

		instance: new NoteService(),

		/**
    	 * Initialize and configure UserModel
    	 * @return UserModel
     	*/ 
		$get:['$http',function($http){
			this.instance.$http = $http;
			return this.instance;
		}]
	})

	angular.module('notes.NotesService',[])
		.provider('NotesService',NoteServiceProvider);
}());