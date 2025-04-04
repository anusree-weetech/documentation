#!/bin/bash

set -e #Exit on error

echo "Applying kubernetes configs..."
kubectl apply -f k8s/

echo " All resources applied successfully"

echo "Currebnt pod:"
kubectl get pods

# tail logs from graphql
kubectl logs -l app=graphql --tail=10