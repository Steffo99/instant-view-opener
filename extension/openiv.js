function dothething(command) {
    if(command == "open-iv")
    {
        browser.tabs.query({"currentWindow": true, "active": true}).then((tabs) => {
            selected_tab = tabs[0];
            browser.tabs.query({}).then((tabs) => {
                first_tab = tabs[0];
                url = new URL(first_tab.url);
                url.searchParams.append("url", selected_tab.url)
                new_url = url.toString()
                created = browser.tabs.create({
                    active: false,
                    url: new_url
                })
            });
        }, (error) => {
            console.log(error);
        })
    }
}

browser.commands.onCommand.addListener(dothething);
