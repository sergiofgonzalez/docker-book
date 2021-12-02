# 02: Pod networking with Services &mdash; Services
> manifest for a Service

## Description

This directory contains the application manifests for two deployments that control two pods.

Those pods can be used understand how pod-to-pod networking works when using IP addressed.

## Running instructions

Type the following command to submit the manifest to the cluster.

```bash
kubectl apply -f sleep-2-service.yml
```

Confirm that it has been deployed using:

```bash
$ kubectl get services
NAME                      TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes                ClusterIP   172.20.0.1      <none>        443/TCP    162d
...
sleep-2                   ClusterIP   172.20.11.148   <none>        80/TCP     77s
```

You can also type the following command from a running pod to send a ping and see how the IP address is resolved.

```bash
$ kubectl exec deploy/sleep-1 -- ping -c 1 sleep-2
PING sleep-2 (172.20.11.148): 56 data bytes

--- sleep-2 ping statistics ---
1 packets transmitted, 0 packets received, 100% packet loss
command terminated with exit code 1
```

| NOTE: |
| :---- |
| The `ping` command fails because the services do not support the ICMP protocol, but the previous command confirms that the name resolution works. |

