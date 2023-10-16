# Hermes

Hermes is one puzzle in masterpice called Minere Cloud. The role of Hermes is to fetch server jars from different sources and generate links for downloading them. It can also generate download url from url to plugin (Modrinth or SpigotMC).

## Development

```
npm install
npm run dev
```

## Production

```
docker-compose up -d
```

v1/download/:resouce // Plugin
v1/download/:resouce/:type/:version // Sever JAR