# 02: Pods and Deployments &mdash; Deployment Manifest
> manifest for a deployment controlling a single pod

## Running instructions

Type the following command to submit the manifest to the cluster.

```bash
kubectl apply -f deployment.yml
```

Then, type the following command to validate it has been created.

```bash
kubectl get pods
```

You can validate it is working as expected by running the following command and pointing your browser to http://localhost:5000.

```bash
# the first port is the local port, the second the port on which the pod
# is listening for traffic in Kubernetes
kubectl port-forward deployment/test-ts-deployment 5000:5050
```

You can list the pods managed by this deployment doing:

```bash
kubectl get pods --selector app=test-ts
```

You can run a command through the deployment doing:

```bash
kubectl exec -it deployment/test-ts-deployment --sh -c 'touch file_created.txt'
```

You can connect interactively to the pod through the deployment doing:

```bash
kubectl exec -it deployment/test-ts-deployment -- sh
```

You can obtain the logs of the pod through the deployment doing:

```bash
# tail (for the number of records) and follow (for tailing the logs) are optional
kubectl logs deployment/test-ts-deployment --tail=20 --follow
```