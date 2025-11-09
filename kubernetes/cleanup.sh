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

echo "1. Deleting namespaces..."
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
