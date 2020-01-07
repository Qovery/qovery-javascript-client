const fs = require('fs');
const DatabaseConfiguration = require("./DatabaseConfiguration");

class Qovery {

    constructor(configurationFilePath) {
        this._envJsonB64 = "QOVERY_JSON_B64";
        this._envIsProduction = "QOVERY_IS_PRODUCTION";
        this._envBranchName = "QOVERY_BRANCH_NAME";

        this.configuration = this.getConfigurationFromEnvironmentVariable(this._envJsonB64);
        if (this.configuration === undefined) {
            this.configuration = this.getConfigurationFromFile(configurationFilePath);
        }
    }

    /**
     * Get configuration JSON object from environment variable
     * @param environmentVariable
     * @returns {any|undefined}
     */
    getConfigurationFromEnvironmentVariable(environmentVariable) {
        if (environmentVariable === undefined || environmentVariable.length === 0) {
            return undefined;
        }

        const b64Json = process.env[environmentVariable];
        if (b64Json === undefined || b64Json.length === 0) {
            return undefined;
        }

        const jsonStr = atob(b64Json);
        return JSON.parse(jsonStr);
    }

    /**
     * Get configuration JSON object from configuration file
     * @param filePath
     * @returns {any|undefined}
     */
    getConfigurationFromFile(filePath) {
        if (filePath === undefined || filePath.length === 0) {
            return undefined;
        }

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        } catch (e) {
            // pass
        }

        return undefined
    }

    /**
     * Get current git branch name
     * @returns {string}
     */
    getBranchName() {
        return process.env[this._envBranchName];
    }


    /**
     * Is the current branch a production environment?
     * @returns {boolean}
     */
    isProduction() {
        const isProductionStr = process.env[this._envIsProduction];

        return !(isProductionStr === undefined || isProductionStr.length === 0 ||
            isProductionStr.length === 0 || isProductionStr.toLowerCase() === 'false');
    }

    /**
     * List all available databases
     * @returns {[DatabaseConfiguration]|*}
     */
    getDatabases() {
        if (this.configuration === undefined || this.configuration.databases === undefined) {
            return [];
        }

        return this.configuration.databases.map(v => new DatabaseConfiguration(v));
    }

    /**
     * Get database by its name
     * @param name
     * @returns {DatabaseConfiguration|undefined}
     */
    getDatabaseByName(name) {
        return this.getDatabases().find(v => v.name === name);
    }

}

module.exports = Qovery;
