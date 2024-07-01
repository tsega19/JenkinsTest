pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', 
                    credentialsId: 'your-git-credentials-id',
                    url: 'https://github.com/your-username/your-repo.git' 
            }
        }
        stage('Build and Dockerize') {
            steps {
                script {
                    sh 'npm run build' 
                }
                docker {
                    image 'docker/buildx:latest' 
                    build {
                        outputs: ['my-react-app:latest'] 
                        file: 'Dockerfile'
                    }
                }
            }
        }
        stage('Deploy to Ingress (Optional)') { 
            steps {
                
            }
        }
    }
}
