module.exports = {
    meta: {
        files: [
            {
                expand: true,
                cwd: '<%= dw_properties.folders.repos %>/newco-code-repository/meta/compiled_meta/',
                src: 'meta/*',
                dest: '<%= dw_properties.folders.site %>/site_meta'
            }
        ]
    }
};
