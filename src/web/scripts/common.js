/**
 *
 * Common JS Script
 *
 * Version 1.1 Direct - Repost and New Version Assembly change note
 * - Add some functions for modal pop ups
 *
 * Version 1.2 Direct Improvements Assembly Release 2 Assembly change note
 * - Add character limitation for the input fields and input areas when creating contests.
 *
 * Version 1.3 (Release Assembly - TopCoder Cockpit Modal Windows Revamp) change notes:
 * - Add methods to show different modal windows.
 *
 * Version 1.4 (Release Assembly - TopCoder Cockpit TinyMCE Editor Revamp) change notes:
 * - Add methods to setup cockpit tinyMCE editors.
 *
 * @since Launch Contest Assembly - Studio
 */
$(document).ready(function() {
    adjustImageRatio();

    // setup the global AJAX timeout to 20 seconds
    jQuery.ajaxSetup({
        timeout: 20 * 1000
    });

    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
        modalClose();
        showGeneralError();
    });

    // initialize the dialogue to display response messages
    initDialog('msgDialog', 300, {
                Ok: function() {
                    $(this).dialog("close");
                }
            });

    // initialize the dialogue to display error messages
    initDialog('errorDialog', 300, {
                Ok: function() {
                    $(this).dialog("close");
                }
            });

    function limitFileDescriptionChars(maxChars) {
        var ori = "";
        var timeId = -1;
        return function(e) {
            var textArea = $(this);
            var content = textArea.val();
            if (content.length <= maxChars) {
                ori = content;
            }
            if (timeId != -1) {
                timeId = clearTimeout(timeId);
            }
            timeId = setTimeout(function() {
                timeId = -1;
                if (textArea.val().length > maxChars) {
                    showErrors("You can only input max " + maxChars
                        + " characters.");
                    textArea.val(ori);
                }
            }, 100);
            return true;
        };
    }

    var invliadCharsRegExp = /[^a-zA-Z0-9\$!\- ]+/mg;

    /**
     * Limits the allowed chars to alphanumeric, $, and !
     * https://apps.topcoder.com/bugs/browse/TCCC-3091
     */
    function limitContestProjectNameChars(maxChars) {
        var ori = "";
        var timeId = -1;
        return function(e) {
            var textArea = $(this);
            var content = textArea.val();
            var invalid = false;
            if (content.search(invliadCharsRegExp, '') > -1) {
                invalid = true;
            }
            if (content.length <= maxChars && !invalid) {
                ori = content;
            }
            if (timeId != -1) {
                timeId = clearTimeout(timeId);
            }
            timeId = setTimeout(function() {
                timeId = -1;
                if (invalid) {
                    showErrors("Only alphanumeric, $, -, ! and space characters are allowed.");
                    textArea.val(ori);
                    return;
                }
                if (textArea.val().length > maxChars) {
                    showErrors("You can only input max " + maxChars
                        + " characters.");
                    textArea.val(ori);
                }
            }, 100);
            return true;
        };
    }

	  // limits the characters for text inputs and text editors
	  $("#contestName, #projectName, #newProjectName").bind('keydown keyup paste', limitContestProjectNameChars(200));
	  
	  $("#swFileDescription, #fileDescription, #fileDescription2").bind('keydown keyup paste', limitFileDescriptionChars(200));

      $("#newProjectDescription").bind('keydown keyup paste', limitFileDescriptionChars(2000));
});


/**
 * Modifies the jQuery param function so that it matches struts2 conversion.
 */
jQuery.extend({
	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [];
		
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}
		
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray(a) || a.jquery ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
			
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				   buildParams( prefix, a[prefix] );
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");

		function buildParams( prefix, obj ) {
			if(typeof obj == 'function') {
				  return;
			}
			
      if (prefix.match(/.*properties$/)) {
				jQuery.each( obj, function( i, v ) {
					 buildParams( prefix  +  "['"+ i +"']"  , v );
				}); 
				return;
			}			
			
			if ( jQuery.isArray(obj) ) {
				// Serialize array item.
				jQuery.each( obj, function( i, v ) {
					if ( traditional ) {
						// Treat each array item as a scalar.
						add( prefix, v );
					} else {
						// If array item is non-scalar (array or object), encode its
						// numeric index to resolve deserialization ambiguity issues.
						// Note that rack (as of 1.0.0) can't currently deserialize
						// nested arrays properly, and attempting to do so may cause
						// a server error. Possible fixes are to modify rack's
						// deserialization algorithm or to provide an option or flag
						// to force array serialization to be shallow.
						buildParams( prefix  + ( typeof v === "object" || jQuery.isArray(v) ? "["+ i +"]" : "" ) , v );
						//keep adding
						//add( prefix, v );
					}
				});
					
			} else if ( !traditional && obj != null && typeof obj === "object" ) {
				// Serialize object item.
				jQuery.each( obj, function( k, v ) {
					//skip directjsXX properties
					if(!(k + "").match(/^directjs.*$/)) {
					  buildParams( prefix + "." + k + "", v );
				  }
				});
					
			} else {
				// Serialize scalar item.
				add( prefix, obj );
			}
		}

		function add( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction(value) ? value() : value;
			s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		}
	}	
});

