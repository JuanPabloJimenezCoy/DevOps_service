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
                    bat 'npx snyk test --all-projects'
                }
            }
        }

        stage('Terraform Init') {
            steps {
                dir('infra') {
                    bat 'terraform init'
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir('infra') {
                    bat 'terraform validate'
                }
            }
        }

        stage('Listo para deploy') {
            steps {
                echo 'Infraestructura validada. Lista para AWS.'
            }
        }
    }
}