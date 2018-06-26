module.exports = function (grunt) {
    grunt.initConfig({
        updateLocaleFlags: {
            locales: [
                "ar",
                "bs",
                "ca",
                "cs",
                "da",
                "de",
                "el",
                "es",
                "et",
                "fi",
                "fr",
                "he",
                "hi",
                "hr",
                "hu",
                "id",
                "it",
                "ja",
                "ko",
                "lt",
                "lv",
                "nl",
                "nb",
                "pl",
                "pt-br",
                "pt-pt",
                "ro",
                "ru",
                "sl",
                "sr",
                "sv",
                "th",
                "tr",
                "vi",
                "zh-cn",
                "zh-hk",
                "zh-tw"
            ]
        }
    });

    grunt.loadTasks("tasks");

    grunt.registerTask("default", "updateLocaleFlags");
};