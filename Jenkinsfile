pipeline {
    agent any
    options {
        gitLabConnection('xzinfra-gitlab')
        skipDefaultCheckout()
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }
    stages {
        stage('Build & Push Docker Image') {
            environment {
                PLATFORM_DOCKER = 'linux/amd64'
                DOCKERFILE      = 'Dockerfile'
                REGISTRY        = 'harbor.xzinfra.com/spiritx-app'
                REPOSITORY      = 'openmaic'
            }
            steps {
                checkout scm
                script {
                    // Keep tag strategy aligned with existing internal projects:
                    // main/release branches prefer git tag, otherwise branch-date-commit.
                    // other branches use branch-date-commit only.
                    if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME.startsWith('release/')) {
                        env.ARTIFACT_TAG = sh(
                            script: '[[ $(git rev-list HEAD --max-count=1) == $(git rev-list --tags --max-count=1) ]] && echo $(git describe --tags) || echo $BRANCH_NAME-$(date +%Y-%m-%d)-$(git rev-parse --short HEAD)',
                            returnStdout: true
                        ).trim().replaceAll("/", "-")
                        env.IS_RELEASE = 'true'
                    } else {
                        env.ARTIFACT_TAG = sh(
                            script: 'echo $BRANCH_NAME-$(date +%Y-%m-%d)-$(git rev-parse --short HEAD)',
                            returnStdout: true
                        ).trim().replaceAll("/", "-")
                        env.IS_RELEASE = 'false'
                    }
                }

                echo "Building image: ${REGISTRY}/${REPOSITORY}:${ARTIFACT_TAG}"

                script {
                    // main/release branches also publish the latest tag
                    def extraTag = env.IS_RELEASE == 'true'
                        ? "--tag ${REGISTRY}/${REPOSITORY}:latest"
                        : ""

                    // OpenMAIC Dockerfile already produces the runnable image in its final stage.
                    // No extra build args or explicit target are required here.
                    sh """
                        docker buildx build \\
                            --push \\
                            --platform ${PLATFORM_DOCKER} \\
                            --provenance=false \\
                            -f ${DOCKERFILE} \\
                            --tag ${REGISTRY}/${REPOSITORY}:${ARTIFACT_TAG} \\
                            ${extraTag} \\
                            .
                    """
                }
            }
        }
    }
    post {
        success {
            echo "Image push succeeded"
        }
        failure {
            echo "Image build failed, please check the logs"
        }
    }
}
