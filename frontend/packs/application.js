/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

// Support component names relative to this directory:
var componentRequireContext = require.context('components', true)
var ReactRailsUJS = require('react_ujs')
ReactRailsUJS.useContext(componentRequireContext)

//
$(document).ajaxComplete(function (event, xhr, settings) {
  var csrfParam = xhr.getResponseHeader('X-CSRF-Param')
  var csrfToken = xhr.getResponseHeader('X-CSRF-Token')

  if (csrfParam) {
    $('meta[name="csrf-param"]').attr('content', csrfParam)
  }
  if (csrfToken) {
    $('meta[name="csrf-token"]').attr('content', csrfToken)
  }
})

require('styles/application/index.scss')
