# express-ip

[![Build Status](https://travis-ci.com/bassaer/express-ip.svg?branch=main)](https://travis-ci.com/bassaer/express-ip)

```
❯ minikube addons enable ingress
✅  ingress was successfully enabled
```
```
❯ for yml in $(find  deploy -type f -name '*.yaml'); do kubectl apply -f $yml; done
deployment.apps/express-ip created
ingress.networking.k8s.io/express-ip created
service/express-ip created
```
```
❯ minikube service express-ip --url
http://192.168.64.6:31445

❯ kubectl get ingress
NAME         HOSTS             ADDRESS        PORTS   AGE
express-ip   express-ip.info   192.168.64.6   80      57s
```
```
# /etc/hosts
192.168.64.6 express-ip.info
```
```
❯ curl express-ip.info
{
  "req.ip": "172.17.0.9",
  "req.socket.remoteAddress": "172.17.0.9",
  "req.socket.remotePort": 46806,
  "req.ips": []
}
```
```
❯ kubectl logs express-ip-5f9c66d8bd-gjbns --since=1s -f
[2020-11-02T06:13:51.071] [INFO] access - 192.168.64.1 - - "GET / HTTP/1.1" 200 123 "" "curl/7.64.1"
```
```
❯ kubectl get pod -n kube-system -l app.kubernetes.io/name=nginx-ingress-controller -o jsonpath={.items..podIP}
172.17.0.9
```

https://kubernetes.io/ja/docs/tasks/access-application-cluster/ingress-minikube/
