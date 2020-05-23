var s = {
    /**
     * Execute specified code
     *
     * @param String code
     */
    execute: function (code) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
        ) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: code,
            });
        });
    },
    /**
     * Remove list view
     */
    removeElements: function (selector) {
        var self = this;
        chrome.storage.sync.set({ listView: 0 }, function () {
            self.execute(
                "(function(els) {for (var i in els) {if(els[i] instanceof HTMLElement){els[i].parentNode.removeChild(els[i])};}})(document.querySelectorAll('" +
                    selector +
                    "'));"
            );
        });
    },
    /**
     * Set list view
     */
    addStyles: function (css, elementClass) {
        var self = this;
        chrome.storage.sync.set({ listView: 1 }, function () {
            self.execute(
                "var style = document.createElement('style'); style.classList.add('" +
                    elementClass +
                    "'); style.type = 'text/css'; style.appendChild(document.createTextNode('" +
                    css +
                    "')); document.head.appendChild(style);"
            );
        });
    },
    /**
     * Initialize list view functionality
     */
    initListView: function (el) {
        var self = this;
        chrome.storage.sync.get("listView", function (data) {
            console.log("Initializing listView", data);
            el.checked = data.listView ? true : false;
            el.onclick = function () {
                if (el.checked === true) {
                    self.addStyles(
                        "[id^=db-item-list] > div {width: 100%;flex: 0 0 100%;}" +
                            "[id^=db-item-list] > div > a {width: 100% !important;flex: 0 0 100% !important;}" +
                            "[id^=db-item-list] > div > a > div {display: flex;}" +
                            "[id^=db-item-list] > div > a > div > div:first-child {width: 198px;}",
                        "offerup-list-view"
                    );
                } else {
                    self.removeElements(".offerup-list-view");
                }
            };
        });
    },
    /**
     * Initialize hide advertisements
     */
    initHideAds: function (el) {
        var self = this;

        chrome.storage.sync.get("hideAds", function (data) {
            console.log("Initializing hideAds", data);
            el.checked = data.hideAds ? true : false;
            el.onclick = function () {
                if (el.checked === true) {
                    self.addStyles(
                        '[id^=db-item-list] > div > a:not([href^="/"]) {display: none !important;}',
                        "offerup-hide-ads"
                    );
                } else {
                    self.removeElements(".offerup-hide-ads");
                }
            };
        });
    },
    /**
     * Initialize
     */
    init: function () {
        // Bind scope
        this.execute = this.execute.bind(this);
        this.removeElements = this.removeElements.bind(this);
        this.addStyles = this.addStyles.bind(this);
        // Initialize events
        this.initListView(document.getElementById("list-view"));
        this.initHideAds(document.getElementById("hide-ads"));
    },
};

s.init();
