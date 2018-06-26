module.exports = grunt => {
    function extractMessages(bundleText) {
        // TODO: `require` instead
        return bundleText
            .replace(/(?:\s+"[\w-]+"): 1,?/g, "")
            .replace("});", "")
            .trim();
    }

    function getRootBundleContent({
        locales,
        messages
    }) {

        const content = `${messages}\n  ${getLocaleFlags({locales})}\n});`;
        return content;
    }

    function getLocaleFlags({
        locales
    }) {
        return locales.map(locale => `"${locale}": 1`).join(",\n  ");
    }

    function getBundleFolders() {
        const nlsManifestPath = "nlsmanifest.txt";
        const EOL = grunt.util.linefeed;

        return grunt.file.read(nlsManifestPath)
            .replace(/\\/g, "/")
            .split(EOL)
            .filter(folder => !!folder);
    }

    function writeRootBundle(messages, locales, bundlePath) {
        const {
            folder,
            name
        } = toFolderAndName(bundlePath);
        const fileName = `${folder}${name}.js`;

        let bundleContents;

        try {
            bundleContents = getRootBundleContent({
                locales,
                messages,
                name
            })
        } catch (err) {
            grunt.log.writeln(`failed to parse ${messages}: ${err}`);
        }

        if (bundleContents) {
            grunt.file.write(fileName, bundleContents);
            grunt.log.verbose.writeln(`transformed ${fileName} root bundle`);
        } else {
            grunt.log.verbose.writeln(`could NOT transform root ${fileName} bundle`);
        }
    }

    function toFolderAndName(bundlePath) {
        const folderSlashIndex = bundlePath.lastIndexOf("/");
        const folder = bundlePath.substring(0, folderSlashIndex + 1);
        const name = bundlePath.substring(folderSlashIndex + 1)
            .replace(".js", "");

        return {
            folder,
            name
        };
    }

    grunt.registerTask("updateLocaleFlags", "Updates locale flags on all root NLS bundles", () => {

        const taskName = grunt.task.current.name;

        grunt.config.requires("updateLocaleFlags.locales");

        const locales = grunt.config("updateLocaleFlags.locales");

        grunt.log.writeln(`${taskName} starting`);

        grunt.log.verbose.writeln("looking for NLS manifest entries.");

        const bundleFolders = getBundleFolders();

        grunt.log.verbose.writeln("finding root NLS bundles.");

        const rootBundles = grunt.file.expand(
            bundleFolders.map(folder => `${folder}/*.js`)
        );

        grunt.log.verbose.writeln("converting NLS files.");

        rootBundles.forEach(bundlePath => {
            const contents = grunt.file.read(bundlePath);
            const messages = extractMessages(contents);
            writeRootBundle(messages, locales, bundlePath);
        });

        grunt.log.writeln(`${taskName} finished`);

    });

}