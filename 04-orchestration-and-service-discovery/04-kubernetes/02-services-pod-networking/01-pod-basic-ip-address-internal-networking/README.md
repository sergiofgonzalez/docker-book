# 01: Pod networking with Services &mdash; Sending a ping from one pod to another
> manifests for a couple of deployments that illustrate how internal networking works using the pods' internal IP addresses

## Description

This directory contains the application manifests for two deployments that control two pods.

Those pods can be used understand how pod-to-pod networking works when using IP addressed.

## Running instructions

Type the following command to submit the manifest to the cluster.

```bash
kubectl apply -f sleep-1-deployment.yml -f sleep-2-deployment.yml
```

Then, type the following command to send a ping from one of the pods to the other.

```bash
kubectl exec deploy/sleep-1 \
-- ping -c 1 $(kubectl get pods \
--selector app=sleep-2 \
-o jsonpath='{.items[0].status.podIP}')
```
