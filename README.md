# Chat Rooms Backend

This a websocket backend server which creates non-persistant chat rooms and users to chat with one another below the various message formats it accepts

## Room creation or joining

Sent by: `client`

```json
{
  "type": "join",
  "payload": {
    "username": "Your name",
    "room": "UUID"
  }
}
```

## Chat message

Sent by: `server` and `client`

```json
{
  "type": "chat",
  "payload": {
    "username": "Your name",
    "text": "Text message",
    "room": "UUID"
  }
}
```

## Exit Room

Sent by: `client`

```json
{
  "type": "exit",
  "payload": {
    "username": "Your name",
    "room": "UUID"
  }
}
```

## Log Messages

Sent by: `server`

```json
{
  "type": "log",
  "payload": {
    "title": "title", // error || success || info || warn
    "description": "description"
  }
}
```
