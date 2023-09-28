# How to Build Goodwillfinds:

## Env
 - update build/goodwill.json:
   - dependencies.repository.branch
   - settings.project.version
   - settings.project.build

## Build
 - grunt build --project=goodwill --target=staging

## Deploy
 - grunt upload --project=goodwill --target=staging
 - grunt activate --project=goodwill --target=staging

## Meta
 - grunt importMeta --project=goodwill --target=staging

## Build & Deploy (one run)
 - grunt dist --project=goodwill --target=staging
