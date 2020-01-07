class DatabaseConfiguration {
    constructor(json) {
        if (json === undefined) {
            return;
        }

        this.type = undefined;
        this.name = undefined;
        this.host = undefined;
        this.port = -1;
        this.username = undefined;
        this.password = undefined;
        this.version = undefined;

        if (json.type !== undefined) {
            this.type = json.type;
        }

        if (json.name !== undefined) {
            this.name = json.name;
        }

        if (json.fqdn !== undefined) {
            this.host = json.fqdn;
        }

        if (json.port !== undefined) {
            this.port = json.port;
        }

        if (json.username !== undefined) {
            this.username = json.username;
        }

        if (json.password !== undefined) {
            this.password = json.password;
        }

        if (json.version !== undefined) {
            this.version = json.version;
        }
    }


}

module.exports = DatabaseConfiguration;
