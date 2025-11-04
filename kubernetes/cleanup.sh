#!/bin/bash

set -e

echo "======================================"
echo "EventHub Kubernetes Cluster Deletion"
echo "======================================"
echo ""

CLUSTER_NAME="eventhub"

echo "Deleting Kind cluster '$CLUSTER_NAME'..."
kind delete cluster --name "$CLUSTER_NAME"
echo ""
