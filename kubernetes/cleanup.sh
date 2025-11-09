#!/bin/bash

set -e

echo "======================================"
echo "EventHub Kubernetes Cleanup Script"
echo "======================================"
echo ""

echo "Checking Kind cluster..."
if ! kind get clusters 2>/dev/null | grep -q "eventhub"; then
    echo "Cluster 'eventhub' not found. Nothing to clean up."
    exit 0
else
    echo "Cluster 'eventhub' found. Proceeding with cleanup..."
fi
echo ""

echo "1. Deleting Frontend..."
kubectl delete -f frontend/frontend-service.yaml --ignore-not-found=true
kubectl delete -f frontend/frontend-deployment.yaml --ignore-not-found=true
kubectl delete -f frontend/frontend-configmap.yaml --ignore-not-found=true
echo ""

echo "2. Deleting Backend..."
kubectl delete -f backend/backend-service.yaml --ignore-not-found=true
kubectl delete -f backend/backend-deployment.yaml --ignore-not-found=true
kubectl delete -f backend/backend-secret.yaml --ignore-not-found=true
kubectl delete -f backend/backend-configmap.yaml --ignore-not-found=true
echo ""

echo "3. Deleting Database..."
kubectl delete -f database/database-service.yaml --ignore-not-found=true
kubectl delete -f database/database-deployment.yaml --ignore-not-found=true
kubectl delete -f database/database-secret.yaml --ignore-not-found=true
kubectl delete -f database/database-configmap.yaml --ignore-not-found=true
kubectl delete -f database/database-pvc.yaml --ignore-not-found=true
kubectl delete -f database/database-pv.yaml --ignore-not-found=true
echo ""

echo "4. Deleting namespaces..."
kubectl delete -f namespaces/ --ignore-not-found=true
echo ""

echo "======================================"
echo "Cleanup Complete!"
echo "======================================"
echo ""
echo "All applications have been removed."
echo "The Kind cluster 'eventhub' is still running."
echo ""
echo "To delete the cluster entirely, run:"
echo "  kind delete cluster --name eventhub"
echo ""
