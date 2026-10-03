# Go service with Docker and Kubernetes

A small Go HTTP service with tests, a multi-stage Docker image and Kubernetes manifests.

## Endpoints

| Route | Response |
|---|---|
| `GET /health` | `{"status":"ok"}` |
| `GET /add?a=1&b=2` | `{"result":3}` |

Invalid `a` or `b` returns `400`.

## Run

```bash
go run .
curl "localhost:8080/add?a=1&b=2"
```

## Test

```bash
go vet ./...
go test ./... -cover
```

## Docker

The image builds in `golang:1.23-alpine` and runs the binary on `scratch`.

```bash
docker build -t go-app:v1 .
docker run -p 8080:8080 go-app:v1
```

## Kubernetes

```bash
kubectl apply -f k8s/
kubectl get pods,svc
```

`k8s/deployment.yml` runs 2 replicas of `go-app:v1`; `k8s/service.yml` exposes it. For a local cluster, load the image first (for example `minikube image load go-app:v1`).

## CI

`.github/workflows/go-ci.yml` at the repo root runs vet, tests with coverage and a Docker build.
