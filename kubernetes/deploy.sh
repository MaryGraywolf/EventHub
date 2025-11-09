#!/bin/bash

set -e

if [ -f "../.env" ]; then
    echo "Loading environment variables from .env file..."
    export $(grep -v '^#' ../.env | xargs)
else
    echo "Warning: .env file not found!"
    exit 1
fi

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
docker build -t backend-event-hub:${TAG_BACKEND} -f ../backend/Dockerfile ../.
echo "- Building frontend image..."
docker build -t frontend-event-hub:${TAG_FRONTEND} -f ../frontend/Dockerfile ../.
echo ""

echo "Loading Docker images into Kind cluster..."
echo "- Loading backend-event-hub:${TAG_BACKEND}..."
kind load docker-image backend-event-hub:${TAG_BACKEND} --name eventhub
echo "- Loading frontend-event-hub:${TAG_FRONTEND}..."
kind load docker-image frontend-event-hub:${TAG_FRONTEND} --name eventhub
echo ""

echo "1. Creating namespaces..."
kubectl apply -f namespaces/
echo ""

echo "2. Deploying Database..."
kubectl apply -f database/database-pv.yaml
kubectl apply -f database/database-pvc.yaml
envsubst < database/database-configmap.yaml | kubectl apply -f -
envsubst < database/database-secret.yaml | kubectl apply -f -
envsubst < database/database-deployment.yaml | kubectl apply -f -
envsubst < database/database-service.yaml | kubectl apply -f -
echo "Waiting for database to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/database-deployment -n database
echo ""

echo "3. Deploying Backend..."
envsubst < backend/backend-configmap.yaml | kubectl apply -f -
envsubst < backend/backend-secret.yaml | kubectl apply -f -
envsubst < backend/backend-deployment.yaml | kubectl apply -f -
envsubst < backend/backend-service.yaml | kubectl apply -f -
echo "Waiting for backend to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/backend-deployment -n backend
echo ""

echo "4. Deploying Frontend..."
envsubst < frontend/frontend-configmap.yaml | kubectl apply -f -
envsubst < frontend/frontend-deployment.yaml | kubectl apply -f -
envsubst < frontend/frontend-service.yaml | kubectl apply -f -
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
