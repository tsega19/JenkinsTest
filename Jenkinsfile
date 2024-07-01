pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/tsega19/JenkinsTest.git' 
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
                        outputs: ['JenkinsTest:latest'] 
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
