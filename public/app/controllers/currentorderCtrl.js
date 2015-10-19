angular.module('currentorderCtrl', ['currentorderService'])

.controller('currentorderController', function(CurrentOrder) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the currentorders at page load
	CurrentOrder.all()
		.success(function(data) {

			// when all the currentorders come back, remove the processing variable
			vm.processing = false;

			// bind the currentorders that come back to vm.currentorders
			vm.currentorders = data;
		});

	// function to delete a currentorder
	vm.deleteCurrentOrder = function(id) {
		vm.processing = true;


		CurrentOrder.delete(id)
			.success(function(data) {

				// get all currentorders to update the table
				// you can also set up your api 
				// to return the list of currentorders with the delete call
				CurrentOrder.all()
					.success(function(data) {
						vm.processing = false;
						vm.currentorders = data;
					});

			});
	};

})


// controller applied to currentorder creation page
.controller('currentorderCreateController', function(CurrentOrder) {
	
	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'create';
vm.dataRole = {

     multipleSelect: [],
     option1: 'Marketing',
     option2: 'Sales',
     option3:  'Admin',
    };
    //console.log(main.currentorder);
    
  //  vm.currentorderData.role=vm.dataRole.singleselect;
	// function to create a currentorder
	vm.saveCurrentOrder = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the currentorderService
		CurrentOrder.create(vm.currentorderData)
			.success(function(data) {
				vm.processing = false;
				vm.currentorderData = {};
				vm.message = data.message;
			});
			
	};	

})
// controller applied to currentorder edit page
.controller('currentorderEditController', function($routeParams, CurrentOrder) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the currentorder data for the currentorder you want to edit
	// $routeParams is the way we grab data from the URL
	CurrentOrder.get($routeParams.currentorder_id)
		.success(function(data) {
			vm.currentorderData = data;
		});

	// function to save the currentorder
	vm.saveCurrentOrder = function() {
		vm.processing = true;
		vm.message = '';
vm.dataRole = {

     multipleSelect: [],
     option1: 'Marketing',
     option2: 'Sales',
     option3:  'Admin',
    };	// call the currentorderService function to update 
		CurrentOrder.update($routeParams.currentorder_id, vm.currentorderData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.currentorderData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});
