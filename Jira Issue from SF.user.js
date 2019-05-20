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
        var btn;
        var issuelink;
        if( document.title.toLowerCase().startsWith('account' ) ){
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
            btn = $(btnHtml);
            issuelink = 'https://onshift.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=12613&issuetype=10002';
            issuelink += '&customfield_12402=' + encodeURIComponent(name);
            issuelink += '&customfield_12410=' + encodeURIComponent(csa);
            issuelink += '&customfield_12411=' + encodeURIComponent(csm);
            issuelink += '&customfield_12406=' + encodeURIComponent(vendor);
            issuelink += '&customfield_10611=' + encodeURIComponent(link);
        }
        else if( document.title.toLowerCase().startsWith('request' ) ){
            console.log('Is Request')
            // CSM
            var owner_ele = $('#Owner_ileinner');
            var owner = owner_ele.text().trim();
            console.log(csm);

             // Title
            var title_ele = $('#00N3A00000CCFGf_ileinner');
            var title = "Vendor Change - " + title_ele.text().trim();
            console.log(title);

            // Customer
            var cust_ele = $('#CF00N3A00000ClVrH_ileinner');
            var cust = cust_ele.text().trim();
            console.log(cust);

            // Vendor
            var vend_ele = $('#CF00N3A00000ClVrW_ileinner');
            var vend = vend_ele.text().trim();
            console.log(vend);

            // Link
            var link = location.href.replace(location.hash,'');
            console.log(link);

            // SF ID
            var parts = window.location.pathname.split('/');
            var sfid = parts[parts.length - 1];
            console.log(sfid);

            var description = $('#spc_00N3A00000CCFGD_div').text().trim();

            var buttonRow = $('td#topButtonRow');
            var btnHtml = '<input id="JiraCreate" class="btn" name="Jira Task" title="Jira Task" type="button" Value=" Jira Task "/>';
            btn = $(btnHtml);
            issuelink = 'https://onshift.atlassian.net/secure/CreateIssueDetails!init.jspa?pid=12613&issuetype=10002';
            issuelink += '&customfield_12402=' + encodeURIComponent(cust);
            issuelink += '&customfield_12406=' + encodeURIComponent(vend);
            issuelink += '&customfield_10611=' + encodeURIComponent(link);
            issuelink += '&customfield_10601=' + encodeURIComponent(sfid);
            issuelink += "&summary=" + encodeURIComponent(title);
            issuelink += '&description=' + encodeURIComponent(description);
        }
        btn.click( function(){
            window.open(issuelink,'_blank');
        });
        console.log(btn)
        buttonRow.append( $(btn) );

    });
})();
