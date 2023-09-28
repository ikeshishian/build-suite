# How Astound builded:

## Env
 - node -v
 - npm --version
 - git --version
 - gulp -v

## Git
 - Cloning repository git@bitbucket.org:astoundcommerce/build-suite.git
 - npm install
 - grunt --version
 - npm install
 - grunt --version
 - node app.js --tag goodwill_stg --mode STAGING --public **** --secret ****
 - rm -f tpm.json

## Build
 - grunt clean:build --project=goodwill
   - clean:build
 - grunt dw_checkout --project=goodwill --target_branch=release/23.04.11.0 --build_version=23.04.11.0-238
   - dw_checkout:default
   - gitclone:newco-code-repository
 - echo '

         # Required metadata
         sonar.projectKey=goodwill
         sonar.projectName=Goodwill
         sonar.projectVersion=release/23.04.11.0

         # Disable SCM Sensor
         sonar.scm.disabled=true

         # Skip the package design and design analysis
         sonar.skipPackageDesign=true
         sonar.skipDesign=true

         # Comma-separated paths to directories with sources (required)
         sonar.sources=cartridges

         # Language
         sonar.language=js
         sonar.javascript.file.suffixes=.js

         # Encoding of sources files
         sonar.sourceEncoding=UTF-8

         # Exclusions/Inclusions
         #sonar.inclusions=
         sonar.exclusions=**/cartridge/static/default/js/*.js, **/cartridge/static/default/**/*.html, **/cartridge/client/default/src/js/components/public-path.js/**, **/cartridge/config/*.js, **/app_storefront_base/**, **/bm_app_storefront_base/**, **/app_custom_core/**, **/int_avatax_sfra/**, **/int_paypal/**, **/bc_library/**, **/bm_integrationframework/**, **/bc_integrationframework/**, **/bm_avatax/**, **/bm_ckeditor/**, **/int_b2ccrmsync/**, **/plugin_b2ccrmsync/**, **/int_monitoring/**'
 - /opt/jenkins/tools/sonar-scanner-3.2.0.1227-linux/bin/sonar-scanner
 - npm install
 - grunt dw_npm_execute:default --project=goodwill
   - dw_npm_execute:default
   - npm-command:newco-code-repository__build_release
 - grunt ast_zip_code --project=goodwill --build_version=23.04.11.0-238
   - ast_dw_copy:code
   - copy:newco-code-repository
   - dw_insert_buildinfo:default
   - dw_optimize
   - dw_merge:default
   - ast_obfuscator
   - dw_compress:code

## Deploy
 - grunt upload --project=goodwill --webdav.server=staging-na01-newco.demandware.net --build_version=23.04.11.0-238 --two_factor=true --two_factor.password=******** --ocapi_client_id=e9e3c129-8386-4e77-97e1-6da0a03787b1 --ocapi_client_secret=********
 - cat function_log
   - ast_upload:code
   - ast_api_upload_code
 - rm -f function_log
 - grunt activate --project=goodwill --webdav.server=staging-na01-newco.demandware.net --build_version=23.04.11.0-238 --ocapi_client_id=e9e3c129-8386-4e77-97e1-6da0a03787b1 --ocapi_client_secret=********
 - cat function_log
   - dw_activate:code
   - dw_api_activate_code
 - rm -f function_log

## Meta
 - grunt importMeta --project=goodwill --webdav.server=staging-na01-newco.demandware.net --build_version=23.04.11.0-238 --two_factor=true --two_factor.password=******** --ocapi_client_id=e9e3c129-8386-4e77-97e1-6da0a03787b1 --ocapi_client_secret=********
 - cat function_log
   - ast_dw_copy:metaImport
   - copy:site_meta_newco-code-repository
   - dw_prepare_site_import:default
   - dw_compress:meta
   - ast_upload:meta
   - ast_api_upload:meta
   - dw_import:meta
   - dw_api_import:meta
 - rm -f function_log

## Notify
 - grunt ast_jira_process_issues --project=goodwill --build_version=23.04.11.0 --jira_host_protocol=https --jira_host=jira.ontrq.com --jira_username=**** '--jira_password=****' --jira_project_id=GDW '--jira_transition_name=Ready for QA' --jira_add_resolved_to_release=true '--jira_ready_for_deploy_jql=assignee in (a.samoilov, d.bunak, v.strekha, y.zhemchuzhnykov, d.mytrovka, k.zhukov) AND status in (Resolved, Done) and resolution in (Fixed) and type not in (Risk, Question, Issue, Incident, Dependency, Epic)' '--jira_fix_version_jql=status!=Closed' --jira_transition_resolved=true --jira_assign_trans_to_reporter=false --jira_fix_version=23.04.11.0 '--jira_transition_comment=As part of Release this ticket has been deployed to Staging environment and Ready for Testing after 15 min (activation time). Build Version: 23.04.11.0' --jira_add_build_label=false --jira_build_label=GDW-23.04.11.0 --jira_default_assignee=o.khymka
   - ast_jira_process_issues
 - grunt ast_prepare_notes --project=goodwill --build_version=23.04.11.0 --release_notes_target=staging
   - ast_notes_data_preparation
   - mustache_render:renderNotes
   - inlinecss:releaseNotes
