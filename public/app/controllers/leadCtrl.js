angular.module('leadCtrl', ['leadService','chart.js'])

.controller('leadController', function(Lead) {

	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;
vm.noticed=[];
	// grab all the leads at page load
	Lead.all()
		.success(function(data) {

			// when all the leads come back, remove the processing variable
			vm.processing = false;

			// bind the leads that come back to vm.leads
			vm.leads = data;
		//	console.log(vm.leads);
			vm.leads=vm.notifier(vm.leads);
			//console.log(vm.noticed[0]);
			
		});
		
vm.notifier=function(leads){
	//console.log(leads);
	var su=[];
	angular.forEach(leads, function(lead){

		angular.forEach(lead.notifications,function(x){
		
			if(Date.parse(x.bandh)>(new Date()).getTime()){
				
				vm.noticed.push(lead);
				lead.isMarked=true;
												//console.log(x.bandh>Date());
			};
			if(Date.parse(x.bandh)<(new Date()).getTime()){
								//console.log(x.bandh<Date());
				lead.isMarked=false;
			};
		});
		su.push(lead);
	});
	console.log(vm.noticed);
	return su;
};
	// function to delete a lead
	vm.deleteLead = function(id) {
		vm.processing = true;

		Lead.delete(id)
			.success(function(data) {

				// get all leads to update the table
				// you can also set up your api 
				// to return the list of leads with the delete call
				Lead.all()
					.success(function(data) {
						vm.processing = false;
						vm.leads = data;
					});

			});
	};
	//1 /analyze
	 vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
  vm.series = ['Series A', 'Series B'];
  vm.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  vm.onClick = function (points, evt) {
    console.log(points, evt);
  };
  
  //2 /analyze
  
  vm.labelsx =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

  vm.datax = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
   vm.labelsy = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  vm.datay = [300, 500, 100];
  
   vm.labelsz = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
  vm.dataz = [300, 500, 100, 40, 120];

})


// controller applied to lead creation page
.controller('leadCreateController', function(Lead) {
	
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
    //console.log(main.lead);
    
  //  vm.leadData.role=vm.dataRole.singleselect;
	// function to create a lead
	vm.saveLead = function() {
		vm.processing = true;
		vm.message = '';

		// use the create function in the leadService
		Lead.create(vm.leadData)
			.success(function(data) {
				vm.processing = false;
				vm.leadData = {};
				vm.message = data.message;
			});
			
	};	


})
// controller applied to lead edit page
.controller('leadEditController', function($routeParams, Lead) {

	var vm = this;

	// variable to hide/show elements of the view
	// differentiates between create or edit pages
	vm.type = 'edit';

	// get the lead data for the lead you want to edit
	// $routeParams is the way we grab data from the URL
	Lead.get($routeParams.lead_id)
		.success(function(data) {
			vm.leadData = data;
			console.log(vm.leadData.notifications[0].chalu);
			vm.inner(vm.leadData.notifications);
		});
vm.inner=function(data){
console.log(data);
}
	// function to save the lead
	vm.saveLead = function() {
		vm.processing = true;
		vm.message = '';
vm.dataRole = {

     multipleSelect: [],
     option1: 'Marketing',
     option2: 'Sales',
     option3:  'Admin',
    };	// call the leadService function to update 
		Lead.update($routeParams.lead_id, vm.leadData)
			.success(function(data) {
				vm.processing = false;

				// clear the form
				vm.leadData = {};

				// bind the message from our API to vm.message
				vm.message = data.message;
			});
	};

});
