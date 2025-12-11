# Nestjs Mikulás API

## Fejlesztői környezet beállítása

### Klónozd a repót

```bash
git clone https://github.com/hrustinszkiadam/nest-santa.git
cd nest-santa
```

### Telepítsd a csomagokat

```bash
npm install
```

### Állítsd be a környezeti változókat

Másold a `.env.example` fájlt `.env` néven

### Indítsd el az adatbázist (beépített docker-compose fájl használatával)

```bash
npm run db:start
```

> Ha saját PostgreSQL szervert használsz, győződj meg róla, hogy a `.env` fájlban a `DATABASE_URL` helyesen van beállítva a helyi adatbázisodhoz.
> Ha már fut egy adatbázis, le lehet állítani az `npm run db:stop` paranccsal.

### Alkalmazd az adatbázis sémát

```bash
npm run db:push
```

### Indítsd el a fejlesztői szervert

```bash
npm run start:dev
```

## Adatbázis seedelése

Az adatbázis seedelése csak fejlesztési környezetben támogatott. Futtasd a következő parancsot:

```bash
npm run db:seed
```

Ha szeretnénk több adatot seedelni, megadhatjuk a sorok mennyiségét argumentumként:

```bash
npm run db:seed 50
```

## Adatbázis kezelése Drizzle Kit-tel

Az adatbázis kezeléséhez a Drizzle Kit eszközt használjuk. Az alábbi parancsok érhetők el:

- `npm run db:push`: Alkalmazza a sémaváltozásokat az adatbázisra.
- `npm run db:studio`: Elindítja a Drizzle Studio-t az adatbázis kezelésére és adatok megjelenítésére.
