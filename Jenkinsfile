pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/tsega19/JenkinsTest.git'
            }
        }
        stage('Build and Dockerize') {
            steps {
                script {
                    docker.image('node:16').inside {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Deploy to Ingress (Optional)') {
            when {
                expression { return false } // Adjust condition for deployment
            }
            steps {
                echo 'Deploying to Ingress...'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        failure {
            echo 'Pipeline failed :('
        }
    }
}
