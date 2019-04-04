(function($){
	$.fn.advancedtable = function(custom) {
	
		// Default configuration
		var defaults = {
		  	rowsPerPage: 10,
			currentPage: 1,
			loadElement: "",
			searchField: "",
			searchColumn: 0,
			searchCaseSensitive: false,
			navigationLabel: "",
			delay: 300
		};
		  
		// Combine user and default configuration
		var settings = $.extend({}, defaults, custom);
		
		// Decrement currentPage setting
		settings.currentPage--;
		
		// Show inputfield
		$(settings.searchField).show();
		
		// Variable declarations
		var table = this;
		var currentPage = 0;
			
			
		// Define searchfield if needed
		if(settings.searchField != ""){	
			$(settings.searchField).keyup(redrawTable);
		}
			
		// Redraw table
		redrawTable();

		// START REDRAWTABLE
		function redrawTable() {

			// Show loader box
			showLoad();	
		
			// Case sensitive option string format
			var strsearch = "";
			if(typeof(this.value) != "undefined"){
				if(settings.searchCaseSensitive){
					strsearch = this.value;
				}else{
					strsearch = this.value.toLowerCase();	
				}
			}

			// Define counter
			var i = 0;
		 
			// START TR LOOP
		  	table.find('tbody tr').each(function () { 

				// Set found to false
				var found = false;
				
				// Define counter
				var i = 1;
				
				// START TD LOOP
				$(this).find('td').each(function () { 		  
					
					// If search all columns or search in this column
					if((settings.searchColumn==0) || (settings.searchColumn==i)){
						
						// Case sensitive string format
						if(settings.searchCaseSensitive){
							var strcell = stripHtml(this.innerHTML);
						}else{
							var strcell = stripHtml(this.innerHTML.toLowerCase());
						}

						// If string is found in this cell
						if((strcell.indexOf(strsearch) > -1)){
							found = true;  
						}
					}
					
					// Increment column number
					i++;
					
				});
				// END TD LOOP
				
				// Mark hide or show row
				if(found){
					$(this).removeClass("searchhide");
				}else{
					$(this).addClass("searchhide");
				}
				
			}); 
				
			// Count table rows that match the search term
			var tableRows = table.find('tbody tr:not(.searchhide)').length;
			
			// Calculate the number of pages
			var pages = Math.ceil(tableRows / settings.rowsPerPage);
				
			// Remove old footer
			table.find("tfoot").remove();
			
			// Calculate values
			var firstRow = table.find("tr:first");
			var numCols = firstRow[0].cells.length;
			var endEow = ((settings.currentPage + 1) * settings.rowsPerPage);
			var startRow = (endEow - settings.rowsPerPage) + 1;

			// Info block
			var blockInfo = '<div class="tableInfo">Showing ' + startRow + ' - ' + endEow + ' of ' + tableRows + '</div>';
			
			// If there are more rows than rowsPerPage than build the navigation
			var blockNavigation = "";
			if(tableRows > settings.rowsPerPage){
				
				blockNavigation += '<div class="tableNavigation">';
				if(settings.navigationLabel != ""){
					blockNavigation += '<span>' + settings.navigationLabel + '&nbsp;&nbsp;</span>';
				}
				blockNavigation += '<ul>';
				
				for(var i = 0;i < pages; i++){
					blockNavigation += '<li' + ((settings.currentPage == i) ? ' class="active"' : "") + '><a href="javascript:void();">' + (i+1) + '</a></li>';
				}
				blockNavigation += '</ul></div>';
			}
	
			// Add new footer to table
			table.append('<tfoot><tr><td colspan="' + numCols + '">' + blockInfo + blockNavigation + '</td></tr></tfoot>');

			// Bind clickhandler on pagenavigations
			table.find('.tableNavigation li').bind('click', function() {
				
				// Show loader box
				showLoad();	
					
				// Get current page number
				var currentPage = (parseInt($(this).find("a").html())) - 1;
					
				// Set active page
				setActivePage(currentPage);
				
				// Hide loader box
				hideLoad();	

			});
			
			// Get current page number
			currentPage = getCurrentPage();
					
			// Set active page
			setActivePage(currentPage);
			
			// Hide loader box
			hideLoad();	
						
		} 
		// END REDRAWTABLE
		
		// START SETACTIVEPAGE
		function setActivePage(number){
		
			// Make the correct page selected
			table.find('.tableNavigation li').removeClass("active");
			table.find('.tableNavigation li:eq(' + number + ')').addClass("active");
				
			// Get current rows per page
		    var rowsPerPage = settings.rowsPerPage;
		        
		    // Show rows
		    var from 		= number * rowsPerPage;
		    var to 			= (number + 1) * rowsPerPage;
			var tableRows 	= table.find('tbody tr:not(.searchhide)').length;
			
	        table.find('tbody tr').hide();
			table.find('tbody tr:not(.searchhide)').slice(from, to).show();
			
			// Change information text
			table.find('.tableInfo').html("Showing " + (from + 1) + " - " + ((tableRows < to) ? tableRows : to) + " of " + tableRows);
			
		}
		// END SETACTIVEPAGE
		
		// START GETCURRENTPAGE
		function getCurrentPage(){
			var currentPage = (parseInt(table.find('.tableNavigation li.active').find("a").html())) - 1;
			if(isNaN(currentPage)){
				return 0;
			}
			return currentPage;
		}
		// END GETCURRENTPAGE
		
		// START SHOWLOAD
		function showLoad(){
			if(settings.loadElement != ""){
				$(settings.loadElement).show();
			}
		}
		//END SHOWLOAD
		
		// START HIDELOAD
		function hideLoad(){
			if(settings.loadElement != ""){
				if(settings.delay > 0){
					setTimeout( function () { 
							$(settings.loadElement).hide();
					}, settings.delay);
				}else{
					$(settings.loadElement).hide();
				}
			}
		}
		//END HIDELOAD
		
		// START STRIPHTML
		function stripHtml(oldString) {

		   var newString = "";
		   var inTag = false;
		   for(var i = 0; i < oldString.length; i++) {
		   
				if(oldString.charAt(i) == '<') inTag = true;
				if(oldString.charAt(i) == '>') {
					  if(oldString.charAt(i+1)=="<")
					  {
							//dont do anything
			}
			else
			{
				inTag = false;
				i++;
			}
				}
		   
				if(!inTag) newString += oldString.charAt(i);

		   }

		   return newString;
		}
		// END STRIPHTML
		
		// START TRIM
		function trimString(str){
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		}
		// END TRIM
		
		function popup(data) {
			var generator = window.open('', 'csv', 'height=400,width=600');
			generator.document.write('<html><head><title>CSV</title>');
			generator.document.write('</head><body >');
			generator.document.write('<textArea cols=70 rows=15 wrap="off" >');
			generator.document.write(data);
			generator.document.write('</textArea>');
			generator.document.write('</body></html>');
			generator.document.close();
			return true;
		}

		
		
		// Return the jQuery object to allow for chainability.
		return this;
		
	}
	
})(jQuery);
