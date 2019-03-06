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
    else {
        return {
            "error": "noSuchCommand"
        };
    }
}

browser.runtime.onMessage.addListener(onMessage);