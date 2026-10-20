pipeline {
  agent any
  environment {
    DOCKERHUB_USER = 'REPLACE_WITH_YOUR_DOCKERHUB_USERNAME'
    IMAGE_NAME = 'campus-event-board'
    KUBECONFIG = '/var/lib/jenkins/.kube/config'
    MINIKUBE_HOME = '/var/lib/jenkins'
  }
  options { timestamps(); disableConcurrentBuilds() }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Build and Test') {
      steps {
        sh 'node --version'
        sh 'npm test'
      }
    }
    stage('Docker Build') {
      steps {
        sh 'docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER} -t ${DOCKERHUB_USER}/${IMAGE_NAME}:latest .'
      }
    }
    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_TOKEN')]) {
          sh '''
            set +x
            echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USER" --password-stdin
            docker push "${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}"
            docker push "${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
            docker logout
          '''
        }
      }
    }
    stage('Minikube Deployment') {
      steps {
        sh '''
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/service.yaml
          kubectl set image deployment/campus-event-board campus-event-board=${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}
          kubectl rollout status deployment/campus-event-board --timeout=180s
        '''
      }
    }
    stage('Verification') {
      steps {
        sh '''
          kubectl get pods
          kubectl get deployments
          kubectl get services
          kubectl exec deployment/campus-event-board -- node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>r.json()).then(j=>{console.log(j); if(!j.success) process.exit(1)}).catch(e=>{console.error(e);process.exit(1)})"
        '''
      }
    }
  }
  post {
    always { sh 'docker image prune -f || true' }
    success { echo 'Campus Event Board pipeline completed successfully.' }
  }
}
