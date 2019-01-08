// ==UserScript==
// @name         Jira Issue from SF
// @namespace    http://onshift.com
// @version      0.1
// @description  Create a link in SF that allows user to create a Jira issue off an account
// @author       You
// @match        https://onshift.my.salesforce.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    $.noConflict();
    jQuery( document ).ready(function( $ ) {
        if( !document.title.toLowerCase().startsWith('account' ) ){
            return;
        }

        // CSM
        var csm_element = $('#CF00N3000000CHJHU_ileinner');
        var csm = csm_element.text().trim();
        console.log(csm);

        // CSA
        var csa_element = $('#CF00N3000000CHJGg_ileinner');
        var csa = csa_element.text().trim();
        console.log(csa);

        // Name
        var name_element = $('#acc2_ileinner');
        var name = name_element.text().replace('[View Hierarchy]','').trim();
        console.log(name);

        // Vendor
        var vendor_element = $('#00N300000041rs2_ileinner');
        var vendor = vendor_element.text().trim();
        console.log(vendor);

        // Link
        var link = location.href.replace(location.hash,'');
        console.log(link);

        var buttonRow = $('td#topButtonRow');
        var btnHtml = '<input id="JiraCreate" class="btn" name="Jira Task" title="Jira Task" type="button" Value=" Jira Task "/>';
        var btn = $(btnHtml);
        var issuelink = 'https://onshift.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=12613&issuetype=10002';
        issuelink += '&customfield_12402=' + encodeURIComponent(name);
        issuelink += '&customfield_12410=' + encodeURIComponent(csa);
        issuelink += '&customfield_12411=' + encodeURIComponent(csm);
        issuelink += '&customfield_12406=' + encodeURIComponent(vendor);
        issuelink += '&customfield_10611=' + encodeURIComponent(link);

        btn.click( function(){
            window.open(issuelink,'_blank');
        });
        console.log(btn)
        buttonRow.append( $(btn) );

    });
})();