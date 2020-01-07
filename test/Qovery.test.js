const fs = require('fs');
const Qovery = require("../src/Qovery");


describe('test Qovery', () => {
    const b64 = fs.readFileSync('./test/b64.txt', 'utf8');
    const localConfigurationFilePath = './test/local_configuration.json';

    process.env['QOVERY_JSON_B64'] = b64;
    process.env['QOVERY_BRANCH_NAME'] = 'master';
    process.env['QOVERY_IS_PRODUCTION'] = 'true';

    const q = new Qovery();

    test('get current branch name', () => {
        expect(q.getBranchName()).toBe('master');
    });

    test('is production', () => {
        expect(q.isProduction()).toBeTruthy();
    });

    test('load configuration file', () => {
        process.env['QOVERY_JSON_B64'] = '';
        _q = new Qovery(localConfigurationFilePath);
        process.env['QOVERY_JSON_B64'] = b64;

        expect(_q.configuration).toBeDefined();
    });

    test('load bad configuration file', () => {
        process.env['QOVERY_JSON_B64'] = '';
        _q = new Qovery("it_does_not_exists");
        process.env['QOVERY_JSON_B64'] = b64;

        expect(_q.configuration).toBeUndefined();
    });

    test('list databases', () => {
        expect(q.getDatabases().length).toBeGreaterThanOrEqual(1);
    });

    test('get database by name', () => {
        expect(q.getDatabaseByName('my-pql')).toBeDefined();
    });

    test('get wrong database by name', () => {
        expect(q.getDatabaseByName('toto')).toBeUndefined();
    });

    test('get database host', () => {
        expect(q.getDatabaseByName('my-pql').host).toBeDefined();
    });

});