/**
 * Defines the date format used for date picker.
 */
Date.format = 'mm/dd/yyyy';


/**
 * Global Functions/Objects
 */
/*
 * context path
 */ 
var ctx = "/direct";
 
/*
 * Initiate a dialog box using jQuery dialog.
 */
function initDialog(dialogDivId, width) {
    $("#" + dialogDivId).each(function() {
        $(this).dialog({
            bgiframe: true,
            width: width,
            height:'auto',
            modal: true,
            autoOpen: false,
            resizable: true,
            zIndex: 10 });

    });
}

function initDialog(dialogDivId, width, buttons) {
    $("#" + dialogDivId).each(function() {
        $(this).dialog({
            bgiframe: true,
            width: width,
            height:'auto',
            modal: true,
            autoOpen: false,
            resizable: true,
            zIndex: 10,
            buttons: buttons });

    });
}
 
 function closeDialog(dialogDivOrButton) {
   if(typeof dialogDivOrButton === "string") {
       $("#"+dialogDivOrButton).dialog('close');
   } else {
     //could be button object
     var button = dialogDivOrButton;
    $(button).parents("div.dialog-box:first").dialog("close");
   }
}

function clearDialog(dialogId) {
    $('#'+dialogId+ ' input[type!="checkbox"][type!="hidden"]').val("");
    $('#'+dialogId+ ' input[type="checkbox"]').attr("checked",false);
	$('#'+dialogId+ ' input[type="text"]').val("");
    $('#'+dialogId+ ' textarea').val("");
}

function checkRequired(value) {
    return $.trim(value).length > 0;
}

function checkNumber(value) {
    return optional(value) || /^\d+(\.\d+)?$/.test(value);
}

function checkFileType(value) {
	return checkRequired(value);
}

function optional(value) {
   return !checkRequired(value);
}

function isNotEmpty(value) {
  return checkRequired(value);
}


function isEmpty(value) {
  return !isNotEmpty(value);
}

function isDev() {
	return window.location.href.indexOf('cloud.topcoder.com') > -1;
}

/**
 * Formats the number in the money format.
 */
