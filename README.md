# Payload CMS - Content Management System

Un CMS headless moderno costruito con **Payload CMS 3.0** e **Next.js 15**.

## Tecnologie

- **Payload CMS 3.0** - CMS headless open-source
- **Next.js 15** - Framework React per applicazioni web
- **MongoDB Atlas** - Database cloud NoSQL
- **TypeScript** - Tipizzazione statica
- **React 19** - Libreria UI

## Requisiti

- Node.js 18.x o superiore
- npm o pnpm
- Account MongoDB Atlas (già configurato)

## Installazione

1. **Clona la repository**
   ```bash
   git clone https://github.com/deve1993/payload-cms.git
   cd payload-cms
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**

   Crea un file `.env` basandoti su `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Configura le seguenti variabili:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>
   PAYLOAD_SECRET=<tua-chiave-segreta>
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```

5. **Accedi all'applicazione**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## Scripts disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Crea la build di produzione |
| `npm run start` | Avvia il server di produzione |
| `npm run lint` | Esegue il linting del codice |
| `npm run generate:types` | Genera i tipi TypeScript |

## Struttura del progetto

```
payload-cms/
├── src/
│   ├── app/
│   │   ├── (frontend)/     # Pagine frontend pubbliche
│   │   └── (payload)/      # Admin panel e API
│   ├── collections/        # Definizioni delle collections
│   │   ├── Media.ts        # Collection per i media/upload
│   │   └── Users.ts        # Collection utenti con autenticazione
│   ├── payload.config.ts   # Configurazione principale Payload
│   └── payload-types.ts    # Tipi TypeScript generati
├── tests/                  # Test E2E e integration
├── .env                    # Variabili d'ambiente (non committato)
├── .env.example            # Template variabili d'ambiente
└── package.json
```

## Collections

### Users
Collection per la gestione degli utenti con autenticazione integrata. Permette l'accesso al pannello admin.

### Media
Collection per la gestione dei file multimediali con:
- Upload di immagini
- Ridimensionamento automatico
- Focal point per il cropping

## API

Payload espone automaticamente API REST e GraphQL:

- **REST API**: `http://localhost:3000/api/<collection>`
- **GraphQL**: `http://localhost:3000/api/graphql`
- **GraphQL Playground**: `http://localhost:3000/api/graphql-playground`

### Esempi API REST

```bash
# Ottieni tutti gli utenti
GET /api/users

# Ottieni un singolo utente
GET /api/users/:id

# Crea un nuovo documento
POST /api/<collection>

# Aggiorna un documento
PATCH /api/<collection>/:id

# Elimina un documento
DELETE /api/<collection>/:id
```

## Deploy con Docker

```bash
# Avvia con Docker Compose
docker-compose up -d

# Visualizza i log
docker-compose logs -f
```

## Variabili d'ambiente

| Variabile | Descrizione | Obbligatoria |
|-----------|-------------|--------------|
| `DATABASE_URL` | URL di connessione MongoDB | Si |
| `PAYLOAD_SECRET` | Chiave segreta per la crittografia | Si |
| `NEXT_PUBLIC_SERVER_URL` | URL del server (produzione) | No |

## Risorse utili

- [Documentazione Payload CMS](https://payloadcms.com/docs)
- [Documentazione Next.js](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Discord Payload](https://discord.com/invite/payload)

## Autore

**deve1993** - [GitHub](https://github.com/deve1993)

## Licenza

MIT License
