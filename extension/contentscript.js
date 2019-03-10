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

browser.runtime.onMessage.addListener(onMessage);