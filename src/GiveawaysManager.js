// require packages
const { GiveawaysManager: Giveaways } = require("discord-giveaways");
const Enmap = require("enmap");
const fs = require("fs");

/**
 * GiveawayManager class based on Enmap
 */
class GiveawayManager extends Giveaways {

    /**
     * @constructor
     * @param {Client} client Discord.js Client
     * @param {Object} options Giveaways Options
     * @returns {GiveawayManager}
     */
    constructor(client, options={ storage: false }) {
        if (!client) throw new Error("Expected client, received  nothing.");
        if (typeof options !== "object") throw new Error("Invalid options!");

        options.storage = false;
        super(client, options);

        /**
         * Database Used By GiveawayManager
         * @type {Enmap[]}
         */
        this.enmap = new Enmap("giveaways");
        this.enmap.ensure("giveaways", []);

        /**
         * GiveawayOptions provided to GiveawayManager
         * @type {Object}
         */
        this.GiveawaysOptions = options;
    }

    /**
     * Fetches all giveaways from the database.
     * @returns {Promise<Giveaways[]>}
     */
    async getAllGiveaways() {
        return this.enmap.get("giveaways");
    }

    /**
     * Saves  the giveaway in the database
     * @param {Snowflake|String} messageID Giveaway Message ID
     * @param {Object} giveawayData Giveaways Data
     * @returns {Promise<Boolean>}
     */
    async saveGiveaway(messageID, giveawayData) {
        this.enmap.push("giveaways", { messageID, giveawayData });
        return true;
    }

    /**
     * Edits the existing giveaway
     * @param {Snowflake|String} messageID Giveawway Message ID
     * @param {Object} giveawayData Giveaway Data
     * @returns {Promise<Giveaways[]>}
     */
    async editGiveaway(messageID, giveawayData) {
        if (!this.has(messageID)) throw new Error("No such giveaway with that id!");
        const giveaways = this.enmap.get("giveaways");
        const arr = giveaways.filter((g) => g.messageID !== messageID);
        arr.push(giveawayData);
        return this.enmap.set("giveaways", arr);;
    }

    /**
     * Deletes the giveaway
     * @param {Snowflake|String} messageID Giveawway Message ID
     * @returns {Promise<Giveaways[]>}
     */
    async deleteGiveaway(messageID) {
        if (!this.has(messageID)) throw new Error("No such giveaway with that id!");
        const arr = this.enmap.get("giveaways").filter((g) => g.messageID !== messageID);
        return this.enmap.set("giveaways", arr);
    }

    /**
     * Filters through the giveaway
     * @param  {...any} args Function for Filtering data
     * @returns {Giveaways[]}
     */
    filter(...args) {
        let all = this.enmap.get("giveaways").filter(...args);
        return all;
    }

    /**
     * Checks if the giveaway is inside the database
     * @param  {Snowflake|String} messageID Giveaway message id
     * @returns {Boolean}
     */
    has(messageID) {
        return !!(this.enmap.get("giveaways").some(g => g.messageID === messageID));
    }

    /**
     * Forcefully reset the giveaways
     * @param {Boolean} force Defaults to false
     * @returns {Promise<any[]>}
     */
    async clear(force = false) {
        return force ? this.enmap.deleteAll() : this.enmap.set("giveaways", []);
    }

    /**
     * Creates JSON file of the giveaways data
     * @param {String|Buffer} path Path to extract data
     * @returns {Promise<Giveaways[]>}
     */
    async exportTo(path) {
        let data = this.enmap.get("giveaways") || [];
        data = JSON.stringify(data);
        fs.writeFileSync(path+"GiveawayData.json", data);
        return JSON.parse(data);
    }

    /**
     * Imports the data from json file and sets the data inside GiveawayManager database
     * @param {String|Buffer} file File to import from
     * @returns {Promise<Giveaways[]>}
     */
    async importFrom(file) {
        let data = fs.readFileSync(file, "utf-8");
        return this.enmap.set("giveaways", JSON.parse(data));
    }

    /**
     * Package version
     * @type {String}
     */
    get version() {
        return (require("../package.json")["version"]);
    }

}

module.exports = GiveawayManager;