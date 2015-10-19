angular.module('customerCtrl', ['customerService'])

.controller('customerController', function(Customer) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	// grab all the customers at page load
	Customer.all()
		.success(function(data) {

			// when all the customers come back, remove the processing variable
			vm.processing = false;

			// bind the customers that come back to vm.customers
			vm.customers = data;
		});

	// function to delete a customer
	vm.deleteCustomer = function(id) {
		vm.processing = true;

		Customer.delete(id)
			.success(function(data) {

				// get all customers to update the table
				// you can also set up your api 
				// to return the list of customers with the delete call
				Customer.all()
					.success(function(data) {
						vm.processing = false;
						vm.customers = data;
					});

			});
	};

})


// controller applied to customer creation page
.controller('customerCreateController', function(Customer) {
	
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
    //console.log(main.customer);
    
  //  vm.customerData.role=vm.dataRole.singleselect;
	// function to create a customer
	vm.saveCustomer = function() {
		vm.processing = true;
		vm.message = '';
					console.log(vm.customerData);

		// use the create function in the customerService
		Customer.create(vm.customerData)
			.success(function(data) {

				vm.processing = false;
				vm.customerData = {};
				vm.message = data.message;
			});
			
	};	

})
// controller applied to customer edit page
.controller('customerEditController', function($routeParams, Customer) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the customer data for the customer you want to edit
	// $routeParams is the way we grab data from the URL
	Customer.get($routeParams.customer_id)
		.success(function(data) {
			vm.customerData = data;
		});

	// function to save the customer
	vm.saveCustomer = function() {
		vm.processing = true;
		vm.message = '';
vm.dataRole = {

     multipleSelect: [],
     option1: 'Marketing',
     option2: 'Sales',
     option3:  'Admin',
    };	// call the customerService function to update 
		Customer.update($routeParams.customer_id, vm.customerData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.customerData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});
