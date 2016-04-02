#Course
Server-side Development with NodeJS
[web](https://www.coursera.org/learn/server-side-development/home/welcome)


##Generate private key and certificate
```bash
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
```