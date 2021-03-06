// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2010 Sprout Systems, Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/** @class

  StaticContentView allows you to display arbitrary HTML content inside your
  view hierarchy.

  Normally, views in SproutCore are absolutely positioned. Their width and
  height are either pre-determined, or specified relative to their enclosing
  view. Occasionally, you may want to display content that is layed out by
  the browser. For example, if you were writing a documentation browser, you
  may want to display the table of contents as an SC.ListView, but the actual
  pages as HTML content.

  This class is most useful when placed inside a ScrollView.

  To use it, simply set the @content@ property to a string of the HTML you
  would like to display.

  @extends SC.View
  @since SproutCore 1.2
  @author Tom Dale
*/

Klb.DisplayTextView = SC.LabelView.extend({
  isTextSelectable: YES,
  escapeHTML: NO,
  textAlign: null,
  fontWeight: null,

	_TEMPORARY_CLASS_HASH: {},
	
	render: function(context, firstTime) {
	  var value = this.get('displayValue'),
	      icon = this.get('icon'),
	      hint = this.get('hintValue'),
	      classes, stylesHash, text,
	      iconChanged = false, textChanged = false;
	  
	  if (icon) {
	    var url = (icon.indexOf('/')>=0) ? icon : SC.BLANK_IMAGE_URL,
	        className = (url === icon) ? '' : icon ;
	    icon = '<img src="'+url+'" alt="" class="icon '+className+'" />';
	    if(icon!==this._iconCache) {
	      this._iconCache=icon;
	      iconChanged = true;
	    }
	  }
	  
	  if (hint && (!value || value === '')) {
	    text = '<span class="sc-hint">'+hint+'</span>';
	  }else{
	    text = value;
	  }
	  if(text!==this._textCache) {
	    this._textCache=text;
	    textChanged = true;
	  }
	      
	  if(firstTime || textChanged || iconChanged){
	    context.push(icon, text);
	  }
	  
	  // only set styles if set
	  stylesHash = {};
	  if(this.get('textAlign')) { stylesHash['text-align'] = this.get('textAlign'); }
	  if(this.get('fontWeight')) { stylesHash['font-weight'] = this.get('fontWeight'); }
	         
	  // if we are editing, set the opacity to 0
	  if (this.get('isEditing')) stylesHash['opacity']=0;
	  context.addStyle(stylesHash);
	  
	  classes = this._TEMPORARY_CLASS_HASH;
	  classes.icon = !!this.get('icon');
	  context.setClass(classes);
	}
});

Klb.DisplayTextView.classNames = ['sc-view','sc-display-text-view'];
