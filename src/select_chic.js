'use strict';

if(typeof __webpack_require__ != "undefined" || typeof module == "object") {
  var $ = require('jquery');
}

/**
 *  @file SelectChic
 *  @version 2.0.0
 *  @copyright Nicolas James Hampton 2016
 *  @summary A jQuery plugin to style the "select" menus
 *           (drop down menus) on the form so they
 *           match the styling of the text fields.
 *
 */

/**
 * The jQuery plugin namespace.
 * @external "jQuery.fn"
 * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
 */


/**
 * Configuration method for SelectChic
 * @method external:"jQuery.fn".selectChic
 *
 * @param {Object} options configuration object for all settings
 * @returns {jQueryObject} jQuery array of all select elements on page
 */
$.fn.selectChic = function(options) {

  var host = {};

  var defaults = {
    "imageOffsetPixels": 20,
    "divClass": "newSelect",
    "listClass": "newSelectList",
    "optionClass": "newOption",
    "matchString": "input",
    "matchStyles": [
      "background-color",
      "padding-left",
      "padding-right",
      "border-right",
      "border-left",
      "border-top",
      "border-bottom",
      "border-radius"],
    "selectDivBase": {
      "background-repeat": "no-repeat"
    },
    "selectDivStyles": {
      "background-image":  "url(https://upload.wikimedia.org/wikipedia/commons/f/f1/MediaWiki_Vector_skin_action_arrow.svg)"
    },
    "selectListBase": {
      "list-style": "none",
      "padding-left": "0px",
      "padding-right": "50px",
      "margin-top": "0px",
      "margin-bottom": "0px"
    },
    "selectListStyles": {},
    "optionBase": {
      "display": "none",
      "border-bottom": "solid black 1px",
      "margin-bottom": "10px",
      "padding": "5px"
    },
    "optionStyles": {}
  };


  if(!options) { options = {}; }
  var config = $.extend( {}, defaults, options );


  Object.keys(config).map(function(setting) {
    host[setting] = config[setting];
  });

  $.fn.selectConfig = host;

  return this;

};

/**
 * jQuery method to render replacement dropdowns
 * for all select boxes on the page.
 * @method external:"jQuery.fn".renderChic
 *
 * @param {Number} activeOptionIndex index of option element to be displayed.
 * @returns {jQueryObject} jQuery object of newly created select box
 */
$.fn.renderChic = function() {
  $(window).resize(function() {
    $('.' + $.fn.selectConfig.divClass).each(function(){
      $(this).resetBgPosition();
    });
  });

  return this.each(function() {
    $(this).convertSelect(0);
  });
}


/**
 * jQuery method to hide current select element and
 * replace it with an div element containing an
 * unordered list linked to the select box.
 * @method external:"jQuery.fn".convertSelect
 *
 * @param {Number} activeOptionIndex index of option element to be displayed.
 * @returns {jQueryObject} jQuery object of newly created select box
 */
$.fn.convertSelect = function(activeOptionIndex) {

  var newSelect = $('<div class="' + $.fn.selectConfig.divClass + '"></div>');
  var selectList = $('<ul class="' + $.fn.selectConfig.listClass + '"></ul>');
  var selectElement = this;

  newSelect.append(selectList);
  selectList.css($.fn.selectConfig.selectListBase)
            .css($.fn.selectConfig.selectListStyles);

  selectElement.children().each(function(index) {
    var optionLink = $('<li class="' + $.fn.selectConfig.optionClass + '"></li>');

    selectList.append(optionLink);
    optionLink.css($.fn.selectConfig.optionBase)
              .css($.fn.selectConfig.optionStyles)
              .copyElement(this);

    if(index === activeOptionIndex) {
      optionLink.off()
                .show()
                .css("margin-bottom", "0px")
                .click(displayOptions);
    }
  });

  selectElement.hide().after(newSelect);

  return newSelect.copyStyles($.fn.selectConfig.matchString)
                  .css($.fn.selectConfig.selectDivBase)
                  .css($.fn.selectConfig.selectDivStyles)
                  .resetBgPosition();

};


/**
 * Function ran by click event on option elements
 * on a open select menu. Closes the option menu,
 * selects correct option in select box.
 * @fires triggers select change event.
 * @this The selected option element
 *
 * @param {event} e - click event object
 */
function optionSelect(e) {
  e.stopPropagation();

  var thisOptionItem = $(this);
  var selectDiv = thisOptionItem.parent().parent();
  var selectBox = selectDiv.prev();
  var optionSelectorString = '[value="' + thisOptionItem.attr('value') + '"]';
  var selectBoxOptionSelected = selectBox.children(optionSelectorString);

  thisOptionItem.show()
                .css("margin-bottom", "0px")
                .click(displayOptions)
                .siblings().off().hide();

  selectDiv.css($.fn.selectConfig.selectDivBase)
           .css($.fn.selectConfig.selectDivStyles)
           .resetBgPosition();

  selectBoxOptionSelected.prop("selected", true);

  selectBox.trigger('change');
}


/**
 * Function ran by click event on option elements
 * on a closed select menu. Opens the option menu,
 * attaches optionSelect click events on all option
 * items, and repositions the select arrow and margins.
 *
 * @param {event} e - click event object
 * @this The selected option element
 */
function displayOptions(e) {
  e.stopPropagation();
  var that = $(this);
  var selectDiv = that.parent().parent();
  selectDiv.css("background-image", "");
  that.off().click(optionSelect).css("margin-bottom", "10px");
  that.siblings().off().click(optionSelect).show('slow', resetBgPositionWrapper);
}


/**
 * Function ran by resize event on window object,
 * essentially a wrapper for resetBgPosition, in order
 * to pass as a callback for timing purposes
 */
function resetBgPositionWrapper() {
  $(this).parent().parent().resetBgPosition();
}


/**
 * jQuery method to reposition the background image
 * based on the current width of the element and
 * desired offset. For select arrow positioning.
 * @method external:"jQuery.fn".resetBgPosition
 *
 * @returns {jQueryObject} jQuery object
 */
$.fn.resetBgPosition = function() {
  var imageOffset = this.width() - $.fn.selectConfig.imageOffsetPixels;
  this.css(
    {
      "background-position": imageOffset,
      "background-image": $.fn.selectConfig.selectDivStyles["background-image"]
    });
  return this;
};


/**
 * jQuery method to copy all the css properties
 * listed in the matchStyles array and apply them
 * to the jQuery object running the function. Used
 * to help style the selectDiv's.
 * @method external:"jQuery.fn".copyStyles
 *
 * @param {String} sender css selector
 * @returns {jQueryObject} jQuery object
 */
$.fn.copyStyles = function(sender) {
  var obj = $(sender).css($.fn.selectConfig.matchStyles);
  return $(this).css(obj);
};


/**
 * jQuery method to copy all attributes and
 * inner HTML on sender DOM element and apply
 * them to the jQuery object calling the method.
 * Used to fill in each new select option.
 * @method external:"jQuery.fn".copyElement
 *
 * @param {Node} sender - DOM element
 * @returns {jQueryObject} jQuery object
 */
$.fn.copyElement = function(sender) {
  var that = this;

  Object.keys(sender.attributes).map(function(key) {
    var attrName = sender.attributes[key].name;
    var attrValue = sender.attributes[key].value;
    that.attr(attrName, attrValue);
  });

  that.html(sender.innerHTML);

  return that;
};


if(typeof __webpack_require__ != "undefined" || typeof module == "object") {
  module.exports = $;
}
