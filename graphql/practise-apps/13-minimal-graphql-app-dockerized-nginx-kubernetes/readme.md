## Commands used so far

### Some of the ones used by me

- for building a docker image

```bash
docker build -t your-image-name .
```

- for viewing all docker images

```bash
docker images
```

- for starting minikube

```bash
minikube start
```

- for checking if it is running

```bash
minikube status
```

- for applying configs to each kubernetes file

```bash
kubectl apply -f filename.yaml
```

_(or apply everything in the current directory)_

```bash
kubectl apply -f .
```

- for viewing the kubernetes pods

```bash
kubectl get pods
```

- for viewing the details of any one pod

```bash
kubectl describe pod pod-name
```

- for viewing the configured details of a pod

```bash
kubectl get pod pod-name -o yaml
```

### Some others

#### 🔧 **Docker Commands**

- **Build a Docker image**

  ```bash
  docker build -t image-name .
  ```

- **List all Docker images**

  ```bash
  docker images
  ```

- **Run a container locally**

  ```bash
  docker run -p 4000:4000 image-name
  ```

- **View all running containers**

  ```bash
  docker ps
  ```

- **View all containers (including stopped ones)**
  ```bash
  docker ps -a
  ```

#### ☸️ **Minikube Commands**

- **Start Minikube**

  ```bash
  minikube start
  ```

- **Stop Minikube**

  ```bash
  minikube stop
  ```

- **Check Minikube status**

  ```bash
  minikube status
  ```

- **Set Docker env to build inside Minikube**

  ```bash
  eval $(minikube docker-env)
  ```

- **List Minikube images**

  ```bash
  minikube image ls
  ```

- **Open a service in your browser**
  ```bash
  minikube service service-name
  ```

#### 📦 **Kubernetes Commands**

- **Apply a configuration file**

  ```bash
  kubectl apply -f file.yaml
  ```

- **Delete a configuration file**

  ```bash
  kubectl delete -f file.yaml
  ```

- **List all pods**

  ```bash
  kubectl get pods
  ```

- **List all deployments**

  ```bash
  kubectl get deployments
  ```

- **List all services**

  ```bash
  kubectl get services
  ```

- **Describe a specific pod**

  ```bash
  kubectl describe pod pod-name
  ```

- **View detailed config of a pod**

  ```bash
  kubectl get pod pod-name -o yaml
  ```

- **View logs from a pod**

  ```bash
  kubectl logs pod-name
  ```

- **Exec into a running pod**

  ```bash
  kubectl exec -it pod-name -- /bin/sh
  ```

- **Delete all resources defined in current directory**

  ```bash
  kubectl delete -f .
  ```

- **Restart a deployment**
  ```bash
  kubectl rollout restart deployment deployment-name
  ```

#### 🧪 **Testing & Debugging**

- **Curl your service endpoint (from host)**

  ```bash
  curl http://<minikube-ip>:<nodePort>/graphql
  ```

- **Port-forward a pod to access locally**
  ```bash
  kubectl port-forward pod/pod-name 4000:4000
  ```
