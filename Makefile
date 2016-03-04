
publish:
	npm run build
	npm publish

publish-sync: publish
	cnpm sync atool-build
	tnpm sync atool-build