Number.prototype.formatMoney = function(c){
//for decimals
var d = '.';
//for thousands
var t = ',';
var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function sortSelectOptions(selectId) {
   var allOptions = $('#'+selectId+' option').get();
   allOptions.sort(function(a,b) {
      var compA = $(a).text().toUpperCase();
      var compB = $(b).text().toUpperCase();
      return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;   
   });
   $("#"+selectId).empty().append( allOptions );	
}

/**
 * Common function to handle JSON result.
 */
function handleJsonResult(jsonResult, successCallBack, failureCallBack) {
   modalClose(); // close the potentical preloading modal first
   if(jsonResult.result) {
       successCallBack(jsonResult.result['return']);
   } else {
       failureCallBack(jsonResult.error.errorMessage);
   }
}

function handleJsonResult2(jsonResult, successCallBack, failureCallBack) {
   if(jsonResult.result) {
       successCallBack(jsonResult.result['return']);
   } else {
       failureCallBack(jsonResult.error.errorMessage);
   }
}

/**
 * Functions to handle message/error messages.
 */
function showMessage(message) {
   $('#msgDialog p').html(message);
   $('#msgDialog').dialog('open');
}

/**
 * Shows the sucessful message after operation finished.
 *
 * @param message the message to show.
 * @since 1.3
 */
function showSuccessfulMessage(message) {
    displayOperationSuccess("#demoModal", "Message", message);
}

/**
 * Shows the warning message after operation finishes
 *
 * @param message the message to show
 * @param buttonText the button text for confirming warning YES button
 * @param buttonEvent the button event for confirming warning YES button
 * @since 1.3
 */
function showWarningMessage(message, buttonText, buttonEvent) {
    displayWarning("#demoModal", "Warning", message, buttonText, buttonEvent);
}

/**
 * Shows the general error if an error happends
 */
function showGeneralError() {
   showServerError("Error occurred. Please retry the operation later.");
}

/**
 * Show client side validation errors.
 *
 * @param errors the error message array
 */
function showErrors(errors) {
   if(typeof errors == 'string') {
       var singleError = errors;
       errors = new Array();
       errors.push(singleError);
   }

    if(errors.length == 0) {
        errors.push("Error occurred. Please retry the operation later.")
    }

    if (errors.length == 1) {
        $("#demoModal li").css('padding-top', '10px');
    }

   displayClientSideError("#demoModal", "Errors", errors);
}

function showComingSoon(message) {
    displayComingSoonMessage("#demoModal", "Coming Soon", message);
}

/**
 * Shows the server error modal window when an error raised on server side.
 *
 * @param message the message to display
 * @since 1.3
 */
function showServerError(message) {
    if($.trim(message).length <= 0) {
        message = "Server Error occurred. Please retry the operation later."
    }
    displayServerError("#demoModal", "Server Error", message);
}

/**
 * Shows the confirmation modal window when needs user's confirmation.
 *
 * @param title the title of the modal window
 * @param message the message to display to user
 * @param yesText the button text for the confirmation YES
 * @param yesHandler the button event for the confirmation YES
 * @since 1.3
 */
function showConfirmation(title, message, yesText, yesHandler) {
    displayUserConfirmation("#demoModal", title, message, yesText, yesHandler);
}

/**
 * Clear the add new project modal window.
 *
 * @since 1.3
 */
function clearAddNewProjectForm() {
    $('#addNewProjectModal').find('input[name="newProjectName"]').val('');
    $('#addNewProjectModal').find('textarea[name="newProjectDescription"]').val('');
}

/*BUGR-4512*/
function adjustImageRatio() {
    var oldWidth = $("a.thumbSingle img").width();
    var oldHeight = $("a.thumbSingle img").height();
    var image = new Image();
    image.src = $("a.thumbSingle img").attr("src");
    setTimeout(function() {
        caculateImageRatio(image,oldWidth, oldHeight);
    },1000);
    //make sure the new width and new height is set
    image.onload = function(){
        if(parseInt($("a.thumbSingle img").width()) == 0 || parseInt($("a.thumbSingle img").height()) == 0) {
            $("a.thumbSingle img").attr("width",oldWidth);
            $("a.thumbSingle img").attr("height",oldHeight);
            caculateImageRatio(image,oldWidth, oldHeight);
        }
    }
}
/*BUGR-4512*/
function caculateImageRatio(image,oldWidth, oldHeight) {
    var origWidth = image.width;
    var origHeight = image.height;
    var newWidth , newHeight;
    if(origWidth/oldWidth >= origHeight/oldHeight) {
        newHeight = (origHeight*oldWidth)/origWidth;
        $("a.thumbSingle img").css("paddingTop", (oldHeight-newHeight)/2);
        $("a.thumbSingle img").attr("height",newHeight);
    } else {
        newWidth = (origWidth*oldHeight)/origHeight;
        $("a.thumbSingle img").css("paddingLeft", (oldWidth-newWidth)/2);
        $("a.thumbSingle img").attr("width",newWidth);
    }
}

/**
 * Return the event handler used by tinyMCE to restrict the max characters.
 * 
 * @param obj the tinyMCE name
 * @param maxChars the max characters
 */
function maxCharsEventHandler(obj, maxChars) {
    var ori;
    var timeId = -1;
    return function(e) {
        var content = tinyMCE.get(obj).getContent();
        if (content.length <= maxChars) {
            ori = content;
        }
        if (timeId != -1) {
            timeId = clearTimeout(timeId);
        }
        timeId = setTimeout(function() {
            timeId = -1;
            if (tinyMCE.get(obj).getContent().length > maxChars) {
            	showErrors("You can only input max " + maxChars + " characters.");
                tinyMCE.get(obj).setContent(ori);
            }
        }, 100);
        return true;
    };
}
/**
 * Set the event handler used by tinyMCE to restrict the max characters when there is a call to setContent() method.
 */
function setMaxCharsEventHandlerOnSetup(ed, maxChars) {
	ed.onBeforeSetContent.add(function(ed, o) {
		if (o.content.length > maxChars) {
			showErrors("You can only input max " + maxChars + " characters.");
			o.content = ed.getContent();
		}
	});
}

var allowedTags = [
/<a\s*(href\s*=\s*[^=|^>|^<]*)?>/mg,
/<(span|ul)\s*(style\s*=\s*[^=|^>|^<]*)?>/mg,
/<(annot|abbr|acronym|blockquote|b|br|em|i|li|ol|p|pre|s|strike|sub|sup|strong|table|td|tr|tt|u|ul)\s*>/mg, 
/<\/\s*(a|span|annot|abbr|acronym|blockquote|b|br|em|i|li|ol|p|pre|s|strike|sub|sup|strong|table|td|tr|tt|u|ul)\s*>/mg
];
var tagsRegExp = /<(\/)*[^<|^>|^\/]*>/mg;
var tinyMCEValidElements = "a[href],-span[style],-ul[style],annot,abbr,acronym,-blockquote,br,em/i,-li,-ol,#p,-pre,s,strike,-sub,-sup,-strong/b,-table,#td,-tr,tt,u";

 /**
 * Return the event handler used by tinyMCE to restrict the max characters and the allowed tags.
 * 
 * @param obj the tinyMCE name
 * @param maxChars the max characters
 */
function maxCharsAndAllowedTagsEventHandler(obj, maxChars) {
    var ori='';
    var timeId = -1;
    return function(e) {
        var content = tinyMCE.get(obj).getContent();
		var invalid = false;
        if (content.length <= maxChars) {
			var c = content;
			c = c.replace(/<|>/mg, "").replace(/&lt;/mg, "<").replace(/&gt;/mg, ">").replace(/&amp;lt;/mg, "<").replace(/&amp;gt;/mg, ">");
			for(var i = 0; i < allowedTags.length; i++) {
				c = c.replace(allowedTags[i], '');
			}
			if(c.search(tagsRegExp) < 0) { // no invalid tags 
				ori = content;
			} else {
				invalid = true;
			}
        }
        if (timeId != -1) {
            timeId = clearTimeout(timeId);
        }
        timeId = setTimeout(function() {
            timeId = -1;
			if(invalid) {
				showErrors("You have inputted non-allowed tags or invalid attributes.");
                tinyMCE.get(obj).setContent(ori);
			}
            if (tinyMCE.get(obj).getContent().length > maxChars) {
            	showErrors("You can only input max " + maxChars + " characters.");
                tinyMCE.get(obj).setContent(ori);
            }
        }, 100);
        return true;
    };
}

/**
 * Standard options for cockpit tinyMCE editor
 * @since 1.4
 */
var cockpitTinyMCEOptions =
{
    mode: "exact",
    // General options
    skin : "cirkuit",
    theme : "advanced",
    plugins : "inlinepopups,advlist,paste,fullscreen,template,preview",

    // Theme options
    theme_advanced_buttons1 : "bold,italic,underline,strikethrough,undo,redo,bullist,numlist,outdent, indent,|,|,forecolor,backcolor,link,unlink,|,|,pasteword,code,preview,fullscreen,template,|,indent,outdent,forecolor,backcolor",
    theme_advanced_buttons2 :"",
    theme_advanced_toolbar_location : "top",
    theme_advanced_toolbar_align : "left",
    theme_advanced_statusbar_location : "bottom",
    theme_advanced_resizing : true,
    theme_advanced_resize_horizontal : false,
    theme_advanced_path : false,
    theme_advanced_resizing_use_cookie : false,
    valid_elements : tinyMCEValidElements
};

/**
 * The template lists location for tinyMCE editor
 * @since 1.4
 */
var templateListsLocation = "/scripts/tinyMCE/lists/";

/**
 * Sets up the tinyMCE editor without loading template list
 *
 * @param obj the obj id
 * @param maxChars the max chars allowed
 * @since 1.4
 */
var setupTinyMCE = function(obj, maxChars) {
    var options = jQuery.extend({}, cockpitTinyMCEOptions);
    options.elements = obj;
    options.setup = function(ed) {
        setMaxCharsEventHandlerOnSetup(ed, maxChars);
    };
    options.handle_event_callback = maxCharsAndAllowedTagsEventHandler(obj, maxChars);
    tinyMCE.init(options);
}

/**
 * Sets up the tinyMCE editor without loading template list
 *
 * @param obj the obj id
 * @param maxChars the max chars allowed
 * @param height the height of the editor
 * @since 1.4
 */
var setupTinyMCEWithHeight = function(obj, maxChars, height) {
    var options = jQuery.extend({}, cockpitTinyMCEOptions);
    options.elements = obj;
    options.setup = function(ed) {
        setMaxCharsEventHandlerOnSetup(ed, maxChars);
    };
    options.handle_event_callback = maxCharsAndAllowedTagsEventHandler(obj, maxChars);
    options.height=height;
    tinyMCE.init(options);
}

/**
 * Sets up the tinyMCE editor with template list loaded
 *
 * @param obj the obj id
 * @param maxChars the max chars allowed
 * @param templateListName the name of the template list to load
 * @since 1.4
 */
var setupTinyMCEWithTemplate = function(obj, maxChars, templateListName) {
    var options = jQuery.extend({},cockpitTinyMCEOptions);
    options.elements = obj;
    options.setup = function(ed) {
        setMaxCharsEventHandlerOnSetup(ed, maxChars);
    };
    options.handle_event_callback = maxCharsAndAllowedTagsEventHandler(obj, maxChars);
    options.template_external_list_url = templateListsLocation + templateListName + ".js";
    tinyMCE.init(options);
}
