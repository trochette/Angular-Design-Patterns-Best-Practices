/**
 * Notes controller for basic keynote like presentation.
 * Used in Angular.js Advanced Design Patterns and Best Practices
 *
 * Use of Class.js
 *
 * @author tommy.rochette[followed by the usual sign]universalmind.com
 */

var SlideController = BaseController.extend({

    /**
     * Initialize Notes Controller
     * @param $scope, current controller scope
     */  
	init:function(scope){
		this._super(scope)
	},

	/**
     * Use this function to define all scope objects.
     * Give a way to instantaly view whats available
     * publicly on the scope.
     */ 
	defineScope:function(){
		//Useless... for demo purpose
		this.$scope.instance="SlideController";
	}
})


SlideController.$inject = ['$scope'];