var s = {
    listView: 0,
    action: document.getElementById("action"),
    /**
     * CSS necessary to create list view
     */
    css:
        "[id^=db-item-list] > div {width: 100%;flex: 0 0 100%;}" +
        "[id^=db-item-list] > div > a {width: 100% !important;flex: 0 0 100% !important;}" +
        "[id^=db-item-list] > div > a > div {display: flex;}" +
        "[id^=db-item-list] > div > a > div > div:first-child {width: 198px;}",
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
    removeListView: function () {
        var self = this;
        chrome.storage.sync.set({ listView: 0 }, function () {
            self.execute(
                "var style = document.getElementById('offerup-list-view'); if (style) style.parentNode.removeChild(style);"
            );
        });
    },
    /**
     * Set list view
     */
    setListView: function () {
        var self = this;
        chrome.storage.sync.set({ listView: 1 }, function () {
            self.execute(
                "var style = document.createElement('style'); style.id = 'offerup-list-view'; style.type = 'text/css'; style.appendChild(document.createTextNode('" +
                    self.css +
                    "')); document.head.appendChild(style);"
            );
        });
    },
    /**
     * Click action
     */
    click: function () {
        if (this.action.checked === true) {
            this.setListView();
        } else {
            this.removeListView();
        }
    },
    /**
     * Initialize
     */
    init: function () {
        // Bind scope
        var self = this;
        this.execute = this.execute.bind(this);
        this.removeListView = this.removeListView.bind(this);
        this.setListView = this.setListView.bind(this);
        this.click = this.click.bind(this);

        // Bind click event
        this.action.onclick = this.click;

        // Get current value
        chrome.storage.sync.get("listView", function (data) {
            self.action.checked = data.listView ? true : false;
        });
    },
};

s.init();
