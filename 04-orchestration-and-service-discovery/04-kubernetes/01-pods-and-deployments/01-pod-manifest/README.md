# 01: Pods and Deployments &mdash; Pod Manifest
> manifest for a standalone pod running a single container

## Running instructions

Type the following command to submit the manifest to the cluster.

```bash
kubectl apply -f pod.yml
```

Then, type the following command to validate it has been created.

```bash
kubectl get pods
```

You can validate it is working as expected by running the following command and pointing your browser to http://localhost:5000.

```bash
# the first port is the local port, the second the port on which the pod
# is listening for traffic in Kubernetes
kubectl port-forward pod/test-ts-pod 5000:5050
```

You can copy files to the pod doing:

```bash
kubectl cp test-ts-pod:package.json ./package-json-from-the-pod.json
```

You can connect interactively to the pod doing:

```bash
kubectl exec -it test-ts-pod -- sh
```

You can run commands in the pod doing:
```bash
kubectl exec -it test-ts-pod --sh -c 'touch file_created.txt'
```

You can obtain the logs of the pod doing:

```bash
# tail (for the number of records) and follow (for tailing the logs) are optional
kubectl logs test-ts-pod --tail=20 --follow
```
