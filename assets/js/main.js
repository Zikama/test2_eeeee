
	const g=k=>document.querySelector(k);
	const gA=k=>document.querySelectorAll(k);
	
	function toggleActive() {
		let tabs = gA(".f_tab");
		for (tab of tabs) {
			tab.addEventListener("click",(e)=>{
				// Prevent the form from submiting unless the submit button is clicked
				e.preventDefault();

				target = e.target;

				let prevBtn = target.previousElementSibling;
				let nextBtn = target.nextElementSibling;

				if (prevBtn&&prevBtn.classList.contains("f_active_tab")){
					prevBtn.classList.remove("f_active_tab");
				}

				if (prevBtn&&prevBtn.previousElementSibling){
					if (prevBtn.previousElementSibling.classList.contains("f_active_tab")) {
						prevBtn.previousElementSibling.classList.remove("f_active_tab")
					}
				}

				if (nextBtn&&nextBtn.classList.contains("f_active_tab")){
					nextBtn.classList.remove("f_active_tab");
				}

				if (nextBtn&&nextBtn.nextElementSibling){
					if (nextBtn.nextElementSibling.classList.contains("f_active_tab")) {
						nextBtn.nextElementSibling.classList.remove("f_active_tab")
					}
				}

				target.classList.add("f_active_tab");
				// Tip: you can also get the data of each active tab or user selected tab by getting all 
				// option_value like this
				/*==============================================================
				== let tabValues = gA("f_active_tab");                        ==
				== tabValues.forEach(function(activeTab){
				==    let eachVal = activeTab.getAttribute("option_value");   ==
				== })                                                         ==
				==============================================================*/
		
			})
		}
	}
	toggleActive();
	
		 function populate() {
	 	// initialize 
		fetch("./assets/js/data.json")
		.then(e=>e.json())
		.then(data=>{
			return new Promise((res,rej)=>{
				let reject=(r)=>{
					let errMesg ="There was an error fetching data, check your internet connection and try again"; 
					console.error(errMesg);
					rej(errMesg);
				};
			 	// populate Ages
				if(data.age){
					res((()=>{
						let Elemnt = g("#age");
						let optionTemp =(eenum,eenumNames) => `<option value="${eenum}">${eenumNames}</option>`;
						for (let i =0;  i < data.age.enum.length; i++) {
							Elemnt.innerHTML+=optionTemp(data.age.enum[i],data.age.enumNames[i])
						}
					})())
				}
				else{
					reject()
				}

			 	// populate country of residence 
				if(data.residence_country){
					res((()=>{
						let Elemnt = g("#residence");
						let optionTemp =(eenum,eenumNames) => `<option value="${eenum}">${eenumNames}</option>`;
						for (let i =0;  i < data.residence_country.enum.length; i++) {
							Elemnt.innerHTML+=optionTemp(data.residence_country.enum[i],data.residence_country.enumNames[i])
						}
					})())
				}
				else{
					reject()
				}
				
			 	// Populate Destination province. 
				if(data.destination_province){
					res((()=>{
						let Elemnt = g("#destination");
						let optionTemp =(eenum,eenumNames) => `<option value="${eenum}">${eenumNames}</option>`;
						for (let i =0;  i < data.destination_province.enum.length; i++) {
							Elemnt.innerHTML+=optionTemp(data.destination_province.enum[i],data.destination_province.enumNames[i])
						}
					})())
				}
				else{
					reject()
				}
				
			 	// Populate Language proficiency. 
				if(data.language){
					res((()=>{

						let Elemnts = gA("#writing ,#reading ,#speaking ,#listening");
						let optionTemp =(eenum,eenumNames) => `<option value="${eenum}">${eenumNames}</option>`;
						for (Elemnt of Elemnts){
							for (let i =0;  i < data.language.english.writing.enum.length; i++) {
								Elemnt.innerHTML+=optionTemp(data.language.english.writing.enum[i],data.language.english.writing.enumNames[i])
							}
						}
						// Select default value for French
						setTimeout(()=>{
							let frenchs = gA(".lang_status_fr .fig .slc");
							for (french of frenchs ){
								let fr_opts = french.querySelectorAll("option");
								for (fr_opt of fr_opts){
									fr_opt.selected =true;
								}
							}
						},10)
					})())
				}
				else{
					reject()
				}
				
			 	// Populate Currency. 
				if(data.currency){
					res((()=>{

						let Elemnt = g("#currency");
						let optionTemp =(eenum,eenumNames) => `<option value="${eenum}">${eenumNames}</option>`;
					
						for (let i =0;  i < data.currency.enum.length; i++) {
							Elemnt.innerHTML+=optionTemp(data.currency.enum[i],data.currency.enumNames[i])
						}
						
						// Select default value for Currency
						setTimeout(()=>{
							
							let c_opts = Elemnt.querySelectorAll("option");
							for (c_opt of c_opts){
								if(c_opt.value == "CAD"){
									c_opt.selected =true;
									return
								}
							}
							
						},10)
					})())
				}
				else{
					reject()
				}
			})
		})
	 }
	  populate();

	// Initialize custome checkboxes and radios on all inputs with type checkbox and radio
	customCheckBox_and_Radio("checkboxes");
