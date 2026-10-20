# Campus Event Board — CCA2 CI/CD

A simple Node.js campus events website used to demonstrate a Jenkins CI/CD pipeline.

## Components
- GitHub: source control
- Jenkins: pipeline orchestration
- Docker: container image
- Docker Hub: image registry
- Minikube and kubectl: Kubernetes deployment
- AWS EC2 (Amazon Linux 2023): hosting environment

## Local test
```bash
npm test
npm start
curl http://localhost:3000/api/health
```

## Required configuration
1. Replace `REPLACE_WITH_YOUR_DOCKERHUB_USERNAME` in `Jenkinsfile` and `k8s/deployment.yaml`.
2. In Jenkins, add a Username with password credential with ID `dockerhub-creds`; use your Docker Hub username and access token.
3. Configure a Pipeline job from SCM pointing to this GitHub repository and `Jenkinsfile`.
4. Jenkins must have Docker access and a working Minikube cluster in `/var/lib/jenkins/.kube/config`.

## Pipeline stages
Checkout → Build and Test → Docker Build → Push Image → Minikube Deployment → Verification.

## Service access
The Kubernetes Service uses NodePort 30080. For Minikube's Docker driver on EC2, use a `kubectl port-forward` service or another host-to-cluster forwarding method, then open `http://EC2_PUBLIC_IP:30080/`.
Health endpoint: `/api/health`.

## Version 2 demonstration
Edit the homepage message in `index.html`, change `APP_VERSION` to `"2"` in `k8s/deployment.yaml`, commit and push the changes, then run Jenkins again. Verify `/api/health` returns version 2.
