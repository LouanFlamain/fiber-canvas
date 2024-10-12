package socket

import (
	"app/internal/utils"
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func SocketUpgrader(c *fiber.Ctx)error  {
	if websocket.IsWebSocketUpgrade(c){
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired
}

func WebsocketHandler(hub *Hub)fiber.Handler {
	return websocket.New(func(c *websocket.Conn) {

		userId, err := utils.GetJwtUserId(c.Params("token"))
		if err != nil {
			log.Printf("err : %s", err)
		}
		hub.RegisterUser(userId, c)

		defer func (){
			hub.UnregisterUser(userId)
		}()

		for{

			mt, message, err := c.ReadMessage()

			if err != nil {
				log.Printf("read: %s", err)
			}
			log.Printf("recv : %s", message)

			hub.Broadcast <- message

			if err = c.WriteMessage(mt, message); err != nil {
				log.Println("write:", err)
                break
			}
		}
		
	})
}