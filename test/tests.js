"use strict";

var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;

describe("selectChic", function() {



  describe("selectChic method", function() {

    // Arrange
    var $;
    var cleanup;
    var selects;
    var html;

    before(function() {
      html = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8');
      cleanup = require('jsdom-global')(html);
      $ = require('../src/index.js');
      selects = $('select').selectChic();
    });

    after(function() {
      cleanup();
      var name2 = require.resolve('jsdom-global');
      var name = require.resolve('jquery');
      var other = require.resolve('../src/index.js');

      delete require.cache[name];
      delete require.cache[name2];
      delete require.cache[other];
    });

    it("should create a selectChic method on jquery", function() {
      // Assert
      expect($.fn).to.have.property('selectChic');
    });

    it("should return a list of all select boxes on the page", function() {
      // Assert
      expect(selects).to.have.lengthOf(7);
    });
  });

  describe("convertSelect method", function() {

     // Arrange
     var $;
     var cleanup;
     var select;
     var html;
     var selects;
     var newSelect;

     before(function() {
       html = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8');
       cleanup = require('jsdom-global')(html);
       $ = require('../src/index.js');
       selects = $('select');
       selects.selectChic();
       select = selects.eq(0);
       newSelect = select.convertSelect(2);
     });

     after(function() {

       select.detach();
       cleanup();

       var name2 = require.resolve('jsdom-global');
       var name = require.resolve('jquery');
       var other = require.resolve('../src/index.js');

       delete require.cache[name];
       delete require.cache[name2];
       delete require.cache[other];

     });

    it("should be a method present on jquery", function() {
      expect($()).to.have.property('convertSelect');
    });

    it("should return the newly created select dropdown", function() {
      expect(newSelect[0].constructor.name).to.equal('HTMLDivElement');
    });

    it("should hide the select box", function() {
      expect(select.css("display")).to.equal('none');
    });

    it("should leave other select boxes alone", function() {
      expect(selects.eq(1).css("display")).to.not.equal('none');
    });

    it("should display the indicated option", function() {
      expect($('.newSelectList').children().eq(2).css("display")).to.not.equal('none');
    });

    it("should attach a click event to the indicated option", function() {
      var element = $('.newSelectList').children().eq(2)[0];
      expect($._data(element, "events")).to.have.property('click');
    });

    it("should hide the other options", function() {
      expect($('.newSelectList').children().eq(1).css("display")).to.equal('none');
    });

    it("should avoid attaching click events to non-indicated options", function() {
      var other = $('.newSelectList').children().eq(3)[0];
      expect($._data(other, "events")).to.be.undefined;
    });

  });

  describe("renderChic method", function() {

    // Arrange
    var $;
    var cleanup;
    var html;
    var selects;
    var newSelects;

    before(function() {
      html = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8');
      cleanup = require('jsdom-global')(html);
      $ = require('../src/index.js');
      selects = $('select');
      newSelects = selects.selectChic().renderChic();
    });

    after(function() {
      cleanup();
      var name2 = require.resolve('jsdom-global');
      var name = require.resolve('jquery');
      var other = require.resolve('../src/index.js');

      delete require.cache[name];
      delete require.cache[name2];
      delete require.cache[other];
    });

    it("should return a collection of all the select boxes in the document", function() {
      expect(newSelects[0].constructor.name).to.equal('HTMLSelectElement');
    });

    it("should hide all of the select elements in the document", function() {
      expect(selects.css("display")).to.equal('none');
    });

    it("should create a new dropdown menu for every select", function() {
      expect($(".newSelectList").length).to.equal(7);
    });
  });

  xdescribe("resetBgPosition method", function() {

    before(function() {

    });

    it("", function() {

    });
  });

  xdescribe("copyStyles method", function() {

    before(function() {

    });

    it("", function() {

    });
  });

  xdescribe("copyElement method", function() {

    before(function() {

    });

    it("", function() {

    });
  });
});
