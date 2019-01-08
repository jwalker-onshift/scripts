// ==UserScript==
// @name         Jira Search from SF
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Open a search of CSI from Jira
// @author       You
// @match        https://onshift.my.salesforce.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    $.noConflict();
    jQuery( document ).ready(function( $ ) {


        var name = '';
        var name_element = null;
        var pageTitle = document.title.toLowerCase();
        var isTicket = pageTitle.startsWith('ticket');
        var isAccount = pageTitle.startsWith('account');
        var isInt = pageTitle.startsWith('integration');
        if( isTicket ){
            // Name
            name_element = $('#cas4_ileinner');
            name = name_element.text().trim();
            console.log(name);
        }
        else if( isAccount ){
            name_element = $('#acc2_ileinner');
            name = name_element.text().replace('[View Hierarchy]','').trim();
        }
        else if( isInt ){
            name_element = $('CF00N3000000Ba6Av_ileinner');
            name = name_element.text().trim();
        }
        else
        {
            return;
            console.log('is not account, ticket, or integration');
        }



        var SFID = window.sfdcPage.entityId

        var buttonRow = $('td#topButtonRow');

        var jql = '';
        if( isInt) {
            jql = "project = CSI and cf[10601]~" + SFID + 'QAA';
        }
        else if (isTicket){
            jql = "project = CSI and cf[10601]~" + SFID + 'QAM';
        }
        else{
            jql = 'project = CSI and cf[12402]~"' + name + '"';
        }

        var findLink = 'https://onshift.atlassian.net/issues/?jql=' + encodeURIComponent(jql);
        var btnHtml = '<input id="JiraFind" class="btn" name="Jira Find" title="Jira Find" type="button" Value="Jira Find" />';
        var btn = $(btnHtml);
        btn.click( function(){
            window.open(findLink,'_blank');
        });
        buttonRow.append($(btn) );

    });
})();