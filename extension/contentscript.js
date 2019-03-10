"use strict";

async function onMessage(message, sender, sendResponse) {
    if(message["command"] == "getHoveredLink") {
        let hovered_link = document.querySelector("a:hover");
        if(hovered_link === null) {
            return {
                "error": "noHoveredLink"
            };
        }
        let href = hovered_link.attributes["href"].nodeValue;
        let url = new URL(href, document.location.href);
        return {"response": url.href};
    }
    else if(message["command"] == "removeOriginalSection") {
        if(!document.location.href.startsWith("https://instantview.telegram.org/")) return;
        let original_section = document.querySelector("#original-section")
        if(original_section === null) return;
        original_section.remove()
        return {"response": "Done!"}
    }
    else {
        return {
            "error": "noSuchCommand"
        };
    }
}

if(document.location.href === "https://instantview.telegram.org/contest") 
{
    let timer_nodes = document.querySelectorAll(".iv-deadline:not(.highlight)")
    timer_nodes.forEach((value, key, parent) => {
        let templates_node = value.parentElement.getElementsByTagName("a")[0]
        let main_url = templates_node.href
        let processed_issues_url = main_url + "processed_issues"
        value.outerHTML = `<a href="${processed_issues_url}">${value.innerHTML}</a>`
    })
}

browser.runtime.onMessage.addListener(onMessage);