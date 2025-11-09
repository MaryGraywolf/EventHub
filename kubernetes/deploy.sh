#!/bin/bash

set -e

echo "======================================"
echo "EventHub Kubernetes Deployment Script"
echo "======================================"
echo ""

echo "Checking Kind cluster..."
if ! kind get clusters 2>/dev/null | grep -q "eventhub"; then
    echo "Cluster 'eventhub' not found. Creating with port mapping configuration..."
    kind create cluster --config kind-config.yaml --name eventhub
else
    echo "Cluster 'eventhub' already exists."
fi
echo ""

echo "Building Docker images..."
echo "- Building backend image..."
docker build -t backend-event-hub:v0.0.1 -f ../backend/Dockerfile ../.
echo "- Building frontend image..."
docker build -t frontend-event-hub:v0.0.1 -f ../frontend/Dockerfile ../.
echo ""

echo "Loading Docker images into Kind cluster..."
echo "- Loading backend-event-hub:v0.0.1..."
kind load docker-image backend-event-hub:v0.0.1 --name eventhub
echo "- Loading frontend-event-hub:v0.0.1..."
kind load docker-image frontend-event-hub:v0.0.1 --name eventhub
echo ""

echo "1. Creating namespaces..."
kubectl apply -f namespaces/
echo ""

echo "2. Deploying Database..."
kubectl apply -f database/database-pv.yaml
kubectl apply -f database/database-pvc.yaml
kubectl apply -f database/database-configmap.yaml
kubectl apply -f database/database-secret.yaml
kubectl apply -f database/database-deployment.yaml
kubectl apply -f database/database-service.yaml
echo "Waiting for database to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/database-deployment -n database
echo ""

echo "3. Deploying Backend..."
kubectl apply -f backend/backend-configmap.yaml
kubectl apply -f backend/backend-secret.yaml
kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-service.yaml
echo "Waiting for backend to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/backend-deployment -n backend
echo ""

echo "4. Deploying Frontend..."
kubectl apply -f frontend/frontend-configmap.yaml
kubectl apply -f frontend/frontend-deployment.yaml
kubectl apply -f frontend/frontend-service.yaml
echo "Waiting for frontend to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/frontend-deployment -n frontend
echo ""

echo "======================================"
echo "Application Access:"
echo "======================================"
echo ""
echo "Frontend (NodePort): http://localhost:30080"
echo "Backend API (NodePort): http://localhost:30081"
echo ""
echo "Or use port-forward:"
echo "  Frontend: kubectl port-forward -n frontend svc/frontend-service 30080:4173"
echo "  Backend:  kubectl port-forward -n backend svc/backend-service 30081:3000"
echo ""
