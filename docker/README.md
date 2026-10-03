# Docker

One small Express app, containerized four ways so the trade-offs are easy to compare.

| Folder | Base image | Idea |
|---|---|---|
| `project-1` | `ubuntu:latest` | Install Node.js yourself. Biggest image, most control. |
| `project-2-Node-Img` | `node:22` | Use the official Node image. |
| `project-3-multi-stage` | `node:22` then `node:22-slim` | Build in one stage, ship a slimmer runtime. |
| `project-4-distroless-img` | `gcr.io/distroless/nodejs22-debian12` | No shell or package manager, smaller attack surface. |

## Try it

```bash
cd project-3-multi-stage
docker build -t node-multistage .
docker run -p 3000:3000 node-multistage
curl http://localhost:3000
```

Compare sizes of all four with `docker images`.

`docker-cheatsheet.txt` lists the commands used for images, containers, volumes and networks.
