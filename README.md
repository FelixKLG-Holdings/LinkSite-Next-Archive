# Welcome!

This is my attempt at making a site for support tickets with a function API.

At the time of me writing this it is nowhere near complete however it's making me learn quite a lot.

# Installation

**Download the code from github!**
If you did not download this code form github you're not downloading the official version.

you can either download it via a `git clone` or by using the green download button.


### Site Installation (production - Ubuntu)
requirements: NodeJS v16+ & MySQL/MariaDB
```shell
cd /var/www/
git clone git@github.com:FelixKLG/LinkSite-v2

cd LinkSite-v2

npm i # Yarn also works
```


(deploying this on Vercel or Netlify will probably also work btw)


# Configuration

Clone the .env.example.local as `.env.production.local` 

Inside you'll find all sorts of fields; each field has a comment above it to explain the purpose of it.

Set these to whatever you require, the site will error if this is done incorrectly.

Fields which have `# DO NOT TOUCH -- AUTO GENERATED!` above them are automatically generated from the other values you input, please only alter these if you know what you're doing with the stack used.

# Deployment

The following commands will start a webserver on the port `3000` 
```shell
npm run prisma:deploy

npm run build

npm run start
```

To make the Next webserver restart on boot you'll have to create a systemd config (there are other options as well)

Example config:
```service
[Unit]
Description=Run Vercel web server

[Service]
User=ubuntu
WorkingDirectory=/var/www/LinkSite-v2/
ExecStart=/usr/bin/npm run start
Restart=on-failiure
[Install]
WantedBy=multi-user.target
```


You should use Nginx & Cloudflare to proxy this connection as well.

# Development

Git clone a local set of files, copy the env into `.env.development.local`.

Node 16+ and MySQL is required to develop onto this.

set `NODE_ENV` to `development`

Any changes to the schema requires you run

```shell
npm run prisma:push # Push changes to the database

npm run prisma:migrate # Create 

npm run prisma:generate
```