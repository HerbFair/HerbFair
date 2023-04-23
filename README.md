# HerbFairWebApp

## Clone the repository
```git clone https://github.com/HerbFair/HerbFair.git```

## Install docker and kubernetes (You can enable k8s through docker desktop or install it through minikube)
[docker](https://www.docker.com/get-started/)
[minikube](https://minikube.sigs.k8s.io/docs/start/)

## Install skaffold
[skaffold.dev](https://skaffold.dev/docs/install/)

## Start docker and kubernets in your system

## Run the following command in the main directory
```skaffold dev```

### if you want to contribute

1. create a new branch based on the staging branch following the branch naming conventions
``` git checkout -b <branch name>```

2. Make the changes to the code

3. Add the files.
```git add .``` or ```git add <file names>```

4. Commit with a suitable commit message following conventions
```git commit -m "Commit message"```

5. Set upstream branch and push if its the first time
```git push --set-upstream origin <branch name>```
    otherwise just,
```git push```

6. Add a pull request to the staging branch from your branch using github
