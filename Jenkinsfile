pipeline {
    agent any
   
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tsega19/JenkinsTest.git'
            }
        }
        stage('Build and Dockerize') {
            steps {
                script {
                    // Install dependencies and build the project
                    sh 'npm install'
                    sh 'npm run build'

                    // Build the Docker image
                    def customImage = docker.build('JenkinsTest:latest', '-f Dockerfile .')
                }
            }
        }
        stage('Deploy to Ingress (Optional)') {
            steps {
                echo 'This stage is optional and can be filled with deployment steps.'
                // Add deployment steps here when needed
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed :('
        }
    }
}
