VERSION=$(curl -s -XGET https://api.github.com/repos/Michaelpalacce/SimpleSecretsFrontend/tags | grep name -m 1 | awk '{print $2}' | cut -d'"' -f2)

docker buildx build --platform linux/amd64,linux/arm64 \
-f Dockerfile \
-t stefangenov/simplesecrets-frontend:latest \
-t stefangenov/simplesecrets-frontend:"${VERSION}" \
--push \
.
