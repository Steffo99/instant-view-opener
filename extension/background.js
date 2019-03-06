"use strict";

async function onCommand(command) {
    if(command == "open-current") {
        let all_tabs = await browser.tabs.query({})
        let first_tab = all_tabs[0];
        let active_tabs = await browser.tabs.query({"currentWindow": true, "active": true});
        let selected_tab = active_tabs[0];
        let url = new URL(first_tab.url);
        url.searchParams.append("url", selected_tab.url);
        let new_url = url.toString();
        let created_tab = await browser.tabs.create({
            active: false,
            url: new_url
        })
    }
    else if(command == "open-hovered") {
        let all_tabs = await browser.tabs.query({})
        let first_tab = all_tabs[0];
        let active_tabs = await browser.tabs.query({"currentWindow": true, "active": true});
        let selected_tab = active_tabs[0];
        let link_response = await browser.tabs.sendMessage(selected_tab.id, {"command": "getHoveredLink"})
        if(link_response.error) {
            return;
        }
        let url = new URL(first_tab.url);
        url.searchParams.append("url", link_response["response"]);
        let new_url = url.toString();
        let created_tab = await browser.tabs.create({
            active: false,
            url: new_url
        })
    }
}

browser.commands.onCommand.addListener(onCommand);
