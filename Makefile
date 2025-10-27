.PHONY: build

build:
	docker buildx create --use --name multiarch || true
	docker run --privileged --rm tonistiigi/binfmt --install all
	docker buildx build \
	  --platform linux/amd64,linux/arm64 \
	  -t application_docker_terraform_ec2_ansible:v0.1 \
	  --push \
	  .
