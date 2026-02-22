pipeline {
    agent any

    stages {

        stage('Instalar dependencias') {
            steps {
                bat 'npm install'
            }
        }

        stage('Snyk Scan') {
            steps {
                withCredentials([string(credentialsId: 'snyk-token', variable: 'TOKEN')]) {
                    bat 'npx snyk auth %TOKEN%'
                    bat 'npx snyk test'
                }
            }
        }

    }
}