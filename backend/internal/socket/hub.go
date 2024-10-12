package socket

import (
	"app/internal/types"
	"encoding/json"
	"fmt"

	"github.com/gofiber/contrib/websocket"
)

type Hub struct{
	Clients map[*websocket.Conn]bool
	UserConns map[string]*websocket.Conn
	Register chan *websocket.Conn
	Unregister chan *websocket.Conn
	Broadcast chan []byte
}

func NewHub()*Hub{
	return &Hub{
		Clients: make(map[*websocket.Conn]bool),
		UserConns: make(map[string]*websocket.Conn),
		Register: make(chan *websocket.Conn),
		Unregister: make(chan *websocket.Conn),
		Broadcast: make(chan []byte),
	}
}

// Enregistrer un utilisateur
func (hub *Hub) RegisterUser(userID string, conn *websocket.Conn) {
    hub.UserConns[userID] = conn
    hub.Register <- conn
}

// Désinscrire un utilisateur
func (hub *Hub) UnregisterUser(userID string) {
    if conn, ok := hub.UserConns[userID]; ok {
        delete(hub.UserConns, userID)
        hub.Unregister <- conn
    }
}


//envoyer message à un utilisateur en particulier
func (hub *Hub) SendMessageToUser(userID string, params string, data interface{}) error {
    conn, ok := hub.UserConns[userID]
    if !ok {
        return fmt.Errorf("user %s not connected", userID)
    }

	msg := types.WebSocketPackage{
		Params: params,
		Data: data,
	}

	messageBytes, err := json.Marshal(msg)

	if err != nil {
		return err
	}

    if err := conn.WriteMessage(websocket.TextMessage, messageBytes); err != nil {
        return err
    }
    return nil
}

func(hub *Hub) Run(){
	for{
		select{
			case conn := <-hub.Register:
				hub.Clients[conn] = true

			case conn := <-hub.Unregister:
				if _, ok := hub.Clients[conn]; ok {
					delete(hub.Clients, conn)
					conn.Close()
				}

			case message := <- hub.Broadcast:
				for conn := range hub.Clients {
					if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
						hub.Unregister <- conn
					}
				}
		}
	}
}